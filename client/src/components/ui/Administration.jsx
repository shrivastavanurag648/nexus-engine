import { motion } from "framer-motion";
import { Key } from "lucide-react";

const Administration = () => {
  return (
    <section id="administration" className="relative min-h-[60vh] py-32 px-8 flex flex-col items-center justify-center text-center bg-black">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/30">
          <Key className="text-primary" size={28} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest text-[#E1E0CC] mb-6" style={{ fontFamily: 'Cinzel, serif' }}>WARDEN COMMAND</h2>
        <p className="text-[#E1E0CC]/60 leading-relaxed mb-10 max-w-xl">
          Access to the core allocation engine is strictly limited to authorized personnel.
          Wardens must authenticate via the secure gateway to manage spatial telemetry and student records.
        </p>
        <a href="/login" className="px-8 py-3 bg-primary text-black font-bold tracking-widest hover:bg-[#E1E0CC] transition-colors duration-300 rounded-sm">
          INITIALIZE LOGIN
        </a>
      </motion.div>
    </section>
  );
};
export default Administration;
