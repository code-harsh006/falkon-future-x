"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Globe, ArrowRight, Heart } from 'lucide-react';
import Logo from './ui/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-16 mt-20 relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Logo showText={true} className="text-white" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Leading the plastic waste revolution through decentralized technology, smart IoT hardware, and community circular workflows.
            </p>
            {/* Social Links Mockup */}
            <div className="flex space-x-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'Github'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-semibold text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-slate-900/50 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'Our Features', href: '/#features' },
                { label: 'Waste Analytics', href: '/#plastic-waste' },
                { label: 'Our Team', href: '/#team' },
                { label: 'Contact', href: '/#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Ecosystem Solutions</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'EPR Compliance SaaS', href: '/services/smart-waste-management-system' },
                { label: 'IoT Smart Bins', href: '/services/smart-waste-management-system' },
                { label: 'Blockchain Offsets', href: '/#solutions' },
                { label: 'Justto Logistics Moat', href: '/#solutions' },
                { label: 'Water Resource Audits', href: '/services/water-bound-digises-solution' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-emerald-400 transition-colors duration-150">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Contact & Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-xs leading-relaxed">
                  House No. 293, Second Floor, Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi – 110030, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:falkonfuturex@gmail.com" className="hover:text-emerald-400 transition-colors duration-150">
                  falkonfuturex@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <a href="https://www.falkonfuturex.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors duration-150">
                  www.falkonfuturex.com
                </a>
              </li>
            </ul>

            {/* Newsletter input mockup */}
            <div className="pt-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Subscribe to updates"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 pr-10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p className="text-slate-500 text-center md:text-left">
            &copy; {currentYear} Falkon FutureX Private Limited. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-slate-500">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for our planet. Certified ESG & EPR Infrastructure Partner.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
