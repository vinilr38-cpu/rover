"use client"

import * as React from "react"
import {
  Camera,
  Video,
  Maximize2,
  Volume2,
  VolumeX,
  Aperture,
  Radio,
  Layers,
  Circle,
  Eye
} from "lucide-react"

export function DualCameraToggle() {
  const [activeCam, setActiveCam] = React.useState<"CAM_01" | "CAM_02" | "PIP">("CAM_01")
  const [isAudioMuted, setIsAudioMuted] = React.useState(false)
  const [showGrid, setShowGrid] = React.useState(true)
  const [snapshotSuccess, setSnapshotSuccess] = React.useState(false)
  const [fps, setFps] = React.useState(60)

  // Simulated FPS fluctuations for realism
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const takeSnapshot = () => {
    setSnapshotSuccess(true)
    setTimeout(() => setSnapshotSuccess(false), 2000)
  }

  return (
    <div className="p-5 bg-[#0D0D11] border border-[#27272A] space-y-4 font-mono">
      {/* HUD Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          <h3 className="font-bold text-slate-100 text-xs flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-500" /> DUAL_CAM_OPTICAL_FEED
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono">[{activeCam}]</span>
        </div>

        {/* Camera Selector Switch Controls */}
        <div className="flex items-center gap-1.5 bg-[#09090B] border border-[#27272A] p-1 text-[11px]">
          <button
            onClick={() => setActiveCam("CAM_01")}
            className={`px-3 py-1 font-bold transition-all ${
              activeCam === "CAM_01"
                ? "bg-amber-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            CAM_01 [STAGE]
          </button>
          <button
            onClick={() => setActiveCam("CAM_02")}
            className={`px-3 py-1 font-bold transition-all ${
              activeCam === "CAM_02"
                ? "bg-cyan-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            CAM_02 [ENGINE]
          </button>
          <button
            onClick={() => setActiveCam("PIP")}
            className={`px-3 py-1 font-bold transition-all ${
              activeCam === "PIP"
                ? "bg-purple-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            PIP_MODE
          </button>
        </div>
      </div>

      {/* Main Video Viewport Window */}
      <div className="relative aspect-video w-full bg-[#060608] border border-[#27272A] overflow-hidden flex items-center justify-center select-none group">
        {/* Synthetic Camera Feed Graphic */}
        <div className="absolute inset-0 flex items-center justify-center">
          {activeCam === "CAM_01" && (
            <div className="relative w-full h-full bg-gradient-to-br from-amber-950/20 via-[#060608] to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500/50 mb-3 animate-pulse">
                <Aperture className="w-12 h-12" />
              </div>
              <span className="text-sm font-bold text-amber-400">CAM_01 // STAGE_OVERHEAD_FEED</span>
              <span className="text-[10px] text-zinc-500 mt-1">OPTICAL_ZOOM: 1.0X • SENSOR_TEMP: 34.2°C</span>
            </div>
          )}

          {activeCam === "CAM_02" && (
            <div className="relative w-full h-full bg-gradient-to-br from-cyan-950/20 via-[#060608] to-zinc-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-500/50 mb-3 animate-pulse">
                <Radio className="w-12 h-12" />
              </div>
              <span className="text-sm font-bold text-cyan-400">CAM_02 // ENGINE_ROOM_TELEMETRY</span>
              <span className="text-[10px] text-zinc-500 mt-1">OPTICAL_ZOOM: 2.4X • THERMAL_SCAN: OK</span>
            </div>
          )}

          {activeCam === "PIP" && (
            <div className="relative w-full h-full bg-[#060608]">
              {/* Primary View (CAM 01) */}
              <div className="w-full h-full bg-gradient-to-br from-amber-950/20 via-[#060608] to-zinc-950 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-400/80">PRIMARY: CAM_01</span>
              </div>
              {/* PiP Inset Window (CAM 02) */}
              <div className="absolute top-4 right-4 w-44 aspect-video bg-[#09090B] border-2 border-cyan-500/60 shadow-2xl flex flex-col items-center justify-center p-2">
                <span className="text-[10px] font-bold text-cyan-400">PIP: CAM_02</span>
                <span className="text-[8px] text-zinc-500">ENGINE_RUM</span>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Crosshair Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-700/80" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-700/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-amber-500/40 rounded-full" />
          </div>
        )}

        {/* HUD Top Corner Stats Overlay */}
        <div className="absolute top-3 left-3 bg-black/70 border border-[#27272A] px-2.5 py-1 text-[10px] text-zinc-300 flex items-center gap-2 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-bold text-red-400">REC</span>
          <span>1080P @ {fps}FPS</span>
        </div>

        <div className="absolute top-3 right-3 bg-black/70 border border-[#27272A] px-2.5 py-1 text-[10px] text-zinc-300 font-mono backdrop-blur-sm">
          LATENCY: 8ms
        </div>

        {/* HUD Bottom Corner Status Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/70 border border-[#27272A] px-2.5 py-1 text-[10px] text-amber-400 backdrop-blur-sm">
          STREAM_CODEC: H.265 / AV1
        </div>
      </div>

      {/* Camera Control Panel Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={takeSnapshot}
            className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:border-amber-500/60 flex items-center gap-1.5 transition-all text-xs"
          >
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            {snapshotSuccess ? "SNAPSHOT_SAVED!" : "CAPTURE_SNAPSHOT"}
          </button>

          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className={`px-3 py-1.5 border flex items-center gap-1.5 transition-all text-xs ${
              isAudioMuted
                ? "bg-red-500/10 border-red-500/40 text-red-400"
                : "bg-[#18181B] border-[#27272A] text-zinc-300 hover:text-white"
            }`}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" /> AUDIO_MUTED
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> AUDIO_ACTIVE
              </>
            )}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 border flex items-center gap-1.5 transition-all text-xs ${
              showGrid
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-[#18181B] border-[#27272A] text-zinc-400"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> GRID_OVERLAY
          </button>
        </div>

        <div className="text-[10px] text-zinc-500">
          FEED_PROTOCOL: RTSP / WebRTC TELEMETRY
        </div>
      </div>
    </div>
  )
}
