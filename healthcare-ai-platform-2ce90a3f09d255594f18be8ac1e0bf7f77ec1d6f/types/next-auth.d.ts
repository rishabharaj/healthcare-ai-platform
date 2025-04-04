import type { DefaultSession } from "next-auth"

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
  }
}

