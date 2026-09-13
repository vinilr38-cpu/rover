"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Terminal,
  Activity,
  BarChart2,
  FolderGit2,
  HelpCircle,
  Settings,
  LogIn,
  Cpu,
  Radio,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "00 // COMMAND CENTER",
    href: "/",
    icon: Terminal,
    code: "CMD"
  },
  {
    title: "01 // OPERATIONS",
    href: "/operations",
    icon: Activity,
    code: "OPS"
  },
  {
    title: "02 // REPORTS & LOGS",
    href: "/reports",
    icon: BarChart2,
    code: "RPT"
  },
  {
    title: "03 // MEDIA VAULT",
    href: "/gallery",
    icon: FolderGit2,
    code: "VLT"
  },
  {
    title: "04 // SUPPORT HELPDESK",
    href: "/support",
    icon: HelpCircle,
    code: "SUP"
  },
  {
    title: "05 // CONFIGURATION",
    href: "/settings",
    icon: Settings,
    code: "CFG"
  },
  {
    title: "06 // GATEKEEPER AUTH",
    href: "/login",
    icon: LogIn,
    code: "AUTH"
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#09090B] border-r border-[#27272A] flex flex-col justify-between select-none font-mono text-xs">
      <div>
        {/* Industrial Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#27272A] bg-[#0D0D11]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500/10 border border-amber-500/40 text-amber-500 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-100 tracking-wider text-sm flex items-center gap-1.5">
                R01_NODE <span className="text-[10px] text-amber-500 font-normal">[v2.4]</span>
              </div>
              <div className="text-[9px] text-zinc-500 tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM_ONLINE
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="px-4 py-2 bg-[#09090B] border-b border-[#27272A] text-[10px] text-zinc-500 flex justify-between items-center font-mono">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> SYNCED
          </span>
          <span className="text-zinc-400">LATENCY: 12ms</span>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-2 py-1.5 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
            // NAV_SYSTEM_INDEX
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center justify-between px-3 py-2.5 border transition-all duration-200 ease-in-out font-mono",
                  isActive
                    ? "bg-[#042F2E] border-emerald-500/60 text-emerald-400 shadow-[inset_3px_0_0_#10B981]"
                    : "bg-[#09090B] border-[#27272A] text-zinc-400 hover:text-emerald-300 hover:bg-[#06201e] hover:border-emerald-800/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors duration-200",
                      isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-emerald-400"
                    )}
                  />
                  <span className="truncate tracking-tight font-medium text-[11px]">{item.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-[9px] px-1 py-0.5 border font-mono transition-colors duration-200",
                    isActive ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" : "border-[#27272A] text-zinc-600 group-hover:border-emerald-800/40 group-hover:text-emerald-400"
                  )}>
                    {item.code}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Industrial Footer Operator Card */}
      <div className="p-3 border-t border-[#27272A] bg-[#0D0D11]">
        <div className="p-2.5 border border-[#27272A] bg-[#09090B] flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center font-bold text-[10px]">
              OP
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-bold text-zinc-200 truncate">SYS_ADMIN</p>
              <p className="text-[9px] text-amber-500/90 truncate">CLEARANCE_L5</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-400" />
        </div>
      </div>
    </aside>
  )
}
