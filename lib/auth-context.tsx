"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signOut } from "firebase/auth"
import { auth, isFirebaseConfigured } from "./firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.warn("[v0] Firebase not configured - running in demo mode")
      setLoading(false)
      return
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setLoading(false)
        setError(null)
      })

      return () => unsubscribe()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize authentication"
      console.error("[v0] Auth initialization error:", errorMessage)
      setError(errorMessage)
      setLoading(false)
    }
  }, [])

  const logout = async () => {
    if (!isFirebaseConfigured) return

    try {
      await signOut(auth)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to logout"
      console.error("[v0] Logout error:", errorMessage)
      setError(errorMessage)
    }
  }

  return <AuthContext.Provider value={{ user, loading, logout, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
