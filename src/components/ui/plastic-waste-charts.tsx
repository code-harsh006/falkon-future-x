"use client";

import React, { useEffect, useRef, useState } from 'react';
import { GlassCard } from './glass-card';
import { TrendingUp, BarChart3, PieChart, Layers, Info } from 'lucide-react';

const PlasticWasteCharts = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [activeDataset, setActiveDataset] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{x: number, y: number, value: number, label: string} | null>(null);

  const wasteData = [
    { year: '2013-14', waste: 2.9, recycled: 0.9, mismanaged: 2.0 },
    { year: '2014-15', waste: 3.0, recycled: 1.0, mismanaged: 2.0 },
    { year: '2015-16', waste: 3.1, recycled: 1.1, mismanaged: 2.0 },
    { year: '2016-17', waste: 3.2, recycled: 1.2, mismanaged: 2.0 },
    { year: '2017-18', waste: 3.3, recycled: 1.3, mismanaged: 2.0 },
    { year: '2018-19', waste: 3.36, recycled: 1.35, mismanaged: 2.0 },
    { year: '2019-20', waste: 3.47, recycled: 1.4, mismanaged: 2.07 },
    { year: '2020-21', waste: 4.13, recycled: 1.5, mismanaged: 2.63 },
    { year: '2021-22', waste: 3.90, recycled: 1.6, mismanaged: 2.30 },
    { year: '2022-23', waste: 4.14, recycled: 1.64, mismanaged: 2.50 }
  ];

  const productionData = [
    { year: '2013-14', demand: 10.0 },
    { year: '2014-15', demand: 11.0 },
    { year: '2015-16', demand: 12.0 },
    { year: '2016-17', demand: 13.0 },
    { year: '2017-18', demand: 14.0 },
    { year: '2018-19', demand: 15.0 },
    { year: '2019-20', demand: 15.5 },
    { year: '2020-21', demand: 14.2 },
    { year: '2021-22', demand: 16.0 },
    { year: '2022-23', demand: 17.2 }
  ];

  const datasets = [
    { name: 'Plastic Waste Generated', data: wasteData, key: 'waste', color: '#10b981', unit: 'Million Tonnes' },
    { name: 'Waste vs Recycled vs Mismanaged', data: wasteData, key: 'all', unit: 'Million Tonnes' },
    { name: 'Polymer Demand Trend', data: productionData, key: 'demand', color: '#8b5cf6', unit: 'Million Tonnes' }
  ];

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
    };
    checkDarkMode();
    const observer = new MutationObserver(() => { checkDarkMode(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Cubic ease-out
      setAnimationProgress(eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [activeDataset]);

  const createGradient = (ctx: CanvasRenderingContext2D, color: string, height: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}35`);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  const drawSmoothLine = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], color: string, lineWidth: number = 3.5) => {
    if (points.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
  };

  const drawCharts = () => {
    if (!chartRef.current) return;
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Device Pixel Ratio Scaling for crisp render
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const displayWidth = 1100;
    const displayHeight = 450;
    
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }
    
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const width = displayWidth;
    const height = displayHeight;
    const paddingLeft = 70;
    const paddingRight = 40;
    const paddingTop = 60;
    const paddingBottom = 60;
    
    const textColor = darkMode ? '#94a3b8' : '#64748b'; // Slate 400 vs Slate 500
    const gridColor = darkMode ? 'rgba(148, 163, 184, 0.07)' : 'rgba(100, 116, 139, 0.07)';
    const fontStack = '500 12px Inter, system-ui, sans-serif';
    
    const currentDataset = datasets[activeDataset];
    const data = currentDataset.data;
    
    // Find Max Value
    let maxValue = 0;
    if (activeDataset === 1) {
      maxValue = Math.max(...wasteData.map(d => d.waste));
    } else {
      maxValue = Math.max(...data.map((d: any) => d[currentDataset.key as keyof typeof d] as number));
    }
    // Round max value up for cleaner grid lines
    maxValue = Math.ceil(maxValue * 1.15);

    // Draw Grid Lines (Horizontal)
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.font = fontStack;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const gridLinesCount = 5;
    for (let i = 0; i <= gridLinesCount; i++) {
      const y = paddingTop + i * (height - paddingTop - paddingBottom) / gridLinesCount;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();

      // Labels
      const gridVal = (maxValue - (i * maxValue / gridLinesCount)).toFixed(1);
      ctx.fillText(gridVal, paddingLeft - 15, y);
    }

    const animatedLength = Math.floor(data.length * animationProgress);
    const partialProgress = (data.length * animationProgress) % 1;
    
    const colors = ['#10b981', '#3b82f6', '#f59e0b']; // Emerald, Blue, Orange

    if (activeDataset === 1) {
      // Multiple lines (Waste vs Recycled vs Mismanaged)
      const keys = ['waste', 'recycled', 'mismanaged'] as const;
      
      keys.forEach((key, idx) => {
        const points: {x: number, y: number}[] = [];
        
        for (let i = 0; i <= animatedLength; i++) {
          if (i >= data.length) break;
          const d = data[i] as any;
          const x = paddingLeft + i * (width - paddingLeft - paddingRight) / (data.length - 1);
          const actualProgress = i < animatedLength ? 1 : partialProgress;
          const val = d[key] as number;
          points.push({
            x,
            y: height - paddingBottom - ((val * actualProgress) / maxValue) * (height - paddingTop - paddingBottom)
          });
        }
        
        if (points.length > 1) {
          // Fill gradient under curve
          ctx.fillStyle = createGradient(ctx, colors[idx], height - paddingBottom);
          ctx.beginPath();
          ctx.moveTo(points[0].x, height - paddingBottom);
          points.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
          ctx.closePath();
          ctx.fill();

          // Draw main curve line
          drawSmoothLine(ctx, points, colors[idx], 3);
        }

        // Draw points and hover states
        points.forEach((point, i) => {
          const isHovered = hoveredPoint && Math.abs(hoveredPoint.x - point.x) < 15;
          const radius = isHovered ? 6 : 4;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? '#ffffff' : colors[idx];
          ctx.fill();
          ctx.strokeStyle = colors[idx];
          ctx.lineWidth = 2.5;
          ctx.stroke();
        });
      });
    } else {
      // Single line
      const points: {x: number, y: number}[] = [];
      const color = currentDataset.color || '#10b981';

      for (let i = 0; i <= animatedLength; i++) {
        if (i >= data.length) break;
        const d = data[i] as any;
        const x = paddingLeft + i * (width - paddingLeft - paddingRight) / (data.length - 1);
        const actualProgress = i < animatedLength ? 1 : partialProgress;
        const val = d[currentDataset.key as keyof typeof d] as number;
        points.push({
          x,
          y: height - paddingBottom - ((val * actualProgress) / maxValue) * (height - paddingTop - paddingBottom)
        });
      }

      if (points.length > 1) {
        // Fill area
        ctx.fillStyle = createGradient(ctx, color, height - paddingBottom);
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - paddingBottom);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
        ctx.closePath();
        ctx.fill();

        // Draw line
        drawSmoothLine(ctx, points, color, 3.5);
      }

      // Draw points
      points.forEach((point, i) => {
        const isHovered = hoveredPoint && Math.abs(hoveredPoint.x - point.x) < 15;
        const radius = isHovered ? 7 : 4.5;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isHovered ? '#ffffff' : color;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 3.5 : 2;
        ctx.stroke();

        // Tooltip hover details on canvas
        if (isHovered && hoveredPoint) {
          ctx.fillStyle = darkMode ? '#ffffff' : '#0f172a';
          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.textAlign = 'center';
          const val = (data[i] as any)[currentDataset.key as keyof typeof data[0]] as number;
          ctx.fillText(`${val} ${currentDataset.unit === 'Million Tonnes' ? 'MT' : ''}`, point.x, point.y - 18);
        }
      });
    }

    // Draw X Axis labels
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = fontStack;

    data.forEach((d: any, i: number) => {
      const x = paddingLeft + i * (width - paddingLeft - paddingRight) / (data.length - 1);
      ctx.fillText(d.year, x, height - paddingBottom + 16);
    });

    // Draw Chart Title
    ctx.fillStyle = darkMode ? '#f8fafc' : '#0f172a';
    ctx.font = 'bold 16px Poppins, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(currentDataset.name, paddingLeft, 15);
  };

  useEffect(() => {
    drawCharts();
  }, [darkMode, animationProgress, activeDataset, hoveredPoint]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    
    // Translate mouse coordinates to local logical scale coordinates
    const scaleX = canvas.width / rect.width;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const localX = (event.clientX - rect.left) * (scaleX / dpr);
    
    const data = datasets[activeDataset].data;
    const paddingLeft = 70;
    const paddingRight = 40;
    const width = 1100;
    const height = 450;
    const paddingTop = 60;
    const paddingBottom = 60;
    
    for (let i = 0; i < data.length; i++) {
      const pointX = paddingLeft + i * (width - paddingLeft - paddingRight) / (data.length - 1);
      if (Math.abs(localX - pointX) < 25) {
        let maxValue = 0;
        if (activeDataset === 1) {
          maxValue = Math.max(...wasteData.map(d => d.waste));
        } else {
          maxValue = Math.max(...data.map((d: any) => d[datasets[activeDataset].key as keyof typeof d] as number));
        }
        maxValue = Math.ceil(maxValue * 1.15);

        const val = data[i] as any;
        const key = datasets[activeDataset].key;
        const targetVal = key === 'all' ? val.waste : val[key];
        const pointY = height - paddingBottom - (targetVal / maxValue) * (height - paddingTop - paddingBottom);
        
        setHoveredPoint({
          x: pointX,
          y: pointY,
          value: targetVal,
          label: val.year
        });
        return;
      }
    }
    setHoveredPoint(null);
  };

  return (
    <section id="plastic-waste" className="section-py relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30">
      <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">Macro Industry Data</span>
            <h2 className="section-title">Plastic Waste Metrics in India</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Analyzing the scale of plastic waste generation, recycling trends, and polymer demand in urban ecosystems.
            </p>
          </div>

          {/* Dataset Toggles */}
          <div className="flex flex-wrap gap-2">
            {datasets.map((ds, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDataset(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-200 ${
                  activeDataset === idx
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10 scale-102'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                }`}
              >
                {ds.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Chart Card */}
        <GlassCard className="bg-white/80 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl shadow-sm mb-10 overflow-hidden relative">
          <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[10px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-emerald-500" />
            <span>Interactive Chart: Hover to audit points</span>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] w-full">
              <canvas 
                ref={chartRef} 
                className="w-full h-auto cursor-crosshair"
                style={{ height: '420px', display: 'block' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </div>
          </div>

          {/* Legend for multiple datasets */}
          {activeDataset === 1 && (
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-900 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Total Waste Generated
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" /> Formally Recycled
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" /> Mismanaged Waste
              </span>
            </div>
          )}
        </GlassCard>

        {/* Insight Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-950/40 border border-slate-250/50 dark:border-slate-850 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Waste Volumes Escalating</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
              India generates over 4.1 million tonnes of plastic waste annually. Volumes have grown by 43% since 2013, driven by single-use packaging consumption.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-950/40 border border-slate-250/50 dark:border-slate-850 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <PieChart className="w-4 h-4 text-blue-500" />
              <span>Low Formal Recycling Uptime</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
              Only 35–40% of municipal plastic is formally collected and certified-recycled. The rest leaks into municipal drainage, waterways, and landfill sites.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950/40 border border-slate-250/50 dark:border-slate-850 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Rising Polymer Demand</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
              Virgin polymer demand rises at a 7% CAGR, creating immense regulatory urgency for Extended Producer Responsibility (EPR) offsetting.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlasticWasteCharts;