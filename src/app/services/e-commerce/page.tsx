"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ShoppingCart, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Ecommerce() {
  const [investorMode, setInvestorMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-205 relative overflow-hidden">
      
      {/* Background Grids */}
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar investorMode={investorMode} setInvestorMode={setInvestorMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 relative z-10 text-left">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-semibold">
          <Link href="/" className="hover:text-slate-600 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-slate-600 dark:hover:text-white transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-500">E-Commerce Frameworks</span>
        </div>

        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/services" 
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>

        {/* Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-850">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase font-bold tracking-widest block">RETAIL & PLATFORMS</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    E-Commerce Solutions
                  </h1>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                End-to-end storefront engineering, payment architecture integrations, and carbon offset tracking embedded directly into retail checkout systems.
              </p>

              <div className="prose prose-slate dark:prose-invert max-w-none text-xs text-slate-500 dark:text-slate-400 space-y-4">
                <p>
                  Our E-Commerce solutions division builds transaction engines that connect consumer transactions with sustainability variables. We specialized in integrating reward loops (like Falkan ESG tokens) directly inside standard retail checkout protocols.
                </p>
                <p>
                  We handle the complete development cycle: shopping UI layout design, secure API integrations, inventory sync algorithms, and unified analytics panels. Brands can leverage our systems to provide checkout offset capabilities to increase shopper loyalty indices.
                </p>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Engineering Features</h3>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Storefront frameworks with optimization for mobile checkout speeds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Secure Stripe, razorpay, and card network integrations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>ESG Token wallet widgets allowing users to pay with recycled credits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Custom inventory and supply chain data synchronization.</span>
                  </li>
                </ul>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Operational Strengths</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Offset checkout checkmarks</h4>
                    <p className="text-[11px] leading-relaxed">Let buyers purchase certified Verra VM0044 offsets during checkout with one click.</p>
                  </div>
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Analytics API Nodes</h4>
                    <p className="text-[11px] leading-relaxed">Sync transaction data into compliance ESG reporting repositories automatically.</p>
                  </div>
                </div>

              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Stats Card */}
            <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">EPR Opt-In conversions</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Retail partners report up to a 15% increase in conversion rates when sustainability checkmarks are present.
              </p>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                ECommerce SaaS ready
              </span>
            </GlassCard>

            {/* Related Services */}
            <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
                Related Ventures
              </h3>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/services/cyber-awareness-guidance" className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <span className="mr-2">→</span> Cyber Security Consultancy
                  </Link>
                </li>
                <li>
                  <Link href="/services/food-delivery" className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <span className="mr-2">→</span> Sustainable Food Delivery
                  </Link>
                </li>
              </ul>
            </GlassCard>

            {/* Simple CTA form */}
            <GlassCard className="bg-slate-900 border border-slate-800 p-6 rounded-3xl text-white">
              <h3 className="text-sm font-bold flex items-center gap-1.5 mb-2">
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                Intake Assessment
              </h3>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                Schedule a consultation to audit payment systems or build an online storefront.
              </p>
              <Link href="/#contact" className="w-full btn-premium-primary justify-center text-xs py-2">
                Contact Specialist
              </Link>
            </GlassCard>

          </div>

        </div>

      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}