'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlatform, UserRole } from '@/lib/platform-context';
import { 
  LayoutDashboard, 
  Folder, 
  PlusCircle, 
  Award, 
  BarChart3, 
  Coins, 
  FileText, 
  Bell, 
  User, 
  Leaf, 
  Menu, 
  X,
  Users,
  ShieldCheck
} from 'lucide-react';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole, projects } = usePlatform();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute pending count for auditors/admins
  const pendingProjects = projects.filter(p => p.status === 'pending').length;

  const links: SidebarLink[] = [
    { name: 'Dashboard', href: '/platform/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Projects', href: '/platform/projects', icon: <Folder className="w-5 h-5" /> },
    { name: 'Create Project', href: '/platform/create-project', icon: <PlusCircle className="w-5 h-5" /> },
    { name: 'Carbon Credits', href: '/platform/credits', icon: <Award className="w-5 h-5" /> },
    { name: 'Reports', href: '/platform/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Marketplace', href: '/platform/marketplace', icon: <Coins className="w-5 h-5" /> },
    { name: 'Documents', href: '/platform/documents', icon: <FileText className="w-5 h-5" /> },
    { name: 'Notifications', href: '/platform/notifications', icon: <Bell className="w-5 h-5" />, badge: role === 'auditor' || role === 'admin' ? pendingProjects : undefined },
    { name: 'Profile', href: '/platform/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-emerald-950/90 text-white border-b border-emerald-900/50 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-extrabold tracking-wide bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-sm">CARBON REGISTRY</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-emerald-400 hover:text-white transition-colors">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar for Desktop / Mobile Drawers */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 transform lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col justify-between ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          {/* Logo Brand Header */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <Leaf className="text-emerald-400 w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-wide bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent block">CARBON REGISTRY</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Decentralized</span>
            </div>
            {mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden ml-auto p-1.5 text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)]">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/platform/dashboard' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-800/10 border border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/5' 
                      : 'hover:bg-slate-800/50 hover:text-white border border-transparent'
                  }`}
                >
                  {link.icon}
                  <span className="flex-1">{link.name}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Role Switcher at Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm uppercase">
              {role[0]}
            </div>
            <div className="text-left overflow-hidden">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase block">Logged in as</span>
              <span className="text-xs font-black text-white capitalize block truncate">{role} Mode</span>
            </div>
          </div>

          <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1.5 text-left pl-1">Switch Sandbox Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500 transition-colors uppercase tracking-wide cursor-pointer"
          >
            <option value="farmer">🌱 Farmer</option>
            <option value="industry">🏭 Industry</option>
            <option value="waste">♻️ Waste Collector</option>
            <option value="auditor">🔍 Auditor</option>
            <option value="investor">💼 Investor</option>
            <option value="admin">🔑 Administrator</option>
          </select>
        </div>
      </aside>

      {/* Floating Overlay when mobile drawer is open */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </>
  );
}
