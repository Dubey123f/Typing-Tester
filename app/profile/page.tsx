"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AchievementsDisplay } from "@/components/achievements-display"
import { useAuth } from "@/lib/auth-context"
import { getUserScores } from "@/lib/leaderboard-store"
import { getUserAchievements, achievements as allAchievements } from "@/lib/achievements"
import type { LeaderboardEntry } from "@/lib/leaderboard-store"
import type { Achievement } from "@/lib/achievements"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [scores, setScores] = useState<LeaderboardEntry[]>([])
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const fetchData = async () => {
      setLoading(true)
      const userScores = await getUserScores(user.uid, selectedDifficulty || undefined)
      const achievements = await getUserAchievements(user.uid)
      setScores(userScores)
      setUserAchievements(achievements)
      setLoading(false)
    }

    fetchData()
  }, [user, selectedDifficulty, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  // Calculate statistics
  const stats = {
    totalTests: scores.length,
    bestWPM: scores.length > 0 ? Math.max(...scores.map((s) => s.wpm)) : 0,
    averageWPM: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.wpm, 0) / scores.length) : 0,
    bestAccuracy: scores.length > 0 ? Math.max(...scores.map((s) => s.accuracy)) : 0,
    averageAccuracy: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.accuracy, 0) / scores.length) : 0,
  }

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
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Profile</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalTests}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{stats.bestWPM}</div>
              <div className="text-sm text-muted-foreground">Best WPM</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.averageWPM}</div>
              <div className="text-sm text-muted-foreground">Average WPM</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.bestAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Best Accuracy</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.averageAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-card border border-border rounded-lg p-8">
            <AchievementsDisplay achievements={userAchievements} allAchievements={allAchievements} />
          </div>

          {/* Score History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Score History</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setSelectedDifficulty(null)}
                  variant={selectedDifficulty === null ? "default" : "outline"}
                  size="sm"
                  className={selectedDifficulty === null ? "bg-primary hover:bg-primary/90" : ""}
                >
                  All
                </Button>
                <Button
                  onClick={() => setSelectedDifficulty("easy")}
                  variant={selectedDifficulty === "easy" ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedDifficulty === "easy"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50"
                      : ""
                  }
                >
                  Easy
                </Button>
                <Button
                  onClick={() => setSelectedDifficulty("medium")}
                  variant={selectedDifficulty === "medium" ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedDifficulty === "medium"
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50"
                      : ""
                  }
                >
                  Medium
                </Button>
                <Button
                  onClick={() => setSelectedDifficulty("hard")}
                  variant={selectedDifficulty === "hard" ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedDifficulty === "hard"
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
                      : ""
                  }
                >
                  Hard
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground">Loading scores...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground mb-4">No scores yet. Start typing to improve!</p>
                <Link href="/test">
                  <Button className="bg-primary hover:bg-primary/90">Start Test</Button>
                </Link>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-background/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">WPM</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Accuracy</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score) => (
                      <tr key={score.id} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          {new Date(score.timestamp).toLocaleDateString()}{" "}
                          {new Date(score.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-accent">{score.wpm}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-400">{score.accuracy}%</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              score.difficulty === "easy"
                                ? "bg-green-500/20 text-green-400"
                                : score.difficulty === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link href="/test">
              <Button className="bg-primary hover:bg-primary/90">Start New Test</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline">View Leaderboard</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
