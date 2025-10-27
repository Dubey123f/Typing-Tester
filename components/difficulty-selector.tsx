"use client"

interface DifficultySelectorProps {
  onSelect: (difficulty: "easy" | "medium" | "hard") => void
}

export function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Select Difficulty</h2>
        <p className="text-muted-foreground">Choose a difficulty level to begin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => onSelect("easy")}
          className="bg-card border border-border rounded-lg p-8 hover:border-primary hover:bg-card/80 transition-all cursor-pointer group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🟢</div>
          <h3 className="text-xl font-semibold mb-2">Easy</h3>
          <p className="text-sm text-muted-foreground">Simple loops and basic syntax</p>
        </button>

        <button
          onClick={() => onSelect("medium")}
          className="bg-card border border-border rounded-lg p-8 hover:border-primary hover:bg-card/80 transition-all cursor-pointer group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🟡</div>
          <h3 className="text-xl font-semibold mb-2">Medium</h3>
          <p className="text-sm text-muted-foreground">Functions and classes</p>
        </button>

        <button
          onClick={() => onSelect("hard")}
          className="bg-card border border-border rounded-lg p-8 hover:border-primary hover:bg-card/80 transition-all cursor-pointer group"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔴</div>
          <h3 className="text-xl font-semibold mb-2">Hard</h3>
          <p className="text-sm text-muted-foreground">Algorithms and data structures</p>
        </button>
      </div>
    </div>
  )
}
