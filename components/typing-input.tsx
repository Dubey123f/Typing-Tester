"use client"

import type { TextareaHTMLAttributes } from "react"

interface TypingInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (value: string) => void
}

export function TypingInput({ value, onChange, ...props }: TypingInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input border border-border rounded-lg p-4 font-mono text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      rows={8}
      spellCheck="false"
      {...props}
    />
  )
}
