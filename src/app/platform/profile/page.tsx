"use client";

import React from "react";
import { usePlatform } from "@/lib/platform-context";
import {
  User,
  Building2,
  Wallet,
  Copy,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Calendar,
  LogOut,
} from "lucide-react";

export default function PlatformProfile() {
  const { role, stats, userName, userEmail, userId, wallet, logout } = usePlatform();

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(`0x3af83bd782f09d10e052f95b92c10db4e56992c1`);
    alert("Wallet address copied!");
  };

  const roleDescriptions: Record<string, string> = {
    farmer: "Manages tree plantations, biochar production, and sustainable agriculture projects",
    waste: "Logs plastic waste recycling, manages EPR compliance, and tracks shipments",
    industry: "Purchases carbon offsets, monitors Scope 1-3 emissions, and tracks ESG goals",
    auditor: "Verifies project evidence, approves credit issuance, and ensures compliance",
    investor: "Trades carbon credits, manages portfolio, and tracks ROI metrics",
    admin: "Manages users, approves nodes, configures platform, and monitors system health",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Page Header */}
      <div>
        <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">
          User Settings
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 mt-1">
          Profile & Credentials
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Manage your account, view organization status, and inspect wallet integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Personal Details */}
          <div className="bg-white border border-ink-300 p-6 rounded-xl space-y-5">
            <h3 className="text-base font-extrabold text-ink-900 flex items-center gap-2 border-b border-ink-300 pb-3">
              <User className="w-5 h-5 text-brand-500" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Full Name
                </span>
                <span className="text-sm font-extrabold text-ink-900 block mt-1">
                  {userName || "Not set"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email Address
                </span>
                <span className="text-sm font-extrabold text-ink-900 block mt-1">
                  {userEmail || "Not set"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider block">
                  Sandbox Role
                </span>
                <span className="text-sm font-extrabold text-brand-500 block mt-1 capitalize">
                  {role}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider block">
                  User ID
                </span>
                <span className="text-sm font-mono font-bold text-ink-900 block mt-1 truncate">
                  {userId || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Role Description */}
          <div className="bg-white border border-ink-300 p-6 rounded-xl space-y-5">
            <h3 className="text-base font-extrabold text-ink-900 flex items-center gap-2 border-b border-ink-300 pb-3">
              <Building2 className="w-5 h-5 text-brand-500" />
              <span>Role & Permissions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider block">
                  Current Role
                </span>
                <span className="text-sm font-extrabold text-ink-900 block mt-1 capitalize">
                  {role}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider block">
                  Registry Status
                </span>
                <span className="inline-flex items-center gap-1 text-brand-500 font-bold text-xs mt-1">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-ink-100 rounded-lg">
              <span className="text-[10px] text-ink-500 font-bold uppercase tracking-wider block mb-1">
                Role Description
              </span>
              <p className="text-xs text-ink-700 leading-relaxed">
                {roleDescriptions[role] || "Custom role with platform access"}
              </p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white border border-ink-300 p-6 rounded-xl space-y-5">
            <h3 className="text-base font-extrabold text-ink-900 flex items-center gap-2 border-b border-ink-300 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <span>Account Actions</span>
            </h3>
            <div className="flex gap-3">
              <button
                onClick={logout}
                className="px-4 py-2 bg-down-bg text-down border border-down/20 rounded-lg text-sm font-semibold hover:bg-down/10 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Wallet */}
        <div className="md:col-span-4 bg-white border border-ink-300 p-6 rounded-xl space-y-6">
          <h3 className="text-base font-extrabold text-ink-900 flex items-center gap-2 border-b border-ink-300 pb-3">
            <Wallet className="w-5 h-5 text-brand-500" />
            <span>Wallet</span>
          </h3>

          <div className="space-y-4">
            {/* Balance Card */}
            <div className="p-5 bg-ink-900 rounded-xl text-center space-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent pointer-events-none" />
              <span className="text-[10px] text-ink-400 uppercase tracking-widest font-black block">
                Available Balance
              </span>
              <span className="text-3xl font-black text-brand-400 tracking-tight block tabular">
                ${wallet.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-ink-500 block">
                Locked: ${wallet.lockedBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Wallet Address */}
            <div className="space-y-1.5 text-xs text-left">
              <span className="text-[9px] text-ink-500 font-bold uppercase tracking-wider pl-1">
                Wallet Address
              </span>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  readOnly
                  value="0x3af8...92c1"
                  className="flex-1 px-3 py-2 bg-ink-100 border border-ink-300 rounded-lg text-xs font-mono font-semibold"
                />
                <button
                  onClick={handleCopyWallet}
                  className="p-2.5 bg-ink-100 border border-ink-300 text-ink-500 hover:text-brand-500 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-[10px] text-ink-500 leading-relaxed text-left flex items-start gap-2 pt-2 border-t border-ink-300">
              <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <span>Payouts from the registry marketplace are signed via smart contracts on Polygon mainnet.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}