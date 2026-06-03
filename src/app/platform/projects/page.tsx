'use client';

import React, { useState } from 'react';
import { usePlatform } from '@/lib/platform-context';
import { 
  Folder, 
  MapPin, 
  Leaf, 
  Search, 
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  FileCheck2,
  XCircle
} from 'lucide-react';

export default function PlatformProjects() {
  const { projects, role, verifyProject } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tree' | 'biochar' | 'waste' | 'transit' | 'solar' | 'industry'>('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || p.type === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Page Header */}
      <div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Registry Pipeline</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Carbon Projects</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore and audit the full portfolio of active, pending, and completed carbon abatement initiatives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        {/* Search */}
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search projects by name, location, details..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 text-slate-650 dark:text-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Category Filter */}
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 text-slate-650 dark:text-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="tree">Tree Plantation</option>
            <option value="biochar">Biochar Sequestration</option>
            <option value="waste">Waste Management</option>
            <option value="solar">Solar Energy</option>
            <option value="transit">Green Transportation</option>
            <option value="industry">Industrial Efficiency</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-12 text-center rounded-3xl text-slate-500">
          <Folder className="w-12 h-12 mx-auto text-slate-350 dark:text-slate-700 mb-3" />
          <p className="text-sm font-extrabold">No carbon projects match your search filters.</p>
          <p className="text-xs text-slate-400 mt-1">Try modifying your query or selecting another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 flex flex-col justify-between h-[360px] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    p.type === 'tree' ? 'bg-emerald-500/10 text-emerald-500' :
                    p.type === 'biochar' ? 'bg-amber-500/10 text-amber-500' :
                    p.type === 'waste' ? 'bg-teal-500/10 text-teal-500' : 'bg-sky-500/10 text-sky-500'
                  }`}>
                    {p.type}
                  </span>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wide border ${
                    p.status === 'verified' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                    p.status === 'rejected' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                    'bg-amber-500/10 border-amber-500/20 text-amber-500'
                  }`}>
                    {p.status === 'verified' && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
                    {p.status === 'pending' && <Clock className="w-3 h-3 text-amber-500 shrink-0" />}
                    {p.status === 'rejected' && <XCircle className="w-3 h-3 text-rose-500 shrink-0" />}
                    {p.status}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">{p.name}</h3>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{p.location}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed line-clamp-3">
                  {p.details}
                </p>
              </div>

              {/* Lower Section with Stats and Auditor Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Credits Yield</span>
                    <span className="font-mono font-black text-slate-900 dark:text-white block mt-0.5">{p.expectedCredits.toFixed(2)} tCO2e</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Est. Revenue</span>
                    <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">${p.potentialRevenue.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
                  </div>
                </div>

                {/* Auditor specific action console inline */}
                {p.status === 'pending' && (role === 'auditor' || role === 'admin') ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => verifyProject(p.id, true)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider"
                    >
                      Approve Credit Issuance
                    </button>
                    <button 
                      onClick={() => verifyProject(p.id, false)}
                      className="flex-1 py-2 bg-slate-950 border border-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-450 font-bold text-[10px] rounded-lg uppercase tracking-wider"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1">
                    <span>Evidence files: {p.evidenceCount} uploaded</span>
                    <span>Readiness: <strong className="text-emerald-500">{p.readinessScore}%</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
