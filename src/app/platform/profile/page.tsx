'use client';

import React from 'react';
import { usePlatform } from '@/lib/platform-context';
import { 
  User, 
  Building2, 
  Wallet, 
  Settings, 
  Copy, 
  ExternalLink, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function PlatformProfile() {
  const { role, stats } = usePlatform();

  // Mock details
  const mockWallet = '0x3af83bd782f09d10e052f95b92c10db4e56992c1';
  const esgBalance = stats.issuedCredits.toFixed(2);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(mockWallet);
    alert('Wallet address copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left animate-fade-in">
      
      {/* Page Header */}
      <div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">User Settings</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Profile & Credentials</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your sandbox credentials, view organization status, and inspect blockchain wallet integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - User Credentials */}
        <div className="md:col-span-8 space-y-6">
          
          {/* User Account Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <User className="w-5 h-5 text-emerald-500" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Full Name</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">Desh Premi</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">desh.premi@falkon.com</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sandbox Role</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1 capitalize">{role}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registry ID</span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white block mt-1">FAL-REG-98012</span>
              </div>
            </div>
          </div>

          {/* Org details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <Building2 className="w-5 h-5 text-emerald-500" />
              <span>Organization Status</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Organization Name</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">Falkon Ecological Cooperative</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registration Country</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-1">India</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">EPR License Number</span>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-white block mt-1">CPCB-EPR-2026-9021</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Registry Verification</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  CPCB Certified Node
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Web3 Wallet */}
        <div className="md:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
            <Wallet className="w-5 h-5 text-emerald-500" />
            <span>Web3 Carbon Wallet</span>
          </h3>

          <div className="space-y-4">
            {/* Wallet Balance Card */}
            <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl text-center space-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none" />
              
              <span className="text-[10px] text-slate-450 uppercase tracking-widest font-black block">ESG Offset Balance</span>
              <span className="text-3xl font-black text-emerald-400 tracking-tight block">{esgBalance} <span className="text-xs font-semibold text-slate-500">tCO2e</span></span>
              
              <div className="flex justify-center gap-3 pt-2 text-[10px] font-mono text-slate-500">
                <span>MATIC: <strong>4.82</strong></span>
                <span>•</span>
                <span>Gas Price: <strong>32 Gwei</strong></span>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="space-y-1.5 text-xs text-left">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider pl-1">Wallet Address</span>
              <div className="flex gap-2 items-center">
                <input 
                  type="text" 
                  readOnly 
                  value={`${mockWallet.slice(0, 8)}...${mockWallet.slice(-8)}`} 
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-mono font-semibold"
                />
                <button 
                  onClick={handleCopyWallet}
                  className="p-2.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 hover:text-emerald-500 rounded-xl transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-[10px] text-slate-500 leading-relaxed text-left flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Payouts from the registry marketplace are signed via smart contracts on Polygon mainnet.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
