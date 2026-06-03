'use client';

import React from 'react';
import { PlatformProvider } from '@/lib/platform-context';
import Sidebar from '@/components/platform/sidebar';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlatformProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col lg:flex-row relative font-sans">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Shell */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          
          {/* Global Alert Bar to notify user about sandbox capability */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 border-b border-emerald-800 text-emerald-100 px-6 py-2.5 flex items-center justify-between text-xs font-semibold z-30">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span><strong>Interactive Carbon Sandbox</strong> — Switch roles in the bottom-left sidebar to view tailored interfaces.</span>
            </div>
          </div>

          {/* Main scrollable body */}
          <main className="flex-1 p-6 md:p-8 lg:p-10 relative overflow-y-auto min-h-[calc(100vh-40px)]">
            {children}
          </main>
        </div>
      </div>
    </PlatformProvider>
  );
}
