"use client"

import type { LeaderboardEntry } from "@/lib/leaderboard-store"

interface LeaderboardTableProps {
  scores: LeaderboardEntry[]
}

export function LeaderboardTable({ scores }: LeaderboardTableProps) {
  if (scores.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No scores yet. Be the first to submit!</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-background/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">WPM</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Accuracy</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id} className="border-b border-border hover:bg-background/50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold">
                <span className="text-accent">#{index + 1}</span>
              </td>
              <td className="px-6 py-4 text-sm">{score.name}</td>
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
  )
}
