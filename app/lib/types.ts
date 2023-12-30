export type CommonProps = {
  className?: string
  children?: React.ReactNode
}

export type UserSessionData = {
  type: 'user'
  githubId: string
  name: string
  username: string
  email: string
  expires: number
}

export type StateSessionData = {
  type: 'state'
  state: string
}

export type SessionData = StateSessionData | UserSessionData
