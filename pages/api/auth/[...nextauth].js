import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        // let db = (await connectDB).db('forum')
        // let user = await db
        //   .collection('user_db')
        //   .findOne({ email: credentials.email })

        // if (!user) {
        //   console.log('해당 이메일은 없음')
        //   return null
        // }
        // const pwcheck = await bcrypt.compare(
        //   credentials.password,
        //   user.password,
        // )

        // if (!pwcheck) {
        //   console.log('비번틀림')
        //   return null
        // }
        console.log(credentials, 'ss')

        const user = { name: 'dd', email: 'Ddd' }
        return user
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
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {}
        token.user.name = user.name
        token.user.email = user.email
      }
      return token
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      //컴포넌트 안에서 보여줄 유저정보
      session.user = token.user
      return session
    },
  },
}
export default NextAuth(authOptions)
