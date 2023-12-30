'use server'

import { libsql, prisma } from '@/app/lib/db'
import { SessionData, UserSessionData } from '@/app/lib/types'
import { GuestLog } from '@prisma/client'
import { Session } from 'kiyoi'
import { cookies } from 'next/headers'

async function sync() {
  await libsql.sync()
}

export async function getSession(): Promise<UserSessionData | undefined> {
  const session = await Session.get<SessionData>(cookies())
  if (!session.ok || session.value.type !== 'user' || session.value.expires < Date.now())
    return undefined

  return session.value
}

export async function getGuestLogs(before?: Date | null, count = 25): Promise<GuestLog[]> {
  await sync()
  return await prisma.guestLog.findMany({
    where: before != null ? { createdAt: { lt: before.toISOString() } } : undefined,
    take: count,
    orderBy: { createdAt: 'desc' },
  })
}

export async function throttleGuestLog(userId: string): Promise<boolean> {
  await sync()
  const logs = await prisma.guestLog.findMany({
    where: { githubId: userId, createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 24) } },
    select: { createdAt: true },
  })

  const lastMinute = logs.filter((log) => log.createdAt > new Date(Date.now() - 1000 * 60))
  const lastHour = logs.filter((log) => log.createdAt > new Date(Date.now() - 1000 * 60 * 60))
  const lastDay = logs.filter((log) => log.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24))

  return lastMinute.length >= 1 || lastHour.length >= 2 || lastDay.length >= 5
}

export async function addGuestLog(
  message: string,
): Promise<Pick<GuestLog, 'id' | 'createdAt' | 'name' | 'githubId' | 'message'> | null> {
  const session = await getSession()
  if (!session) throw new Error('Not logged in')

  await sync()

  const throttled = await throttleGuestLog(session.githubId)
  if (throttled) return null

  const log = await prisma.guestLog.create({
    data: {
      githubId: session.githubId,
      email: session.email || session.username + '@users.noreply.github.com',
      name: session.name,
      username: session.username,
      message,
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      githubId: true,
      message: true,
    },
  })

  return log
}
