import { Session } from 'kiyoi'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const res = NextResponse.redirect(
    new URL('/guestbook', process.env.NEXT_PUBLIC_BASE_URL || req.url),
  )
  Session.destroy(res.cookies)
  return res
}
