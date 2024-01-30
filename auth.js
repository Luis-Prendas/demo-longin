import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST }
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize (credentials) {
        const user = {
          id: '4556',
          name: 'daniel',
          password: '123456',
          role: 'USER'
        }

        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role
      return token
    },
    async session ({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    }
  }
})
