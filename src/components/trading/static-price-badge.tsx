import * as React from "react"
import { cn } from "@/lib/utils"
import { CircleDot } from "lucide-react"

interface StaticPriceBadgeProps {
  className?: string
}

export function StaticPriceBadge({ className }: StaticPriceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-ink-500 bg-ink-100 px-2 py-0.5 rounded",
        className
      )}
    >
      <CircleDot className="w-3 h-3" />
      Static price · live feed not connected
    </span>
  )
}