"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Activity,
  AlertOctagon,
  Scan,
  Compass,
  Radio,
  BatteryCharging,
  Aperture,
  Terminal as TerminalIcon,
  Wifi,
  ShieldAlert,
  Droplets,
  RotateCcw
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  disease: string
  severity: string
  dosageMl: number
  sprayed: boolean
}

export default function OperationsPage() {
  // 1. Camera Toggle State ('plant' | 'path')
  const [activeCam, setActiveCam] = useState<"plant" | "path">("plant")
  const [eStopTriggered, setEStopTriggered] = useState(false)
  const [ping, setPing] = useState(42)
  const [telemetry, setTelemetry] = useState<any>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Live Ping Indicator (mocked around 42ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(40 + Math.random() * 5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Firebase Listener for REGRIS-01 Telemetry Data
  useEffect(() => {
    if (typeof window === "undefined" || !db || !db.app) return

    try {
      const roverRef = ref(db, "REGRIS-01")
      const unsubscribe = onValue(roverRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setTelemetry(data)

          // Append terminal log entry every time database updates
          const now = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })

          const newLog: LogEntry = {
            id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            timestamp: now,
            disease: data.ai_detection?.disease ?? "Healthy",
            severity: data.ai_detection?.severity ?? "None",
            dosageMl: data.ai_detection?.dosage_ml ?? 0,
            sprayed: data.ai_detection?.sprayed ?? false,
          }

          setLogs((prev) => [newLog, ...prev.slice(0, 19)])
        }
      })

      return () => unsubscribe()
    } catch (err) {
      console.error("Firebase listener error:", err)
    }
  }, [])

  if (!isMounted || !telemetry) {
    return (
      <div className="space-y-6 font-mono text-xs select-none">
        {/* Top Status Bar Skeleton */}
        <div className="p-4 bg-[#0D0D11] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 bg-zinc-800" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 bg-zinc-800" />
              <Skeleton className="h-3.5 w-72 bg-zinc-800" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24 bg-zinc-800" />
            <Skeleton className="h-8 w-28 bg-zinc-800" />
            <Skeleton className="h-9 w-32 bg-zinc-800" />
          </div>
        </div>

        {/* Main Operations Grid: Video Container (2 cols) & Terminal Log Sidebar (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 16:9 Video Container Section Skeleton (2 cols) */}
          <div className="lg:col-span-2 space-y-4 p-5 bg-[#0D0D11] border border-[#27272A]">
            <div className="flex justify-between items-center border-b border-[#27272A] pb-3">
              <div className="flex gap-2">
                <Skeleton className="h-9 w-48 bg-zinc-800" />
                <Skeleton className="h-9 w-40 bg-zinc-800" />
              </div>
              <Skeleton className="h-4 w-32 bg-zinc-800" />
            </div>

            {/* 16:9 Video Stream Placeholder Skeleton */}
            <Skeleton className="relative aspect-video w-full bg-zinc-800 border border-[#27272A]" />
          </div>

          {/* Terminal-Style Log Component Sidebar Skeleton (1 col) */}
          <div className="p-5 bg-[#0D0D11] border border-[#27272A] flex flex-col space-y-3">
            <div className="flex justify-between items-center border-b border-[#27272A] pb-3">
              <Skeleton className="h-5 w-44 bg-zinc-800" />
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </div>

            <Skeleton className="flex-1 bg-zinc-800 min-h-[380px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  const batteryPct = telemetry?.hardware?.battery_pct ?? 84
  const roverId = "REGRIS-01"

  return (
    <div className="space-y-6 font-mono text-xs select-none">
      {/* 2. Top Status Bar */}
      <div className="p-4 bg-[#0D0D11] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100 uppercase tracking-wider">
                ROVER_ID: <span className="text-amber-500">{roverId}</span>
              </h1>
              <span className="text-[10px] px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-bold">
                LIVE_TELEMETRY
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              REALTIME NPU INFERENCE // FIREBASE TELEMETRY STREAM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Ping Indicator (around 42ms) */}
          <div className="px-3 py-1.5 bg-[#09090B] border border-[#27272A] flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-zinc-400">PING:</span>
            <span className="text-emerald-400 font-bold">{ping}ms</span>
          </div>

          {/* Live Battery Level from Firebase */}
          <div className="px-3 py-1.5 bg-[#09090B] border border-[#27272A] flex items-center gap-2">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-zinc-400">BATTERY:</span>
            <span className="text-emerald-400 font-bold">{batteryPct}%</span>
          </div>

          {/* Prominent Crimson E-STOP Button */}
          <button
            onClick={() => setEStopTriggered(!eStopTriggered)}
            className={`px-5 py-2 border font-extrabold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 transition-all cursor-pointer ${
              eStopTriggered
                ? "bg-red-700 border-red-400 text-white animate-pulse"
                : "bg-red-600 hover:bg-red-700 border-red-500 text-white"
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            {eStopTriggered ? "E-STOP [HALTED]" : "E-STOP"}
          </button>
        </div>
      </div>

      {/* Emergency Stop Active Alert Banner */}
      {eStopTriggered && (
        <div className="p-3 bg-red-950/90 border-2 border-red-500 text-red-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-bold">CRITICAL_HALT: EMERGENCY STOP ACTIVATED // MOTORS LOCKDOWN ENGAGED</span>
          </div>
          <button
            onClick={() => setEStopTriggered(false)}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] border border-red-400 cursor-pointer"
          >
            RESET_E-STOP
          </button>
        </div>
      )}

      {/* Main Grid: Camera Video Container (2 cols) & Terminal Log Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 16:9 Video Container Section (2 cols) */}
        <div className="lg:col-span-2 space-y-4 p-5 bg-[#0D0D11] border border-[#27272A]">
          {/* Camera Selection Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCam("plant")}
                className={`px-4 py-2 border font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeCam === "plant"
                    ? "bg-amber-500 border-amber-400 text-black shadow-lg"
                    : "bg-[#09090B] border-[#27272A] text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Scan className="w-4 h-4" /> PLANT DETECTION (YOLO-WORLD)
              </button>

              <button
                onClick={() => setActiveCam("path")}
                className={`px-4 py-2 border font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeCam === "path"
                    ? "bg-cyan-500 border-cyan-400 text-black shadow-lg"
                    : "bg-[#09090B] border-[#27272A] text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Compass className="w-4 h-4" /> PATH NAVIGATION
              </button>
            </div>

            <div className="text-[11px] text-zinc-400">
              ACTIVE_MODE: <strong className="text-slate-200 uppercase">{activeCam}</strong>
            </div>
          </div>

          {/* 3. Large Central 16:9 Video Container */}
          <div className="relative aspect-video w-full bg-[#060608] border-2 border-[#27272A] overflow-hidden flex items-center justify-center select-none group shadow-2xl">
            {/* Top Left Live Feed Tag */}
            <div className="absolute top-4 left-4 z-20 bg-[#09090B]/90 border border-[#27272A] px-3 py-1.5 text-xs text-zinc-300 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold text-red-400">LIVE</span>
              <span className="text-zinc-500">|</span>
              <span className="text-amber-400 font-bold uppercase">
                {activeCam === "plant" ? "CAM_01 // PLANT_YOLO_WORLD" : "CAM_02 // PATH_NAVIGATION_GRID"}
              </span>
            </div>

            {/* Top Right Specs Tag */}
            <div className="absolute top-4 right-4 z-20 bg-[#09090B]/90 border border-[#27272A] px-3 py-1.5 text-[10px] text-zinc-400 backdrop-blur-md">
              1080P @ 60FPS // H.265
            </div>

            {/* Dead Center Crosshair Reticle */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border border-white/40 rounded-full" />
                <div className="absolute top-1/2 left-[-12px] right-[-12px] h-[1px] bg-white/40 -translate-y-1/2" />
                <div className="absolute left-1/2 top-[-12px] bottom-[-12px] w-[1px] bg-white/40 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping" />
              </div>
            </div>

            {/* activeCam === 'plant': Dark overlay with green/amber bounding boxes simulating YOLO-World crop detection */}
            {activeCam === "plant" && (
              <div className="relative w-full h-full bg-gradient-to-br from-amber-950/20 via-[#060608] to-zinc-950 flex items-center justify-center p-6">
                <div className="relative w-full h-full border border-zinc-800 flex items-center justify-center">
                  {/* Bounding Box 1: Green (Healthy Crop) with Animated Pulse */}
                  <div className="absolute top-[16%] left-[18%] w-44 h-32 border-2 border-emerald-500 bg-emerald-500/10 p-1.5 flex flex-col justify-between shadow-lg animate-pulse">
                    <span className="bg-emerald-500 text-black text-[9px] font-bold px-1.5 py-0.5 self-start">
                      CROP_HEALTHY [98.4%]
                    </span>
                    <span className="text-[8px] text-emerald-400 self-end font-mono">GRID: A-12</span>
                  </div>

                  {/* Bounding Box 2: Amber (Mild / Weed) */}
                  <div className="absolute top-[38%] right-[20%] w-40 h-30 border-2 border-amber-500 bg-amber-500/10 p-1.5 flex flex-col justify-between shadow-lg">
                    <span className="bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 self-start">
                      MILD_STRESS [89.1%]
                    </span>
                    <span className="text-[8px] text-amber-400 self-end font-mono">GRID: C-04</span>
                  </div>

                  {/* Bounding Box 3: Crimson/Red (Severe Disease) */}
                  <div className="absolute bottom-[14%] left-[40%] w-48 h-32 border-2 border-red-500 bg-red-500/15 p-1.5 flex flex-col justify-between shadow-lg">
                    <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 self-start animate-pulse">
                      SEVERE_BLIGHT [94.2%]
                    </span>
                    <span className="text-[8px] text-red-400 self-end font-mono">DOSAGE: 15ml</span>
                  </div>

                  <div className="text-center space-y-1 z-10 pointer-events-none">
                    <Aperture className="w-10 h-10 text-amber-500/40 mx-auto animate-spin" style={{ animationDuration: "14s" }} />
                    <p className="text-xs font-bold text-amber-400">YOLO-WORLD CROP DETECTION ACTIVE</p>
                    <p className="text-[10px] text-zinc-500">INFERENCE: 14ms • CONFIDENCE &gt; 75%</p>
                  </div>
                </div>
              </div>
            )}

            {/* activeCam === 'path': Forward-facing grid overlay */}
            {activeCam === "path" && (
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-950/20 via-[#060608] to-zinc-950 flex items-center justify-center p-6">
                <div className="relative w-full h-full border border-zinc-800 flex items-center justify-center overflow-hidden">
                  {/* Forward-Facing Grid Lines Overlay */}
                  <div className="absolute inset-0 industrial-grid opacity-60" />

                  {/* Path Vector Center Lines */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/50" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/50" />

                  {/* Corridor Steering Box */}
                  <div className="w-80 h-48 border-2 border-dashed border-cyan-400 bg-cyan-500/5 p-3 flex flex-col justify-between shadow-xl">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="bg-cyan-500 text-black font-bold px-1.5 py-0.5">ALIGNMENT: OPTIMAL</span>
                      <span className="text-cyan-400 font-mono">CLEARANCE: 1.2m</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-cyan-400 font-mono">HEADING: 184° NNE</span>
                      <span className="text-emerald-400 font-mono">SPEED: 1.4 m/s</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 text-center z-10">
                    <p className="text-xs font-bold text-cyan-400">FORWARD-FACING PATH NAVIGATION GRID</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Scrolling Raw Hex & Telemetry Data Stream Ticker */}
            <div className="absolute bottom-10 left-0 right-0 z-20 bg-black/90 border-y border-[#27272A] py-1 overflow-hidden pointer-events-none font-mono text-[9px] text-emerald-400/90 flex whitespace-nowrap">
              <div className="animate-ticker space-x-6">
                <span>RAW_HEX: 0x41 0x72 0x64 0x75 0x69 0x6E 0x6F 0x5F 0x54 0x45 0x4C 0x45 0x4D 0x45 0x54 0x52 0x59</span>
                <span>•</span>
                <span>PACKET_TS: {new Date().toISOString()}</span>
                <span>•</span>
                <span>NPU_RAW: [0xFF, 0x00, 0x3E, 0x8A, 0x12, 0xC4, 0x9D, 0x77]</span>
                <span>•</span>
                <span>YOLO_INFERENCE: 14.2ms</span>
                <span>•</span>
                <span>GPS_RTK_FIX: DUAL_BAND_L1_L5</span>
                <span>•</span>
                <span>RAW_HEX: 0x41 0x72 0x64 0x75 0x69 0x6E 0x6F 0x5F 0x54 0x45 0x4C 0x45 0x4D 0x45 0x54 0x52 0x59</span>
                <span>•</span>
                <span>PACKET_TS: {new Date().toISOString()}</span>
                <span>•</span>
                <span>NPU_RAW: [0xFF, 0x00, 0x3E, 0x8A, 0x12, 0xC4, 0x9D, 0x77]</span>
                <span>•</span>
                <span>YOLO_INFERENCE: 14.2ms</span>
                <span>•</span>
                <span>GPS_RTK_FIX: DUAL_BAND_L1_L5</span>
              </div>
            </div>

            {/* Bottom HUD Bar inside Video Container */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center text-[10px] text-zinc-400 bg-[#09090B]/90 border border-[#27272A] px-3 py-1.5 backdrop-blur-md">
              <span>GPS: {telemetry?.gps?.lat?.toFixed(4) ?? "13.1234"}° N, {telemetry?.gps?.lng?.toFixed(4) ?? "77.5678"}° E</span>
              <span>TANK: {telemetry?.hardware?.tank_pct ?? 68}%</span>
              <span>STATE: {telemetry?.ai_detection?.sprayed ? "SPRAYING" : "SCANNING"}</span>
            </div>
          </div>
        </div>

        {/* 4. Terminal-Style Log Component Sidebar */}
        <div className="p-5 bg-[#0D0D11] border border-[#27272A] flex flex-col space-y-3">
          <div className="flex justify-between items-center border-b border-[#27272A] pb-3 text-xs">
            <span className="font-bold text-zinc-200 flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span>// REGRIS_TELEMETRY_LOGS</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE_STREAM
            </span>
          </div>

          <div className="flex-1 bg-[#060608] border border-[#27272A] p-3 font-mono text-[11px] space-y-2 overflow-y-auto max-h-[460px] min-h-[380px] shadow-inner">
            {logs.length === 0 ? (
              <div className="text-zinc-600 text-center py-10 animate-pulse">
                Listening for Firebase database updates...
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 bg-[#09090B] border border-[#27272A] space-y-1 transition-all hover:bg-[#0F0F13]"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span>[{log.timestamp}]</span>
                    <span
                      className={`font-bold ${
                        log.severity === "Severe"
                          ? "text-red-400"
                          : log.severity === "Mild"
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {log.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span>DISEASE: <strong className="text-zinc-100">{log.disease}</strong></span>
                    <span>DOSAGE: <strong className="text-amber-400">{log.dosageMl} ml</strong></span>
                  </div>

                  <div className="text-[9px] text-zinc-500 flex justify-between">
                    <span>SPRAYED: <span className={log.sprayed ? "text-cyan-400 font-bold" : "text-zinc-600"}>{log.sprayed ? "YES" : "NO"}</span></span>
                    <span>ROVER: REGRIS-01</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2 text-[10px] text-zinc-500 flex justify-between items-center border-t border-[#27272A]">
            <span>FIREBASE_PATH: /REGRIS-01</span>
            <span className="text-zinc-400 font-bold">TOTAL: {logs.length} LOGS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
