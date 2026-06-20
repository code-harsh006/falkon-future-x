import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, AlertCircle } from "lucide-react"

interface OrderTicketProps {
  projectName: string
  currentPrice: number
  availableBalance: number
  platformFeePercent?: number
  onSubmit: (order: OrderDetails) => void
  onCancel?: () => void
  mode?: "buy" | "sell"
  variant?: "panel" | "bottom-sheet"
  className?: string
}

interface OrderDetails {
  side: "buy" | "sell"
  quantity: number
  price: number
  orderType: "market" | "limit"
}

export function OrderTicket({
  projectName,
  currentPrice,
  availableBalance,
  platformFeePercent = 1.5,
  onSubmit,
  onCancel,
  mode = "buy",
  variant = "panel",
  className,
}: OrderTicketProps) {
  const [quantity, setQuantity] = React.useState(1)
  const [price, setPrice] = React.useState(currentPrice)
  const [orderType, setOrderType] = React.useState<"market" | "limit">("market")

  const estimatedTotal = quantity * price
  const platformFee = estimatedTotal * (platformFeePercent / 100)
  const totalWithFee = estimatedTotal + platformFee
  const isInsufficientBalance = mode === "buy" && totalWithFee > availableBalance

  React.useEffect(() => {
    if (orderType === "market") {
      setPrice(currentPrice)
    }
  }, [orderType, currentPrice])

  const handleSubmit = () => {
    if (isInsufficientBalance) return
    onSubmit({
      side: mode,
      quantity,
      price,
      orderType,
    })
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)

  if (variant === "bottom-sheet") {
    return (
      <div className={cn("bg-white rounded-t-2xl p-4 pb-8", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink-900">
            {mode === "buy" ? "Buy" : "Sell"}: {projectName}
          </h3>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <OrderForm
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setPrice={setPrice}
          orderType={orderType}
          setOrderType={setOrderType}
          currentPrice={currentPrice}
          estimatedTotal={estimatedTotal}
          platformFee={platformFee}
          totalWithFee={totalWithFee}
          availableBalance={availableBalance}
          isInsufficientBalance={isInsufficientBalance}
          mode={mode}
          onSubmit={handleSubmit}
          formatCurrency={formatCurrency}
        />
      </div>
    )
  }

  return (
    <div className={cn("bg-white border border-ink-300 rounded-lg p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-ink-900">
          {mode === "buy" ? "Buy" : "Sell"}: {projectName}
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <OrderForm
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
        orderType={orderType}
        setOrderType={setOrderType}
        currentPrice={currentPrice}
        estimatedTotal={estimatedTotal}
        platformFee={platformFee}
        totalWithFee={totalWithFee}
        availableBalance={availableBalance}
        isInsufficientBalance={isInsufficientBalance}
        mode={mode}
        onSubmit={handleSubmit}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

function OrderForm({
  quantity,
  setQuantity,
  price,
  setPrice,
  orderType,
  setOrderType,
  currentPrice,
  estimatedTotal,
  platformFee,
  totalWithFee,
  availableBalance,
  isInsufficientBalance,
  mode,
  onSubmit,
  formatCurrency,
}: {
  quantity: number
  setQuantity: (v: number) => void
  price: number
  setPrice: (v: number) => void
  orderType: "market" | "limit"
  setOrderType: (v: "market" | "limit") => void
  currentPrice: number
  estimatedTotal: number
  platformFee: number
  totalWithFee: number
  availableBalance: number
  isInsufficientBalance: boolean
  mode: "buy" | "sell"
  onSubmit: () => void
  formatCurrency: (v: number) => string
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
          Quantity (tCO2e)
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm font-medium text-ink-900 tabular focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">
          Price per tCO2e
        </label>
        <input
          type="number"
          inputMode="decimal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          disabled={orderType === "market"}
          step={0.01}
          className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm font-medium text-ink-900 tabular focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 disabled:opacity-50"
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant={orderType === "market" ? "default" : "outline"}
          size="sm"
          onClick={() => setOrderType("market")}
          className="flex-1"
        >
          Market
        </Button>
        <Button
          variant={orderType === "limit" ? "default" : "outline"}
          size="sm"
          onClick={() => setOrderType("limit")}
          className="flex-1"
        >
          Limit
        </Button>
      </div>

      <div className="border-t border-ink-300 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-ink-500">Estimated Total</span>
          <span className="font-medium text-ink-900 tabular">
            {formatCurrency(estimatedTotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-500">Platform Fee (1.5%)</span>
          <span className="font-medium text-ink-900 tabular">
            {formatCurrency(platformFee)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-ink-300 pt-2">
          <span className="text-ink-900">Total</span>
          <span className="text-ink-900 tabular">{formatCurrency(totalWithFee)}</span>
        </div>
      </div>

      <div className="border-t border-ink-300 pt-4">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-ink-500">Available Balance</span>
          <span className="font-medium text-ink-900 tabular">
            {formatCurrency(availableBalance)}
          </span>
        </div>

        {isInsufficientBalance && (
          <div className="flex items-center gap-2 text-down text-sm mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>Insufficient balance for this order</span>
          </div>
        )}

        <Button
          onClick={onSubmit}
          disabled={isInsufficientBalance}
          className={cn(
            "w-full",
            mode === "buy" ? "bg-brand-500 hover:bg-brand-600" : "bg-down hover:bg-down/90"
          )}
        >
          {mode === "buy" ? "Confirm Buy Order" : "Confirm Sell Order"}
        </Button>
      </div>
    </div>
  )
}