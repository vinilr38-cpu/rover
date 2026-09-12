"use client"

import * as React from "react"
import { Bot, Send, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  sender: "user" | "hermes"
  text: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: "m1",
    sender: "hermes",
    text: "System online. Hermes Agent v3.5 connected to ROVER_01 telemetry. How can I assist with field operations, crop vision analysis, or spray diagnostics today?",
    timestamp: "14:40:02",
  },
  {
    id: "m2",
    sender: "user",
    text: "What is the current infection severity status in Field Alpha, Sector 4?",
    timestamp: "14:41:15",
  },
  {
    id: "m3",
    sender: "hermes",
    text: "YOLO-World NPU scan complete for Field Alpha Sec 04: Detected 1,420 plant targets. 14.2% show fungal blight symptoms (Crimson alert). Recommended spray dose: 4.2 L/ha.",
    timestamp: "14:41:18",
  },
]

export function HermesChatFab() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
      timestamp: now,
    }

    setMessages((prev) => [...prev, userMsg])
    const query = inputValue.trim().toLowerCase()
    setInputValue("")
    setIsTyping(true)

    // Simulate Hermes Agent intelligence response
    setTimeout(() => {
      let botResponse =
        "Acknowledged. Telemetry parameters logged and verified across ROVER_01 NPU data stream."

      if (
        query.includes("battery") ||
        query.includes("power") ||
        query.includes("voltage")
      ) {
        botResponse =
          "BATTERY STATUS: Main cell at 84.5% (4.2V/cell charging). Estimated remaining operational runtime: 4h 12m."
      } else if (
        query.includes("spray") ||
        query.includes("pesticide") ||
        query.includes("tank")
      ) {
        botResponse =
          "TANK TELEMETRY: Pesticide level at 68.0% (13.6 L remaining). Flow rate set to 1.8 L/min."
      } else if (
        query.includes("gps") ||
        query.includes("location") ||
        query.includes("rover")
      ) {
        botResponse =
          "GPS FIX: RTK Dual-Band Lock at 37.7749° N, 122.4194° W (Field Alpha Sec 04)."
      } else if (
        query.includes("hello") ||
        query.includes("hi") ||
        query.includes("hermes")
      ) {
        botResponse =
          "Greetings, Operator. All systems operational. State your command or query."
      }

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: "hermes",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 900)
  }

  if (!isMounted) return null

  return (
    <Sheet>
      {/* Floating Action Button (FAB) Fixed Bottom Right */}
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-amber-500 hover:bg-amber-400 text-black rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-amber-300/50 cursor-pointer group"
          title="Open Hermes Agent Chat"
        >
          <Bot className="w-6 h-6 shrink-0 text-black group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline font-mono font-extrabold text-xs tracking-wide uppercase pr-1">
            HERMES_AI
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-950 border border-emerald-400 bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
        </button>
      </SheetTrigger>

      {/* Slide-Out Chat Drawer Sheet */}
      <SheetContent
        side="right"
        className="bg-[#09090B] border-l border-[#27272A] w-full sm:max-w-md p-0 flex flex-col font-mono text-xs"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-[#27272A] bg-[#0D0D11]">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-zinc-100 text-sm font-bold flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-500" />
              <span>HERMES_AGENT // COPILOT</span>
            </SheetTitle>
            <span className="text-[9px] px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 uppercase">
              MODEL: HERMES-3.5
            </span>
          </div>
          <SheetDescription className="text-zinc-400 text-[10px] mt-1">
            AUTONOMOUS ROVER INTELLIGENCE & TELEMETRY COPILOT
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Message Area */}
        <div className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-[calc(100vh-170px)] pr-3">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col space-y-1 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
                    {msg.sender === "user" ? (
                      <>
                        <span>OPERATOR</span>
                        <User className="w-3 h-3 text-zinc-400" />
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3 text-amber-500" />
                        <span className="text-amber-400 font-bold">
                          HERMES_AI
                        </span>
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 text-xs max-w-[85%] border leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
                        : "bg-[#0D0D11] border-[#27272A] text-zinc-200 shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] animate-pulse p-2">
                  <Bot className="w-3.5 h-3.5 text-amber-500" />
                  <span>HERMES IS ANALYZING TELEMETRY...</span>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Fixed Input Field at the Bottom */}
        <div className="p-3 border-t border-[#27272A] bg-[#0D0D11]">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Hermes Agent... (e.g., check spray rate)"
              className="flex-1 bg-[#09090B] border-[#27272A] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus-visible:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
