"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Send, AlertCircle, CheckCircle2 } from "lucide-react"

export default function SupportPage() {
  const [category, setCategory] = useState("Hardware Failure")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const generatedId = `TK-${Math.floor(100000 + Math.random() * 900000)}`
    setTicketId(generatedId)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setCategory("Hardware Failure")
    setSubject("")
    setMessage("")
    setIsSubmitted(false)
    setTicketId(null)
  }

  if (!isMounted) {
    return (
      <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen flex items-center justify-center text-xs text-amber-500">
        LOADING_SUPPORT_TERMINAL...
      </div>
    )
  }

  return (
    <div className="p-6 text-white font-mono bg-[#09090B] min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="text-amber-500" /> REGRIS // Operator Support
        </h1>

        {isSubmitted ? (
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                TICKET_RECORDED_SUCCESSFULLY
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Ticket Reference ID: <span className="text-amber-400 font-bold">{ticketId}</span>
              </p>
              <p className="text-xs text-zinc-500 max-w-md mx-auto pt-2">
                Dispatched to L3 engineering support desk. Active queue priority assigned.
              </p>
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono font-bold text-zinc-200 transition-colors cursor-pointer rounded"
              >
                SUBMIT ANOTHER TICKET
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">ISSUE CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded p-3 text-white outline-none focus:border-zinc-500 cursor-pointer"
              >
                <option value="Hardware Failure">Hardware Failure</option>
                <option value="AI Vision Anomaly">AI Vision Anomaly</option>
                <option value="Telemetry Desync">Telemetry Desync</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">SUBJECT</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Camera 2 Feed Latency"
                className="w-full bg-black border border-zinc-800 rounded p-3 text-white outline-none focus:border-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">DIAGNOSTIC MESSAGE</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the anomaly in detail..."
                className="w-full bg-black border border-zinc-800 rounded p-3 text-white outline-none focus:border-zinc-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-black font-bold py-3 px-6 rounded flex items-center gap-2 transition-colors w-full justify-center cursor-pointer"
            >
              <Send size={18} /> SUBMIT TICKET
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
