'use client';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock historical data for the chart
const historicalData = {
  days: [
    { time: 'Mon', infections: 12 }, { time: 'Tue', infections: 19 }, 
    { time: 'Wed', infections: 15 }, { time: 'Thu', infections: 22 }
  ],
  weeks: [
    { time: 'Week 1', infections: 85 }, { time: 'Week 2', infections: 110 }, 
    { time: 'Week 3', infections: 95 }, { time: 'Week 4', infections: 140 }
  ],
  months: [
    { time: 'June', infections: 400 }, { time: 'July', infections: 520 }, 
    { time: 'Aug', infections: 480 }, { time: 'Sept', infections: 610 }
  ]
};

export default function ReportsPage() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'days' | 'weeks' | 'months'>('days');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !db || !db.app) return;
    try {
      const roverRef = ref(db, 'REGRIS-01');
      const unsubscribe = onValue(roverRef, (snapshot) => {
        if (snapshot.val()) setTelemetry(snapshot.val());
      });
      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase listener error:", err);
    }
  }, []);

  if (!isMounted || !telemetry) return <div className="p-8 text-white font-mono">Connecting to Rover telemetry stream...</div>;

  return (
    <div className="p-6 space-y-6 text-white font-mono bg-[#09090B] min-h-screen">
      <h1 className="text-xl font-bold">REGRIS Command Center // Telemetry Feed</h1>
      
      {/* Existing KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <p className="text-xs text-zinc-400">BATTERY LEVEL</p>
          <p className="text-2xl font-bold text-emerald-400">{telemetry.hardware?.battery_pct ?? 0}%</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <p className="text-xs text-zinc-400">PESTICIDE TANK</p>
          <p className="text-2xl font-bold text-amber-400">{telemetry.hardware?.tank_pct ?? 0}%</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <p className="text-xs text-zinc-400">LATEST INFECTION</p>
          <p className="text-2xl font-bold text-red-500">{telemetry.ai_detection?.disease ?? "Healthy"}</p>
        </div>
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
          <p className="text-xs text-zinc-400">DOSAGE APPLIED</p>
          <p className="text-2xl font-bold">{telemetry.ai_detection?.dosage_ml ?? 0} ml</p>
        </div>
      </div>

      {/* Infection Analytics Chart */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-zinc-300">Infection Analytics</h2>
          <select 
            className="bg-zinc-800 border border-zinc-700 text-white text-sm p-2 rounded outline-none cursor-pointer"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'days' | 'weeks' | 'months')}
          >
            <option value="days">Past Days</option>
            <option value="weeks">Past Weeks</option>
            <option value="months">Past Months</option>
          </select>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="time" stroke="#A1A1AA" tick={{ fontSize: 12 }} />
              <YAxis stroke="#A1A1AA" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181B', border: '1px solid #27272A' }}
                itemStyle={{ color: '#DC2626' }}
              />
              <Line 
                type="monotone" 
                dataKey="infections" 
                stroke="#DC2626" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#DC2626' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
