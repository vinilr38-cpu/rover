'use client';
import { motion } from 'framer-motion';
import { Send, AlertCircle, LifeBuoy } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function SupportPage() {
  return (
    <div className="h-full flex flex-col text-white font-mono">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <div className="bg-zinc-950/50 backdrop-blur-md border border-white/5 p-6 rounded-xl shadow-xl">
          <h1 className="text-lg font-bold flex items-center gap-3">
            <LifeBuoy className="text-emerald-500" size={24} /> 
            REGRIS // Operator Support
          </h1>
          <p className="text-xs text-zinc-400 mt-2">Submit diagnostic logs and hardware anomaly reports directly to the engineering team.</p>
        </div>

        <motion.form 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-zinc-950/50 backdrop-blur-md border border-white/5 p-8 rounded-xl shadow-xl space-y-6"
        >
          <motion.div variants={item} className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Issue Category</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
              <option>Hardware Failure (Motors/Sensors)</option>
              <option>AI Vision Anomaly (YOLO-World)</option>
              <option>Telemetry Desync (Network)</option>
              <option>General Feedback</option>
            </select>
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
            <input 
              type="text" 
              placeholder="e.g., Camera 2 Feed Latency Spike" 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
            />
          </motion.div>

          <motion.div variants={item} className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Diagnostic Message</label>
            <textarea 
              rows={5}
              placeholder="Describe the anomaly, sector location, and exact time of occurrence..." 
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none placeholder:text-zinc-600"
            ></textarea>
          </motion.div>

          <motion.button 
            variants={item}
            type="button"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            TRANSMIT TICKET
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
