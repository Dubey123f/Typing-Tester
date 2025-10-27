// "use client"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { useAuth } from "@/lib/auth-context"

// export default function Home() {
//   const { user } = useAuth()

//   return (
//     <main className="min-h-screen bg-background text-foreground flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border">
//         <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-lg">{"<>"}</span>
//             </div>
//             <h1 className="text-2xl font-bold">Typing Tester</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <ThemeToggle />
//             {user ? (
//               <Link href="/profile">
//                 <Button variant="outline">{user.email}</Button>
//               </Link>
//             ) : (
//               <>
//                 <Link href="/auth/login">
//                   <Button variant="outline">Sign In</Button>
//                 </Link>
//                 <Link href="/auth/signup">
//                   <Button>Sign Up</Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex-1 flex items-center justify-center px-4 py-20">
//         <div className="text-center max-w-2xl">
//           <h2 className="text-5xl font-bold mb-6 text-balance">Master Your Coding Speed</h2>
//           <p className="text-xl text-muted-foreground mb-12 text-balance">
//             Practice typing real code snippets across multiple programming languages. Track your WPM, accuracy, and
//             climb the leaderboard.
//           </p>

//           <div className="flex gap-4 justify-center flex-wrap">
//             <Link href="/test">
//               <Button size="lg" className="bg-primary hover:bg-primary/90">
//                 Start Test
//               </Button>
//             </Link>
//             <Link href="/leaderboard">
//               <Button size="lg" variant="outline">
//                 View Leaderboard
//               </Button>
//             </Link>
//           </div>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
//             <div className="bg-card border border-border rounded-lg p-6">
//               <div className="text-3xl mb-3">⚡</div>
//               <h3 className="font-semibold mb-2">Real Code</h3>
//               <p className="text-sm text-muted-foreground">
//                 Type actual code snippets from JavaScript, Python, C++, and more
//               </p>
//             </div>
//             <div className="bg-card border border-border rounded-lg p-6">
//               <div className="text-3xl mb-3">📊</div>
//               <h3 className="font-semibold mb-2">Track Stats</h3>
//               <p className="text-sm text-muted-foreground">Monitor your WPM, accuracy, and improvement over time</p>
//             </div>
//             <div className="bg-card border border-border rounded-lg p-6">
//               <div className="text-3xl mb-3">🏆</div>
//               <h3 className="font-semibold mb-2">Compete</h3>
//               <p className="text-sm text-muted-foreground">Climb the leaderboard and prove your typing skills</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-border">
//         <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
//           <p>Built for developers who want to type faster</p>
//         </div>
//       </footer>
//     </main>
//   )
// }


"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">{"<>"}</span>
            </div>
            <h1 className="text-2xl font-bold">Typing Tester</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Link href="/profile">
                <Button variant="outline">{user.email}</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-6 text-balance">Master Your Coding Speed</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Practice typing real code snippets across multiple programming languages. Track your WPM, accuracy, and
            climb the leaderboard.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            {user ? (
              // ✅ Only show Start Test if user is signed in
              <Link href="/test">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Test
                </Button>
              </Link>
            ) : (
              // ❌ Show Sign In prompt instead
              <Link href="/auth/login">
                <Button size="lg" variant="secondary" className="opacity-80 hover:opacity-100">
                  Sign in to Start
                </Button>
              </Link>
            )}
            <Link href="/leaderboard">
              <Button size="lg" variant="outline">
                View Leaderboard
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Real Code</h3>
              <p className="text-sm text-muted-foreground">
                Type actual code snippets from JavaScript, Python, C++, and more
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Track Stats</h3>
              <p className="text-sm text-muted-foreground">Monitor your WPM, accuracy, and improvement over time</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold mb-2">Compete</h3>
              <p className="text-sm text-muted-foreground">Climb the leaderboard and prove your typing skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built for developers who want to type faster</p>
        </div>
      </footer>
    </main>
  )
}

