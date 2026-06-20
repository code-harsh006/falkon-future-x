import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, FileText, Folder, Award, Hash } from "lucide-react"

interface SearchResult {
  id: string
  type: "project" | "credit" | "order" | "document"
  title: string
  subtitle?: string
  href?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => Promise<SearchResult[]>
  onSelect: (result: SearchResult) => void
  className?: string
}

export function CommandPalette({
  isOpen,
  onClose,
  onSearch,
  onSelect,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery("")
      setResults([])
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) {
          onClose()
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTimeout = setTimeout(async () => {
      setIsLoading(true)
      try {
        const searchResults = await onSearch(query)
        setResults(searchResults)
      } catch (error) {
        console.error("Search failed:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, onSearch])

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "project":
        return <Folder className="w-4 h-4" />
      case "credit":
        return <Award className="w-4 h-4" />
      case "order":
        return <Hash className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "project":
        return "text-brand-500"
      case "credit":
        return "text-up"
      case "order":
        return "text-info"
      case "document":
        return "text-ink-500"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div
        className={cn(
          "relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-ink-300 overflow-hidden",
          className
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-300">
          <Search className="w-5 h-5 text-ink-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, credits, orders..."
            className="flex-1 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-ink-100 text-ink-500 text-xs rounded border border-ink-300">
            ESC
          </kbd>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 text-ink-500">
                <div className="w-4 h-4 border-2 border-ink-300 border-t-brand-500 rounded-full animate-spin" />
                Searching...
              </div>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-ink-500">No results found for "{query}"</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    onSelect(result)
                    onClose()
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-ink-100 transition-colors text-left"
                >
                  <div className={cn("flex-shrink-0", getTypeColor(result.type))}>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-900 truncate">
                      {result.title}
                    </p>
                    {result.subtitle && (
                      <p className="text-xs text-ink-500 truncate">
                        {result.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-4">
              <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-2">
                Quick Actions
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setQuery("project:")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-ink-100 transition-colors text-left"
                >
                  <Folder className="w-4 h-4 text-brand-500" />
                  <span className="text-sm text-ink-700">Browse Projects</span>
                </button>
                <button
                  onClick={() => {
                    setQuery("credit:")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-ink-100 transition-colors text-left"
                >
                  <Award className="w-4 h-4 text-up" />
                  <span className="text-sm text-ink-700">View Holdings</span>
                </button>
                <button
                  onClick={() => {
                    setQuery("order:")
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-ink-100 transition-colors text-left"
                >
                  <Hash className="w-4 h-4 text-info" />
                  <span className="text-sm text-ink-700">Check Orders</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-ink-300 bg-ink-100/50">
          <div className="flex items-center justify-between text-xs text-ink-500">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-ink-300 rounded">↑↓</kbd> to navigate
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-ink-300 rounded">↵</kbd> to select
              </span>
            </div>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-ink-300 rounded">⌘K</kbd> to toggle
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}