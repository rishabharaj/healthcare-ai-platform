"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user type
export interface User {
  id: string
  name: string
  email: string
  userType: "doctor" | "patient"
  image?: string
}

// Define auth context type
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const MOCK_USERS = [
  {
    id: "1",
    name: "Doctor Demo",
    email: "doctor@example.com",
    password: "password123",
    userType: "doctor" as const,
  },
  {
    id: "2",
    name: "Patient Demo",
    email: "patient@example.com",
    password: "password123",
    userType: "patient" as const,
  },
]

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Find user with matching email
    const foundUser = MOCK_USERS.find((u) => u.email === email)

    // Check if user exists and password matches
    if (foundUser && foundUser.password === password) {
      // Create user object without password
      const { password, ...userWithoutPassword } = foundUser

      // Save user to state and localStorage
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

