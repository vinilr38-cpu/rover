"use client"

import * as React from "react"
import { MapPin, Clock, HardDrive, FolderGit2 } from "lucide-react"

interface Photo {
  id: number
  disease: string
  severity: "red" | "amber" | "emerald"
  lat: string
  lng: string
  time: string
  autoDeleteDays: number
  imgRef: string
}

const mockPhotos: Photo[] = [
  { id: 1, disease: "Severe Blight", severity: "red", lat: "13.1245", lng: "77.5671", time: "10:42 AM", autoDeleteDays: 5, imgRef: "IMG_REF_01" },
  { id: 2, disease: "Mild Stress", severity: "amber", lat: "13.1238", lng: "77.5680", time: "09:15 AM", autoDeleteDays: 5, imgRef: "IMG_REF_02" },
  { id: 3, disease: "Fungal Spot", severity: "red", lat: "13.1251", lng: "77.5665", time: "08:45 AM", autoDeleteDays: 4, imgRef: "IMG_REF_03" },
  { id: 4, disease: "Healthy Crop", severity: "emerald", lat: "13.1229", lng: "77.5692", time: "08:10 AM", autoDeleteDays: 4, imgRef: "IMG_REF_04" },
  { id: 5, disease: "Pest Activity", severity: "amber", lat: "13.1260", lng: "77.5658", time: "07:30 AM", autoDeleteDays: 3, imgRef: "IMG_REF_05" },
  { id: 6, disease: "Severe Rust", severity: "red", lat: "13.1215", lng: "77.5704", time: "06:55 AM", autoDeleteDays: 3, imgRef: "IMG_REF_06" },
  { id: 7, disease: "Chlorosis", severity: "amber", lat: "13.1272", lng: "77.5642", time: "06:20 AM", autoDeleteDays: 2, imgRef: "IMG_REF_07" },
  { id: 8, disease: "Healthy Crop", severity: "emerald", lat: "13.1208", lng: "77.5718", time: "05:40 AM", autoDeleteDays: 1, imgRef: "IMG_REF_08" },
]

export default function GalleryPage() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const getBadgeStyle = (severity: "red" | "amber" | "emerald") => {
    switch (severity) {
      case "red":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "amber":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "emerald":
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
    }
  }

  if (!isMounted) {
    return (
      <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen flex items-center justify-center text-xs text-amber-500">
        LOADING_DETECTION_VAULT...
      </div>
    )
  }

  return (
    <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-amber-500" />
            <span>REGRIS // Detection Vault</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            YOLO-WORLD CAPTURED PLANT IMAGERY & AUTO-DELETION TRACKER
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1 border border-zinc-800 rounded flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-amber-500" />
            <span>Storage capped at 500MB</span>
          </span>
        </div>
      </div>

      {/* Grid of Photo Cards (grid-cols-1 md:grid-cols-3 lg:grid-cols-4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden flex flex-col group hover:border-zinc-700 transition-colors shadow-lg"
          >
            {/* Image Placeholder Viewport Container */}
            <div className="h-40 bg-zinc-950 flex items-center justify-center relative border-b border-zinc-800 overflow-hidden select-none">
              {/* Plant Image Grid Graphic SVG */}
              <svg className="w-full h-full text-zinc-800/40" viewBox="0 0 200 100" fill="none">
                <rect width="200" height="100" fill="#060608" />
                <circle cx="100" cy="50" r="35" stroke={photo.severity === "red" ? "#EF4444" : photo.severity === "amber" ? "#F59E0B" : "#10B981"} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <path d="M70 70 Q100 20 130 70" stroke={photo.severity === "red" ? "#EF4444" : photo.severity === "amber" ? "#F59E0B" : "#10B981"} strokeWidth="1.5" fill="none" opacity="0.6" />
                <line x1="100" y1="0" x2="100" y2="100" stroke="#27272A" strokeDasharray="2 2" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#27272A" strokeDasharray="2 2" />
              </svg>

              {/* Center Image Reference Tag */}
              <span className="absolute text-zinc-600 font-bold text-xs tracking-wider group-hover:text-zinc-400 transition-colors">
                {photo.imgRef}
              </span>

              {/* Top Right Severity Badge */}
              <span
                className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded border backdrop-blur-md ${getBadgeStyle(
                  photo.severity
                )}`}
              >
                {photo.disease}
              </span>
            </div>

            {/* Metadata Footer */}
            <div className="p-3 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin size={12} className="text-amber-500 shrink-0" />
                <span>
                  {photo.lat}, {photo.lng}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-zinc-800/80">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Clock size={12} className="text-zinc-500 shrink-0" />
                  <span>{photo.time}</span>
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  Deletes in {photo.autoDeleteDays}d
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
