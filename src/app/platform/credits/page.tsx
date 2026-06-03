'use client';

import React, { useState } from 'react';
import { usePlatform, PlatformCredit } from '@/lib/platform-context';
import { 
  Award, 
  Search, 
  HelpCircle,
  FileCheck2,
  Lock,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function CarbonCreditsRegistry() {
  const { credits, retireCredit, role } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [showRetireModal, setShowRetireModal] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<PlatformCredit | null>(null);
  
  // Retire Form State
  const [retireQty, setRetireQty] = useState(1);
  const [retireReason, setRetireReason] = useState('');
  const [retireSuccess, setRetireSuccess] = useState(false);

  const filteredCredits = credits.filter(c => {
    return c.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenRetire = (credit: PlatformCredit) => {
    setSelectedCredit(credit);
    setRetireQty(credit.quantity);
    setRetireReason('');
    setRetireSuccess(false);
    setShowRetireModal(true);
  };

  const handleRetireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCredit) return;
    
    const ok = retireCredit(selectedCredit.id, retireQty, retireReason);
    if (ok) {
      setRetireSuccess(true);
      setTimeout(() => {
        setShowRetireModal(false);
        setSelectedCredit(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left relative">
      
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Blockchain Registry</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Carbon Credits</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official carbon ledger. Inspect cryptographic serial numbers, track retirement logs, and verify compliance audits.
          </p>
        </div>
      </div>

      {/* Ticker Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl shadow-sm">
        {[
          { label: 'Total Credits Pool', val: `${credits.reduce((sum, c) => sum + c.quantity, 0).toFixed(1)} tCO2e` },
          { label: 'Active Issued', val: `${credits.filter(c => c.status === 'issued').reduce((sum, c) => sum + c.quantity, 0).toFixed(1)} tCO2e` },
          { label: 'Total Retired', val: `${credits.filter(c => c.status === 'retired').reduce((sum, c) => sum + c.quantity, 0).toFixed(1)} tCO2e` },
          { label: 'Blockchain Network', val: 'Polygon (L2) Node' }
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{item.label}</span>
            <span className="text-xl font-black text-slate-900 dark:text-white block">{item.val}</span>
          </div>
        ))}
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search by serial number, category, or project name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
      </div>

      {/* Credits Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Serial Number</th>
                <th className="py-4 px-6">Project Origin</th>
                <th className="py-4 px-6 text-right">Quantity</th>
                <th className="py-4 px-6">Vintage</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-650 dark:text-slate-350">
              {filteredCredits.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-emerald-600 dark:text-emerald-400">{c.serialNumber}</td>
                  <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-white">{c.projectName}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-slate-900 dark:text-white">{c.quantity.toFixed(2)} tCO2e</td>
                  <td className="py-4 px-6">{c.vintageYear}</td>
                  <td className="py-4 px-6 uppercase text-[10px] font-bold text-slate-400">{c.category}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide border ${
                      c.status === 'retired' 
                        ? 'bg-slate-100 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400' 
                        : c.status === 'issued' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {c.status === 'issued' ? (
                      <button 
                        onClick={() => handleOpenRetire(c)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Retire
                      </button>
                    ) : c.status === 'retired' ? (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block" title={c.retirementReason}>
                        RETIRED (Locked)
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">
                        AWAITING AUDIT
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help info card */}
      <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl flex items-start gap-4">
        <HelpCircle className="w-6 h-6 text-slate-400 mt-0.5 shrink-0" />
        <div className="space-y-1.5 text-xs text-slate-500 leading-relaxed">
          <h4 className="font-extrabold text-slate-900 dark:text-white">What does "Retiring" credits mean?</h4>
          <p>
            When a corporate emitter purchases carbon credits to balance their greenhouse gas footprint, they must permanently "retire" those credits in the registry. Once retired, the serial number is permanently locked, ensuring it cannot be traded or claimed a second time, avoiding double counting audits.
          </p>
        </div>
      </div>

      {/* RETIRE CREDIT MODAL */}
      {showRetireModal && selectedCredit && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setShowRetireModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Retire Carbon Offset</h3>
            </div>

            {retireSuccess ? (
              <div className="p-10 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Credits Retired Successfully!</h4>
                <p className="text-xs text-slate-500">The serial number has been permanently locked.</p>
              </div>
            ) : (
              <form onSubmit={handleRetireSubmit} className="p-6 space-y-4 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Serial</span>
                  <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 block mt-1">{selectedCredit.serialNumber}</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Quantity to Retire (tCO2e)</label>
                  <input 
                    type="number" 
                    max={selectedCredit.quantity}
                    min={0.1}
                    step={0.1}
                    value={retireQty}
                    onChange={(e) => setRetireQty(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none"
                    required 
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Maximum available: {selectedCredit.quantity} tCO2e</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Reason for Retirement</label>
                  <textarea 
                    placeholder="e.g. Offsetting scope-1 boiler emissions for Q3 compliance reporting." 
                    value={retireReason}
                    onChange={(e) => setRetireReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none resize-none"
                    required 
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/25 text-amber-500 p-3.5 rounded-xl text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>This action is <strong>irreversible</strong>. These offsets will be locked permanently.</span>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Confirm Permanent Lock
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
