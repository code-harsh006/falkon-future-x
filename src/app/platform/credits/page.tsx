"use client";

import React, { useState } from "react";
import { usePlatform } from "@/lib/platform-context";
import {
  Award,
  Search,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function CarbonCreditsRegistry() {
  const { holdings, retireCredits, role } = usePlatform();
  const [searchTerm, setSearchTerm] = useState("");
  const [showRetireModal, setShowRetireModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<any>(null);
  const [retireQty, setRetireQty] = useState(1);
  const [retireReason, setRetireReason] = useState("");
  const [retireSuccess, setRetireSuccess] = useState(false);

  const filteredHoldings = holdings.filter((h: any) => {
    if (!h.project) return false;
    return (
      h.project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenRetire = (holding: any) => {
    setSelectedHolding(holding);
    setRetireQty(holding.qty - holding.retiredQty);
    setRetireReason("");
    setRetireSuccess(false);
    setShowRetireModal(true);
  };

  const handleRetireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHolding) return;
    try {
      await retireCredits(selectedHolding._id, retireQty, retireReason);
      setRetireSuccess(true);
      setTimeout(() => {
        setShowRetireModal(false);
        setSelectedHolding(null);
      }, 2000);
    } catch (error) {
      console.error("Retirement failed:", error);
    }
  };

  const totalCredits = filteredHoldings.reduce(
    (sum: number, h: any) => sum + h.qty - h.retiredQty,
    0
  );
  const totalRetired = filteredHoldings.reduce(
    (sum: number, h: any) => sum + h.retiredQty,
    0
  );
  const totalValue = filteredHoldings.reduce((sum: number, h: any) => {
    const price = h.project?.pricePerUnit || 0;
    return sum + (h.qty - h.retiredQty) * price;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">
              Registry
            </span>
            <ShieldCheck className="w-4 h-4 text-brand-500" />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Carbon Credits Holdings</h1>
          <p className="text-sm text-ink-500 mt-1">Manage your verified carbon credit portfolio</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search credits..."
            className="pl-9 pr-4 py-2 bg-white border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-ink-300 rounded-lg p-4">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider">Available Credits</p>
          <p className="text-2xl font-bold text-ink-900 mt-1 tabular">{totalCredits.toFixed(2)} tCO2e</p>
        </div>
        <div className="bg-white border border-ink-300 rounded-lg p-4">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider">Retired Credits</p>
          <p className="text-2xl font-bold text-ink-500 mt-1 tabular">{totalRetired.toFixed(2)} tCO2e</p>
        </div>
        <div className="bg-white border border-ink-300 rounded-lg p-4">
          <p className="text-xs font-medium text-ink-500 uppercase tracking-wider">Portfolio Value</p>
          <p className="text-2xl font-bold text-brand-500 mt-1 tabular">
            ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white border border-ink-300 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink-300 bg-ink-100">
              {["Project", "Category", "Qty Held", "Avg Price", "Current", "P&L", "Retired", "Actions"].map(
                (h) => (
                  <th key={h} className={`text-xs font-semibold text-ink-500 uppercase tracking-wider px-4 py-3 ${h === "Actions" ? "text-center" : h !== "Project" && h !== "Category" ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <Award className="w-10 h-10 text-ink-300 mx-auto mb-2" />
                  <p className="text-sm text-ink-500">No credits found. Trade on the marketplace to acquire credits.</p>
                </td>
              </tr>
            ) : (
              filteredHoldings.map((h: any) => {
                const currentPrice = h.project?.pricePerUnit || 0;
                const availableQty = h.qty - h.retiredQty;
                const currentValue = availableQty * currentPrice;
                const pnl = currentValue - h.totalCost;
                const pnlPercent = h.totalCost > 0 ? (pnl / h.totalCost) * 100 : 0;

                return (
                  <tr key={h._id} className="border-b border-ink-300 last:border-0 hover:bg-ink-100/50">
                    <td className="px-4 py-3 text-sm font-medium text-ink-900">{h.project?.name || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-ink-100 text-ink-700 capitalize">{h.project?.category || "—"}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-ink-900 tabular">{availableQty.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-sm text-ink-700 tabular">${h.avgBuyPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-ink-900 tabular">${currentPrice.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right text-sm font-medium tabular ${pnl >= 0 ? "text-up" : "text-down"}`}>
                      {pnl >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-ink-500 tabular">{h.retiredQty.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      {availableQty > 0 && (
                        <button onClick={() => handleOpenRetire(h)} className="text-xs font-medium text-down hover:text-down/80">
                          Retire
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showRetireModal && selectedHolding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={() => setShowRetireModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-ink-300 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-ink-300">
              <h3 className="text-lg font-semibold text-ink-900">Retire Credits</h3>
              <button onClick={() => setShowRetireModal(false)} className="p-1 text-ink-500 hover:text-ink-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {retireSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-up mx-auto mb-3" />
                  <p className="text-lg font-semibold text-ink-900">Credits Retired</p>
                  <p className="text-sm text-ink-500 mt-1">Retirement certificate generated</p>
                </div>
              ) : (
                <form onSubmit={handleRetireSubmit} className="space-y-4">
                  <div className="p-3 bg-down-bg rounded-lg">
                    <div className="flex items-center gap-2 text-down">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Retirement is permanent and irreversible</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">Quantity to Retire</label>
                    <input
                      type="number"
                      value={retireQty}
                      onChange={(e) => setRetireQty(Number(e.target.value))}
                      min={0.01}
                      max={selectedHolding.qty - selectedHolding.retiredQty}
                      step={0.01}
                      className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 tabular"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-ink-500 uppercase tracking-wider block mb-1.5">Retirement Reason *</label>
                    <textarea
                      value={retireReason}
                      onChange={(e) => setRetireReason(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                      placeholder="e.g., Corporate carbon neutrality offset"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowRetireModal(false)} className="flex-1 px-4 py-2 bg-ink-100 text-ink-700 rounded-lg text-sm font-medium hover:bg-ink-200">
                      Cancel
                    </button>
                    <button type="submit" disabled={!retireReason.trim() || retireQty <= 0} className="flex-1 px-4 py-2 bg-down text-white rounded-lg text-sm font-medium hover:bg-down/90 disabled:opacity-50">
                      Confirm Retirement
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}