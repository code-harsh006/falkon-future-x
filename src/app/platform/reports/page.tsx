'use client';

import React from 'react';
import { usePlatform } from '@/lib/platform-context';
import { 
  BarChart3, 
  FileText, 
  Download, 
  TrendingUp, 
  Globe, 
  Trash2, 
  Droplet, 
  Trees 
} from 'lucide-react';

export default function PlatformReports() {
  const { stats, wasteRecords, projects } = usePlatform();

  // Mock report files
  const reportFiles = [
    { name: 'Falkon Q2 2026 ESG Audit Report.pdf', date: 'June 01, 2026', size: '4.5 MB', type: 'compliance' },
    { name: 'Verra VM0044 Baseline Emission Study.pdf', date: 'May 12, 2026', size: '12.8 MB', type: 'study' },
    { name: 'Karnal Pyrolysis Biochar Technical Verification.pdf', date: 'April 20, 2026', size: '2.1 MB', type: 'certification' },
    { name: 'Mumbai Dharavi HDPE Circularity Audit.pdf', date: 'March 18, 2026', size: '3.4 MB', type: 'compliance' }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Page Header */}
      <div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Impact Analytics</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Reports & Audits</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review generated compliance documents, download technical studies, and inspect verified environmental impact summaries.
        </p>
      </div>

      {/* Impact Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl shrink-0">
            <Trees className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Saplings Planted</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1">12,402 Native</span>
            <span className="text-[10px] text-slate-500 block">Spread across Mathura & Karnal</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex items-center gap-4">
          <div className="p-4 bg-teal-500/10 border border-teal-500/20 text-teal-500 rounded-2xl shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Landfill Volume Diverted</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1">580,000 kg</span>
            <span className="text-[10px] text-slate-500 block">Post-consumer PET & HDPE bottles</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Water Reserves Saved</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block mt-1">1.2M Litres</span>
            <span className="text-[10px] text-slate-500 block">Diverting industrial washing hubs</span>
          </div>
        </div>
      </div>

      {/* Analytics Graph Block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-4 mb-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <span>Avoided CO2e Emission Reductions By Category</span>
          </h3>
        </div>

        {/* Interactive Custom SVG Column Chart */}
        <div className="h-[220px] w-full flex items-end justify-around relative pt-6 border-b border-slate-200 dark:border-slate-800">
          {[
            { cat: 'Tree Sequestration', val: 120.5, color: 'bg-emerald-500' },
            { cat: 'Biochar Sequestration', val: 412.8, color: 'bg-amber-500' },
            { cat: 'Plastic Recycling', val: 136.0, color: 'bg-teal-500' },
            { cat: 'Solar Grid Displace', val: 95.0, color: 'bg-yellow-500' },
            { cat: 'E-Logistics Vans', val: 85.4, color: 'bg-sky-500' }
          ].map((bar, idx) => {
            const pct = (bar.val / 412.8) * 100;
            return (
              <div key={idx} className="flex flex-col items-center w-1/6 group cursor-pointer">
                <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val} t
                </span>
                <div 
                  className={`w-full rounded-t-xl transition-all duration-1000 ${bar.color} hover:brightness-110`}
                  style={{ height: `${pct * 1.5}px` }}
                />
                <span className="text-[9px] font-bold text-slate-400 mt-3 text-center block truncate w-full">
                  {bar.cat}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reports Files List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">Official PDF Documents Locker</h3>
        <div className="space-y-3">
          {reportFiles.map((file, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="font-extrabold text-slate-900 dark:text-white block">{file.name}</span>
                  <span className="text-[10px] text-slate-450 block">{file.date} • {file.size}</span>
                </div>
              </div>
              
              <button className="p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-emerald-600 hover:text-white text-slate-550 dark:text-slate-400 rounded-xl transition-colors cursor-pointer">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
