import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      userType: string
      phone?: string
      age?: string
      gender?: string
      bloodGroup?: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    userType: string
    phone?: string
    age?: string
    gender?: string
    bloodGroup?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType: string
    phone?: string
    age?: string
    gender?: string
    bloodGroup?: string
  }
}

// This is a mock implementation - in a real app, you would use a database
const users = [
  {
    id: "1",
    name: "Doctor Demo",
    email: "doctor@example.com",
    password: "password123",
    userType: "doctor",
  },
  {
    id: "2",
    name: "Patient Demo",
    email: "patient@example.com",
    password: "password123",
    userType: "patient",
  },
]

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-key-here",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((user) => user.email === credentials.email)
        if (!user) {
          return null
        }

        // For demo purposes, simple password check
        const isPasswordValid = user.password === credentials.password
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.userType = user.userType
        if (user.phone) token.phone = user.phone
        if (user.age) token.age = user.age
        if (user.gender) token.gender = user.gender
        if (user.bloodGroup) token.bloodGroup = user.bloodGroup
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.userType = token.userType
        if (token.phone) session.user.phone = token.phone
        if (token.age) session.user.age = token.age
        if (token.gender) session.user.gender = token.gender
        if (token.bloodGroup) session.user.bloodGroup = token.bloodGroup
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" as const },
} 