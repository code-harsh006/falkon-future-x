import * as React from "react"
import { cn } from "@/lib/utils"
import { PriceTag } from "./price-tag"
import { ArrowRight } from "lucide-react"

interface WatchlistRowProps {
  projectId: string
  name: string
  category: "tree" | "biochar" | "waste" | "solar"
  price: number
  change?: number
  changePercent?: number
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

const categoryLabels: Record<string, string> = {
  tree: "Tree",
  biochar: "Biochar",
  waste: "Waste",
  solar: "Solar",
}

const categoryColors: Record<string, string> = {
  tree: "bg-emerald-100 text-emerald-700",
  biochar: "bg-amber-100 text-amber-700",
  waste: "bg-blue-100 text-blue-700",
  solar: "bg-yellow-100 text-yellow-700",
}

export function WatchlistRow({
  projectId,
  name,
  category,
  price,
  change,
  changePercent,
  isSelected = false,
  onClick,
  className,
}: WatchlistRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 border-b border-ink-300 hover:bg-ink-100 transition-colors flex items-center justify-between gap-3",
        isSelected && "bg-brand-50 border-l-2 border-l-brand-500",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink-900 truncate">
            {name}
          </span>
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.5 rounded",
              categoryColors[category]
            )}
          >
            {categoryLabels[category]}
          </span>
        </div>
        <PriceTag
          price={price}
          change={change}
          changePercent={changePercent}
          size="sm"
          className="mt-1"
        />
      </div>
      
      <ArrowRight className="w-4 h-4 text-ink-500 flex-shrink-0" />
    </button>
  )
}