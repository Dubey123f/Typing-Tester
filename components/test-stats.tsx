"use client"

import { useMemo } from "react"
import { calculateStats } from "@/lib/typing-utils"

interface TestStatsProps {
  timeElapsed: number
  input: string
  target?: string
  testDuration?: number
}

export function TestStats({ timeElapsed, input, target, testDuration = 60 }: TestStatsProps) {
  const stats = useMemo(() => {
    if (!target) return null
    return calculateStats(input, target, timeElapsed)
  }, [input, target, timeElapsed])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const remainingTime = Math.max(0, testDuration - timeElapsed)
  const timeProgress = (timeElapsed / testDuration) * 100

  return (
    <div className="space-y-6">
      {/* Animated progress bar - crystal clear */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Progress</span>
          <span className="text-sm font-black text-slate-300">{Math.round(timeProgress)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700/50 shadow-lg">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              remainingTime <= 10
                ? "bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50"
                : remainingTime <= 20
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 shadow-lg shadow-amber-500/50"
                  : "bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/50"
            }`}
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </div>

      {/* Stats grid - crystal clear layout with better spacing */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Time Left */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50">
          <div
            className={`text-4xl font-black tracking-tight transition-colors duration-300 ${
              remainingTime <= 10 ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {formatTime(remainingTime)}
          </div>
          <div className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">Time Left</div>
        </div>

        {/* WPM */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30">
          <div className="text-4xl font-black text-blue-400 tracking-tight">{stats?.wpm || 0}</div>
          <div className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">WPM</div>
        </div>

        {/* Accuracy */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/30">
          <div className="text-4xl font-black text-emerald-400 tracking-tight">{stats?.accuracy || 0}%</div>
          <div className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">Accuracy</div>
        </div>

        {/* Characters Typed */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/30">
          <div className="text-4xl font-black text-cyan-400 tracking-tight">{input.length}</div>
          <div className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">Typed</div>
        </div>

        {/* Errors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 rounded-xl p-5 text-center hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30">
          <div className="text-4xl font-black text-red-400 tracking-tight">{stats?.errorCount || 0}</div>
          <div className="text-xs text-slate-500 mt-3 font-bold uppercase tracking-widest">Errors</div>
        </div>
      </div>
    </div>
  )
}
