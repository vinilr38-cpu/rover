'use client';
import { motion } from 'framer-motion';
import { Save, Database, Network, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col text-white font-mono space-y-6">
      <div className="bg-zinc-950/50 backdrop-blur-md border border-white/5 p-6 rounded-xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-3">
            <SettingsIcon className="text-emerald-500" size={24} /> 
            REGRIS // System Configuration
          </h1>
          <p className="text-xs text-zinc-400 mt-2">Adjust core telemetry endpoints and data retention policies.</p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-emerald-900/50 transition-all flex items-center gap-2 cursor-pointer">
          <Save size={18} /> APPLY CONFIG
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Network Config */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950/50 backdrop-blur-md border border-white/5 p-6 rounded-xl shadow-xl space-y-6"
        >
          <h2 className="text-sm text-emerald-400 font-bold border-b border-white/10 pb-3 flex items-center gap-2">
            <Network size={18} /> NETWORK ROUTING
          </h2>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rover Firebase URL</label>
            <input 
              type="text" 
              defaultValue="https://regris-dashboard-default-rtdb.firebaseio.com/"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Rover Identifier</label>
            <input 
              type="text" 
              defaultValue="REGRIS-01"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Storage Config */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950/50 backdrop-blur-md border border-white/5 p-6 rounded-xl shadow-xl space-y-6"
        >
          <h2 className="text-sm text-emerald-400 font-bold border-b border-white/10 pb-3 flex items-center gap-2">
            <Database size={18} /> STORAGE & LOCALE
          </h2>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Interface Language</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
              <option>English (US)</option>
              <option>Hindi (हिंदी)</option>
              <option>Telugu (తెలుగు)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Auto-Deletion Timer (Vault)</label>
            <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all appearance-none cursor-pointer">
              <option>3 Days</option>
              <option>7 Days</option>
              <option>14 Days (Requires Pro)</option>
            </select>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
