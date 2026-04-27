import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, Globe, Users, User, Database, TrendingUp } from 'lucide-react';

export default function Telemetry() {
  const navigate = useNavigate();
  const [globalStats, setGlobalStats] = useState({ male: 0, female: 0, total: 0, capacity: 0 });
  const [linkStatus, setLinkStatus] = useState('SYNCING');

  // The Engine Polling Logic (Fetches data from your Java backend)
  useEffect(() => {
    const fetchGlobalTelemetry = async () => {
      try {
        const [maleRes, femaleRes] = await Promise.all([
          fetch('http://localhost:8080/api/rooms/sector/male'),
          fetch('http://localhost:8080/api/rooms/sector/female')
        ]);

        if (maleRes.ok && femaleRes.ok) {
          const maleRooms = await maleRes.json();
          const femaleRooms = await femaleRes.json();

          const maleOcc = maleRooms.reduce((acc, room) => acc + room.occupancy, 0);
          const femaleOcc = femaleRooms.reduce((acc, room) => acc + room.occupancy, 0);
          const totalRooms = maleRooms.length + femaleRooms.length;

          setGlobalStats({
            male: maleOcc,
            female: femaleOcc,
            total: maleOcc + femaleOcc,
            capacity: totalRooms * 4 // Assuming 4 beds per room
          });
          setLinkStatus('SECURE');
        } else {
          throw new Error("Bad Link");
        }
      } catch (error) {
        console.error("Telemetry Link Severed");
        setLinkStatus('SEVERED');
      }
    };

    fetchGlobalTelemetry();
    const interval = setInterval(fetchGlobalTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic percentages for the cards
  const malePercent = globalStats.total > 0 ? ((globalStats.male / globalStats.total) * 100).toFixed(1) : "0.0";
  const femalePercent = globalStats.total > 0 ? ((globalStats.female / globalStats.total) * 100).toFixed(1) : "0.0";
  const capacityPercent = globalStats.capacity > 0 ? ((globalStats.total / globalStats.capacity) * 100).toFixed(1) : "0.0";

  return (
    <>
      <style>
        {`
          @keyframes soft-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          .animate-soft-pulse {
            animation: soft-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>

      <div className="min-h-dvh bg-[#0a0a0a] flex flex-col items-center justify-center py-16 px-6 md:px-12 lg:px-24 text-zinc-300 selection:bg-emerald-500/20 selection:text-emerald-300 relative overflow-hidden">

        {/* Ambient panning tactical grid */}
        <div className="absolute inset-0 bg-tactical-grid pointer-events-none" />

        <div className="w-full max-w-[1440px] flex flex-col gap-12 md:gap-16 pt-12">

          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-[#222222]">

            {/* Left: Title & Subtitle */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-emerald-500/80 font-mono-tactical text-xs tracking-[0.15em] uppercase">
                <Radar className="w-4 h-4 opacity-80" />
                <span>Real-Time Engine Diagnostics</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 uppercase font-sans">
                Global Telemetry
              </h1>
            </div>

            {/* Right: Status Indicator */}
            <div className="flex items-center gap-4 bg-[#111111] border border-[#222222] rounded-full px-5 py-2.5 shadow-sm">
              <div className="font-mono-tactical text-xs text-zinc-500 tracking-widest uppercase">
                Database Link
              </div>
              <div className="h-4 w-px bg-[#222222]"></div>
              <div className="flex items-center gap-2.5">
                {/* Muted Pulsing Dot */}
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className={`animate-soft-pulse absolute inline-flex h-3 w-3 rounded-full ${linkStatus === 'SECURE' ? 'bg-emerald-500/40' : linkStatus === 'SYNCING' ? 'bg-amber-500/40' : 'bg-red-500/40'}`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${linkStatus === 'SECURE' ? 'bg-emerald-400' : linkStatus === 'SYNCING' ? 'bg-amber-400' : 'bg-red-500'}`}></span>
                </div>
                <span className={`font-mono-tactical text-xs font-medium tracking-widest uppercase ${linkStatus === 'SECURE' ? 'text-emerald-400/90' : linkStatus === 'SYNCING' ? 'text-amber-400/90' : 'text-red-500/90'}`}>
                  {linkStatus}
                </span>
              </div>
            </div>
          </header>

          {/* DATA CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CARD 1: Global Population (Emerald) */}
            <div className="group relative bg-[#111111] border border-[#222222] rounded-xl p-8 transition-colors duration-300 hover:bg-[#141414] hover:border-[#333333] animate-fade-up" style={{ animationDelay: '0ms', opacity: 0 }}>
              <div className="absolute top-0 left-0 w-full h-px bg-emerald-500/30 group-hover:bg-emerald-500/60 transition-colors duration-300 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono-tactical text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Metric_ID: 0xGBL
                  </div>
                  <h3 className="font-mono-tactical text-xs text-zinc-300 tracking-widest uppercase">
                    Hostel Population
                  </h3>
                </div>
                <div className="text-emerald-500/60 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300 animate-[pulse_4s_ease-in-out_infinite]">
                  <Globe className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl xl:text-4xl font-semibold tracking-tight text-zinc-100 flex items-baseline gap-2">
                  {globalStats.total}
                  <span className="text-lg text-zinc-600 font-normal">/ {globalStats.capacity}</span>
                </div>
                <div className="mt-4 flex items-center justify-between font-mono-tactical text-[11px]">
                  <span className="text-emerald-400/80 uppercase tracking-widest">
                    Capacity Filled
                  </span>
                  <span className="text-zinc-500 tracking-widest">{capacityPercent}%</span>
                </div>
              </div>
            </div>

            {/* CARD 2: Male Sector (Cyan) */}
            <div 
              onClick={() => navigate('/dashboard/male')}
              className="group relative bg-[#111111] border border-[#222222] rounded-xl p-8 transition-colors duration-300 hover:bg-[#141414] hover:border-[#333333] animate-fade-up cursor-pointer" 
              style={{ animationDelay: '150ms', opacity: 0 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-cyan-500/30 group-hover:bg-cyan-500/60 transition-colors duration-300 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono-tactical text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Sector: Alpha_M
                  </div>
                  <h3 className="font-mono-tactical text-xs text-zinc-300 tracking-widest uppercase">
                    Male Sector
                  </h3>
                </div>
                <div className="text-cyan-500/60 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 animate-[pulse_4s_ease-in-out_infinite]">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl xl:text-4xl font-semibold tracking-tight text-zinc-100">
                  {globalStats.male}
                </div>
                <div className="mt-4 flex items-center justify-between font-mono-tactical text-[11px]">
                  <span className="text-cyan-400/80 uppercase tracking-widest">
                    Demographic Share
                  </span>
                  <span className="text-zinc-500 tracking-widest">{malePercent}%</span>
                </div>
              </div>
            </div>

            {/* CARD 3: Female Sector (Amber) */}
            <div 
              onClick={() => navigate('/dashboard/female')}
              className="group relative bg-[#111111] border border-[#222222] rounded-xl p-8 transition-colors duration-300 hover:bg-[#141414] hover:border-[#333333] animate-fade-up cursor-pointer" 
              style={{ animationDelay: '300ms', opacity: 0 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-amber-500/30 group-hover:bg-amber-500/60 transition-colors duration-300 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono-tactical text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Sector: Beta_F
                  </div>
                  <h3 className="font-mono-tactical text-xs text-zinc-300 tracking-widest uppercase">
                    Female Sector
                  </h3>
                </div>
                <div className="text-amber-500/60 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300 animate-[pulse_4s_ease-in-out_infinite]">
                  <User className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl xl:text-4xl font-semibold tracking-tight text-zinc-100">
                  {globalStats.female}
                </div>
                <div className="mt-4 flex items-center justify-between font-mono-tactical text-[11px]">
                  <span className="text-amber-400/80 uppercase tracking-widest">
                    Demographic Share
                  </span>
                  <span className="text-zinc-500 tracking-widest">{femalePercent}%</span>
                </div>
              </div>
            </div>

            {/* CARD 4: Server Status (White/Slate) */}
            <div className="group relative bg-[#111111] border border-[#222222] rounded-xl p-8 transition-colors duration-300 hover:bg-[#141414] hover:border-[#333333] animate-fade-up" style={{ animationDelay: '450ms', opacity: 0 }}>
              <div className="absolute top-0 left-0 w-full h-px bg-zinc-500/30 group-hover:bg-zinc-400/60 transition-colors duration-300 rounded-t-xl"></div>

              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono-tactical text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Node: MDB-CLUS-01
                  </div>
                  <h3 className="font-mono-tactical text-xs text-zinc-300 tracking-widest uppercase">
                    Server Status
                  </h3>
                </div>
                <div className="text-zinc-500 group-hover:text-zinc-300 group-hover:scale-110 transition-all duration-300 animate-[pulse_4s_ease-in-out_infinite]">
                  <Database className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-col gap-5 mt-1">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end font-mono-tactical text-[11px]">
                    <span className="text-zinc-500 tracking-widest uppercase">Health</span>
                    <span className="text-emerald-400/90 tracking-widest uppercase">Optimal</span>
                  </div>
                  <div className="h-1 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500/60 w-[98%] rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#222222] font-mono-tactical text-[11px]">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-600 uppercase tracking-widest">Latency</span>
                    <span className="text-cyan-400/90">12.4ms</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-zinc-600 uppercase tracking-widest">Uptime</span>
                    <span className="text-zinc-300">99.999%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}