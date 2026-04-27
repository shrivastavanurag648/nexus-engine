import { Shield, Lock, Fingerprint, Database, EyeOff, FileText } from 'lucide-react';

export default function SecurityProtocols() {
  // The data array was missing in your snippet!
  const protocols = [
    {
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      title: "Zero-Trust Authentication",
      id: "AUTH-01",
      desc: "Powered by Spring Security. Operator access requires strict credential verification. Sector assignments are hard-locked to Warden ID profiles, preventing cross-sector contamination."
    },
    {
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      title: "Immutable Paper Trail",
      id: "AUDIT-09",
      desc: "Every tactical assignment, vacation, or system override is silently logged in MongoDB. Records include Operator ID, exact timestamps, and specific bed shifts. Logs cannot be altered or deleted."
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-500" />,
      title: "The Sledgehammer Init",
      id: "INIT-77",
      desc: "The Spring Boot engine self-heals the MongoDB collections upon startup. If the 24-room grid structure is corrupted, the Sledgehammer Protocol wipes and safely recreates the spatial mapping."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-purple-500" />,
      title: "Spatial Data Isolation",
      id: "ISO-44",
      desc: "Frontend state is strictly decoupled from the backend truth. The React HUD cannot hallucinate room data; it only reflects the confirmed physical state written securely to the hard drive."
    }
  ];

  return (
    <div className="w-full min-h-[100dvh] bg-[#0a0a0a] flex flex-col items-center pt-32 pb-24 px-6 md:px-12 lg:px-24 relative text-zinc-300 selection:bg-emerald-500/20 selection:text-emerald-300 overflow-hidden">

      {/* Ambient panning tactical grid */}
      <div className="absolute inset-0 bg-tactical-grid pointer-events-none" />

      <div className="w-full max-w-[1000px] flex flex-col gap-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-[#222222]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-emerald-500/80 font-mono-tactical text-xs tracking-[0.15em] uppercase">
              <Shield className="w-4 h-4 opacity-80" />
              <span>System Defenses</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 uppercase">
              Security Protocols
            </h1>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-4 bg-[#111111] border border-[#222222] rounded-full px-5 py-2.5 shadow-sm">
            <div className="font-mono-tactical text-xs text-zinc-500 tracking-widest uppercase">
              Threat Level
            </div>
            <div className="h-4 w-px bg-[#222222]"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-mono-tactical text-xs text-emerald-400/90 font-medium tracking-widest uppercase">
                Secured
              </span>
            </div>
          </div>
        </header>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {protocols.map((protocol, index) => (
            <div
              key={index}
              className="group relative bg-[#111111] border border-[#222222] rounded-xl p-8 transition-colors duration-300 hover:bg-[#141414] hover:border-[#333333] animate-fade-up"
              style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1.5">
                  <div className="font-mono-tactical text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                    Protocol: {protocol.id}
                  </div>
                  <h3 className="font-mono-tactical text-sm text-zinc-200 tracking-widest uppercase">
                    {protocol.title}
                  </h3>
                </div>
                <div className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 animate-[pulse_4s_ease-in-out_infinite]">
                  {protocol.icon}
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {protocol.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Warning */}
        <div className="mt-8 flex items-center justify-center gap-3 text-[10px] font-mono-tactical text-zinc-500 uppercase tracking-widest">
          <Fingerprint className="w-3 h-3" />
          <span>Unauthorized access attempts are logged and flagged to WDN-Alpha.</span>
        </div>

      </div>
    </div>
  );
}