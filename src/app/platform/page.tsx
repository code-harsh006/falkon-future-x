'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePlatform, UserRole } from '@/lib/platform-context';
import { 
  Leaf, 
  Sprout, 
  Trash2, 
  Factory, 
  Eye, 
  TrendingUp, 
  Settings2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function PlatformLogin() {
  const router = useRouter();
  const { setRole } = usePlatform();

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    router.push('/platform/dashboard');
  };

  const portalCards = [
    {
      role: 'farmer' as UserRole,
      title: 'Farmer Portal',
      subtitle: 'कृषि एवं पौधारोपण',
      desc: 'Log tree plantations, sustainable farming, or biochar production to generate carbon credits and earn revenue.',
      icon: <Sprout className="w-8 h-8 text-emerald-500" />,
      theme: 'border-emerald-500/20 hover:border-emerald-500/80 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400',
      badges: ['Tree Plantation', 'Biochar Pyrolysis', 'Organic Farming']
    },
    {
      role: 'waste' as UserRole,
      title: 'Waste Collector Portal',
      subtitle: 'कचरा प्रबंधन',
      desc: 'Log plastic waste quantities, scan polymer barcodes, trace logistical shipments, and request EPR compliance certs.',
      icon: <Trash2 className="w-8 h-8 text-teal-500" />,
      theme: 'border-teal-500/20 hover:border-teal-500/80 bg-teal-500/5 hover:bg-teal-500/10 text-teal-400',
      badges: ['Plastic Recycling', 'EPR Traceability', 'Barcodes Scanning']
    },
    {
      role: 'industry' as UserRole,
      title: 'Industry & Emitter Portal',
      subtitle: 'औद्योगिक कार्बन क्रेडिट',
      desc: 'Balance manufacturing emissions audits, purchase offset credits, and download verified compliance reports.',
      icon: <Factory className="w-8 h-8 text-sky-500" />,
      theme: 'border-sky-500/20 hover:border-sky-500/80 bg-sky-500/5 hover:bg-sky-500/10 text-sky-400',
      badges: ['Manufacturing', 'Offset Purchases', 'Scope 1-3 Auditing']
    },
    {
      role: 'auditor' as UserRole,
      title: 'Auditor Portal',
      subtitle: 'जांच एवं सत्यापन',
      desc: 'Audit project upload logs, verify GPS and photographic proof, conduct virtual or physical site inspections.',
      icon: <Eye className="w-8 h-8 text-amber-500" />,
      theme: 'border-amber-500/20 hover:border-amber-500/80 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400',
      badges: ['Audit Verification', 'Evidence Inspections', 'Registry Validation']
    },
    {
      role: 'investor' as UserRole,
      title: 'ESG Investor Center',
      subtitle: 'निवेशक डैशबोर्ड',
      desc: 'Browse green asset portfolios, review carbon marketplace price sheets, and track portfolio ROI metrics.',
      icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
      theme: 'border-indigo-500/20 hover:border-indigo-500/80 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400',
      badges: ['Live Marketplace', 'ROI Analytics', 'ESG Fund Portfolios']
    },
    {
      role: 'admin' as UserRole,
      title: 'Administrator Console',
      subtitle: 'सिस्टम एडमिन',
      desc: 'Manage global users, authorize new recycling/verification nodes, approve pending credits, and track system logs.',
      icon: <Settings2 className="w-8 h-8 text-slate-500" />,
      theme: 'border-slate-500/20 hover:border-slate-500/80 bg-slate-500/5 hover:bg-slate-500/10 text-slate-400',
      badges: ['User Roles Management', 'Smart Contract Auditing', 'Platform Config']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between py-12 px-4 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full text-center relative z-10 space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Falkon Future X Trust Architecture</span>
        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
            FALKON CARBON REGISTRY
          </h1>
        </div>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          A secure, visual marketplace and registry system linking agriculture, recycling, audits, and ESG investing. Select a portal to enter the sandbox:
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-12">
        {portalCards.map((card) => (
          <button
            key={card.role}
            onClick={() => handleSelectRole(card.role)}
            className={`border rounded-3xl p-6 text-left flex flex-col justify-between h-[300px] transition-all duration-350 transform hover:-translate-y-1 hover:shadow-2xl ${card.theme} cursor-pointer group`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold group-hover:text-white transition-colors">
                  <span>Enter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">{card.title}</h3>
                <span className="text-[10px] text-emerald-500 font-bold tracking-widest block uppercase font-mono">{card.subtitle}</span>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {card.desc}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-900">
              {card.badges.map((b) => (
                <span key={b} className="text-[9px] font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">
                  {b}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center relative z-10 text-xs text-slate-600 font-mono">
        <span>© 2026 Falkon Future X. Built with Next.js, Clerk, Convex & Rust. Version 1.0.0.</span>
      </div>
    </div>
  );
}
