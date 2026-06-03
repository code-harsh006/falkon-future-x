'use client';

import React from 'react';
import { usePlatform } from '@/lib/platform-context';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Cpu, 
  Trash2 
} from 'lucide-react';

export default function PlatformNotifications() {
  const { role } = usePlatform();

  // Mock notifications list
  const notificationLogs = [
    { type: 'success', title: 'Carbon Offset Credits Retired', desc: '45.00 tCO2e offsets retired successfully for Nestle India compliance.', date: 'June 03, 2026 - 19:42', category: 'Registry' },
    { type: 'alert', title: 'New Project Pending Verification', desc: 'Vrindavan Agroforest Plantation submitted by farmer Desh Premi is awaiting audit signature.', date: 'June 03, 2026 - 17:15', category: 'Verification' },
    { type: 'info', title: 'Smart Node Telemetry Connected', desc: 'NB-IoT Smart Waste bins reporting online from Mumbai Okhla sort centers.', date: 'June 02, 2026 - 11:30', category: 'IoT Network' },
    { type: 'success', title: 'EPR Compliance Certificate Signed', desc: 'CPCB Solid Waste Management Certificate generated for PepsiCo India.', date: 'June 01, 2026 - 09:20', category: 'EPR Compliance' },
    { type: 'system', title: 'Consensus Block Inscribed', desc: 'Registry Transaction 0xf12c...881a logged on Polygon Block #829104.', date: 'May 30, 2026 - 16:45', category: 'Consensus' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Page Header */}
      <div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">System Logs</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Notifications</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor real-time system logs, smart contract confirmations, and project audit updates.
        </p>
      </div>

      {/* Notifications list */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 space-y-4">
        {notificationLogs.map((log, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-950/30 border border-slate-150 dark:border-slate-850 hover:border-emerald-500/20 rounded-2xl text-xs hover:bg-slate-100/30 transition-all">
            
            {/* Type Icon */}
            <div className="shrink-0 mt-0.5">
              {log.type === 'success' && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              {log.type === 'alert' && (
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              {log.type === 'info' && (
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-xl">
                  <Info className="w-5 h-5" />
                </div>
              )}
              {log.type === 'system' && (
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-xl">
                  <Cpu className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Description details */}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{log.title}</span>
                <span className="text-[9px] font-mono text-slate-400 font-semibold">{log.date}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {log.desc}
              </p>
              
              <div className="flex items-center gap-1.5 pt-2 text-[10px]">
                <span className="text-slate-400">Category:</span>
                <span className="px-2 py-0.5 bg-slate-200/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 rounded font-bold uppercase tracking-wider font-mono">
                  {log.category}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
