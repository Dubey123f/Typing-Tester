"use client"

import { useEffect, useState } from "react"
import type { Achievement } from "@/lib/achievements"

interface AchievementNotificationProps {
  achievement: Achievement | null
}

export function AchievementNotification({ achievement }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [achievement])

  if (!isVisible || !achievement) return null

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-primary rounded-lg p-4 shadow-lg animate-in slide-in-from-bottom-4 z-40">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div>
          <h4 className="font-bold text-primary">Achievement Unlocked!</h4>
          <p className="text-sm text-muted-foreground">{achievement.name}</p>
        </div>
      </div>
    </div>
  )
}
