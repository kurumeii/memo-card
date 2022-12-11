import NextAuth from 'next-auth'
import FacebookProviders from 'next-auth/providers/facebook'
import GithubProviders from 'next-auth/providers/github'
import DiscordProviders from 'next-auth/providers/discord'
import GoogleProviders from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProviders({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    GithubProviders({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    DiscordProviders({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
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
})
