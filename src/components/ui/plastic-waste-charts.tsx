"use client";

import React, { useEffect, useRef, useState } from 'react';

const PlasticWasteCharts = () => {
  const chart1Ref = useRef<HTMLCanvasElement>(null);
  const chart2Ref = useRef<HTMLCanvasElement>(null);
  const chart3Ref = useRef<HTMLCanvasElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{chart: number, point: number} | null>(null);

  // Data from the provided information
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

  // Check for dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
    };

    checkDarkMode();
    
    // Listen for changes in theme
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Animate charts on load
  useEffect(() => {
    let start: number | null = null;
    const duration = 1000; // Animation duration in ms
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Redraw charts when dark mode or animation progress changes
  useEffect(() => {
    drawCharts();
  }, [darkMode, animationProgress, hoveredPoint]);

  // Helper function to create gradient
  const createGradient = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color1: string, color2: string) => {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  // Helper function to draw smooth line
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

  // Helper function to draw area under line
  const drawAreaUnderLine = (ctx: CanvasRenderingContext2D, points: {x: number, y: number}[], gradient: CanvasGradient, bottomY: number) => {
    if (points.length < 2) return;
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, bottomY);
    
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    
    ctx.lineTo(points[points.length - 1].x, bottomY);
    ctx.closePath();
    ctx.fill();
  };

  // Mouse event handlers for interactive charts
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>, chartIndex: number) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate which data point is closest
    const padding = 80;
    const width = canvas.width;
    const height = canvas.height;
    
    let closestPoint = -1;
    let minDistance = Infinity;
    
    const dataLength = chartIndex === 3 ? productionData.length : wasteData.length;
    
    for (let i = 0; i < dataLength; i++) {
      const pointX = padding + i * (width - 2 * padding) / (dataLength - 1);
      const distance = Math.abs(x - pointX);
      
      if (distance < minDistance && distance < 30) { // 30px tolerance
        minDistance = distance;
        closestPoint = i;
      }
    }
    
    if (closestPoint !== -1) {
      setHoveredPoint({chart: chartIndex, point: closestPoint});
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const drawCharts = () => {
    // Chart 1: Plastic Waste Generated (2013–2023) - Line Chart
    if (chart1Ref.current) {
      const ctx = chart1Ref.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Chart dimensions
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 80;
        
        // Colors based on theme
        const textColor = darkMode ? '#e5e7eb' : '#374151';
        const gridColor = darkMode ? '#4b5563' : '#e5e7eb';
        const bgColor = darkMode ? '#1f2937' : '#ffffff';
        const primaryColor = '#10b981';
        const primaryGradient = darkMode ? '#047857' : '#059669';
        
        // Find max value for scaling
        const maxValue = Math.max(...wasteData.map(d => d.waste));
        
        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid with subtle lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);
        
        // Draw Y axis grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + i * (height - 2 * padding) / 5;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw axes
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 2;
        
        // Draw X axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw Y axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Calculate points for the line
        const animatedDataLength = Math.floor(wasteData.length * animationProgress);
        const partialProgress = (wasteData.length * animationProgress) % 1;
        const points: {x: number, y: number}[] = [];
        
        for (let i = 0; i <= animatedDataLength; i++) {
          if (i >= wasteData.length) break;
          
          const d = wasteData[i];
          const x = padding + i * (width - 2 * padding) / (wasteData.length - 1);
          const actualProgress = i < animatedDataLength ? 1 : partialProgress;
          const y = height - padding - ((d.waste * actualProgress) / maxValue) * (height - 2 * padding);
          points.push({x, y});
        }
        
        // Draw area under the line
        if (points.length > 1) {
          const gradient = createGradient(ctx, 0, padding, 0, height - padding, 
            `${primaryColor}40`, `${primaryColor}10`);
          drawAreaUnderLine(ctx, points, gradient, height - padding);
        }
        
        // Draw the line
        if (points.length > 1) {
          drawSmoothLine(ctx, points, primaryColor, 4);
        }
        
        // Draw data points
        points.forEach((point, i) => {
          const isHovered = hoveredPoint?.chart === 1 && hoveredPoint?.point === i;
          const radius = isHovered ? 8 : 5;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? '#ffffff' : primaryColor;
          ctx.fill();
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = isHovered ? 3 : 2;
          ctx.stroke();
          
          // Draw value on hover
          if (isHovered) {
            ctx.fillStyle = textColor;
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${wasteData[i].waste}M`, point.x, point.y - 15);
          }
        });
        
        // X axis labels
        ctx.fillStyle = textColor;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        wasteData.forEach((d, i) => {
          const x = padding + i * (width - 2 * padding) / (wasteData.length - 1);
          ctx.fillText(d.year, x, height - padding + 20);
        });
        
        // Y axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= 5; i++) {
          const y = height - padding - i * (height - 2 * padding) / 5;
          const value = (i * maxValue / 5).toFixed(1);
          ctx.fillText(value, padding - 15, y);
        }
        
        // Draw title
        ctx.fillStyle = darkMode ? '#f9fafb' : '#111827';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Plastic Waste Generated (2013-2023)', width / 2, 15);
        
        // Draw Y axis label
        ctx.save();
        ctx.translate(25, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Million Tonnes', 0, 0);
        ctx.restore();
      }
    }
    
    // Chart 2: Waste vs Recycled vs Mismanaged - Multi-Line Chart
    if (chart2Ref.current) {
      const ctx = chart2Ref.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Chart dimensions
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 80;
        
        // Colors based on theme
        const textColor = darkMode ? '#e5e7eb' : '#374151';
        const gridColor = darkMode ? '#4b5563' : '#e5e7eb';
        const bgColor = darkMode ? '#1f2937' : '#ffffff';
        
        // Line colors
        const wasteColor = '#10b981';
        const recycledColor = '#3b82f6';
        const mismanagedColor = '#f59e0b';
        
        // Find max value for scaling
        const maxValue = Math.max(...wasteData.map(d => Math.max(d.waste, d.recycled, d.mismanaged)));
        
        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid with subtle lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);
        
        // Draw Y axis grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + i * (height - 2 * padding) / 5;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw axes
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 2;
        
        // Draw X axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw Y axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Calculate points for each line
        const animatedDataLength = Math.floor(wasteData.length * animationProgress);
        const partialProgress = (wasteData.length * animationProgress) % 1;
        
        const wastePoints: {x: number, y: number}[] = [];
        const recycledPoints: {x: number, y: number}[] = [];
        const mismanagedPoints: {x: number, y: number}[] = [];
        
        for (let i = 0; i <= animatedDataLength; i++) {
          if (i >= wasteData.length) break;
          
          const d = wasteData[i];
          const x = padding + i * (width - 2 * padding) / (wasteData.length - 1);
          const actualProgress = i < animatedDataLength ? 1 : partialProgress;
          
          wastePoints.push({
            x,
            y: height - padding - ((d.waste * actualProgress) / maxValue) * (height - 2 * padding)
          });
          
          recycledPoints.push({
            x,
            y: height - padding - ((d.recycled * actualProgress) / maxValue) * (height - 2 * padding)
          });
          
          mismanagedPoints.push({
            x,
            y: height - padding - ((d.mismanaged * actualProgress) / maxValue) * (height - 2 * padding)
          });
        }
        
        // Draw lines
        if (wastePoints.length > 1) {
          drawSmoothLine(ctx, wastePoints, wasteColor, 3);
        }
        if (recycledPoints.length > 1) {
          drawSmoothLine(ctx, recycledPoints, recycledColor, 3);
        }
        if (mismanagedPoints.length > 1) {
          drawSmoothLine(ctx, mismanagedPoints, mismanagedColor, 3);
        }
        
        // Draw data points
        const allPoints = [
          {points: wastePoints, color: wasteColor, label: 'Waste Generated'},
          {points: recycledPoints, color: recycledColor, label: 'Recycled'},
          {points: mismanagedPoints, color: mismanagedColor, label: 'Mismanaged'}
        ];
        
        allPoints.forEach((lineData, lineIndex) => {
          lineData.points.forEach((point, i) => {
            const isHovered = hoveredPoint?.chart === 2 && hoveredPoint?.point === i;
            const radius = isHovered ? 6 : 4;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = isHovered ? '#ffffff' : lineData.color;
            ctx.fill();
            ctx.strokeStyle = lineData.color;
            ctx.lineWidth = isHovered ? 2 : 1;
            ctx.stroke();
          });
        });
        
        // X axis labels
        ctx.fillStyle = textColor;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        wasteData.forEach((d, i) => {
          const x = padding + i * (width - 2 * padding) / (wasteData.length - 1);
          ctx.fillText(d.year, x, height - padding + 20);
        });
        
        // Y axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= 5; i++) {
          const y = height - padding - i * (height - 2 * padding) / 5;
          const value = (i * maxValue / 5).toFixed(1);
          ctx.fillText(value, padding - 15, y);
        }
        
        // Draw legend
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        
        const legendY = padding + 10;
        const legendX = width - padding - 150;
        
        // Waste legend
        ctx.fillStyle = wasteColor;
        ctx.fillRect(legendX, legendY, 15, 15);
        ctx.fillStyle = textColor;
        ctx.fillText('Waste Generated', legendX + 20, legendY + 12);
        
        // Recycled legend
        ctx.fillStyle = recycledColor;
        ctx.fillRect(legendX, legendY + 25, 15, 15);
        ctx.fillStyle = textColor;
        ctx.fillText('Recycled', legendX + 20, legendY + 37);
        
        // Mismanaged legend
        ctx.fillStyle = mismanagedColor;
        ctx.fillRect(legendX, legendY + 50, 15, 15);
        ctx.fillStyle = textColor;
        ctx.fillText('Mismanaged', legendX + 20, legendY + 62);
        
        // Draw title
        ctx.fillStyle = darkMode ? '#f9fafb' : '#111827';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Waste vs Recycled vs Mismanaged', width / 2, 15);
        
        // Draw Y axis label
        ctx.save();
        ctx.translate(25, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Million Tonnes', 0, 0);
        ctx.restore();
      }
    }
    
    // Chart 3: Polymer Demand (Production trend) - Line Chart
    if (chart3Ref.current) {
      const ctx = chart3Ref.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Chart dimensions
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 80;
        
        // Colors based on theme
        const textColor = darkMode ? '#e5e7eb' : '#374151';
        const gridColor = darkMode ? '#4b5563' : '#e5e7eb';
        const bgColor = darkMode ? '#1f2937' : '#ffffff';
        const primaryColor = '#8b5cf6';
        
        // Find max value for scaling
        const maxValue = Math.max(...productionData.map(d => d.demand));
        
        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid with subtle lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);
        
        // Draw Y axis grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + i * (height - 2 * padding) / 5;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw axes
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 2;
        
        // Draw X axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw Y axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Calculate points for the line
        const animatedDataLength = Math.floor(productionData.length * animationProgress);
        const partialProgress = (productionData.length * animationProgress) % 1;
        const points: {x: number, y: number}[] = [];
        
        for (let i = 0; i <= animatedDataLength; i++) {
          if (i >= productionData.length) break;
          
          const d = productionData[i];
          const x = padding + i * (width - 2 * padding) / (productionData.length - 1);
          const actualProgress = i < animatedDataLength ? 1 : partialProgress;
          const y = height - padding - ((d.demand * actualProgress) / maxValue) * (height - 2 * padding);
          points.push({x, y});
        }
        
        // Draw area under the line
        if (points.length > 1) {
          const gradient = createGradient(ctx, 0, padding, 0, height - padding, 
            `${primaryColor}40`, `${primaryColor}10`);
          drawAreaUnderLine(ctx, points, gradient, height - padding);
        }
        
        // Draw the line
        if (points.length > 1) {
          drawSmoothLine(ctx, points, primaryColor, 4);
        }
        
        // Draw data points
        points.forEach((point, i) => {
          const isHovered = hoveredPoint?.chart === 3 && hoveredPoint?.point === i;
          const radius = isHovered ? 8 : 5;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isHovered ? '#ffffff' : primaryColor;
          ctx.fill();
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = isHovered ? 3 : 2;
          ctx.stroke();
          
          // Draw value on hover
          if (isHovered) {
            ctx.fillStyle = textColor;
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${productionData[i].demand}M`, point.x, point.y - 15);
          }
        });
        
        // X axis labels
        ctx.fillStyle = textColor;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        productionData.forEach((d, i) => {
          const x = padding + i * (width - 2 * padding) / (productionData.length - 1);
          ctx.fillText(d.year, x, height - padding + 20);
        });
        
        // Y axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= 5; i++) {
          const y = height - padding - i * (height - 2 * padding) / 5;
          const value = (i * maxValue / 5).toFixed(1);
          ctx.fillText(value, padding - 15, y);
        }
        
        // Draw title
        ctx.fillStyle = darkMode ? '#f9fafb' : '#111827';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Polymer Demand (Production trend)', width / 2, 15);
        
        // Draw Y axis label
        ctx.save();
        ctx.translate(25, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Million Tonnes', 0, 0);
        ctx.restore();
      }
    }
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
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-center text-lg font-semibold mb-4">Plastic Waste Generated (2013-2023)</h3>
            <canvas 
              ref={chart1Ref} 
              width={1000} 
              height={500}
              className="w-full h-auto transition-all duration-300 cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-center text-lg font-semibold mb-4">Waste vs Recycled vs Mismanaged</h3>
            <canvas 
              ref={chart2Ref} 
              width={1000} 
              height={500}
              className="w-full h-auto transition-all duration-300 cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
          
          <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <h3 className="text-center text-lg font-semibold mb-4">Polymer Demand (Production trend)</h3>
            <canvas 
              ref={chart3Ref} 
              width={1000} 
              height={500}
              className="w-full h-auto transition-all duration-300 cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={handleMouseLeave}
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