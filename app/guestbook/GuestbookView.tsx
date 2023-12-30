'use client'

import { getGuestLogs } from '@/app/lib/actions'
import { GuestLog } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import useSWR from 'swr'

interface GuestbookViewProps {
  logs: GuestLog[]
}

export default function GuestbookView({ logs }: GuestbookViewProps): JSX.Element {
  const [before, setBefore] = useState<Date | null>(null)
  const { data, isLoading } = useSWR('guestbook', () => getGuestLogs(before), {
    fallbackData: logs,
  })

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      {data.map((log) => (
        <div className="w-full rounded-md border border-zinc-700 bg-zinc-950/50 p-2" key={log.id}>
          <div className="space-x-2">
            <a className="text-sm font-medium hover:underline" href={`/github/${log.githubId}`}>
              <span className="text-zinc-100">{log.name} </span>
              <span className="text-zinc-400">@{log.username}</span>
            </a>
            <span className="text-zinc-400">•</span>
            <span className="text-xs text-zinc-400">
              {formatDistanceToNow(log.createdAt, { addSuffix: true })}
            </span>
          </div>
          <p className="text-base">{log.message}</p>
        </div>
      ))}
    </div>
  )
}
