"use client";

import React, { useEffect, useRef, useState } from 'react';

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
    { year: '2019-20', waste: 3.47, recycled: 1.4, mismanaged: 2.1 },
    { year: '2020-21', waste: 4.13, recycled: 1.5, mismanaged: 2.6 },
    { year: '2021-22', waste: 3.90, recycled: 1.6, mismanaged: 2.3 },
    { year: '2022-23', waste: 4.14, recycled: 1.6, mismanaged: 2.5 }
  ];

  const productionData = [
    { year: '2013-14', demand: 10 },
    { year: '2014-15', demand: 11 },
    { year: '2015-16', demand: 12 },
    { year: '2016-17', demand: 13 },
    { year: '2017-18', demand: 14 },
    { year: '2018-19', demand: 15 },
    { year: '2019-20', demand: 15.5 },
    { year: '2020-21', demand: 14 },
    { year: '2021-22', demand: 16 },
    { year: '2022-23', demand: 17 }
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
    const duration = 1500;
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [activeDataset]);

  useEffect(() => {
    setAnimationProgress(0);
    let start: number | null = null;
    const duration = 1500;
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [activeDataset]);

  const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(1, `${color}05`);
    return gradient;
  };

  const drawSmoothLine = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], color: string, lineWidth: number = 3) => {
    if (points.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
  };

  const drawCharts = () => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 100;
    
    const textColor = darkMode ? '#e5e7eb' : '#374151';
    const gridColor = darkMode ? '#4b556320' : '#e5e7eb50';
    const bgColor = darkMode ? '#1f2937' : '#ffffff';
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    const currentDataset = datasets[activeDataset];
    const data = currentDataset.data;
    const maxValue = activeDataset === 1 
      ? Math.max(...wasteData.map(d => d.waste))
      : Math.max(...data.map((d: any) => d[currentDataset.key as keyof typeof d] as number));
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    for (let i = 0; i <= 5; i++) {
      const y = padding + i * (height - 2 * padding) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();
    
    const animatedLength = Math.floor(data.length * animationProgress);
    const partialProgress = (data.length * animationProgress) % 1;
    
    const colors = ['#10b981', '#3b82f6', '#f59e0b'];
    
    if (activeDataset === 1) {
      const keys = ['waste', 'recycled', 'mismanaged'] as const;
      const labels = ['Total Waste', 'Recycled', 'Mismanaged'];
      
      keys.forEach((key, idx) => {
        const points: {x: number, y: number}[] = [];
        for (let i = 0; i <= animatedLength; i++) {
          if (i >= data.length) break;
          const d = data[i] as any;
          const x = padding + i * (width - 2 * padding) / (data.length - 1);
          const actualProgress = i < animatedLength ? 1 : partialProgress;
          const val = d[key] as number;
          points.push({
            x,
            y: height - padding - ((val * actualProgress) / maxValue) * (height - 2 * padding)
          });
        }
        
        if (points.length > 1) {
          ctx.fillStyle = createGradient(ctx, colors[idx]);
          ctx.beginPath();
          ctx.moveTo(points[0].x, height - padding);
          points.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.lineTo(points[points.length - 1].x, height - padding);
          ctx.closePath();
          ctx.fill();
          drawSmoothLine(ctx, points, colors[idx], 3);
        }
      });
      
      const legendY = padding + 10;
      const legendX = width - padding - 120;
      labels.forEach((label, i) => {
        ctx.fillStyle = colors[i];
        ctx.fillRect(legendX, legendY + i * 22, 15, 15);
        ctx.fillStyle = textColor;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(label, legendX + 20, legendY + i * 22 + 12);
      });
    } else {
      const points: {x: number, y: number}[] = [];
      for (let i = 0; i <= animatedLength; i++) {
        if (i >= data.length) break;
        const d = data[i] as any;
        const x = padding + i * (width - 2 * padding) / (data.length - 1);
        const actualProgress = i < animatedLength ? 1 : partialProgress;
        const val = d[currentDataset.key as keyof typeof d] as number;
        points.push({
          x,
          y: height - padding - ((val * actualProgress) / maxValue) * (height - 2 * padding)
        });
      }
      
      if (points.length > 1) {
        const color = currentDataset.color || '#10b981';
        ctx.fillStyle = createGradient(ctx, color);
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.closePath();
        ctx.fill();
        drawSmoothLine(ctx, points, color, 4);
      }
      
      points.forEach((point, i) => {
        const color = currentDataset.color || '#10b981';
        const isHovered = hoveredPoint && Math.abs(hoveredPoint.x - point.x) < 20;
        const radius = isHovered ? 8 : 5;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = isHovered ? '#ffffff' : color;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();
        
        if (isHovered && hoveredPoint) {
          ctx.fillStyle = textColor;
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          const val = (data[i] as any)[currentDataset.key as keyof typeof data[0]] as number;
          ctx.fillText(`${val}`, point.x, point.y - 15);
        }
      });
    }
    
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d: any, i: number) => {
      const x = padding + i * (width - 2 * padding) / (data.length - 1);
      ctx.fillText(d.year, x, height - padding + 20);
    });
    
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - i * (height - 2 * padding) / 5;
      const value = (i * maxValue / 5).toFixed(1);
      ctx.fillText(value, padding - 15, y);
    }
    
    ctx.fillStyle = darkMode ? '#f9fafb' : '#111827';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(currentDataset.name, width / 2, 15);
    
    ctx.save();
    ctx.translate(25, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(currentDataset.unit, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    drawCharts();
  }, [darkMode, animationProgress, activeDataset, hoveredPoint]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const data = datasets[activeDataset].data;
    const padding = 100;
    const width = canvas.width;
    const height = canvas.height;
    
    for (let i = 0; i < data.length; i++) {
      const pointX = padding + i * (width - 2 * padding) / (data.length - 1);
      if (Math.abs(x - pointX) < 20) {
        const maxValue = activeDataset === 1 
          ? Math.max(...wasteData.map(d => d.waste))
          : Math.max(...data.map((d: any) => d[datasets[activeDataset].key as keyof typeof d] as number));
        const val = data[i] as any;
        const pointY = height - padding - ((val[datasets[activeDataset].key as keyof typeof val] as number) / maxValue) * (height - 2 * padding);
        setHoveredPoint({ x: pointX, y: pointY, value: val[datasets[activeDataset].key as keyof typeof val] as number, label: val.year });
        return;
      }
    }
    setHoveredPoint(null);
  };

  return (
    <section id="plastic-waste" className="py-25 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="section-title">Plastic Waste in India</h2>
          <p className="section-subtitle">
            Understanding the scale of plastic waste generation and management in India
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4">The Plastic Problem</h3>
            <p className="text-gray-600 mb-4">
              India generates millions of tonnes of plastic waste annually, with a significant portion 
              ending up in the environment due to inadequate recycling infrastructure.
            </p>
            <p className="text-gray-600">
              According to CPCB data, plastic waste generation has increased from 2.9 million tonnes 
              in 2013-14 to 4.14 million tonnes in 2022-23, representing a 43% increase over the decade.
            </p>
          </div>
          
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recycling Challenges</h3>
            <p className="text-gray-600 mb-4">
              While recycling efforts have improved, only about 30-40% of plastic waste is formally recycled. 
              The rest is either mismanaged, burnt, or ends up in landfills and the environment.
            </p>
            <p className="text-gray-600">
              The recycling rate has improved from approximately 30% in 2013-14 to around 40% in recent years, 
              but there's still a long way to go in addressing the plastic waste crisis.
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {datasets.map((ds, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDataset(idx)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeDataset === idx
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white/50 text-gray-600 hover:bg-white/80 hover:scale-102'
                }`}
              >
                {ds.name}
              </button>
            ))}
          </div>
          
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <canvas 
              ref={chartRef} 
              width={1100} 
              height={500}
              className="w-full h-auto transition-all duration-300 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </div>
        </div>
        
        <div className="mt-8 glass-card p-6 transition-all duration-300 hover:scale-[1.005]">
          <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li className="transition-all duration-300 hover:text-primary">Plastic waste generation in India has increased by over 40% in the last decade</li>
            <li className="transition-all duration-300 hover:text-primary">Approximately 60% of plastic waste is still not properly recycled</li>
            <li className="transition-all duration-300 hover:text-primary">Polymer demand continues to rise, indicating increased plastic production</li>
            <li className="transition-all duration-300 hover:text-primary">There's a growing need for better waste management infrastructure and recycling technologies</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PlasticWasteCharts;