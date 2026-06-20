"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePlatform } from "@/lib/platform-context";
import {
  Sprout, Trash2, Factory, Eye, TrendingUp, Settings2, Award,
  Coins, Activity, Clock, MapPin, CheckCircle2, Plus, ChevronRight,
} from "lucide-react";

export default function PlatformDashboard() {
  const { role, stats, projects, holdings, verifyProject } = usePlatform();
  const [auditFilter, setAuditFilter] = useState<"pending" | "all">("pending");

  const getRoleProjects = () => {
    switch (role) {
      case "farmer":
        return projects.filter((p: any) => p.category === "tree" || p.category === "biochar");
      case "waste":
        return projects.filter((p: any) => p.category === "waste");
      case "industry":
        return projects.filter((p: any) => p.category === "solar" || p.category === "transit");
      case "auditor":
        return projects;
      default:
        return projects;
    }
  };

  const roleProjects = getRoleProjects();

  const formatCurrency = (v: number) =>
    v.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-ink-300 pb-6">
        <div>
          <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">Sandbox Console</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 capitalize flex items-center gap-2.5 mt-1">
            {role === "farmer" && <Sprout className="w-8 h-8 text-brand-500" />}
            {role === "waste" && <Trash2 className="w-8 h-8 text-teal-500" />}
            {role === "industry" && <Factory className="w-8 h-8 text-info" />}
            {role === "auditor" && <Eye className="w-8 h-8 text-warn" />}
            {role === "investor" && <TrendingUp className="w-8 h-8 text-indigo-500" />}
            {role === "admin" && <Settings2 className="w-8 h-8 text-ink-500" />}
            <span>{role} Dashboard</span>
          </h1>
        </div>
        <div className="flex gap-2.5">
          {role === "farmer" && (
            <Link href="/platform/create-project" className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Register Farm / Forest
            </Link>
          )}
          {role === "waste" && (
            <Link href="/platform/create-project" className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Log Plastic Shipment
            </Link>
          )}
          {role === "industry" && (
            <Link href="/platform/marketplace" className="bg-info hover:bg-info/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
              <Coins className="w-4 h-4" /> Offset Emissions Now
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: role === "farmer" ? "Total Carbon Credits" : role === "investor" ? "Portfolio Value" : "Platform Stats",
            value: role === "investor" ? `$${formatCurrency(stats.revenueGenerated)}` : `${stats.totalCredits.toFixed(1)} tCO2e`,
            sub: `${stats.issuedCredits.toFixed(1)} issued · ${stats.pendingCredits.toFixed(1)} pending`,
          },
          {
            label: "Revenue / Value",
            value: `$${formatCurrency(stats.revenueGenerated)}`,
            sub: "Based on current market prices",
          },
          {
            label: "Active Projects",
            value: `${projects.length}`,
            sub: `${projects.filter((p: any) => p.verificationStatus === "approved").length} verified`,
          },
          {
            label: "Retired Credits",
            value: `${stats.retiredCredits.toFixed(1)} tCO2e`,
            sub: "Permanently offset from atmosphere",
          },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-ink-300 p-6 rounded-xl relative overflow-hidden">
            <span className="text-[10px] text-ink-500 uppercase tracking-widest font-bold block">{card.label}</span>
            <span className="text-3xl font-black text-ink-900 tracking-tight block mt-3 tabular">{card.value}</span>
            <span className="text-[10px] text-ink-500 font-medium block mt-1.5">{card.sub}</span>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-ink-300 p-6 rounded-xl">
        <div className="flex justify-between items-center border-b border-ink-300 pb-4 mb-6">
          <h3 className="text-base font-extrabold text-ink-900">
            {role === "auditor" ? "All Registered Projects" : "Your Projects"}
          </h3>
          <Link href="/platform/projects" className="text-xs text-brand-500 font-bold hover:underline inline-flex items-center gap-1">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-300 text-ink-500 font-bold uppercase tracking-wider">
                <th className="pb-3">Project</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-right">Credits</th>
                <th className="pb-3 text-right">Est. Value</th>
                <th className="pb-3 text-center">Readiness</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300">
              {roleProjects.slice(0, 5).map((p: any) => (
                <tr key={p._id} className="hover:bg-ink-100/50 transition-colors">
                  <td className="py-4 font-extrabold text-ink-900">{p.name}</td>
                  <td className="py-4 text-ink-500">{p.location}</td>
                  <td className="py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-ink-100 text-ink-500">{p.category}</span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-ink-900 tabular">{p.expectedCredits.toFixed(2)} tCO2e</td>
                  <td className="py-4 text-right font-mono font-bold text-brand-500 tabular">${formatCurrency(p.expectedCredits * p.pricePerUnit)}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 bg-ink-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${p.readinessScore}%` }} />
                      </div>
                      <span className="font-mono font-bold text-[10px] text-ink-500">{p.readinessScore}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wide border ${
                      p.verificationStatus === "approved" ? "bg-up-bg border-up/20 text-up" :
                      p.verificationStatus === "rejected" ? "bg-down-bg border-down/20 text-down" :
                      "bg-warn-bg border-warn/20 text-warn"
                    }`}>
                      {p.verificationStatus}
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