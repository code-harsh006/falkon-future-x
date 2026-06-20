"use client";

import React, { useState } from "react";
import { usePlatform } from "@/lib/platform-context";
import {
  Folder, MapPin, Search, CheckCircle2, Clock, XCircle,
} from "lucide-react";

export default function PlatformProjects() {
  const { projects, role, verifyProject } = usePlatform();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending" | "rejected">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tree" | "biochar" | "waste" | "solar" | "transit">("all");

  const filteredProjects = projects.filter((p: any) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.verificationStatus === statusFilter;
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">Registry Pipeline</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 mt-1">Carbon Projects</h1>
        <p className="text-xs text-ink-500 mt-1">
          Explore and audit the full portfolio of active, pending, and completed carbon initiatives.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects by name, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-ink-300 rounded-xl text-xs text-ink-900 placeholder-ink-500 focus:outline-none focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-ink-500 absolute left-4 top-3.5" />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-ink-300 text-ink-700 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-white border border-ink-300 text-ink-700 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="tree">Tree Plantation</option>
            <option value="biochar">Biochar</option>
            <option value="waste">Waste Management</option>
            <option value="solar">Solar Energy</option>
            <option value="transit">Green Transit</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-white border border-ink-300 p-12 text-center rounded-xl">
          <Folder className="w-12 h-12 mx-auto text-ink-300 mb-3" />
          <p className="text-sm font-extrabold text-ink-900">No projects match your filters.</p>
          <p className="text-xs text-ink-500 mt-1">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p: any) => (
            <div key={p._id} className="bg-white border border-ink-300 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    p.category === "tree" ? "bg-up-bg text-up" :
                    p.category === "biochar" ? "bg-warn-bg text-warn" :
                    p.category === "waste" ? "bg-teal-100 text-teal-600" :
                    "bg-info-bg text-info"
                  }`}>
                    {p.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wide border ${
                    p.verificationStatus === "approved" ? "bg-up-bg border-up/20 text-up" :
                    p.verificationStatus === "rejected" ? "bg-down-bg border-down/20 text-down" :
                    "bg-warn-bg border-warn/20 text-warn"
                  }`}>
                    {p.verificationStatus === "approved" && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                    {p.verificationStatus === "pending" && <Clock className="w-3 h-3 shrink-0" />}
                    {p.verificationStatus === "rejected" && <XCircle className="w-3 h-3 shrink-0" />}
                    {p.verificationStatus}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-ink-900 leading-snug">{p.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-ink-500 mt-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{p.location}</span>
                </div>
                <p className="text-xs text-ink-500 mt-4 leading-relaxed line-clamp-3">{p.description}</p>
              </div>

              <div className="pt-4 border-t border-ink-300 mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[9px] text-ink-500 font-bold block uppercase tracking-wider">Credits</span>
                    <span className="font-mono font-black text-ink-900 block mt-0.5">{p.expectedCredits.toFixed(2)} tCO2e</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-ink-500 font-bold block uppercase tracking-wider">Est. Value</span>
                    <span className="font-mono font-black text-brand-500 block mt-0.5">${(p.expectedCredits * p.pricePerUnit).toLocaleString("en-US", { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {p.verificationStatus === "pending" && (role === "auditor" || role === "admin") ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => verifyProject(p._id, true)}
                      className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => verifyProject(p._id, false)}
                      className="flex-1 py-2 bg-ink-900 border border-ink-700 hover:bg-down/10 text-ink-400 hover:text-down font-bold text-[10px] rounded-lg uppercase tracking-wider"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-[10px] text-ink-500 font-semibold pt-1">
                    <span>Evidence: {p.evidenceCount} files</span>
                    <span>Readiness: <strong className="text-brand-500">{p.readinessScore}%</strong></span>
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