"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { TypingStats } from "@/lib/typing-utils"
import { addLeaderboardEntry } from "@/lib/leaderboard-store"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

interface ResultsModalProps {
  stats: TypingStats
  difficulty: "easy" | "medium" | "hard"
  onNext: () => void
  onClose: () => void
}

export function ResultsModal({ stats, difficulty, onNext, onClose }: ResultsModalProps) {
  const { user } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSaveScore = async () => {
    if (!user) {
      setError("You must be logged in to save scores")
      return
    }

    setLoading(true)
    setError("")

    try {
      setSubmitted(true)

      addLeaderboardEntry({
        name: user.email?.split("@")[0] || "Anonymous",
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        difficulty,
      }).catch((err: any) => {
        setError(err.message || "Failed to save score")
        setSubmitted(false)
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-xl max-w-md w-full p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
            Test Complete!
          </h2>
          <p className="text-muted-foreground text-sm">Here's how you performed</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">WPM</p>
            <p className="text-3xl font-bold text-accent">{stats.wpm}</p>
          </div>
          <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Accuracy</p>
            <p className="text-3xl font-bold text-green-400">{stats.accuracy}%</p>
          </div>
          <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Errors</p>
            <p className="text-3xl font-bold text-red-400">{stats.errorCount}</p>
          </div>
          <div className="bg-background/50 border border-border/50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Time</p>
            <p className="text-3xl font-bold text-blue-400">{stats.timeElapsed}s</p>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center justify-center">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              difficulty === "easy"
                ? "bg-green-500/20 text-green-400"
                : difficulty === "medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
            }`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
          </span>
        </div>

        {/* Status Messages */}
        {submitted ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
            <p className="text-green-400 font-semibold">Score saved to leaderboard!</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-400 text-sm font-semibold">{error}</p>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!submitted ? (
            <>
              <Button
                onClick={handleSaveScore}
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 h-auto"
              >
                {loading ? "Saving..." : "Save Score"}
              </Button>
              <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
                Skip
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onNext} className="w-full bg-primary hover:bg-primary/90 font-semibold py-2 h-auto">
                Next Snippet
              </Button>
              <Link href="/leaderboard" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  View Leaderboard
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
