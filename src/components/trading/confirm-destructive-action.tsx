import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface ConfirmDestructiveActionProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning"
  className?: string
}

export function ConfirmDestructiveAction({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  className,
}: ConfirmDestructiveActionProps) {
  const [confirmationText, setConfirmationText] = React.useState("")
  const [isConfirmed, setIsConfirmed] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setConfirmationText("")
      setIsConfirmed(false)
    }
  }, [isOpen])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div
        className={cn(
          "relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-ink-300 overflow-hidden",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-ink-300">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                variant === "danger" ? "bg-down-bg" : "bg-warn-bg"
              )}
            >
              <AlertTriangle
                className={cn(
                  "w-5 h-5",
                  variant === "danger" ? "text-down" : "text-warn"
                )}
              />
            </div>
            <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-ink-500 hover:text-ink-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-ink-700 mb-4">{description}</p>

          <div className="mb-4">
            <label className="block text-xs font-medium text-ink-500 uppercase tracking-wider mb-1.5">
              Type "CONFIRM" to proceed
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => {
                setConfirmationText(e.target.value)
                setIsConfirmed(e.target.value === "CONFIRM")
              }}
              className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
              placeholder="CONFIRM"
            />
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-ink-300 bg-ink-100/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className={cn(
              "flex-1",
              variant === "danger"
                ? "bg-down hover:bg-down/90 text-white"
                : "bg-warn hover:bg-warn/90 text-white"
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}