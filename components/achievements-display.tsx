"use client"

import type { Achievement } from "@/lib/achievements"

interface AchievementsDisplayProps {
  achievements: Achievement[]
  allAchievements: Achievement[]
}

export function AchievementsDisplay({ achievements, allAchievements }: AchievementsDisplayProps) {
  const unlockedIds = new Set(achievements.map((a) => a.id))

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.has(achievement.id)
          return (
            <div
              key={achievement.id}
              className={`rounded-lg border p-4 text-center transition-all ${
                isUnlocked ? "bg-card border-primary/50 hover:border-primary" : "bg-background border-border opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              {isUnlocked && <div className="mt-2 text-xs text-green-400 font-semibold">Unlocked</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
