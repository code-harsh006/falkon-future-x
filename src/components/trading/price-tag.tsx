import * as React from "react"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface PriceTagProps {
  price: number
  change?: number
  changePercent?: number
  currency?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PriceTag({
  price,
  change,
  changePercent,
  currency = "$",
  size = "md",
  className,
}: PriceTagProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "$" ? "USD" : currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  const isUp = change !== undefined && change > 0
  const isDown = change !== undefined && change < 0
  const isNeutral = change !== undefined && change === 0

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const pillSizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-medium tabular", sizeClasses[size])}>
        {formattedPrice}
      </span>
      
      {change !== undefined && changePercent !== undefined && (
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded font-medium tabular",
            pillSizeClasses[size],
            isUp && "bg-up-bg text-up",
            isDown && "bg-down-bg text-down",
            isNeutral && "bg-ink-100 text-ink-500"
          )}
        >
          {isUp && <ArrowUp className="w-3 h-3" />}
          {isDown && <ArrowDown className="w-3 h-3" />}
          {isNeutral && <Minus className="w-3 h-3" />}
          {isUp && "+"}
          {changePercent.toFixed(2)}%
        </span>
      )}
    </div>
  )
}