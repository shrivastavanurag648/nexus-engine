import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/40 backdrop-blur-md border-b border-white/5 py-4 px-8 flex justify-between items-center transition-all duration-300">
      {/* Your Logo / Branding here */}
      <div className="text-emerald-500 font-mono-tactical tracking-widest uppercase font-bold text-lg">NEXUS</div>
      
      {/* Your Navigation Links */}
      <div className="flex gap-6">
        <a href="#overview" className="text-sm font-mono-tactical text-zinc-400 hover:text-emerald-400 transition-colors uppercase tracking-widest">System Overview</a>
        <a href="#telemetry" className="text-sm font-mono-tactical text-zinc-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">Telemetry</a>
        <a href="#security" className="text-sm font-mono-tactical text-zinc-400 hover:text-purple-400 transition-colors uppercase tracking-widest">Security</a>
        <a href="#administration" className="text-sm font-mono-tactical text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-widest">Administration</a>
      </div>
    </nav>
  );
}
