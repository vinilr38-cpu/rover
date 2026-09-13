'use client';
import { motion } from 'framer-motion';
import { MapPin, Clock, Download, AlertTriangle, Leaf } from 'lucide-react';

const mockPhotos = [
  { id: 'CAP-0942', disease: 'Severe Blight', severity: 'red', lat: '13.1245', lng: '77.5671', time: '10:42 AM', date: 'Sep 13' },
  { id: 'CAP-0941', disease: 'Mild Stress', severity: 'amber', lat: '13.1238', lng: '77.5680', time: '09:15 AM', date: 'Sep 13' },
  { id: 'CAP-0940', disease: 'Healthy Crop', severity: 'emerald', lat: '13.1221', lng: '77.5691', time: '08:30 AM', date: 'Sep 13' },
  { id: 'CAP-0939', disease: 'Pest Damage', severity: 'red', lat: '13.1250', lng: '77.5665', time: '07:45 AM', date: 'Sep 13' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function GalleryPage() {
  return (
    <div className="space-y-6 text-white font-mono h-full flex flex-col">
      <div className="flex justify-between items-center bg-zinc-950/50 backdrop-blur-md border border-white/5 p-4 rounded-xl shadow-xl">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Leaf className="text-emerald-500" size={20} /> 
          REGRIS // Detection Vault
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400">STORAGE: 142MB / 500MB</span>
          <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-emerald-500 w-[28%]" />
          </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {mockPhotos.map((photo) => (
          <motion.div 
            key={photo.id}
            variants={item}
            className="bg-zinc-950/50 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden flex flex-col group hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-emerald-900/10"
          >
            {/* Image Placeholder with Thermal/Scan Aesthetic */}
            <div className="h-48 bg-[#020202] flex items-center justify-center relative overflow-hidden">
               {/* Scanning Grid Background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
               
               <span className="text-zinc-700 font-bold tracking-widest z-10">{photo.id}</span>
               
               {/* Dynamic Severity Badge */}
               <span className={`absolute top-3 right-3 text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 backdrop-blur-md border ${
                 photo.severity === 'red' 
                   ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                   : photo.severity === 'amber'
                   ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                   : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
               }`}>
                 {photo.severity === 'emerald' ? <Leaf size={12} /> : <AlertTriangle size={12} />}
                 {photo.disease}
               </span>

               {/* Hover Overlay Action */}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                 <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/20 transition-all transform scale-75 group-hover:scale-100">
                   <Download size={18} />
                 </button>
               </div>
            </div>
            
            {/* Metadata Footer */}
            <div className="p-4 text-xs text-zinc-400 space-y-3 bg-gradient-to-t from-black/40 to-transparent">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin size={14} className="text-emerald-500" /> {photo.lat}, {photo.lng}
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-3">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-emerald-500" /> {photo.date} - {photo.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
