import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email?: string | undefined | null
    } & DefaultSession['user']
    accessToken: string | undefined | null
    refreshToken: string | undefined | null
  }
}
