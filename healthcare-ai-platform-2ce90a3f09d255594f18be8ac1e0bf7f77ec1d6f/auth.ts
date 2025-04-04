import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.userType = token.userType as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
})

