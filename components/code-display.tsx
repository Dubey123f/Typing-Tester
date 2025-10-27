"use client"

import type React from "react"
import type { CodeSnippet } from "@/lib/code-snippets"
import { useRef, useEffect, useCallback, useState } from "react"

interface CodeDisplayProps {
  snippet: CodeSnippet
  userInput: string
  onChange: (value: string) => void
  isTestActive: boolean
}

export function CodeDisplay({ snippet, userInput, onChange, isTestActive }: CodeDisplayProps) {
  const lines = snippet.code.split("\n")
  const userLines = userInput.split("\n")
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [cursorLine, setCursorLine] = useState(0)
  const [cursorCol, setCursorCol] = useState(0)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      onChange(value)

      // Update cursor position
      const textarea = e.target
      const beforeCursor = value.substring(0, textarea.selectionStart)
      const lineNum = beforeCursor.split("\n").length - 1
      const colNum = beforeCursor.split("\n")[lineNum]?.length || 0
      setCursorLine(lineNum)
      setCursorCol(colNum)
    },
    [onChange],
  )

  useEffect(() => {
    if (inputRef.current && isTestActive) {
      inputRef.current.focus()
    }
  }, [isTestActive])

  return (
    <div className="relative w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 resize-none font-mono text-sm p-8 z-10"
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
        placeholder="Click here and start typing..."
      />

      {/* Code display area */}
      <div className="p-8 font-mono text-sm overflow-auto max-h-96 bg-slate-950">
        <div className="space-y-0">
          {lines.map((line, lineIndex) => {
            const isCurrentLine = lineIndex === cursorLine
            const userLine = userLines[lineIndex] || ""

            return (
              <div
                key={lineIndex}
                className={`flex gap-4 py-1.5 px-4 rounded transition-colors ${
                  isCurrentLine ? "bg-blue-500/10 border-l-2 border-blue-500" : ""
                }`}
              >
                {/* Line number */}
                <span
                  className={`w-8 text-right flex-shrink-0 font-semibold text-xs tracking-wider ${
                    isCurrentLine ? "text-blue-400" : "text-slate-600"
                  }`}
                >
                  {String(lineIndex + 1).padStart(2, " ")}
                </span>

                {/* Code content with character feedback */}
                <div className="flex-1 flex flex-wrap items-center gap-0 whitespace-pre-wrap break-words">
                  {line.split("").map((char, charIndex) => {
                    const userChar = userLine[charIndex]
                    const isCorrect = userChar === char
                    const isTyped = userChar !== undefined
                    const isCursor = isCurrentLine && charIndex === cursorCol

                    return (
                      <span
                        key={charIndex}
                        className={`relative transition-all duration-75 ${isCursor ? "bg-blue-400/50 rounded" : ""} ${
                          isTyped
                            ? isCorrect
                              ? "text-green-400 font-medium"
                              : "text-red-400 font-medium bg-red-500/20 rounded"
                            : "text-slate-500"
                        }`}
                      >
                        {char === " " ? "·" : char}
                      </span>
                    )
                  })}
                  {/* End of line cursor */}
                  {isCurrentLine && cursorCol >= line.length && (
                    <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-1" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Helper text */}
      <div className="px-8 py-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-400 text-center">
        Click on the code and start typing • Green = Correct • Red = Wrong
      </div>
    </div>
  )
}
