import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/app/_lib/prisma'
import { Adapter } from 'next-auth/adapters'

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }
