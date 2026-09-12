"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Save, Database, Network, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [firebaseUrl, setFirebaseUrl] = useState(
    "https://regris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/"
  )
  const [roverId, setRoverId] = useState("REGRIS-01")
  const [language, setLanguage] = useState("English")
  const [autoDeleteTimer, setAutoDeleteTimer] = useState("7 Days")
  const [applied, setApplied] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setApplied(true)
    setTimeout(() => setApplied(false), 2500)
  }

  if (!isMounted) {
    return (
      <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen flex items-center justify-center text-xs text-amber-500">
        LOADING_SYSTEM_CONFIGURATION...
      </div>
    )
  }

  return (
    <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen space-y-6">
      <h1 className="text-xl font-bold">REGRIS // System Configuration</h1>

      <form onSubmit={handleApply} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Network Config */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-6">
            <h2 className="text-sm text-emerald-400 font-bold border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Network size={16} /> NETWORK ROUTING
            </h2>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase">ROVER FIREBASE URL</label>
              <input
                type="text"
                value={firebaseUrl}
                onChange={(e) => setFirebaseUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded p-2 text-white text-sm font-mono outline-none focus:border-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase">ROVER ID</label>
              <input
                type="text"
                value={roverId}
                onChange={(e) => setRoverId(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded p-2 text-white text-sm font-mono outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Storage & Localization */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-6">
            <h2 className="text-sm text-emerald-400 font-bold border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Database size={16} /> STORAGE & LOCALE
            </h2>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase">INTERFACE LANGUAGE</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded p-2 text-white text-sm font-mono outline-none focus:border-zinc-500 cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 uppercase">AUTO-DELETION TIMER (IMAGES)</label>
              <select
                value={autoDeleteTimer}
                onChange={(e) => setAutoDeleteTimer(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded p-2 text-white text-sm font-mono outline-none focus:border-zinc-500 cursor-pointer"
              >
                <option value="3 Days">3 Days</option>
                <option value="7 Days">7 Days</option>
                <option value="14 Days">14 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Apply Configuration Action */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-black font-bold py-2 px-6 rounded flex items-center gap-2 transition-colors cursor-pointer"
          >
            {applied ? (
              <>
                <CheckCircle2 size={18} /> CONFIGURATION APPLIED
              </>
            ) : (
              <>
                <Save size={18} /> APPLY CONFIGURATION
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
