import NextAuth from 'next-auth'
import FacebookProviders from 'next-auth/providers/facebook'
import GithubProviders from 'next-auth/providers/github'
import GoogleProviders from 'next-auth/providers/google'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProviders({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    GithubProviders({
      clientId: process.env.GITHUB_APP_ID,
      clientSecret: process.env.GITHUB_PUBLIC_KEY,
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

export default NextAuth(authOptions)
