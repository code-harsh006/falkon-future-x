import React from 'react';
import Image from 'next/image';

const Logo = ({ className, showText = false }: { className?: string; showText?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <div className="relative w-10 h-10 transition-transform duration-300 hover:scale-105 hover:rotate-2 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-xl p-[2px] shadow-md shadow-emerald-500/10">
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
          <Image 
            src="/logo.png" 
            alt="Falkon Future X Logo" 
            width={34} 
            height={34}
            className="object-contain contrast-125 brightness-110"
            priority
          />
        </div>
      </div>
      {showText && (
        <span className="logo-text text-base font-extrabold bg-gradient-to-r from-slate-900 to-slate-750 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight font-poppins">
          Falkon Future X
        </span>
      )}
    </div>
  );
};

export default Logo;