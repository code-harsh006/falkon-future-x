'use client';

import React, { useState } from 'react';
import { usePlatform } from '@/lib/platform-context';
import { 
  Coins, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  ShoppingCart, 
  CheckCircle2, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function CarbonMarketplace() {
  const { stats } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [buySuccess, setBuySuccess] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  
  // Available offers in the marketplace
  const marketplaceOffers = [
    { id: 'off-1', name: 'Mathura Neem Agroforest project', type: 'tree', volume: 1500, price: 11.20, seller: 'Vrindavan Farmers Group', ratings: 4.8 },
    { id: 'off-2', name: 'Haryana Straw Pyrolysis Biochar', type: 'biochar', volume: 450, price: 12.50, seller: 'Karnal Bio-Coal Ltd', ratings: 4.9 },
    { id: 'off-3', name: 'Pune HDPE Landfill Avoidance', type: 'waste', volume: 2200, price: 10.80, seller: 'Maharashtra Recycling', ratings: 4.7 },
    { id: 'off-4', name: 'Gujrat Wind-Grid displacement', type: 'solar', volume: 5000, price: 9.90, seller: 'Aditya Renewable Corp', ratings: 4.6 },
    { id: 'off-5', name: 'Bihar Biomass Compost Project', type: 'biochar', volume: 800, price: 11.80, seller: 'Nalanda Organic Coop', ratings: 4.8 }
  ];

  const filteredOffers = marketplaceOffers.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = (offer: any) => {
    setSelectedOffer(offer);
    setBuySuccess(true);
    setTimeout(() => {
      setBuySuccess(false);
      setSelectedOffer(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Page Header */}
      <div>
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Carbon Trading Desk</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Live Marketplace</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Purchase verified ESG compliance credits, support rural ecological projects, and expand your offset portfolio.
        </p>
      </div>

      {/* Market Indicators / Ticker widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ticker 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Global Index Price</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">$11.50 <span className="text-xs font-medium text-slate-450">/ tCO2e</span></span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +2.4% past 24h
            </span>
          </div>
          <div className="w-16 h-12 flex items-end">
            {/* mini chart */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 80 Q25 70 50 40 T100 10" fill="none" stroke="#10b981" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Ticker 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Listed Volume</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">14,240 <span className="text-xs font-medium text-slate-450">tCO2e</span></span>
            <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              -12.8% volume drop
            </span>
          </div>
          <div className="w-16 h-12 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 20 Q25 40 50 60 T100 90" fill="none" stroke="#ef4444" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Ticker 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Annual ROI</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">14.80%</span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Verra certified yield
            </span>
          </div>
          <div className="w-16 h-12 flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 80 Q25 60 50 30 T100 10" fill="none" stroke="#10b981" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notifications banner when purchase succeeds */}
      {buySuccess && selectedOffer && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center gap-3.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Success! You have purchased <strong>{selectedOffer.volume} tCO2e</strong> from {selectedOffer.seller} for ${(selectedOffer.volume * selectedOffer.price).toLocaleString()}.</span>
        </div>
      )}

      {/* Trading Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search listings by title, seller, or project origin..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
      </div>

      {/* Available Portfolios for Purchase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl p-6 flex flex-col justify-between h-[250px] relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  offer.type === 'tree' ? 'bg-emerald-500/10 text-emerald-500' :
                  offer.type === 'biochar' ? 'bg-amber-500/10 text-amber-500' :
                  offer.type === 'waste' ? 'bg-teal-500/10 text-teal-500' : 'bg-sky-500/10 text-sky-500'
                }`}>
                  {offer.type}
                </span>

                <span className="text-[10px] text-slate-400 font-semibold">
                  Seller: <strong>{offer.seller}</strong>
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">{offer.name}</h3>
              
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-850 text-xs">
                <div>
                  <span className="text-[9px] text-slate-450 block uppercase tracking-wider font-bold">List Volume</span>
                  <span className="font-mono font-black text-slate-900 dark:text-white mt-0.5 block">{offer.volume.toLocaleString()} tCO2e</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-450 block uppercase tracking-wider font-bold">Price per tCO2e</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">${offer.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-450 block uppercase tracking-wider font-bold">Total Cost</span>
                  <span className="font-mono font-black text-indigo-500 mt-0.5 block">${(offer.volume * offer.price).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Buy trigger */}
            <div className="pt-4 flex justify-between items-center mt-4">
              <span className="text-[10px] text-slate-400 font-bold">★ {offer.ratings} rating</span>
              
              <button 
                onClick={() => handleBuy(offer)}
                className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy Credits</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
