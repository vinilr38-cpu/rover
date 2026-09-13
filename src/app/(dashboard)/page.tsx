"use client"

import * as React from "react"
import Link from "next/link"
import {
  Terminal,
  Activity,
  Cpu,
  Shield,
  Zap,
  Radio,
  Server,
  Database,
  ArrowUpRight,
  RefreshCw,
  AlertTriangle
} from "lucide-react"

export default function Home() {
  const [logs, setLogs] = React.useState([
    { time: "13:49:10", level: "INFO", message: "NODE_01 initialized in region us-east-1" },
    { time: "13:49:14", level: "SUCCESS", message: "WebRTC DTLS handshakes established across 12 channels" },
    { time: "13:49:20", level: "WARN", message: "Telemetry ingress spikes detected on PORT 8080" },
    { time: "13:49:25", level: "INFO", message: "System state synchronized with #27272A border tokens" },
  ])

  const addLog = () => {
    const times = new Date().toTimeString().split(" ")[0]
    const events = [
      "Process thread worker_4 heartbeat OK",
      "Bandwidth allocation optimized (1.4 GB/s)",
      "Garbage collection executed - freed 128 MB RAM",
      "Telemetry sync ACK received from edge cluster"
    ]
    const randomEvent = events[Math.floor(Math.random() * events.length)]
    setLogs(prev => [{ time: times, level: "INFO", message: randomEvent }, ...prev.slice(0, 5)])
  }

  return (
    <div className="space-y-6 font-mono">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#0D0D11] border border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <h1 className="text-xl font-bold text-slate-100 tracking-wider">
              COMMAND_CENTER // R01_NODE_ALPHA
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            STRICT_DARK_INDUSTRIAL_THEME • BG: #09090B • BORDER: #27272A
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={addLog}
            className="px-3 py-1.5 bg-[#18181B] border border-[#27272A] text-zinc-300 hover:text-white hover:border-amber-500/60 transition-all text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            PING_TELEMETRY
          </button>
          <Link
            href="/operations"
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all text-xs flex items-center gap-1.5"
          >
            LAUNCH_OPS <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Industrial Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "CPU_USAGE", val: "24.8%", unit: "4 CORES ACTIVE", icon: Cpu, color: "text-amber-500" },
          { title: "MEM_ALLOCATED", val: "4.2 / 16.0 GB", unit: "PAGED_POOL OK", icon: Database, color: "text-cyan-400" },
          { title: "INGRESS_RATE", val: "1,420 PKT/S", unit: "0 PACKET LOSS", icon: Radio, color: "text-emerald-400" },
          { title: "NODE_SECURITY", val: "LEVEL_5", unit: "ENCRYPTED_SRTP", icon: Shield, color: "text-purple-400" },
        ].map((metric, idx) => (
          <div key={idx} className="p-4 bg-[#0D0D11] border border-[#27272A] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-zinc-500 tracking-widest">{metric.title}</span>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </div>
            <div className="text-xl font-extrabold text-slate-100">{metric.val}</div>
            <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full" /> {metric.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Server Nodes & Terminal Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Node Matrix */}
        <div className="lg:col-span-2 p-5 bg-[#0D0D11] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-500" /> ACTIVE_INFRASTRUCTURE_NODES
            </h2>
            <span className="text-[10px] px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
              CLUSTER_HEALTHY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "NODE_US_EAST_01", region: "VIRGINIA", load: "34%", status: "ONLINE" },
              { id: "NODE_EU_WEST_01", region: "FRANKFURT", load: "52%", status: "ONLINE" },
              { id: "NODE_AP_SOUTH_01", region: "MUMBAI", load: "19%", status: "ONLINE" },
              { id: "NODE_SA_EAST_01", region: "SAO PAULO", load: "41%", status: "ONLINE" },
            ].map((node, i) => (
              <div key={i} className="p-3 bg-[#09090B] border border-[#27272A] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-200">{node.id}</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5">
                    {node.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-400">
                  <span>REGION: {node.region}</span>
                  <span>LOAD: {node.load}</span>
                </div>
                <div className="w-full bg-[#18181B] h-1.5 border border-[#27272A]">
                  <div className="bg-amber-500 h-full" style={{ width: node.load }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Telemetry Terminal Log */}
        <div className="p-5 bg-[#0D0D11] border border-[#27272A] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> SYSTEM_LOG_FEED
            </h2>
            <span className="text-[10px] text-zinc-500">TTY / DEV / CONSOLE</span>
          </div>

          <div className="bg-[#09090B] border border-[#27272A] p-3 space-y-2.5 font-mono text-[11px] h-60 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="border-b border-[#27272A]/40 pb-1.5 text-zinc-300">
                <span className="text-zinc-500">[{log.time}]</span>{" "}
                <span className={
                  log.level === "SUCCESS" ? "text-emerald-400 font-bold" :
                  log.level === "WARN" ? "text-amber-400 font-bold" : "text-cyan-400"
                }>
                  [{log.level}]
                </span>{" "}
                <span>{log.message}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-zinc-500 text-right">
            PRESS PING TO STIMULATE EVENT INGRESS
          </div>
        </div>
      </div>
    </div>
  )
}
