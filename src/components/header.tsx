"use client"

import * as React from "react"
import { Bell, Wifi, AlertTriangle, AlertOctagon, ShieldAlert } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockAlerts = [
  {
    id: "ALT_01",
    title: "Obstacle Detected",
    subtitle: "Manual override requested at Sector 4. PATH_BLOCKAGE [0.8M]",
    time: "14:26:10",
    borderColor: "border-red-500/50",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    icon: AlertOctagon,
    camLabel: "CAM_02 [PATH_FRONT]",
    snapshotSvg: (
      <svg className="w-full h-full text-red-500/30" viewBox="0 0 100 50" fill="none">
        <rect width="100" height="50" fill="#060608" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="#27272A" strokeDasharray="2 2" />
        <rect x="35" y="10" width="30" height="30" stroke="#EF4444" strokeWidth="1.5" fill="rgba(239, 68, 68, 0.2)" />
        <text x="37" y="27" fill="#EF4444" fontSize="5" fontFamily="monospace" fontWeight="bold">OBSTACLE [0.8m]</text>
      </svg>
    )
  },
  {
    id: "ALT_02",
    title: "Low Pesticide Warning",
    subtitle: "Tank level at 12%. Refill required.",
    time: "14:18:42",
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    icon: AlertTriangle,
    camLabel: "SENSOR_OPTICAL_01",
    snapshotSvg: (
      <svg className="w-full h-full text-amber-500/30" viewBox="0 0 100 50" fill="none">
        <rect width="100" height="50" fill="#060608" />
        <rect x="20" y="35" width="60" height="10" fill="#F59E0B" opacity="0.4" />
        <rect x="20" y="10" width="60" height="35" stroke="#F59E0B" strokeWidth="1" />
        <text x="32" y="28" fill="#F59E0B" fontSize="5" fontFamily="monospace" fontWeight="bold">LEVEL: 12.0%</text>
      </svg>
    )
  },
  {
    id: "ALT_03",
    title: "High Leaf Infection Density",
    subtitle: "YOLO_WORLD: FUNGAL_BLIGHT [94.2%]",
    time: "14:05:18",
    borderColor: "border-red-500/50",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    icon: ShieldAlert,
    camLabel: "CAM_01 [YOLO_SPECTRUM]",
    snapshotSvg: (
      <svg className="w-full h-full text-red-500/30" viewBox="0 0 100 50" fill="none">
        <rect width="100" height="50" fill="#060608" />
        <circle cx="50" cy="25" r="18" stroke="#EF4444" strokeWidth="1.5" fill="rgba(239, 68, 68, 0.15)" strokeDasharray="3 2" />
        <text x="36" y="27" fill="#EF4444" fontSize="5" fontFamily="monospace" fontWeight="bold">BLIGHT [94.2%]</text>
      </svg>
    )
  },
  {
    id: "ALT_04",
    title: "Battery Threshold Alert",
    subtitle: "MAIN_CELL_VOLTAGE_DROP // 18.2V",
    time: "13:52:04",
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    icon: AlertTriangle,
    camLabel: "TELEMETRY_MOD_04",
    snapshotSvg: (
      <svg className="w-full h-full text-amber-500/30" viewBox="0 0 100 50" fill="none">
        <rect width="100" height="50" fill="#060608" />
        <rect x="15" y="15" width="70" height="20" stroke="#F59E0B" strokeWidth="1" />
        <rect x="18" y="18" width="14" height="14" fill="#F59E0B" opacity="0.6" />
        <text x="36" y="28" fill="#F59E0B" fontSize="5" fontFamily="monospace" fontWeight="bold">VOLTAGE: 18.2V</text>
      </svg>
    )
  },
]

export function Header() {
  const [roverIp, setRoverIp] = React.useState("192.168.1.105")
  const [isConnected, setIsConnected] = React.useState(true)
  const [notificationsCount, setNotificationsCount] = React.useState(4)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="h-16 shrink-0 z-30 bg-[#0D0D11]/90 border-b border-white/5 px-6 flex items-center justify-between font-mono text-xs backdrop-blur-md select-none w-full">
      {/* Rover IP/ID Input Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#09090B] border border-[#27272A] px-3 py-1.5 focus-within:border-amber-500 transition-colors">
          <Wifi className={`w-3.5 h-3.5 ${isConnected ? "text-emerald-400 animate-pulse" : "text-zinc-500"}`} />
          <span className="text-[10px] text-zinc-500 font-bold">ROVER_IP_ID:</span>
          <input
            type="text"
            value={roverIp}
            onChange={(e) => setRoverIp(e.target.value)}
            placeholder="192.168.1.XXX or ROVER_ID"
            className="bg-transparent text-xs text-amber-400 font-bold focus:outline-none w-44 tracking-wider"
          />
        </div>

        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`px-2.5 py-1.5 border font-bold text-[10px] uppercase transition-all cursor-pointer ${
            isConnected
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
              : "bg-red-500/10 border-red-500/40 text-red-400"
          }`}
        >
          {isConnected ? "LINK_ACTIVE [200 OK]" : "DISCONNECTED"}
        </button>
      </div>

      {/* Right Controls: Notifications Bell wrapped in Sheet Component */}
      <div className="flex items-center gap-4">
        {isMounted && (
          <Sheet>
            <SheetTrigger asChild>
              <button
                onClick={() => setNotificationsCount(0)}
                className="relative p-2 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                title="System Alerts"
              >
                <Bell size={20} className="text-zinc-300" />
                {notificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                )}
              </button>
            </SheetTrigger>

            {/* Slide-out Sheet Content (Right Drawer) */}
            <SheetContent side="right" className="bg-[#09090B] border-l border-zinc-800 text-zinc-300 w-full sm:max-w-md p-6 font-mono">
              <SheetHeader>
                <SheetTitle className="text-white font-mono text-base font-bold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" /> System Alerts
                </SheetTitle>
                <SheetDescription className="text-zinc-400 text-xs mt-1">
                  REALTIME CRITICAL & WARN TELEMETRY ALERTS
                </SheetDescription>
              </SheetHeader>

              {/* Scrollable Alerts List */}
              <ScrollArea className="h-[calc(100vh-130px)] mt-6 pr-3">
                <div className="space-y-4">
                  {mockAlerts.map((alert) => {
                    const Icon = alert.icon
                    return (
                      <div
                        key={alert.id}
                        className={`p-3.5 border ${alert.borderColor} ${alert.bgColor} rounded space-y-2.5 transition-all hover:bg-zinc-900/60`}
                      >
                        {/* Alert Card Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <Icon className={`${alert.textColor} shrink-0`} size={18} />
                            <div>
                              <p className={`${alert.textColor} font-bold text-sm`}>{alert.title}</p>
                              <p className="text-zinc-400 text-xs mt-1">{alert.subtitle}</p>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-zinc-400 bg-[#09090B] px-1.5 py-0.5 border border-zinc-800 shrink-0">
                            {alert.time}
                          </span>
                        </div>

                        {/* Camera Snapshot Placeholder Image */}
                        <div className="relative aspect-[2/1] w-full bg-[#060608] border border-zinc-800 rounded overflow-hidden flex items-center justify-center">
                          {alert.snapshotSvg}
                          <span className="absolute bottom-1 left-1 bg-black/80 text-[8px] text-zinc-400 px-1 py-0.5 border border-zinc-800">
                            {alert.camLabel}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        )}

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#27272A]">
          <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/40 text-amber-500 font-bold flex items-center justify-center text-xs shadow-sm">
            OP
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              SYS_ADMIN <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </div>
            <div className="text-[9px] text-zinc-500 font-mono tracking-wider">
              CLEARANCE_L5
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
