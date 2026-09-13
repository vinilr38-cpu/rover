'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Download } from 'lucide-react';

// Dynamically import RoverMap with { ssr: false } to prevent window undefined errors
const RoverMap = dynamic(() => import('@/components/RoverMap'), { ssr: false });

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
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

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

  const exportPDF = async () => {
    if (!reportRef.current || isExporting) return;
    setIsExporting(true);
    try {
      // Dynamically import client-only PDF generation libraries
      const { jsPDF } = await import('jspdf');
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;

      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#09090B',
        scale: 2,
        useCORS: true,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('REGRIS_Telemetry_Report.pdf');
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isMounted || !telemetry) {
    return (
      <div className="p-6 space-y-6 text-white font-mono bg-[#09090B] min-h-screen">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-80 bg-zinc-800" />
          <Skeleton className="h-9 w-36 bg-zinc-800" />
        </div>
        
        {/* KPI Cards Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-20 w-full bg-zinc-800 rounded border border-zinc-800/80" />
          <Skeleton className="h-20 w-full bg-zinc-800 rounded border border-zinc-800/80" />
          <Skeleton className="h-20 w-full bg-zinc-800 rounded border border-zinc-800/80" />
          <Skeleton className="h-20 w-full bg-zinc-800 rounded border border-zinc-800/80" />
        </div>

        {/* Infection Analytics Chart Container Skeleton */}
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-44 bg-zinc-800" />
            <Skeleton className="h-9 w-32 bg-zinc-800" />
          </div>
          <Skeleton className="h-72 w-full bg-zinc-800" />
        </div>

        {/* Map & Mission Log Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full bg-zinc-800 rounded border border-zinc-800/80" />
          <Skeleton className="h-80 w-full bg-zinc-800 rounded border border-zinc-800/80" />
        </div>
      </div>
    );
  }

  const roverLat = telemetry.gps?.lat ?? 13.1234;
  const roverLng = telemetry.gps?.lng ?? 77.5678;

  return (
    <div className="p-6 space-y-6 text-white font-mono bg-[#09090B] min-h-screen">
      {/* Top Header with Page Title & Emerald-Outlined Download PDF Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold">REGRIS Command Center // Telemetry Feed</h1>
        <button
          onClick={exportPDF}
          disabled={isExporting}
          className="px-4 py-2 border border-emerald-500/60 hover:bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Download size={16} className={isExporting ? "animate-bounce" : ""} />
          <span>{isExporting ? "EXPORTING_PDF..." : "Download PDF"}</span>
        </button>
      </div>

      {/* Printable Report Content Container (KPI Cards, Chart, and Map/Log Grid) */}
      <div ref={reportRef} className="space-y-6 bg-[#09090B] p-2 rounded">
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

        {/* Dynamic Map & Mission Log 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Dynamic RoverMap inside h-80 border-zinc-800 Container */}
          <div className="h-80 w-full bg-zinc-900 border border-zinc-800 rounded overflow-hidden relative">
            <RoverMap lat={roverLat} lng={roverLng} />
          </div>

          {/* Right Column: Mission Log Card Terminal-Style List */}
          <div className="h-80 p-5 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between font-mono">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 border-b border-zinc-800 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                // MISSION_LOG // RTK_TELEMETRY
              </h3>
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500">ROVER_ID:</span>
                  <span className="font-bold text-white">{telemetry.rover_id ?? "REGRIS-01"}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500">GPS_LATITUDE:</span>
                  <span className="font-bold text-emerald-400">{roverLat}° N</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500">GPS_LONGITUDE:</span>
                  <span className="font-bold text-emerald-400">{roverLng}° E</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500">TIMESTAMP:</span>
                  <span className="font-bold text-amber-400">{telemetry.timestamp ?? "14:40:02"}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500">RTK_FIX_STATUS:</span>
                  <span className="font-bold text-cyan-400">DUAL_BAND_LOCK_OK</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono text-right border-t border-zinc-800 pt-2">
              TELEMETRY_PATH: /REGRIS-01/gps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
