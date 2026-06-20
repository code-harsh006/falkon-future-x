"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  PriceTag,
  WatchlistRow,
  OrderTicket,
  StaticPriceBadge,
  CommandPalette,
} from "@/components/trading";
import { Button } from "@/components/ui/button";
import { usePlatform } from "@/lib/platform-context";
import { BarChart3, Search, Wallet } from "lucide-react";

export default function TradingDeskPage() {
  const { userId, wallet, projects, placeOrder } = usePlatform();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [orderMode, setOrderMode] = useState<"buy" | "sell">("buy");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const selectedProject = useMemo(
    () => projects.find((p: any) => p._id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const handleSearch = async (query: string) => {
    return projects
      .filter((p: any) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
      .map((p: any) => ({
        id: p._id,
        type: "project" as const,
        title: p.name,
        subtitle: `${p.category} · $${p.pricePerUnit.toFixed(2)}`,
      }));
  };

  const handleSelectResult = (result: any) => {
    setSelectedProjectId(result.id);
  };

  const handleOrderSubmit = async (order: any) => {
    if (!selectedProjectId) return;
    try {
      await placeOrder({
        projectId: selectedProjectId,
        side: order.side,
        qty: order.quantity,
        price: order.price,
        orderType: order.orderType,
      });
      alert("Order placed successfully!");
    } catch (error: any) {
      alert(`Order failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      setSelectedProjectId(projects[0]._id);
    }
  }, [projects, selectedProjectId]);

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-ink-900">Trading Desk</h1>
        <div className="flex items-center gap-3">
          <StaticPriceBadge />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-ink-100 rounded-lg">
            <Wallet className="w-4 h-4 text-ink-500" />
            <span className="text-sm font-medium text-ink-900 tabular">
              ${wallet.available.toFixed(2)}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCommandPaletteOpen(true)}>
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Watchlist */}
        <div className="w-72 flex-shrink-0 bg-white border border-ink-300 rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-ink-300">
            <span className="text-sm font-semibold text-ink-900">Watchlist</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {projects.length === 0 ? (
              <div className="p-4 text-center text-sm text-ink-500">No projects</div>
            ) : (
              projects.map((project: any) => (
                <WatchlistRow
                  key={project._id}
                  projectId={project._id}
                  name={project.name}
                  category={project.category}
                  price={project.pricePerUnit}
                  isSelected={selectedProjectId === project._id}
                  onClick={() => setSelectedProjectId(project._id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 bg-white border border-ink-300 rounded-lg flex flex-col">
          <div className="p-4 border-b border-ink-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  {selectedProject?.name || "Select a project"}
                </h2>
                {selectedProject && (
                  <PriceTag price={selectedProject.pricePerUnit} size="lg" className="mt-1" />
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setOrderMode("buy")}
                  className={orderMode === "buy" ? "bg-brand-500 hover:bg-brand-600" : "bg-ink-100 text-ink-700"}
                >
                  Buy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOrderMode("sell")}
                  className={orderMode === "sell" ? "bg-down text-white" : ""}
                >
                  Sell
                </Button>
              </div>
            </div>
            <div className="flex gap-1 mt-4">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
                <button key={tf} className="px-3 py-1 text-xs font-medium text-ink-500 hover:text-ink-900 hover:bg-ink-100 rounded transition-colors">
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-ink-300 mx-auto mb-2" />
              <p className="text-sm text-ink-500">Chart placeholder</p>
              <p className="text-xs text-ink-500 mt-1">Connect to Chart.js for live data</p>
            </div>
          </div>

          {selectedProject && (
            <div className="p-4 border-t border-ink-300 grid grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-ink-500 block">Volume</span>
                <span className="text-sm font-medium text-ink-900 tabular">
                  {selectedProject.listedVolume?.toLocaleString()} tCO2e
                </span>
              </div>
              <div>
                <span className="text-xs text-ink-500 block">Category</span>
                <span className="text-sm font-medium text-ink-900 capitalize">
                  {selectedProject.category}
                </span>
              </div>
              <div>
                <span className="text-xs text-ink-500 block">Status</span>
                <span className={`text-sm font-medium capitalize ${
                  selectedProject.verificationStatus === "approved" ? "text-up" :
                  selectedProject.verificationStatus === "pending" ? "text-warn" : "text-ink-500"
                }`}>
                  {selectedProject.verificationStatus}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Order Ticket */}
        <div className="w-80 flex-shrink-0">
          {selectedProject ? (
            <OrderTicket
              projectName={selectedProject.name}
              currentPrice={selectedProject.pricePerUnit}
              availableBalance={wallet.available}
              mode={orderMode}
              variant="panel"
              onSubmit={handleOrderSubmit}
              onCancel={() => {}}
            />
          ) : (
            <div className="bg-white border border-ink-300 rounded-lg p-6 text-center">
              <p className="text-sm text-ink-500">Select a project to trade</p>
            </div>
          )}
        </div>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSearch={handleSearch}
        onSelect={handleSelectResult}
      />
    </div>
  );
}