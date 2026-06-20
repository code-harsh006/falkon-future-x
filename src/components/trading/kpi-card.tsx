import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  sparkline?: React.ReactNode
  className?: string
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  sparkline,
  className,
}: KpiCardProps) {
  const isUp = change !== undefined && change > 0
  const isDown = change !== undefined && change < 0

  return (
    <div
      className={cn(
        "bg-white border border-ink-300 rounded-lg p-4 hover:shadow-sm transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-semibold text-ink-900 mt-1 tabular">
            {value}
          </p>
          
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-medium tabular",
                  isUp && "text-up",
                  isDown && "text-down"
                )}
              >
                {isUp && "+"}
                {change.toFixed(2)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-ink-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Icon className="w-4 h-4 text-brand-500" />
            </div>
          )}
          {sparkline && (
            <div className="w-16 h-8">
              {sparkline}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}