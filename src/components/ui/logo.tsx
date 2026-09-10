import React from 'react';
import Image from 'next/image';

const Logo = ({ className, showText = false, invert = false }: { className?: string; showText?: boolean; invert?: boolean }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className || ''}`}>
      <div className="relative w-8 h-8 rounded-md overflow-hidden bg-neutral-900 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Falkon Future X logo"
          width={26}
          height={26}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span
          className={`text-[15px] font-semibold tracking-tight ${
            invert ? 'text-white' : 'text-neutral-900'
          }`}
        >
          Falkon Future X
        </span>
      )}
    </div>
  );
};

export default Logo;
