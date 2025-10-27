"use client"

interface LanguageSelectorProps {
  languages: string[]
  selectedLanguage: string | null
  onSelect: (language: string | null) => void
}

export function LanguageSelector({ languages, selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Programming Language</label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 rounded-lg border transition-all ${
            selectedLanguage === null
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border hover:border-primary"
          }`}
        >
          All Languages
        </button>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className={`px-4 py-2 rounded-lg border transition-all capitalize ${
              selectedLanguage === lang
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border hover:border-primary"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  )
}
