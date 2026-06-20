import * as React from "react"
import { cn } from "@/lib/utils"

type Status = 
  | "filled" 
  | "pending" 
  | "standing" 
  | "cancelled" 
  | "approved" 
  | "rejected"
  | "under_review"
  | "active"
  | "inactive"

interface StatusPillProps {
  status: Status
  size?: "sm" | "md" | "lg"
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  filled: {
    label: "Filled",
    className: "bg-up-bg text-up",
  },
  pending: {
    label: "Pending",
    className: "bg-warn-bg text-warn",
  },
  standing: {
    label: "Standing",
    className: "bg-info-bg text-info",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-down-bg text-down",
  },
  approved: {
    label: "Approved",
    className: "bg-up-bg text-up",
  },
  rejected: {
    label: "Rejected",
    className: "bg-down-bg text-down",
  },
  under_review: {
    label: "Under Review",
    className: "bg-warn-bg text-warn",
  },
  active: {
    label: "Active",
    className: "bg-up-bg text-up",
  },
  inactive: {
    label: "Inactive",
    className: "bg-ink-100 text-ink-500",
  },
}

export function StatusPill({
  status,
  size = "md",
  className,
}: StatusPillProps) {
  const config = statusConfig[status]

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-medium",
        sizeClasses[size],
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}