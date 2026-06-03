'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePlatform } from '@/lib/platform-context';
import { 
  Sprout, 
  Trash2, 
  Factory, 
  Eye, 
  TrendingUp, 
  Settings2, 
  Award, 
  TrendingDown, 
  Coins, 
  Activity, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ChevronRight, 
  FileSpreadsheet,
  FileCheck2,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export default function PlatformDashboard() {
  const { role, stats, projects, wasteRecords, credits, verifyProject } = usePlatform();
  const [auditFilter, setAuditFilter] = useState<'pending' | 'all'>('pending');

  // Filter projects by role for personalized experience
  const getRoleProjects = () => {
    switch (role) {
      case 'farmer':
        return projects.filter(p => p.type === 'tree' || p.type === 'biochar');
      case 'waste':
        return projects.filter(p => p.type === 'waste');
      case 'industry':
        return projects.filter(p => p.type === 'transit' || p.type === 'solar' || p.type === 'industry');
      case 'auditor':
        return projects; // Auditors see all
      default:
        return projects;
    }
  };

  const roleProjects = getRoleProjects();

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-850 pb-6">
        <div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Sandbox Console</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white capitalize flex items-center gap-2.5 mt-1">
            {role === 'farmer' && <Sprout className="w-8 h-8 text-emerald-500" />}
            {role === 'waste' && <Trash2 className="w-8 h-8 text-teal-500" />}
            {role === 'industry' && <Factory className="w-8 h-8 text-sky-500" />}
            {role === 'auditor' && <Eye className="w-8 h-8 text-amber-500" />}
            {role === 'investor' && <TrendingUp className="w-8 h-8 text-indigo-500" />}
            {role === 'admin' && <Settings2 className="w-8 h-8 text-slate-400" />}
            <span>{role} Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {role === 'farmer' && 'Manage your crop sequestration, register tree plantations, and track carbon yield.'}
            {role === 'waste' && 'Log recycled plastic packaging, manage circular ecoloops, and check EPR logs.'}
            {role === 'industry' && 'Monitor scope 1-3 footprint assets, purchase offsets, and track net zero goals.'}
            {role === 'auditor' && 'Review uploaded visual evidence, verify geolocations, and approve carbon issuances.'}
            {role === 'investor' && 'Track green project investment portfolios, carbon coin yields, and market indexes.'}
            {role === 'admin' && 'Manage central registry records, check validator nodes, and authorize smart contracts.'}
          </p>
        </div>
        
        {/* Core Quick Action Button */}
        <div className="flex gap-2.5">
          {role === 'farmer' && (
            <Link 
              href="/platform/create-project" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register Farm / Forest</span>
            </Link>
          )}
          {role === 'waste' && (
            <Link 
              href="/platform/create-project"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Log Plastic Shipment</span>
            </Link>
          )}
          {role === 'industry' && (
            <Link 
              href="/platform/marketplace"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Coins className="w-4 h-4" />
              <span>Offset Emissions Now</span>
            </Link>
          )}
        </div>
      </div>

      {/* Role-Specific Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
            {role === 'farmer' && 'Total Carbon Credits'}
            {role === 'waste' && 'Plastic Waste Logged'}
            {role === 'industry' && 'Carbon Footprint (Scope 1-3)'}
            {role === 'auditor' && 'Verification Projects'}
            {role === 'investor' && 'Total ESG Assets'}
            {role === 'admin' && 'Global Issued Credits'}
          </span>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight block mt-3">
            {role === 'farmer' && '533.30 tCO2e'}
            {role === 'waste' && '580,000 kg'}
            {role === 'industry' && '2,480.00 tCO2e'}
            {role === 'auditor' && `${projects.length} Registered`}
            {role === 'investor' && '$124,500.50'}
            {role === 'admin' && `${stats.totalCredits.toFixed(2)} tCO2e`}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-1.5">
            {role === 'farmer' && '412.80 issued • 120.50 pending'}
            {role === 'waste' && '580 metric tons recycled'}
            {role === 'industry' && 'Year-to-date footprint balance'}
            {role === 'auditor' && `${projects.filter(p => p.status === 'pending').length} pending validation`}
            {role === 'investor' && '+12.4% portfolio growth'}
            {role === 'admin' && 'Verified database payload'}
          </span>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
            {role === 'farmer' && 'Revenue Generated'}
            {role === 'waste' && 'EPR Compliance Credits'}
            {role === 'industry' && 'Purchased Offsets'}
            {role === 'auditor' && 'Pending Evidence Checks'}
            {role === 'investor' && 'Average Carbon Price'}
            {role === 'admin' && 'Registered Organizations'}
          </span>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight block mt-3">
            {role === 'farmer' && `$${(533.30 * 11.5).toLocaleString('en-US', {maximumFractionDigits:2})}`}
            {role === 'waste' && '548.80 tCO2e'}
            {role === 'industry' && '1,850.00 tCO2e'}
            {role === 'auditor' && `${projects.filter(p => p.status === 'pending').length} Action Items`}
            {role === 'investor' && '$11.50 / tCO2e'}
            {role === 'admin' && '14 Active Nodes'}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1.5">
            {role === 'farmer' && 'Calculated at $11.50 market average'}
            {role === 'waste' && 'CPCB & NGT certificates active'}
            {role === 'industry' && '74% offset matching score'}
            {role === 'auditor' && 'Photo & GPS entries queued'}
            {role === 'investor' && 'Market price updated 1m ago'}
            {role === 'admin' && '12 Recyclers • 2 Auditors'}
          </span>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
            {role === 'farmer' && 'Active Projects'}
            {role === 'waste' && 'Active Collection Centers'}
            {role === 'industry' && 'Net Carbon Position'}
            {role === 'auditor' && 'Audits Completed'}
            {role === 'investor' && 'Total Credits Owned'}
            {role === 'admin' && 'Registry Nodes Health'}
          </span>
          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight block mt-3">
            {role === 'farmer' && '2 Farm Tracts'}
            {role === 'waste' && '4 Hub Centers'}
            {role === 'industry' && '-630.00 tCO2e'}
            {role === 'auditor' && '3 Projects'}
            {role === 'investor' && '8,420.50 tCO2e'}
            {role === 'admin' && '99.9% Online'}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-1.5">
            {role === 'farmer' && '1 Forestation • 1 Biochar'}
            {role === 'waste' && 'RFID smart dustbins integrated'}
            {role === 'industry' && 'Goal: Net Zero by 2028'}
            {role === 'auditor' && '100% SLA verification rate'}
            {role === 'investor' && 'Verra & Gold Standard verified'}
            {role === 'admin' && 'Blockchain consensus active'}
          </span>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black block">
            {role === 'farmer' && 'Sustainability Score'}
            {role === 'waste' && 'Diverted Landfill Carbon'}
            {role === 'industry' && 'Next ESG Reporting Period'}
            {role === 'auditor' && 'Inspection Efficiency'}
            {role === 'investor' && 'Expected Annual Yield'}
            {role === 'admin' && 'Pending Verification requests'}
          </span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight block mt-3">
            {role === 'farmer' && '96.5%'}
            {role === 'waste' && '986 tCO2e'}
            {role === 'industry' && '24 Days'}
            {role === 'auditor' && '4.2 Hrs'}
            {role === 'investor' && '14.8% ROI'}
            {role === 'admin' && `${projects.filter(p => p.status === 'pending').length} Requests`}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-1.5">
            {role === 'farmer' && 'Top tier eco-compliance rating'}
            {role === 'waste' && 'Calculated vs standard landfills'}
            {role === 'industry' && 'Q2 reporting payload compilation'}
            {role === 'auditor' && 'Average turnaround since upload'}
            {role === 'investor' && 'Based on market forward projections'}
            {role === 'admin' && 'Requiring auditor signature'}
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Analytics & Charts */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <span>
                {role === 'farmer' && 'Carbon Capture Yield'}
                {role === 'waste' && 'Waste Recycling Processing Tonnages'}
                {role === 'industry' && 'Emissions vs Offset Portfolio'}
                {role === 'auditor' && 'System Transaction Volumes'}
                {role === 'investor' && 'Carbon Price Ticker & Market Trends'}
                {role === 'admin' && 'Platform Activity Overview'}
              </span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              LIVE GRAPH
            </span>
          </div>

          {/* Premium Custom SVG Chart */}
          <div className="h-[220px] w-full flex items-end relative pt-6">
            <div className="absolute top-2 left-0 text-[9px] text-slate-400 dark:text-slate-500 font-bold font-mono">Credits (tCO2e)</div>
            {/* Custom SVG Line and Area Chart */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-850" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-850" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-850" />
              <line x1="0" y1="100" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-800" />
              
              {/* Area Under Curve */}
              <path 
                d="M0 100 L0 75 Q15 65 30 45 T60 30 T90 15 L100 10 L100 100 Z" 
                fill="url(#chartGlow)"
              />
              
              {/* Curve Line */}
              <path 
                d="M0 75 Q15 65 30 45 T60 30 T90 15 L100 10" 
                fill="none" 
                stroke="url(#chartLine)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="30" cy="45" r="4.5" fill="#0ea5e9" stroke="#fff" strokeWidth="1.5" />
              <circle cx="60" cy="30" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
              <circle cx="100" cy="10" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
            </svg>
            
            {/* Custom Tooltip */}
            <div className="absolute top-10 right-4 bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl shadow-xl text-left scale-90">
              <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wide">June Vintage Projection</span>
              <span className="text-xs font-black text-emerald-400 block">+145.40 tCO2e</span>
            </div>
          </div>
          
          {/* Chart X axis labels */}
          <div className="flex justify-between text-[10px] font-bold font-mono text-slate-400 px-1 border-t border-slate-150 dark:border-slate-850 pt-3">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun (Current)</span>
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Average Emission Yield</span>
              <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">11.8 tCO2e / Mo</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Accuracy Verification</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1 block">99.8%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-850 rounded-2xl">
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Estimated Payout</span>
              <span className="text-sm font-black text-slate-900 dark:text-white mt-1 block">Net 12 Days</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Journey Timeline / Audits Queue */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-4 mb-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span>
                  {role === 'auditor' ? 'Pending Auditor Verification' : 'Recent Activity Log'}
                </span>
              </h3>
            </div>

            {/* List */}
            {role === 'auditor' ? (
              // Auditor Worklist Panel
              <div className="space-y-3.5 max-h-[350px] overflow-y-auto">
                {projects.filter(p => p.status === 'pending').length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                    <p>All project audits are completed! Zero pending entries.</p>
                  </div>
                ) : (
                  projects.filter(p => p.status === 'pending').map((proj) => (
                    <div key={proj.id} className="p-4 bg-slate-50 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-850 rounded-2xl text-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Project Node</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">{proj.name}</span>
                          <span className="text-[10px] text-slate-500 block">{proj.location}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded font-bold uppercase text-[9px] tracking-wide shrink-0">
                          {proj.type}
                        </span>
                      </div>
                      
                      <div className="bg-slate-200/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 font-medium">Credits: <strong className="text-slate-900 dark:text-white">{proj.expectedCredits} tCO2e</strong></span>
                        <span className="text-slate-500 font-medium">Score: <strong className="text-emerald-500">{proj.readinessScore}%</strong></span>
                      </div>

                      {/* Action buttons inside auditor console */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => verifyProject(proj.id, true)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wide"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => verifyProject(proj.id, false)}
                          className="flex-1 py-2 bg-slate-950 border border-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wide"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Standard Activity Log
              <div className="space-y-4 relative pl-4 before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
                {[
                  { time: 'Just now', title: 'Carbon credits retired', desc: '45.0 tCO2e offsets retired for Nestle India compliance.', status: 'retired' },
                  { time: '3 hours ago', title: 'Project registered successfully', desc: 'Vrindavan Agroforest Plantation entered verification queue.', status: 'pending' },
                  { time: '1 day ago', title: 'Smart dustbin logs verified', desc: 'Barcoded load verification accepted from recycler node.', status: 'verified' },
                  { time: '3 days ago', title: 'ESG payouts released', desc: 'Rs. 4,800 sent to village operator smart wallets.', status: 'issued' }
                ].map((act, idx) => (
                  <div key={idx} className="relative text-xs text-left">
                    <div className={`absolute -left-[14px] top-1.5 w-2 h-2 rounded-full border-2 ${
                      act.status === 'verified' || act.status === 'issued' ? 'bg-emerald-500 border-emerald-500' :
                      act.status === 'pending' ? 'bg-amber-500 border-amber-500' : 'bg-purple-500 border-purple-500'
                    }`} />
                    <span className="text-[9px] font-bold text-slate-400 block font-mono">{act.time}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white block mt-0.5">{act.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-relaxed mt-0.5">{act.desc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-6 text-[10px] text-slate-500 flex justify-between items-center font-semibold">
            <span>Secured via SHA-256 Ledger</span>
            <Link href="/platform/notifications" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center">
              View all notifications
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Role-Specific Projects List / Ledger Logs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-850 pb-4 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {role === 'farmer' && 'Your Agriculture & Plantation Projects'}
              {role === 'waste' && 'Recycled Waste Shipments & EPR Compliance'}
              {role === 'industry' && 'Industrial Emission Reduction Projects'}
              {role === 'auditor' && 'Global Registry Verification Pipelines'}
              {role === 'investor' && 'ESG Investments & Projects Portfolios'}
              {role === 'admin' && 'System Central Project Logs'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active tracking pipeline detailing project status, readiness score, and carbon metrics.
            </p>
          </div>
          
          <Link 
            href="/platform/projects" 
            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            Manage all projects
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Pipeline Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Project Title</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Credits Expected</th>
                <th className="pb-3 text-right">Est. Value</th>
                <th className="pb-3 text-center">Readiness Score</th>
                <th className="pb-3">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-600 dark:text-slate-350">
              {roleProjects.slice(0, 4).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 font-extrabold text-slate-900 dark:text-white">{p.name}</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">{p.location}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-slate-900 dark:text-white">{p.expectedCredits.toFixed(2)} tCO2e</td>
                  <td className="py-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">${p.potentialRevenue.toLocaleString('en-US', {maximumFractionDigits: 2})}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${p.readinessScore}%` }} />
                      </div>
                      <span className="font-mono font-bold text-[10px] text-slate-500">{p.readinessScore}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wide border ${
                      p.status === 'verified' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                        : p.status === 'rejected'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
