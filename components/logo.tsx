"use client";

import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer group select-none">
      {/* "imaging" text with exact matched gradient */}
      <span className="text-2xl md:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#D64351] via-[#8B64A3] to-[#3BA6C2]">
        imaging
      </span>

      {/* "iQ" Icon Box with exact matched gradient */}
      <div className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#D64351] via-[#7F619D] to-[#3BA6C2] rounded-xl shadow-lg shadow-cyan-900/20">
        <span className="text-white font-bold text-sm md:text-base leading-none">
          iQ
        </span>
        
        {/* The Sparkle icon matched to the logo's star position */}
        <Sparkles 
          className="absolute -top-1 -right-1 w-3 h-3 text-white fill-white drop-shadow-sm" 
          strokeWidth={3}
        />
      </div>
    </div>
  );
}