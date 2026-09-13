'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Image as ImageIcon, Settings, LifeBuoy, Sprout } from 'lucide-react';

const navItems = [
  { name: 'Command Center', href: '/reports', icon: LayoutDashboard },
  { name: 'Live Operations', href: '/operations', icon: Activity },
  { name: 'Detection Vault', href: '/gallery', icon: ImageIcon },
  { name: 'System Settings', href: '/settings', icon: Settings },
  { name: 'Operator Support', href: '/support', icon: LifeBuoy },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-zinc-950/80 backdrop-blur-2xl border-r border-white/5 flex flex-col hidden md:flex h-screen sticky top-0 z-40 select-none">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/50">
          <Sprout className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">REGRIS</h1>
          <p className="text-[10px] text-emerald-400 font-mono">EDGE TELEMETRY</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive ? 'text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            >
              {/* Framer Motion Sliding Active Background */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={20} className="relative z-10" />
              <span className="relative z-10 font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-black/50 border border-white/5 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-zinc-400 font-mono">SYSTEM ONLINE</span>
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
