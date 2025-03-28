declare module "next-auth" {
  interface User {
    userType?: string
  }

  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      userType?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType?: string
  }
}

