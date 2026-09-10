"use client";

import React from 'react';
import Link from 'next/link';
import Logo from './ui/logo';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Team', href: '/#team' },
      { label: 'Investors', href: '/#contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'EPR compliance', href: '/#technology' },
      { label: 'Smart bins', href: '/services/smart-waste-management-system' },
      { label: 'Water management', href: '/services/water-bound-digises-solution' },
      { label: 'Renewable audits', href: '/services/new-renewable-energy' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Plastic waste data', href: '/#data' },
      { label: 'Services', href: '/services' },
      { label: 'Cyber consultancy', href: '/services/cyber-awareness-guidance' },
      { label: 'E-commerce', href: '/services/e-commerce' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'falkonfuturex@gmail.com', href: 'mailto:falkonfuturex@gmail.com' },
      { label: 'New Delhi, India', href: '/#contact' },
      { label: 'www.falkonfuturex.com', href: 'https://www.falkonfuturex.com' },
    ],
  },
];

const socials = [
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'GitHub', href: '#' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--ink))] text-neutral-400">
      <div className="container-rivet py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Logo showText={true} invert />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs text-pretty">
              Infrastructure for a plastic circular economy — tracking, compliance,
              and recycling that closes the loop.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-9 px-3 inline-flex items-center rounded-md border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-500">
            <span className="uppercase tracking-[0.14em]">Aligned with</span>
            <span className="text-neutral-400">CPCB EPR framework</span>
            <span className="text-neutral-400">Verra VM0044 methodology</span>
            <span className="text-neutral-400">NGT solid-waste rules</span>
          </div>
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} Falkon FutureX Private Limited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
