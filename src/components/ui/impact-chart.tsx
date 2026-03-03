"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Recycle, Trash2 } from "lucide-react"
import { GlassCard, GlassCardHeader, GlassCardContent, GlassCardFooter } from "@/components/ui/glass-card"

const chartData = [
  { year: "2013-14", waste: 2.9, recycled: 0.9, mismanaged: 2.0 },
  { year: "2014-15", waste: 3.0, recycled: 1.0, mismanaged: 2.0 },
  { year: "2015-16", waste: 3.1, recycled: 1.1, mismanaged: 2.0 },
  { year: "2016-17", waste: 3.2, recycled: 1.2, mismanaged: 2.0 },
  { year: "2017-18", waste: 3.3, recycled: 1.3, mismanaged: 2.0 },
  { year: "2018-19", waste: 3.36, recycled: 1.35, mismanaged: 2.0 },
  { year: "2019-20", waste: 3.47, recycled: 1.4, mismanaged: 2.1 },
  { year: "2020-21", waste: 4.13, recycled: 1.5, mismanaged: 2.6 },
  { year: "2021-22", waste: 3.90, recycled: 1.6, mismanaged: 2.3 },
  { year: "2022-23", waste: 4.14, recycled: 1.6, mismanaged: 2.5 },
]

export function ImpactChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animated, setAnimated] = useState(false)
  
  const totalGrowth = ((chartData[chartData.length - 1].waste - chartData[0].waste) / chartData[0].waste * 100).toFixed(1)
  const totalRecycledGrowth = ((chartData[chartData.length - 1].recycled - chartData[0].recycled) / chartData[0].recycled * 100).toFixed(1)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = { top: 40, right: 30, bottom: 60, left: 60 }
    const barWidth = 35
    const barGap = 15
    
    ctx.clearRect(0, 0, width, height)
    
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, width, height)
    
    const maxValue = 5
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
      
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px system-ui"
      ctx.textAlign = "right"
      ctx.fillText((i).toString(), padding.left - 10, y + 4)
    }
    
    const progress = animated ? 1 : 0
    
    chartData.forEach((data, index) => {
      const x = padding.left + (index * (barWidth + barGap)) + barGap
      const barHeight = (data.waste / maxValue) * chartHeight * progress
      
      const gradient = ctx.createLinearGradient(0, padding.top + chartHeight - barHeight, 0, padding.top + chartHeight)
      gradient.addColorStop(0, "#dc2626")
      gradient.addColorStop(1, "#ef4444")
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, padding.top + chartHeight - barHeight, barWidth, barHeight, [6, 6, 0, 0])
      ctx.fill()
      
      if (progress > 0.5) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 11px system-ui"
        ctx.textAlign = "center"
        ctx.fillText(data.waste.toString(), x + barWidth / 2, padding.top + chartHeight - barHeight - 8)
      }
      
      ctx.fillStyle = "#374151"
      ctx.font = "10px system-ui"
      ctx.textAlign = "center"
      const yearLabel = data.year.replace("-", "\n")
      const lines = yearLabel.split("\n")
      lines.forEach((line, i) => {
        ctx.fillText(line, x + barWidth / 2, height - padding.bottom + 15 + (i * 12))
      })
    })
    
    ctx.fillStyle = "#111827"
    ctx.font = "bold 16px system-ui"
    ctx.textAlign = "center"
    ctx.fillText("Plastic Waste Growth in India (Million Tonnes)", width / 2, 24)
    
  }, [animated])

  return (
    <GlassCard className="shadow-xl bg-gradient-to-br from-white to-green-50/50 overflow-hidden">
      <GlassCardHeader className="pb-2">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Recycle className="h-6 w-6 text-green-600" />
          Plastic Waste Impact
        </h3>
        <p className="text-gray-600 text-base">
          Waste generation trend 2013-14 to 2022-23
        </p>
      </GlassCardHeader>
      <GlassCardContent className="pt-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={280}
          className="w-full h-auto"
        />
      </GlassCardContent>
      <GlassCardFooter className="flex-col items-start gap-4 text-sm pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-red-600 font-medium">Total Waste</p>
              <p className="text-2xl font-bold text-red-700">34.3 MT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
            <div className="p-2 bg-green-100 rounded-full">
              <Recycle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Total Recycled</p>
              <p className="text-2xl font-bold text-green-700">13.7 MT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
            <div className="p-2 bg-amber-100 rounded-full">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-600 font-medium">Growth Rate</p>
              <p className="text-2xl font-bold text-amber-700">+{totalGrowth}%</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 leading-none font-medium text-green-700 bg-green-100 px-3 py-2 rounded-lg w-full">
          <TrendingUp className="h-4 w-4" />
          <span>Recycling improved by {totalRecycledGrowth}% over the decade</span>
        </div>
      </GlassCardFooter>
    </GlassCard>
  )
}
