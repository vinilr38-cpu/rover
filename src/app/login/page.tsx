"use client"

import * as React from "react"
import Link from "next/link"
import { Shield, Key, Lock, Terminal, ArrowRight, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const [operatorId, setOperatorId] = React.useState("OP-9942")
  const [accessKey, setAccessKey] = React.useState("")
  const [authStatus, setAuthStatus] = React.useState<"IDLE" | "AUTHENTICATING" | "SUCCESS">("IDLE")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthStatus("AUTHENTICATING")
    setTimeout(() => {
      setAuthStatus("SUCCESS")
    }, 1200)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center font-mono">
      <div className="w-full max-w-md bg-[#0D0D11] border border-[#27272A] p-6 space-y-6 shadow-2xl relative">
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500" />

        <div className="border-b border-[#27272A] pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <div>
              <h1 className="font-bold text-slate-100 text-sm">GATEKEEPER_AUTH // R01</h1>
              <p className="text-[10px] text-zinc-500">CLEARANCE PROTOCOL L5</p>
            </div>
          </div>
          <span className="text-[9px] border border-amber-500/40 text-amber-400 bg-amber-500/10 px-2 py-0.5">
            RESTRICTED
          </span>
        </div>

        {authStatus === "SUCCESS" ? (
          <div className="p-6 bg-[#09090B] border border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">AUTHENTICATION_GRANTED</h3>
            <p className="text-xs text-zinc-400">OPERATOR: {operatorId} VERIFIED</p>
            <div className="pt-2">
              <Link
                href="/operations"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all"
              >
                PROCEED TO OPERATIONS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-500" /> OPERATOR_ID
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                required
                className="w-full bg-[#09090B] border border-[#27272A] px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" /> ACCESS_KEY_TOKEN
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="••••••••••••••••"
                required
                className="w-full bg-[#09090B] border border-[#27272A] px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 font-mono placeholder:text-zinc-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={authStatus === "AUTHENTICATING"}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {authStatus === "AUTHENTICATING" ? (
                  <>VERIFYING_CREDENTIALS...</>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> AUTHENTICATE_SESSION
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="text-[10px] text-zinc-600 text-center border-t border-[#27272A] pt-3">
          SECURE ENCRYPTED INGRESS // PORT 443 // HARDWARE ID MATCHED
        </div>
      </div>
    </div>
  )
}
