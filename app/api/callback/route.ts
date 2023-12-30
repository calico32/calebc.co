import { SessionData } from '@/app/lib/types'
import { Session } from 'kiyoi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const error = req.nextUrl.searchParams.get('error')
  if (error) {
    return NextResponse.redirect(
      new URL(`/guestbook?error=${error}`, process.env.NEXT_PUBLIC_BASE_URL || req.url),
    )
  }

  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const session = await Session.get<SessionData>(req.cookies)
  if (!session.ok) {
    return NextResponse.redirect(
      new URL('/guestbook?error=invalid-session', process.env.NEXT_PUBLIC_BASE_URL || req.url),
    )
  }
  if (session.value.type === 'user') {
    // Already logged in
    return NextResponse.redirect(new URL('/guestbook', process.env.NEXT_PUBLIC_BASE_URL || req.url))
  }
  if (session.value.type !== 'state' || state !== session.value.state) {
    return NextResponse.redirect(
      new URL('/guestbook?error=invalid-state', process.env.NEXT_PUBLIC_BASE_URL || req.url),
    )
  }

  const url = 'https://github.com/login/oauth/access_token'
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code!,
    redirect_uri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI!,
  })

  const token = await fetch(`${url}?${params}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!token.ok) {
    return NextResponse.redirect(
      new URL('/guestbook?error=invalid-token', process.env.NEXT_PUBLIC_BASE_URL || req.url),
    )
  }

  const tokenData = (await token.json()) as {
    access_token: string
    scope: string
    token_type: string
  }

  const user = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${tokenData.access_token}`,
    },
  })

  if (!user.ok) {
    return NextResponse.redirect('/guestbook?error=invalid-user')
  }

  const userData = (await user.json()) as {
    id: number
    name: string
    login: string
    email: string
  }

  const userSession = Session.create({
    type: 'user',
    githubId: userData.id.toString(),
    name: userData.name || userData.login,
    username: userData.login,
    email: userData.email || userData.login + '@users.noreply.github.com',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
  } satisfies SessionData)

  const res = NextResponse.redirect(
    new URL('/guestbook', process.env.NEXT_PUBLIC_BASE_URL || req.url),
  )
  await Session.save(userSession, res.cookies)

  return res
}
