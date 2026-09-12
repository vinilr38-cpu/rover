"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

const telemetryData = [
  { time: "13:00", bandwidth: 0.82, ingressPkt: 1120, latency: 12 },
  { time: "13:05", bandwidth: 0.94, ingressPkt: 1240, latency: 11 },
  { time: "13:10", bandwidth: 1.15, ingressPkt: 1480, latency: 14 },
  { time: "13:15", bandwidth: 1.08, ingressPkt: 1390, latency: 10 },
  { time: "13:20", bandwidth: 1.42, ingressPkt: 1820, latency: 13 },
  { time: "13:25", bandwidth: 1.38, ingressPkt: 1750, latency: 12 },
  { time: "13:30", bandwidth: 1.65, ingressPkt: 2100, latency: 15 },
  { time: "13:35", bandwidth: 1.48, ingressPkt: 1940, latency: 11 },
  { time: "13:40", bandwidth: 1.72, ingressPkt: 2280, latency: 10 },
  { time: "13:45", bandwidth: 1.89, ingressPkt: 2450, latency: 12 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-[#09090B] border border-[#27272A] shadow-2xl font-mono text-xs space-y-1">
        <p className="text-zinc-400 font-bold border-b border-[#27272A] pb-1 mb-1">
          TIME: {label}
        </p>
        <p className="text-amber-400">
          BANDWIDTH: <span className="font-bold">{payload[0].value} GB/s</span>
        </p>
        <p className="text-cyan-400">
          INGRESS: <span className="font-bold">{payload[1].value} PKT/S</span>
        </p>
      </div>
    )
  }
  return null
}

export function TelemetryChart() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-64 w-full bg-[#09090B] border border-[#27272A] flex items-center justify-center font-mono text-xs text-zinc-500">
        LOADING_TELEMETRY_GRAPH...
      </div>
    )
  }

  return (
    <div className="w-full h-72 bg-[#09090B] border border-[#27272A] p-4 font-mono">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={telemetryData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#71717A"
            tick={{ fontSize: 10, fill: "#A1A1AA", fontFamily: "monospace" }}
            tickLine={false}
            axisLine={{ stroke: "#27272A" }}
          />
          <YAxis
            stroke="#71717A"
            tick={{ fontSize: 10, fill: "#A1A1AA", fontFamily: "monospace" }}
            tickLine={false}
            axisLine={{ stroke: "#27272A" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="bandwidth"
            name="Bandwidth (GB/s)"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 3, fill: "#F59E0B", strokeWidth: 0 }}
            activeDot={{ r: 5, stroke: "#F59E0B", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="ingressPkt"
            name="Ingress Packets"
            stroke="#06B6D4"
            strokeWidth={2}
            dot={{ r: 3, fill: "#06B6D4", strokeWidth: 0 }}
            activeDot={{ r: 5, stroke: "#06B6D4", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
