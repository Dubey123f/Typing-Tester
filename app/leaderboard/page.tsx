"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { getTopScores } from "@/lib/leaderboard-store"
import type { LeaderboardEntry } from "@/lib/leaderboard-store"

type Difficulty = "easy" | "medium" | "hard" | null

export default function LeaderboardPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>(null)
  const [scores, setScores] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true)
      const topScores = await getTopScores(difficulty || undefined)
      setScores(topScores)
      setLoading(false)
    }

    fetchScores()
  }, [difficulty])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">{"<>"}</span>
              </div>
              <h1 className="text-2xl font-bold">Typing Tester</h1>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Leaderboard</h2>
            <p className="text-muted-foreground">Top performers across all difficulty levels</p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              onClick={() => setDifficulty(null)}
              variant={difficulty === null ? "default" : "outline"}
              className={difficulty === null ? "bg-primary hover:bg-primary/90" : ""}
            >
              All
            </Button>
            <Button
              onClick={() => setDifficulty("easy")}
              variant={difficulty === "easy" ? "default" : "outline"}
              className={
                difficulty === "easy" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50" : ""
              }
            >
              Easy
            </Button>
            <Button
              onClick={() => setDifficulty("medium")}
              variant={difficulty === "medium" ? "default" : "outline"}
              className={
                difficulty === "medium"
                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50"
                  : ""
              }
            >
              Medium
            </Button>
            <Button
              onClick={() => setDifficulty("hard")}
              variant={difficulty === "hard" ? "default" : "outline"}
              className={
                difficulty === "hard" ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50" : ""
              }
            >
              Hard
            </Button>
          </div>

          {/* Leaderboard Table */}
          {loading ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          ) : (
            <LeaderboardTable scores={scores} />
          )}

          {/* Back Button */}
          <div className="text-center">
            <Link href="/test">
              <Button className="bg-primary hover:bg-primary/90">Back to Test</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
