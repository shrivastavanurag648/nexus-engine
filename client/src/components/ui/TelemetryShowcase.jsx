import { motion } from "framer-motion";

const TelemetryShowcase = () => {
  const stats = [
    { label: "Total Capacity", value: "48 Beds", status: "Verified" },
    { label: "Occupancy Rate", value: "12.5%", status: "Stable" },
    { label: "Live Availability", value: "42 Beds", status: "Open" }
  ];

  return (
    <section id="telemetry" className="relative min-h-screen py-32 px-8 overflow-hidden flex flex-col justify-center">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            LIVE SYSTEM TELEMETRY
          </h2>
          <div className="h-px w-32 bg-cyan-400 opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
              <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative bg-white/5 backdrop-blur-lg border border-cyan-500/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-linear-to-b from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <p className="text-cyan-100/60 text-sm tracking-widest uppercase mb-2 relative z-10">{stat.label}</p>
              <p className="text-5xl font-light text-cyan-400 mb-4 relative z-10" style={{ fontFamily: 'Cinzel, serif' }}>{stat.value}</p>
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-xs text-cyan-100/40 uppercase tracking-wider">{stat.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelemetryShowcase;
