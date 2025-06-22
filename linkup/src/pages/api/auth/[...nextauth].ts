import 'dotenv/config' // ← Add this
import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { connectToDatabase } from "@/lib/mongodb"
import Profile from "@/models/Profile"

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Upsert user profile on sign-in
    async signIn({ user }) {
      await connectToDatabase()
      await Profile.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            username: user.name,
            email: user.email,
            avatar: user.image,
          },
          $setOnInsert: {
            bio: "",
            skills: [],
            interests: [],
            goals: [],
            timezone: "",
            experience: "",
            lookingFor: [],
          },
        },
        { upsert: true, new: true }
      )
      return true
    },
    // Attach full profile to session
    async session({ session }) {
      await connectToDatabase()
      let profile = null
      if (session.user && session.user.email) {
        profile = await Profile.findOne({ email: session.user.email }).lean()
        if (profile) {
          session.user = {
            ...session.user,
            ...profile,
          }
        }
      }
      return session
    },
  },
})
