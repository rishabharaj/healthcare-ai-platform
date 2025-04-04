"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

interface User {
  id: string
  name: string | null
  email: string | null
  userType: string
  phone?: string
  age?: string
  gender?: string
  bloodGroup?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status, update: updateSession } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id as string,
        name: session.user.name || null,
        email: session.user.email || null,
        userType: session.user.userType as string,
        phone: session.user.phone || "",
        age: session.user.age || "",
        gender: session.user.gender || "",
        bloodGroup: session.user.bloodGroup || "",
      })
    } else {
      setUser(null)
    }
  }, [session])

  const logout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Logout error:", error)
      setError("Failed to logout")
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      // Send update request
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const { user: updatedUser } = await response.json();

      // Update session
      await updateSession({
        user: updatedUser
      });

      // Update local state
      setUser(prev => prev ? { ...prev, ...updatedUser } : null);

    } catch (error) {
      console.error("Update user error:", error);
      throw new Error("Failed to update user");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading: status === "loading", error, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

