import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const signIn = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/v2/api/members/login',
          {
            email: credentials.email,
            password: credentials.password,
          },
        )

        if (signIn.data.accessToken) {
          const user = {
            email: credentials.email,
            accessToken: signIn.data.accessToken,
            refreshToken: signIn.data.refreshToken,
          }

          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일 로그인상태 유지기간
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({}) {
      return true
    },
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token = {}
        token.user = user.email
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      //컴포넌트 안에서 보여줄 유저정보
      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
}
export default NextAuth(authOptions)
