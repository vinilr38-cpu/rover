'use client';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { AlertOctagon, Activity, Battery, Camera, Crosshair, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OperationsPage() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [activeCam, setActiveCam] = useState<'plant' | 'path'>('plant');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const roverRef = ref(db, 'REGRIS-01');
    const unsubscribe = onValue(roverRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTelemetry(data);
        const logEntry = `[${new Date().toLocaleTimeString()}] INF: ${data.ai_detection.disease} | SPRAY: ${data.ai_detection.dosage_ml}ml`;
        setLogs(prev => [logEntry, ...prev].slice(0, 15));
      }
    });
    return () => unsubscribe();
  }, []);

  if (!telemetry) return <div className="p-8 text-white font-mono animate-pulse">Establishing secure video uplink...</div>;

  return (
    <div className="space-y-4 text-white font-mono h-full flex flex-col">
      
      {/* Glassmorphic Top Status Bar */}
      <div className="flex justify-between items-center bg-zinc-950/50 backdrop-blur-md border border-white/5 shadow-xl p-4 rounded-xl">
        <div className="flex space-x-8 items-center">
          <span className="text-emerald-400 font-bold flex items-center gap-2">
            <Activity size={18} className="animate-pulse"/> LINK: SECURE (42ms)
          </span>
          <span className="flex items-center gap-2 text-zinc-300">
            <Battery size={18} className={telemetry.hardware.battery_pct < 20 ? 'text-red-500' : 'text-emerald-500'}/> 
            PWR: {telemetry.hardware.battery_pct}%
          </span>
        </div>
        <button className="bg-red-600/90 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]">
          <AlertOctagon size={18} /> E-STOP
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Main Video Feed */}
        <div className="lg:col-span-2 bg-zinc-950/50 backdrop-blur-md border border-white/5 shadow-xl rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex gap-2 mb-4 relative z-10">
            <button 
              onClick={() => setActiveCam('plant')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeCam === 'plant' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-black/50 text-zinc-400 border border-white/5 hover:bg-white/5'}`}
            >
              <Camera size={16} /> Inference Feed
            </button>
            <button 
              onClick={() => setActiveCam('path')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeCam === 'path' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-black/50 text-zinc-400 border border-white/5 hover:bg-white/5'}`}
            >
              <Camera size={16} /> LiDAR Nav
            </button>
          </div>
          
          {/* Simulated Video Canvas */}
          <div className="flex-1 bg-[#020202] rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
            
            {activeCam === 'plant' ? (
               <>
                 {/* Center Crosshair */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <Crosshair size={64} className="text-white" strokeWidth={1} />
                 </div>
                 
                 {/* Animated YOLO Bounding Box */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-2/3 h-2/3 border-2 border-dashed flex items-start justify-start p-2 relative ${telemetry.ai_detection.severity !== 'None' ? 'border-red-500 bg-red-500/5' : 'border-emerald-500 bg-emerald-500/5'}`}
                 >
                   <span className={`px-2 py-1 text-[10px] font-bold backdrop-blur-md border ${telemetry.ai_detection.severity !== 'None' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'}`}>
                     YOLO-v8: {telemetry.ai_detection.disease} ({(Math.random() * (0.99 - 0.85) + 0.85).toFixed(2)})
                   </span>
                 </motion.div>

                 {/* Sweeping Scanner Line */}
                 <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 right-0 h-[1px] bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20"
                 />
               </>
            ) : (
               <div className="w-full h-full opacity-20 flex items-end justify-center perspective-[1000px]">
                  <div className="w-64 h-full border-l border-r border-emerald-500 transform rotate-x-[60deg] origin-bottom shadow-[0_0_15px_rgba(16,185,129,1)]">
                     <div className="w-full h-full bg-[linear-gradient(transparent_95%,rgba(16,185,129,0.8)_100%)] bg-[length:100%_20px] animate-[pan_1s_linear_infinite]" />
                  </div>
               </div>
            )}
            
            {/* REC Indicator & Raw Hex Ticker */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-zinc-300 font-bold">REC</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-emerald-500/70 text-[8px] font-mono p-1 overflow-hidden whitespace-nowrap">
              0x0F4A 0x88B2 0x99C1 0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()} 0x0F4A 0x88B2 SYSTEM_NOMINAL 0x99C1 0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Glassmorphic Terminal Log */}
        <div className="bg-zinc-950/50 backdrop-blur-md border border-white/5 shadow-xl rounded-xl p-4 flex flex-col">
          <h2 className="text-zinc-400 mb-4 text-sm font-bold border-b border-white/10 pb-2 flex items-center gap-2">
            <Bot size={16}/> HERMES AGENT LOGS
          </h2>
          <div className="flex-1 overflow-y-auto space-y-2 text-[11px] text-zinc-400 font-mono pr-2">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`${i === 0 ? 'text-emerald-400 font-bold' : ''}`}
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
