"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './ui/logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navItems = [
    { label: 'How it works', id: 'how-it-works' },
    { label: 'Technology', id: 'technology' },
    { label: 'Data', id: 'data' },
    { label: 'Services', id: 'services' },
    { label: 'Team', id: 'team' },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[hsl(var(--background))]/85 backdrop-blur-md border-b border-[hsl(var(--border))]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-rivet">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Falkon Future X home" className="flex items-center">
            <Logo showText={true} />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Contact
            </button>
            <button onClick={() => handleNavClick('contact')} className="btn-primary h-9 px-4">
              Get in touch
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 rounded-md text-neutral-700 hover:bg-neutral-100"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]">
          <div className="container-rivet py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-2 py-2.5 text-sm text-neutral-700 hover:text-neutral-900"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="btn-primary w-full mt-3"
            >
              Get in touch
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
