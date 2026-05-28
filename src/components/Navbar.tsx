"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Sparkles, Command, Shield, ArrowRight } from 'lucide-react';
import Logo from './ui/logo';
import { Button } from './ui/button';

interface NavbarProps {
  investorMode: boolean;
  setInvestorMode: (mode: boolean) => void;
}

const Navbar = ({ investorMode, setInvestorMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Features', id: 'features' },
    { label: 'About', id: 'about' },
    { label: 'Analytics', id: 'plastic-waste' },
    { label: 'Services', id: 'services' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo showText={true} />
            </Link>

            {/* Desktop Navigation Items */}
            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="nav-link"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right-side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Investor Demo Mode Switcher */}
              <button
                onClick={() => setInvestorMode(!investorMode)}
                className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all duration-300 ${
                  investorMode
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/50 shadow-sm shadow-amber-500/10 scale-105'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${investorMode ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`} />
                <Shield className="w-3.5 h-3.5" />
                <span>Investor Deck Mode</span>
              </button>

              {/* Command bar shortcut mockup */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 text-xs">
                <Command className="w-3 h-3" />
                <span>⌘K</span>
              </div>

              {/* CTAs */}
              <Button
                variant="outline"
                size="sm"
                className="hidden xl:inline-flex border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
                onClick={() => handleNavClick('contact')}
              >
                Request Demo
              </Button>

              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1 shadow-md shadow-emerald-600/10 rounded-xl"
                onClick={() => handleNavClick('contact')}
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center space-x-3">
              <button
                onClick={() => setInvestorMode(!investorMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wide transition-all ${
                  investorMode
                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Investor Mode</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="xl:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 py-4 px-6 absolute top-full left-0 right-0 shadow-lg backdrop-blur-lg transition-all duration-300">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left nav-link py-2.5 px-4"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => handleNavClick('contact')}
                >
                  Request Demo
                </Button>
                <Button
                  className="w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white"
                  onClick={() => handleNavClick('contact')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
