'use client';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, Send, Bot } from 'lucide-react';

export default function ChatbotDrawer() {
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'Hermes Agent initialized. Monitoring telemetry. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Append user message immediately
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI processing delay
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'agent', 
        content: 'Diagnostic run initiated. Hardware connection is stable. No severe crop stress detected in current sector.' 
      }]);
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <Sheet>
      {/* Floating Action Button */}
      <SheetTrigger className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 text-black rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform hover:scale-105 z-50 cursor-pointer">
        <MessageSquare size={24} />
      </SheetTrigger>
      
      {/* Chat Drawer */}
      <SheetContent side="right" className="bg-[#09090B] border-l border-zinc-800 text-zinc-300 w-full sm:max-w-[400px] flex flex-col font-mono">
        <SheetHeader className="border-b border-zinc-800 pb-4">
          <SheetTitle className="text-emerald-400 font-mono flex items-center gap-2">
            <Bot size={20} /> HERMES // Copilot
          </SheetTitle>
        </SheetHeader>
        
        {/* Scrollable Message Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 font-mono text-sm pr-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded ${msg.role === 'user' ? 'bg-zinc-800 text-white rounded-br-none' : 'bg-emerald-900/20 border border-emerald-500/30 text-emerald-100 rounded-bl-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="border-t border-zinc-800 pt-4 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command Hermes..."
            className="flex-1 bg-black border border-zinc-800 rounded p-2 text-white outline-none focus:border-emerald-500 font-mono text-sm"
          />
          <button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-black p-2 rounded transition-colors flex items-center justify-center w-10 cursor-pointer"
          >
            <Send size={16} />
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
