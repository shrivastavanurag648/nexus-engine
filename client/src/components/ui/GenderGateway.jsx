import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle } from 'lucide-react';

const GenderGateway = () => {
  const navigate = useNavigate();

  return (
    <div className="scanlines overflow-hidden min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white relative font-sans selection:bg-[#39ff14] selection:text-black">

      {/* Background Particles & Grids */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.05)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#39ff14]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff00ff]/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <main className="relative z-10 w-full max-w-[1440px] px-8 lg:px-24 flex flex-col items-center justify-center">

        {/* Header Area */}
        <header className="w-full flex flex-col items-center mb-16 relative">
          <div className="absolute -top-12 flex items-center gap-4 border border-[#39ff14]/40 bg-[#39ff14]/5 px-4 py-1 animate-pulse">
            <AlertTriangle className="text-[#39ff14] w-4 h-4" />
            <span className="font-mono text-xs text-[#39ff14] tracking-widest uppercase">System Directive Alpha-Omega</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-center mb-4" style={{ textShadow: '3px 0px 0px rgba(255, 0, 255, 0.7), -3px 0px 0px rgba(57, 255, 20, 0.7)' }}>
            Allocation Gateway
          </h1>
          <div className="flex items-center gap-6">
            <div className="w-24 h-1px bg-linear-to-r from-transparent to-white/50"></div>
            <h2 className="font-mono text-sm md:text-lg tracking-[0.4em] text-white/70 uppercase">Awaiting Sector Selection</h2>
            <div className="w-24 h-1px bg-linear-to-l from-transparent to-white/50"></div>
          </div>
        </header>

        {/* Portal Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">

          {/* Central Divider Line */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1px h-120% bg-linear-to-b from-transparent via-white/20 to-transparent pointer-events-none z-0"></div>
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 bg-[#050505] border border-white/20 text-[10px] font-mono text-white/50 z-10">OR</div>

          {/* CARD 1: MALE (ACID GREEN) */}
          <button onClick={() => navigate('/dashboard/male')} className="group relative block w-full aspect-4/3 outline-none z-10 text-left">
            <div className="absolute -inset-4 bg-[#39ff14]/0 group-hover:bg-[#39ff14]/20 blur-3xl rounded-[40px] transition-all duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 bg-zinc-800/80 group-hover:bg-[#39ff14] p-[2px] clip-cyber transition-all duration-300">
              <div className="absolute inset-[2px] bg-[#050505] clip-cyber-inner overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.15)_0%,transparent_100%)] transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-8 z-20">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-24 h-24 text-zinc-600 group-hover:text-[#39ff14] transition-all duration-300" style={{ filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.8))' }} />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-[0.15em] text-white/50 group-hover:text-white uppercase mb-2 transition-colors">Male Sector</h2>
                  <div className="mt-4 border border-zinc-700 bg-zinc-900/50 px-6 py-2 group-hover:border-[#39ff14] group-hover:bg-[#39ff14]/10 transition-all duration-300">
                    <span className="font-mono text-sm tracking-widest text-zinc-500 group-hover:text-[#39ff14] uppercase transition-colors">Wings A // B</span>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* CARD 2: FEMALE (ELECTRIC PINK) */}
          <button onClick={() => navigate('/dashboard/female')} className="group relative block w-full aspect-4/3 outline-none z-10 text-left">
            <div className="absolute -inset-4 bg-[#ff00ff]/0 group-hover:bg-[#ff00ff]/20 blur-3xl rounded-[40px] transition-all duration-500 pointer-events-none"></div>
            <div className="absolute inset-0 bg-zinc-800/80 group-hover:bg-[#ff00ff] p-[2px] clip-cyber transition-all duration-300">
              <div className="absolute inset-[2px] bg-[#050505] clip-cyber-inner overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.05)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15)_0%,transparent_100%)] transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-8 z-20">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-24 h-24 text-zinc-600 group-hover:text-[#ff00ff] transition-all duration-300" style={{ filter: 'drop-shadow(0 0 25px rgba(255,0,255,0.8))' }} />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-[0.15em] text-white/50 group-hover:text-white uppercase mb-2 transition-colors">Female Sector</h2>
                  <div className="mt-4 border border-zinc-700 bg-zinc-900/50 px-6 py-2 group-hover:border-[#ff00ff] group-hover:bg-[#ff00ff]/10 transition-all duration-300">
                    <span className="font-mono text-sm tracking-widest text-zinc-500 group-hover:text-[#ff00ff] uppercase transition-colors">Wings C // D</span>
                  </div>
                </div>
              </div>
            </div>
          </button>

        </div>
      </main>
    </div>
  );
};
export default GenderGateway;
