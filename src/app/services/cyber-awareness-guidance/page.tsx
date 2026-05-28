"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Shield, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CyberAwarenessGuidance() {
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
          <span className="text-emerald-500">Cyber Awareness Guidance</span>
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
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-3xl text-indigo-500">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-455 uppercase font-bold tracking-widest block">ENTERPRISE SECURITY</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Cyber Awareness & Consultancy
                  </h1>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                Comprehensive security architecture audits, social engineering simulation training, and regulatory compliance advisory protecting your digital core assets.
              </p>

              <div className="prose prose-slate dark:prose-invert max-w-none text-xs text-slate-500 dark:text-slate-400 space-y-4">
                <p>
                  Our Cyber Awareness Guidance & Consultancy division delivers end-to-end security advice and training parameters to protect business files, software configurations, and employee communications from expanding digital threat environments.
                </p>
                <p>
                  We offer customized organizational threat mapping, targeted phishing simulations, incident response roadmap preparation, and continuous monitoring practices. By training human networks alongside deploying enterprise standards, we build resilient organizations.
                </p>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Key Features</h3>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Customized cybersecurity training courses & simulation audits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Social engineering threat testing & phishing vector simulation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Vulnerability mapping and digital footprint audits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>Incident response policy preparation and system continuity planning.</span>
                  </li>
                </ul>

                <h3 className="text-sm font-bold text-slate-850 dark:text-white pt-4">Consultation Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Defense Foundations</h4>
                    <p className="text-[11px] leading-relaxed">Password sanitization, network segment security, and multi-factor validation setups.</p>
                  </div>
                  <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Data Safety Guidelines</h4>
                    <p className="text-[11px] leading-relaxed">Compliance standards audits (HIPAA, GDPR, ISO 27001) for private user repositories.</p>
                  </div>
                </div>

              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Stats Card */}
            <GlassCard className="bg-white/80 dark:bg-slate-900/80 border-slate-200/50 dark:border-slate-800/50 p-6 rounded-3xl shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Human Risk Reductions</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Phishing click-through vulnerability rates drop from 28% to under 2% post our simulation audits.
              </p>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Audit Certified
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
                  <Link href="/services/smart-healthcare-solutions" className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors">
                    <span className="mr-2">→</span> Smart Healthcare Systems
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
                Schedule a cybersecurity evaluation to analyze current organization exposure index.
              </p>
              <Link href="/#contact" className="w-full btn-premium-primary justify-center text-xs py-2">
                Request Audit Setup
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