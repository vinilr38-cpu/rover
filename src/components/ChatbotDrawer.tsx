'use client';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, Send, Bot, Loader2 } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { GoogleGenAI } from '@google/genai';

export default function ChatbotDrawer() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hermes Agent initialized. Monitoring telemetry. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. Listen to Firebase for context
  useEffect(() => {
    const roverRef = ref(db, 'REGRIS-01');
    const unsubscribe = onValue(roverRef, (snapshot) => {
      if (snapshot.val()) setTelemetry(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  // 2. Initialize Gemini Client
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 3. Construct the prompt with live telemetry injected
      const systemPrompt = `You are Hermes, the diagnostic AI for the REGRIS agricultural rover.
      Here is the current live telemetry from the rover:
      Battery: ${telemetry?.hardware?.battery_pct || 'Unknown'}%
      Pesticide Tank: ${telemetry?.hardware?.tank_pct || 'Unknown'}%
      Latest Disease Detected: ${telemetry?.ai_detection?.disease || 'Unknown'}
      
      Respond concisely and professionally to the user's query based on this data. Do not use markdown styling.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'user', parts: [{ text: input }] }
        ],
      });

      setMessages((prev) => [...prev, { role: 'model', content: response.text || 'Error processing request.' }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [...prev, { role: 'model', content: 'System anomaly: Unable to connect to LLM core.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-black rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 z-50 cursor-pointer">
        <MessageSquare size={24} />
      </SheetTrigger>
      
      <SheetContent side="right" className="bg-[#09090B] border-l border-zinc-800 text-zinc-300 w-full sm:max-w-[400px] flex flex-col font-mono">
        <SheetHeader className="border-b border-zinc-800 pb-4">
          <SheetTitle className="text-emerald-400 font-mono flex items-center gap-2">
            <Bot size={20} /> HERMES // Copilot
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4 font-mono text-sm pr-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded ${msg.role === 'user' ? 'bg-zinc-800 text-white rounded-br-none' : 'bg-emerald-900/20 border border-emerald-500/30 text-emerald-100 rounded-bl-none whitespace-pre-wrap'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded rounded-bl-none flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-emerald-500" /> <span className="text-emerald-500 text-xs">Analyzing...</span>
               </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="border-t border-zinc-800 pt-4 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask Hermes..."
            className="flex-1 bg-black border border-zinc-800 rounded p-2 text-white outline-none focus:border-emerald-500 font-mono text-sm disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 text-black p-2 rounded transition-colors flex items-center justify-center w-10 cursor-pointer"
          >
            <Send size={16} />
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
