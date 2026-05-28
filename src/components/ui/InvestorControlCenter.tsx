"use client";

import React, { useState } from 'react';
import { GlassCard } from './glass-card';
import { 
  Coins, 
  TrendingUp, 
  Target, 
  Briefcase, 
  Percent, 
  Award, 
  ShieldCheck, 
  Calculator,
  ChevronRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Button } from './button';

const InvestorControlCenter = () => {
  const [investmentAmt, setInvestmentAmt] = useState(50000000); // 5 Crore default (in Rupees)
  const seedValuation = 600000000; // 60 Crore valuation post-money

  // Calculators
  const calculateEquity = () => {
    return ((investmentAmt / seedValuation) * 100).toFixed(2);
  };

  const calculateReturnVal = () => {
    // Assuming IRR of 52% and Y5 exit at IPO
    const multiple = Math.pow(1.52, 5);
    return (investmentAmt * multiple).toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  const calculateReturnMultiple = () => {
    return Math.pow(1.52, 5).toFixed(1);
  };

  const formatRupees = (val: number) => {
    if (val >= 10000000) {
      return `Rs. ${(val / 10000000).toFixed(2)} Crore`;
    }
    return `Rs. ${(val / 100000).toFixed(0)} Lakh`;
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl transition-all duration-500 animate-fade-in my-8">
      {/* Mesh background effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>INVESTOR DEMO CONTROL CENTER</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Falkon FutureX Investment Portal
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Explore seed funding metrics, unit economics, and simulated return calculations.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Funding Goal</span>
            <span className="text-lg font-bold text-white">Rs. 15.00 Crore</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Current Stage</span>
            <span className="text-lg font-bold text-emerald-400">Pre-Series A / Seed</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Market TAM/SAM/SOM */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span>Market Opportunity (TAM/SAM/SOM)</span>
          </h3>
          
          <div className="space-y-4">
            {[
              { title: "Total Addressable Market (TAM)", value: "Rs. 2,00,000 Cr", desc: "India urban waste + global carbon offsets", pct: 100, color: "bg-amber-500" },
              { title: "Serviceable Addressable Market (SAM)", value: "Rs. 12,000 Cr", desc: "EPR and waste in Delhi NCR & Tier-1 cities", pct: 40, color: "bg-emerald-500" },
              { title: "Serviceable Obtainable Market (SOM)", value: "Rs. 1,200 Cr", desc: "Delhi pilot + 5 cities within 36 months", pct: 15, color: "bg-blue-500" }
            ].map((market) => (
              <div key={market.title} className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300">{market.title}</h4>
                    <p className="text-[10px] text-slate-500">{market.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-white">{market.value}</span>
                </div>
                {/* Visual percentage slider bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-2">
                  <div className={`h-full ${market.color} rounded-full`} style={{ width: `${market.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projections & Economics */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>3-Year Financial Projections (Rs. Cr)</span>
          </h3>

          <div className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 pb-2">
                  <th className="pb-2 font-medium">Revenue Segment</th>
                  <th className="pb-2 font-medium text-right">Year 1</th>
                  <th className="pb-2 font-medium text-right">Year 2</th>
                  <th className="pb-2 font-medium text-right">Year 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                <tr>
                  <td className="py-2.5 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Carbon Credits
                  </td>
                  <td className="py-2.5 text-right font-semibold">0.80</td>
                  <td className="py-2.5 text-right font-semibold">6.50</td>
                  <td className="py-2.5 text-right font-semibold text-emerald-400">28.00</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    SaaS / EPR Compliance
                  </td>
                  <td className="py-2.5 text-right font-semibold">0.40</td>
                  <td className="py-2.5 text-right font-semibold">3.20</td>
                  <td className="py-2.5 text-right font-semibold text-emerald-400">14.00</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Smart Bin Sales
                  </td>
                  <td className="py-2.5 text-right font-semibold">1.20</td>
                  <td className="py-2.5 text-right font-semibold">5.00</td>
                  <td className="py-2.5 text-right font-semibold text-emerald-400">18.00</td>
                </tr>
                <tr className="text-white font-bold bg-slate-900/40">
                  <td className="py-2.5 pl-2">Total Gross Revenues</td>
                  <td className="py-2.5 text-right pr-2">2.70</td>
                  <td className="py-2.5 text-right pr-2">17.50</td>
                  <td className="py-2.5 text-right pr-2 text-emerald-400">72.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Unit Economics Highlight */}
          <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Active Household LTV</h4>
                <p className="text-[10px] text-slate-500">Gross revenue generated per active HH / month</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-400">Rs. 220 - 380</span>
              <span className="text-[10px] text-slate-500 block">18m hardware payback</span>
            </div>
          </div>
        </div>

        {/* ROI Slide Calculator */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>Interactive ROI Calculator</span>
            </h3>

            {/* Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-400">Adjust Investment Amount</span>
                <span className="font-bold text-white bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-md">
                  {formatRupees(investmentAmt)}
                </span>
              </div>
              <input
                type="range"
                min={1000000} // 10 Lakhs
                max={150000000} // 15 Crore
                step={1000000}
                value={investmentAmt}
                onChange={(e) => setInvestmentAmt(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Rs. 10 Lakh</span>
                <span>Rs. 15 Crore Max</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold mb-0.5">Implied Equity</span>
                <div className="flex items-center justify-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-base font-bold text-white">{calculateEquity()}%</span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl text-center">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-semibold mb-0.5">Return Multiple</span>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-base font-bold text-emerald-400">{calculateReturnMultiple()}x</span>
                </div>
              </div>
            </div>

            {/* Yield Output */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-emerald-400 uppercase tracking-wider block font-bold">Projected exit value (Year 5)</span>
                <span className="text-sm font-bold text-white">{calculateReturnVal()}</span>
              </div>
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-850">
            <a
              href="mailto:falkonfuturex@gmail.com?subject=Investment Inquiry - Falkon Future X Pre-Series A"
              className="w-full btn-premium-primary text-center justify-center text-xs py-2"
            >
              Get Investor Pitch Deck
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Compliance / MOU Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>EPR Compliance Certified (CPCB Rules 2022)</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>MCD Solid Waste Mandates Compliant</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verra VM0044 Carbon Methodology</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>MOU pipeline with 30+ Certified Recyclers</span>
        </div>
      </div>
    </div>
  );
};

export default InvestorControlCenter;
