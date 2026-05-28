"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Utensils, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FoodDelivery() {
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
          <span className="text-emerald-500">Sustainable Food Delivery</span>
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
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase font-bold tracking-widest block">LOGISTICS & LAST-MILE</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Sustainable Food Delivery Systems
                  </h1>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                AI-driven last-mile route planning, optimized return-trip packaging collections, and merchant ESG reporting frameworks.
              </p>

              <div className="prose prose-slate dark:prose-invert max-w-none text-xs text-slate-500 dark:text-slate-400 space-y-4">
                <p>
                  Our Food Delivery service integrates food delivery workflows with clean solid waste aggregation. Through our custom algorithms, delivery agents drop off food and collect segregated plastics on a single trip, optimizing last-mile resource usage.
                </p>
                <p>
                  By partnering with eco-friendly local restaurants, we help retailers implement reusable packaging systems, reduce single-use plastic volumes, and track sustainability indices that appeal to premium eco-conscious consumer segments.
                </p>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Logistical Capabilities</h3>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>AI routing algorithms coordinating pickup and return drop-off nodes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Real-time delivery courier tracking with dynamic bag-scanning verification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Merchant panel highlighting ESG packaging metrics and credit rewards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Integration with the Justto delivery personnel mobile APK.</span>
                  </li>
                </ul>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Operational Pillars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Zero-Cost Logistics</h4>
                    <p className="text-[11px] leading-relaxed">By embedding pickups in return runs, we eliminate auxiliary transport cost.</p>
                  </div>
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Eco Packaging Sync</h4>
                    <p className="text-[11px] leading-relaxed">Support merchants transitioning to circular, compostable box formats.</p>
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
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Return-run Efficiency</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Our logistics network scales garbage diversion rates while increasing rider income by up to 25% via recycling commissions.
              </p>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Logistics Moat
              </span>
            </GlassCard>

            {/* Related Services */}
            <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 dark:border-slate-850">
                Related Ventures
              </h3>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link href="/services/e-commerce" className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <span className="mr-2">→</span> E-Commerce Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/services/smart-waste-management-system" className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <span className="mr-2">→</span> Smart Waste Bins
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
                Integrate your retail restaurant brand or logistic delivery fleet with Falkan loop.
              </p>
              <Link href="/#contact" className="w-full btn-premium-primary justify-center text-xs py-2">
                Partner with Us
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