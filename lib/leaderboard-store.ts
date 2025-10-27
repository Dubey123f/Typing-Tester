import { db, auth } from "./firebase"
import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from "firebase/firestore"

export interface LeaderboardEntry {
  id: string
  userId: string
  name: string
  email: string
  wpm: number
  accuracy: number
  difficulty: "easy" | "medium" | "hard"
  timestamp: number
}

const scoreCache = new Map<string, { data: LeaderboardEntry[]; timestamp: number }>()
const CACHE_DURATION = 60000 // 60 seconds

export async function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "id" | "timestamp" | "userId" | "email">) {
  const user = auth.currentUser
  if (!user) {
    throw new Error("User must be authenticated to save scores")
  }

  try {
    const docRef = await addDoc(collection(db, "leaderboard"), {
      userId: user.uid,
      name: entry.name,
      email: user.email,
      wpm: entry.wpm,
      accuracy: entry.accuracy,
      difficulty: entry.difficulty,
      timestamp: Timestamp.now(),
    })

    const cacheKey = `${entry.difficulty}-10`
    scoreCache.delete(cacheKey)

    return {
      id: docRef.id,
      userId: user.uid,
      name: entry.name,
      email: user.email,
      wpm: entry.wpm,
      accuracy: entry.accuracy,
      difficulty: entry.difficulty,
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error("Error adding leaderboard entry:", error)
    throw error
  }
}

export async function getTopScores(difficulty?: "easy" | "medium" | "hard", topLimit = 10) {
  try {
    const cacheKey = `${difficulty || "all"}-${topLimit}`
    const cached = scoreCache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    let q
    if (difficulty) {
      q = query(
        collection(db, "leaderboard"),
        where("difficulty", "==", difficulty),
        orderBy("wpm", "desc"),
        limit(topLimit),
      )
    } else {
      q = query(collection(db, "leaderboard"), orderBy("wpm", "desc"), limit(topLimit))
    }

    const querySnapshot = await getDocs(q)
    const scores: LeaderboardEntry[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      scores.push({
        id: doc.id,
        userId: data.userId,
        name: data.name,
        email: data.email,
        wpm: data.wpm,
        accuracy: data.accuracy,
        difficulty: data.difficulty,
        timestamp: data.timestamp.toMillis(),
      })
    })

    scoreCache.set(cacheKey, { data: scores, timestamp: Date.now() })

    return scores
  } catch (error) {
    console.error("Error fetching top scores:", error)
    return []
  }
}

export async function getUserScores(userId: string, difficulty?: "easy" | "medium" | "hard") {
  try {
    let q
    if (difficulty) {
      q = query(
        collection(db, "leaderboard"),
        where("userId", "==", userId),
        where("difficulty", "==", difficulty),
        orderBy("timestamp", "desc"),
      )
    } else {
      q = query(collection(db, "leaderboard"), where("userId", "==", userId), orderBy("timestamp", "desc"))
    }

    const querySnapshot = await getDocs(q)
    const scores: LeaderboardEntry[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      scores.push({
        id: doc.id,
        userId: data.userId,
        name: data.name,
        email: data.email,
        wpm: data.wpm,
        accuracy: data.accuracy,
        difficulty: data.difficulty,
        timestamp: data.timestamp.toMillis(),
      })
    })

    return scores
  } catch (error) {
    console.error("Error fetching user scores:", error)
    return []
  }
}

export function getLeaderboard() {
  console.warn("getLeaderboard() is deprecated. Use getTopScores() instead.")
  return []
}
