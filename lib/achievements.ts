import { db } from "./firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: {
    type: "wpm" | "accuracy" | "tests_completed" | "difficulty_mastery"
    value: number
    difficulty?: "easy" | "medium" | "hard"
  }
  unlockedAt?: number
}

export const achievements: Achievement[] = [
  {
    id: "first-test",
    name: "Getting Started",
    description: "Complete your first typing test",
    icon: "🚀",
    requirement: { type: "tests_completed", value: 1 },
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Achieve 100+ WPM on any test",
    icon: "⚡",
    requirement: { type: "wpm", value: 100 },
  },
  {
    id: "accuracy-master",
    name: "Accuracy Master",
    description: "Achieve 99% accuracy on any test",
    icon: "🎯",
    requirement: { type: "accuracy", value: 99 },
  },
  {
    id: "easy-master",
    name: "Easy Master",
    description: "Complete 10 easy difficulty tests",
    icon: "🟢",
    requirement: { type: "difficulty_mastery", value: 10, difficulty: "easy" },
  },
  {
    id: "medium-master",
    name: "Medium Master",
    description: "Complete 10 medium difficulty tests",
    icon: "🟡",
    requirement: { type: "difficulty_mastery", value: 10, difficulty: "medium" },
  },
  {
    id: "hard-master",
    name: "Hard Master",
    description: "Complete 10 hard difficulty tests",
    icon: "🔴",
    requirement: { type: "difficulty_mastery", value: 10, difficulty: "hard" },
  },
  {
    id: "speed-racer",
    name: "Speed Racer",
    description: "Achieve 150+ WPM on any test",
    icon: "🏎️",
    requirement: { type: "wpm", value: 150 },
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Achieve 100% accuracy on any test",
    icon: "💯",
    requirement: { type: "accuracy", value: 100 },
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Complete 50 typing tests",
    icon: "🏆",
    requirement: { type: "tests_completed", value: 50 },
  },
]

export async function getUserAchievements(userId: string) {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data().achievements || []
    }
    return []
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return []
  }
}

export async function checkAndUnlockAchievements(
  userId: string,
  userStats: {
    totalTests: number
    bestWPM: number
    bestAccuracy: number
    easyTests: number
    mediumTests: number
    hardTests: number
  },
) {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return []
    }

    const unlockedAchievements = userDoc.data().achievements || []
    const newlyUnlocked: Achievement[] = []

    for (const achievement of achievements) {
      // Skip if already unlocked
      if (unlockedAchievements.some((a: any) => a.id === achievement.id)) {
        continue
      }

      let isUnlocked = false

      switch (achievement.requirement.type) {
        case "tests_completed":
          isUnlocked = userStats.totalTests >= achievement.requirement.value
          break
        case "wpm":
          isUnlocked = userStats.bestWPM >= achievement.requirement.value
          break
        case "accuracy":
          isUnlocked = userStats.bestAccuracy >= achievement.requirement.value
          break
        case "difficulty_mastery":
          if (achievement.requirement.difficulty === "easy") {
            isUnlocked = userStats.easyTests >= achievement.requirement.value
          } else if (achievement.requirement.difficulty === "medium") {
            isUnlocked = userStats.mediumTests >= achievement.requirement.value
          } else if (achievement.requirement.difficulty === "hard") {
            isUnlocked = userStats.hardTests >= achievement.requirement.value
          }
          break
      }

      if (isUnlocked) {
        const unlockedAchievement = {
          ...achievement,
          unlockedAt: Date.now(),
        }
        newlyUnlocked.push(unlockedAchievement)
        unlockedAchievements.push(unlockedAchievement)
      }
    }

    if (newlyUnlocked.length > 0) {
      await updateDoc(userRef, {
        achievements: unlockedAchievements,
      })
    }

    return newlyUnlocked
  } catch (error) {
    console.error("Error checking achievements:", error)
    return []
  }
}
