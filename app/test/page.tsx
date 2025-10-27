// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { DifficultySelector } from "@/components/difficulty-selector"
// import { LanguageSelector } from "@/components/language-selector"
// import { CodeDisplay } from "@/components/code-display"
// import { TestStats } from "@/components/test-stats"
// import { ResultsModal } from "@/components/results-modal"
// import { getRandomSnippet, getAvailableLanguages } from "@/lib/code-snippets"
// import { calculateStats, type TypingStats } from "@/lib/typing-utils"
// import Link from "next/link"

// type Difficulty = "easy" | "medium" | "hard"

// const TEST_DURATION = 60 // 60 seconds

// export default function TestPage() {
//   const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
//   const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
//   const [currentSnippet, setCurrentSnippet] = useState<any>(null)
//   const [input, setInput] = useState("")
//   const [timeElapsed, setTimeElapsed] = useState(0)
//   const [isTestActive, setIsTestActive] = useState(false)
//   const [stats, setStats] = useState<TypingStats | null>(null)
//   const [showResults, setShowResults] = useState(false)
//   const [isComplete, setIsComplete] = useState(false)

//   useEffect(() => {
//     const languages = getAvailableLanguages()
//     setAvailableLanguages(languages)
//   }, [])

//   // Load snippet when difficulty or language is selected
//   useEffect(() => {
//     if (difficulty) {
//       const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
//       setCurrentSnippet(snippet)
//       setInput("")
//       setTimeElapsed(0)
//       setIsTestActive(false)
//       setStats(null)
//       setIsComplete(false)
//     }
//   }, [difficulty, selectedLanguage])

//   useEffect(() => {
//     if (currentSnippet && input.length > 0 && input === currentSnippet.code) {
//       setIsComplete(true)
//       setIsTestActive(false)
//       const calculatedStats = calculateStats(input, currentSnippet.code, timeElapsed)
//       setStats(calculatedStats)
//     } else {
//       setIsComplete(false)
//     }
//   }, [input, currentSnippet, timeElapsed])

//   // Timer effect - auto-save when time is up
//   useEffect(() => {
//     let interval: NodeJS.Timeout
//     if (isTestActive && timeElapsed < TEST_DURATION) {
//       interval = setInterval(() => {
//         setTimeElapsed((t) => {
//           const newTime = t + 1
//           // Show results when time is up (user can choose to save)
//           if (newTime >= TEST_DURATION) {
//             setIsTestActive(false)
//             const calculatedStats = calculateStats(input, currentSnippet?.code, newTime)
//             setStats(calculatedStats)
//             setShowResults(true)
//           }
//           return newTime
//         })
//       }, 1000)
//     }
//     return () => clearInterval(interval)
//   }, [isTestActive, input, currentSnippet])

//   const handleInputChange = (value: string) => {
//     if (!isTestActive && value.length > 0) {
//       setIsTestActive(true)
//     }
//     setInput(value)
//   }

//   const handleReset = () => {
//     setInput("")
//     setTimeElapsed(0)
//     setIsTestActive(false)
//     setStats(null)
//     setIsComplete(false)
//     if (difficulty) {
//       const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
//       setCurrentSnippet(snippet)
//     }
//   }

//   const handleNextSnippet = () => {
//     if (difficulty) {
//       const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
//       setCurrentSnippet(snippet)
//       setInput("")
//       setTimeElapsed(0)
//       setIsTestActive(false)
//       setStats(null)
//       setShowResults(false)
//       setIsComplete(false)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-background text-foreground flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border">
//         <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
//           <Link href="/">
//             <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
//               <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-lg">{"<>"}</span>
//               </div>
//               <h1 className="text-2xl font-bold">Typing Tester</h1>
//             </div>
//           </Link>
//           <ThemeToggle />
//         </div>
//       </header>

//       {/* Main Content */}
//       <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
//         {!difficulty ? (
//           <div className="space-y-8">
//             <DifficultySelector onSelect={setDifficulty} />
//             <div className="max-w-2xl mx-auto">
//               <LanguageSelector
//                 languages={availableLanguages}
//                 selectedLanguage={selectedLanguage}
//                 onSelect={setSelectedLanguage}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {/* Difficulty and Language Info */}
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-muted-foreground">Difficulty:</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     difficulty === "easy"
//                       ? "bg-green-500/20 text-green-400"
//                       : difficulty === "medium"
//                         ? "bg-yellow-500/20 text-yellow-400"
//                         : "bg-red-500/20 text-red-400"
//                   }`}
//                 >
//                   {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//                 </span>
//                 {selectedLanguage && (
//                   <>
//                     <span className="text-sm text-muted-foreground ml-4">Language:</span>
//                     <span className="px-3 py-1 rounded-full text-sm font-semibold bg-accent/20 text-accent capitalize">
//                       {selectedLanguage}
//                     </span>
//                   </>
//                 )}
//               </div>
//               <Button variant="outline" size="sm" onClick={() => setDifficulty(null)}>
//                 Change Settings
//               </Button>
//             </div>

//             {/* Stats Bar */}
//             <TestStats
//               timeElapsed={timeElapsed}
//               input={input}
//               target={currentSnippet?.code}
//               testDuration={TEST_DURATION}
//             />

//             {/* Code Display - now editable with overlay typing */}
//             {currentSnippet && (
//               <CodeDisplay
//                 snippet={currentSnippet}
//                 userInput={input}
//                 onChange={handleInputChange}
//                 isTestActive={isTestActive}
//               />
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-4 justify-center">
//               <Button onClick={handleReset} variant="outline">
//                 Reset
//               </Button>
//               {isComplete && stats && (
//                 <Button
//                   onClick={() => setShowResults(true)}
//                   className="bg-green-600 hover:bg-green-700 text-white font-semibold"
//                 >
//                   Save Score ({timeElapsed}s)
//                 </Button>
//               )}
//               <Link href="/leaderboard">
//                 <Button variant="outline">View Leaderboard</Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Results Modal */}
//       {showResults && stats && (
//         <ResultsModal
//           stats={stats}
//           difficulty={difficulty!}
//           onNext={handleNextSnippet}
//           onClose={() => setShowResults(false)}
//         />
//       )}
//     </main>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DifficultySelector } from "@/components/difficulty-selector"
import { LanguageSelector } from "@/components/language-selector"
import { CodeDisplay } from "@/components/code-display"
import { TestStats } from "@/components/test-stats"
import { ResultsModal } from "@/components/results-modal"
import { getRandomSnippet, getAvailableLanguages } from "@/lib/code-snippets"
import { calculateStats, type TypingStats } from "@/lib/typing-utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

type Difficulty = "easy" | "medium" | "hard"

const TEST_DURATION = 60 // 60 seconds

export default function TestPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // 🔒 Redirect to login if user not signed in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Show loading UI while checking auth
  if (loading || (!user && !loading)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Checking authentication...</p>
      </main>
    )
  }

  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])
  const [currentSnippet, setCurrentSnippet] = useState<any>(null)
  const [input, setInput] = useState("")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTestActive, setIsTestActive] = useState(false)
  const [stats, setStats] = useState<TypingStats | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const languages = getAvailableLanguages()
    setAvailableLanguages(languages)
  }, [])

  useEffect(() => {
    if (difficulty) {
      const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
      setCurrentSnippet(snippet)
      setInput("")
      setTimeElapsed(0)
      setIsTestActive(false)
      setStats(null)
      setIsComplete(false)
    }
  }, [difficulty, selectedLanguage])

  useEffect(() => {
    if (currentSnippet && input.length > 0 && input === currentSnippet.code) {
      setIsComplete(true)
      setIsTestActive(false)
      const calculatedStats = calculateStats(input, currentSnippet.code, timeElapsed)
      setStats(calculatedStats)
    } else {
      setIsComplete(false)
    }
  }, [input, currentSnippet, timeElapsed])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTestActive && timeElapsed < TEST_DURATION) {
      interval = setInterval(() => {
        setTimeElapsed((t) => {
          const newTime = t + 1
          if (newTime >= TEST_DURATION) {
            setIsTestActive(false)
            const calculatedStats = calculateStats(input, currentSnippet?.code, newTime)
            setStats(calculatedStats)
            setShowResults(true)
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTestActive, input, currentSnippet])

  const handleInputChange = (value: string) => {
    if (!isTestActive && value.length > 0) {
      setIsTestActive(true)
    }
    setInput(value)
  }

  const handleReset = () => {
    setInput("")
    setTimeElapsed(0)
    setIsTestActive(false)
    setStats(null)
    setIsComplete(false)
    if (difficulty) {
      const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
      setCurrentSnippet(snippet)
    }
  }

  const handleNextSnippet = () => {
    if (difficulty) {
      const snippet = getRandomSnippet(difficulty, selectedLanguage || undefined)
      setCurrentSnippet(snippet)
      setInput("")
      setTimeElapsed(0)
      setIsTestActive(false)
      setStats(null)
      setShowResults(false)
      setIsComplete(false)
    }
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
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {!difficulty ? (
          <div className="space-y-8">
            <DifficultySelector onSelect={setDifficulty} />
            <div className="max-w-2xl mx-auto">
              <LanguageSelector
                languages={availableLanguages}
                selectedLanguage={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Difficulty and Language Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Difficulty:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    difficulty === "easy"
                      ? "bg-green-500/20 text-green-400"
                      : difficulty === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
                {selectedLanguage && (
                  <>
                    <span className="text-sm text-muted-foreground ml-4">Language:</span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-accent/20 text-accent capitalize">
                      {selectedLanguage}
                    </span>
                  </>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={() => setDifficulty(null)}>
                Change Settings
              </Button>
            </div>

            {/* Stats Bar */}
            <TestStats
              timeElapsed={timeElapsed}
              input={input}
              target={currentSnippet?.code}
              testDuration={TEST_DURATION}
            />

            {/* Code Display */}
            {currentSnippet && (
              <CodeDisplay
                snippet={currentSnippet}
                userInput={input}
                onChange={handleInputChange}
                isTestActive={isTestActive}
              />
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
              {isComplete && stats && (
                <Button
                  onClick={() => setShowResults(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Save Score ({timeElapsed}s)
                </Button>
              )}
              <Link href="/leaderboard">
                <Button variant="outline">View Leaderboard</Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Results Modal */}
      {showResults && stats && (
        <ResultsModal
          stats={stats}
          difficulty={difficulty!}
          onNext={handleNextSnippet}
          onClose={() => setShowResults(false)}
        />
      )}
    </main>
  )
}
