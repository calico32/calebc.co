import { SessionData } from '@/app/lib/types'
import { Session } from 'kiyoi'
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const existingSession = await Session.get<SessionData>(req.cookies)
  if (
    existingSession.ok &&
    existingSession.value.type === 'user' &&
    existingSession.value.expires > Date.now()
  ) {
    // Already logged in
    return NextResponse.redirect(new URL('/guestbook', process.env.NEXT_PUBLIC_BASE_URL || req.url))
  }

  const state = nanoid()

  const url = 'https://github.com/login/oauth/authorize'
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI!,
    state,
  })

  const res = NextResponse.redirect(`${url}?${params}`)

  const session = Session.create({
    type: 'state',
    state,
  } satisfies SessionData)

  await Session.save(session, res.cookies)

  return res
}
