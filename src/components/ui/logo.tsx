import React from 'react';
import Image from 'next/image';

const Logo = ({ className, showText = false }: { className?: string; showText?: boolean }) => {
  return (
    <div className={`flex items-center space-x-3 ${className || ''}`}>
      <div className="relative w-16 h-16 transition-transform duration-300 hover:scale-110 hover:rotate-2">
        <Image 
          src="/Logo_F-1.png" 
          alt="Falkon Future X Logo" 
          width={80} 
          height={80}
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>
      {showText && (
        <span className="logo-text text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Falkon Future X
        </span>
      )}
    </div>
  );
};

export default Logo;