export interface TypingStats {
  wpm: number
  accuracy: number
  charactersPerMinute: number
  errorCount: number
  timeElapsed: number
  totalCharacters: number
  correctCharacters: number
}

export function calculateStats(input: string, target: string, timeElapsedSeconds: number): TypingStats {
  const totalCharacters = target.length
  let correctCharacters = 0
  let errorCount = 0

  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) {
      correctCharacters++
    } else {
      errorCount++
    }
  }

  const minutes = timeElapsedSeconds / 60 || 0.016 // Minimum 1 second
  const words = correctCharacters / 5
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0
  const accuracy = input.length > 0 ? Math.round((correctCharacters / input.length) * 100) : 100
  const charactersPerMinute = minutes > 0 ? Math.round(correctCharacters / minutes) : 0

  return {
    wpm,
    accuracy,
    charactersPerMinute,
    errorCount,
    timeElapsed: timeElapsedSeconds,
    totalCharacters,
    correctCharacters,
  }
}
