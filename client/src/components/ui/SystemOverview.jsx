import { Database, Shield, LayoutGrid } from 'lucide-react';

export default function SystemOverview() {
  return (
    <div className="w-full min-h-dvh bg-[#0d0f12] flex flex-col pt-24 pb-12 px-8 relative overflow-hidden">
      {/* Animated panning tactical grid */}
      <div className="absolute inset-0 bg-tactical-grid pointer-events-none" />

      <div className="z-10 max-w-4xl text-center mx-auto">
        <h2 className="text-[10px] font-mono text-emerald-500 tracking-[0.5em] uppercase mb-4">
          Core Architecture
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          NEXUS Tactical Engine
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-16">
          A high-security, persistent spatial management system. NEXUS abandons traditional spreadsheet interfaces in favor of a real-time, MongoDB-backed visual grid, giving Wardens absolute situational awareness.
        </p>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Pillar 1: Persistent Spatial Mapping */}
          <div className="group bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:bg-emerald-950/30 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 animate-fade-up" style={{ animationDelay: '0ms', opacity: 0 }}>
            <Database className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-emerald-50 font-bold tracking-wide mb-2 uppercase text-xs">Persistent Spatial Mapping</h3>
            <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
              Real-time synchronization with MongoDB. Every tactical adjustment is instantly written to the database, ensuring immutable record-keeping and absolute grid accuracy.
            </p>
          </div>

          {/* Pillar 2: Dynamic Thermal Telemetry */}
          <div className="group bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:bg-amber-950/30 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500 animate-fade-up" style={{ animationDelay: '150ms', opacity: 0 }}>
            <LayoutGrid className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-amber-50 font-bold tracking-wide mb-2 uppercase text-xs">Dynamic Thermal Telemetry</h3>
            <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
              Live visual feedback. The HUD utilizes a 5-stage thermal gradient to instantly communicate density and capacity across all active sectors.
            </p>
          </div>

          {/* Pillar 3: The Sledgehammer Protocol */}
          <div className="group bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 animate-fade-up" style={{ animationDelay: '300ms', opacity: 0 }}>
            <Shield className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-cyan-50 font-bold tracking-wide mb-2 uppercase text-xs">The Sledgehammer Protocol</h3>
            <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
              Powered by Spring Boot 4.0. The engine self-heals and secures the 24-room grid configuration upon initialization, preventing critical data corruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
