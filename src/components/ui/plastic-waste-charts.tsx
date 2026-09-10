"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  { name: 'Plastic waste generated', data: wasteData, key: 'waste', color: '#0f0f0f', unit: 'Million Tonnes' },
  { name: 'Generated vs recycled vs mismanaged', data: wasteData, key: 'all', unit: 'Million Tonnes' },
  { name: 'Polymer demand trend', data: productionData, key: 'demand', color: '#0f0f0f', unit: 'Million Tonnes' }
];

// Neutral + single accent palette (Rivet style)
const seriesColors = ['#0f0f0f', '#8a8a85', '#1f9d55'];

const PlasticWasteCharts = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [activeDataset, setActiveDataset] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; label: string } | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1000;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimationProgress(eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [activeDataset]);

  const createGradient = (ctx: CanvasRenderingContext2D, color: string, height: number) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}1f`);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  };

  const drawSmoothLine = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], color: string, lineWidth = 2.5) => {
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

  const drawCharts = useCallback(() => {
    if (!chartRef.current) return;
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const displayWidth = 1100;
    const displayHeight = 440;
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const width = displayWidth;
    const height = displayHeight;
    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 50;
    const paddingBottom = 50;

    const textColor = '#8a8a85';
    const gridColor = 'rgba(15,15,15,0.06)';
    const fontStack = '500 12px Inter, system-ui, sans-serif';

    const currentDataset = datasets[activeDataset];
    const data = currentDataset.data;

    let maxValue = 0;
    if (activeDataset === 1) {
      maxValue = Math.max(...wasteData.map((d) => d.waste));
    } else {
      maxValue = Math.max(...data.map((d: any) => d[currentDataset.key as keyof typeof d] as number));
    }
    maxValue = Math.ceil(maxValue * 1.15);

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.font = fontStack;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const gridLinesCount = 5;
    for (let i = 0; i <= gridLinesCount; i++) {
      const y = paddingTop + (i * (height - paddingTop - paddingBottom)) / gridLinesCount;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();
      const gridVal = (maxValue - (i * maxValue) / gridLinesCount).toFixed(1);
      ctx.fillText(gridVal, paddingLeft - 12, y);
    }

    const animatedLength = Math.floor(data.length * animationProgress);
    const partialProgress = (data.length * animationProgress) % 1;

    if (activeDataset === 1) {
      const keys = ['waste', 'recycled', 'mismanaged'] as const;
      keys.forEach((key, idx) => {
        const points: { x: number; y: number }[] = [];
        for (let i = 0; i <= animatedLength; i++) {
          if (i >= data.length) break;
          const d = data[i] as any;
          const x = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (data.length - 1);
          const actualProgress = i < animatedLength ? 1 : partialProgress;
          const val = d[key] as number;
          points.push({ x, y: height - paddingBottom - ((val * actualProgress) / maxValue) * (height - paddingTop - paddingBottom) });
        }
        if (points.length > 1) {
          ctx.fillStyle = createGradient(ctx, seriesColors[idx], height - paddingBottom);
          ctx.beginPath();
          ctx.moveTo(points[0].x, height - paddingBottom);
          points.forEach((p) => ctx.lineTo(p.x, p.y));
          ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
          ctx.closePath();
          ctx.fill();
          drawSmoothLine(ctx, points, seriesColors[idx], 2.5);
        }
        points.forEach((point) => {
          const isHovered = hoveredPoint && Math.abs(hoveredPoint.x - point.x) < 15;
          const radius = isHovered ? 5 : 3;
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? '#ffffff' : seriesColors[idx];
          ctx.fill();
          ctx.strokeStyle = seriesColors[idx];
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      });
    } else {
      const points: { x: number; y: number }[] = [];
      const color = currentDataset.color || '#0f0f0f';
      for (let i = 0; i <= animatedLength; i++) {
        if (i >= data.length) break;
        const d = data[i] as any;
        const x = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (data.length - 1);
        const actualProgress = i < animatedLength ? 1 : partialProgress;
        const val = d[currentDataset.key as keyof typeof d] as number;
        points.push({ x, y: height - paddingBottom - ((val * actualProgress) / maxValue) * (height - paddingTop - paddingBottom) });
      }
      if (points.length > 1) {
        ctx.fillStyle = createGradient(ctx, color, height - paddingBottom);
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - paddingBottom);
        points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
        ctx.closePath();
        ctx.fill();
        drawSmoothLine(ctx, points, color, 2.5);
      }
      points.forEach((point, i) => {
        const isHovered = hoveredPoint && Math.abs(hoveredPoint.x - point.x) < 15;
        const radius = isHovered ? 6 : 3.5;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isHovered ? '#ffffff' : color;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
        if (isHovered && hoveredPoint) {
          ctx.fillStyle = '#0f0f0f';
          ctx.font = '600 12px Inter, sans-serif';
          ctx.textAlign = 'center';
          const val = (data[i] as any)[currentDataset.key as keyof (typeof data)[0]] as number;
          ctx.fillText(`${val} MT`, point.x, point.y - 16);
        }
      });
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = fontStack;
    data.forEach((d: any, i: number) => {
      const x = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (data.length - 1);
      ctx.fillText(d.year, x, height - paddingBottom + 14);
    });

    ctx.fillStyle = '#0f0f0f';
    ctx.font = '600 15px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(currentDataset.name, paddingLeft, 14);
  }, [animationProgress, activeDataset, hoveredPoint]);

  useEffect(() => {
    drawCharts();
  }, [drawCharts]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const localX = (event.clientX - rect.left) * (scaleX / dpr);

    const data = datasets[activeDataset].data;
    const paddingLeft = 60;
    const paddingRight = 30;
    const width = 1100;
    const height = 440;
    const paddingTop = 50;
    const paddingBottom = 50;

    for (let i = 0; i < data.length; i++) {
      const pointX = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (data.length - 1);
      if (Math.abs(localX - pointX) < 25) {
        let maxValue = 0;
        if (activeDataset === 1) {
          maxValue = Math.max(...wasteData.map((d) => d.waste));
        } else {
          maxValue = Math.max(...data.map((d: any) => d[datasets[activeDataset].key as keyof typeof d] as number));
        }
        maxValue = Math.ceil(maxValue * 1.15);
        const val = data[i] as any;
        const key = datasets[activeDataset].key;
        const targetVal = key === 'all' ? val.waste : val[key];
        const pointY = height - paddingBottom - (targetVal / maxValue) * (height - paddingTop - paddingBottom);
        setHoveredPoint({ x: pointX, y: pointY, value: targetVal, label: val.year });
        return;
      }
    }
    setHoveredPoint(null);
  };

  const insights = [
    { title: 'Waste volumes rising', body: 'India generates over 4.1 million tonnes of plastic waste annually — up roughly 43% since 2013, driven by single-use packaging.', source: 'CPCB, 2022–23' },
    { title: 'Low formal recycling', body: 'Only 35–40% of municipal plastic is formally collected and certified-recycled; the rest leaks into drains, waterways, and landfill.', source: 'CPCB estimate' },
    { title: 'Rising polymer demand', body: 'Virgin polymer demand grows at roughly 7% a year, raising the regulatory urgency for Extended Producer Responsibility.', source: 'Industry estimate' },
  ];

  return (
    <section id="data" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="eyebrow">The problem, in numbers</span>
            <h2 className="section-title mt-4">Plastic waste in India.</h2>
            <p className="lead mt-5">
              The scale of generation, recycling, and polymer demand — the gap our
              infrastructure is built to close.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {datasets.map((ds, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDataset(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  activeDataset === idx
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-600 border-[hsl(var(--border))] hover:border-neutral-400'
                }`}
              >
                {ds.name}
              </button>
            ))}
          </div>
        </div>

        <div className="panel p-6 overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[720px] w-full">
              <canvas
                ref={chartRef}
                className="w-full h-auto cursor-crosshair"
                style={{ height: '400px', display: 'block' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </div>
          </div>

          {activeDataset === 1 && (
            <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-[hsl(var(--border))] text-xs font-medium text-neutral-500">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0f0f0f]" /> Total waste generated</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#8a8a85]" /> Formally recycled</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#1f9d55]" /> Mismanaged</span>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((ins) => (
            <div key={ins.title} className="panel p-5">
              <h3 className="text-sm font-semibold text-neutral-900">{ins.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed text-pretty">{ins.body}</p>
              <p className="mt-3 text-xs text-neutral-400">Source: {ins.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlasticWasteCharts;
