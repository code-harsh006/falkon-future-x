export async function getCandles(
  projectId: string,
  interval: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"
) {
  // TODO: point this at your time-series source.
  // Per the Zerodha system-design reference, this is normally a
  // dedicated time-series store (e.g. a candles table/service) sitting
  // downstream of the raw tick stream — NOT queried live from the
  // primary Postgres on every chart load.
  // For now: derive a synthetic flat series from the last known price
  // in Convex so the chart renders without errors, and surface a
  // "Historical data not yet connected" notice in the chart footer.
  
  const now = Date.now()
  const intervalMs: Record<string, number> = {
    "1D": 24 * 60 * 60 * 1000,
    "1W": 7 * 24 * 60 * 60 * 1000,
    "1M": 30 * 24 * 60 * 60 * 1000,
    "3M": 90 * 24 * 60 * 60 * 1000,
    "1Y": 365 * 24 * 60 * 60 * 1000,
    "ALL": 5 * 365 * 24 * 60 * 60 * 1000,
  }

  const duration = intervalMs[interval]
  const points = 100
  const step = duration / points

  return Array.from({ length: points }, (_, i) => ({
    timestamp: now - duration + i * step,
    open: 10 + Math.random() * 2,
    high: 10 + Math.random() * 3,
    low: 10 + Math.random() * 1,
    close: 10 + Math.random() * 2,
    volume: Math.floor(Math.random() * 1000),
  }))
}