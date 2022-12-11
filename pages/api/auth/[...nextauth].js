import NextAuth from 'next-auth'
import FacebookProviders from 'next-auth/providers/facebook'
import GithubProviders from 'next-auth/providers/github'
import DiscordProviders from 'next-auth/providers/discord'
import GoogleProviders from 'next-auth/providers/google'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import jwt from 'jsonwebtoken'

export const authOptions = {
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
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        session.supabaseAccessToken = jwt.sign(
          {
            aud: 'authenticated',
            exp: Math.floor(new Date(session.expires).getTime() / 1000),
            sub: user.id,
            email: user.email,
            role: 'authenticated',
          },
          signingSecret
        )
      }
      return session
    },
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  }),
}

export default NextAuth(authOptions)
