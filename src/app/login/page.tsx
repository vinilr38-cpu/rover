'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AlertTriangle, Lock, ShieldAlert, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/operations');
    } catch (err: any) {
      console.error('Firebase Auth Login Error:', err);
      setError(err.message || 'Authentication failed. Access denied for provided credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-6 text-white font-mono">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded space-y-6 shadow-2xl relative">
        {/* Header with Red AlertTriangle Icon & Banner */}
        <div className="text-center space-y-3 border-b border-zinc-800 pb-6">
          <div className="w-12 h-12 bg-red-500/10 border border-red-500/40 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-red-500 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5">
            <ShieldAlert size={14} />
            <span>RESTRICTED ACCESS // AUTHORIZED PERSONNEL ONLY</span>
          </h1>
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
            REGRIS-01 AUTONOMOUS COMMAND GATEWAY
          </p>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs text-zinc-400 block font-bold tracking-wide">
              OPERATOR EMAIL
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@regris.ai"
              required
              className="w-full bg-black border border-zinc-800 rounded p-3 text-white outline-none focus:border-emerald-500 font-mono text-sm placeholder:text-zinc-600 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-zinc-400 block font-bold tracking-wide">
              ACCESS PASSWORD
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-black border border-zinc-800 rounded p-3 text-white outline-none focus:border-emerald-500 font-mono text-sm placeholder:text-zinc-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-black font-extrabold p-3 rounded transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>AUTHENTICATING_SESSION...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>AUTHENTICATE</span>
              </>
            )}
          </button>

          {/* Red Error Message display below the button */}
          {error && (
            <div className="p-3 bg-red-950/80 border border-red-500/60 rounded text-red-400 text-xs font-mono animate-pulse">
              <span className="font-bold">AUTH_FAILURE:</span> {error}
            </div>
          )}
        </form>

        <div className="text-[10px] text-zinc-600 text-center border-t border-zinc-800 pt-4">
          SECURE PROTOCOL TLS v1.3 // FIREBASE AUTH INGRESS
        </div>
      </div>
    </div>
  );
}
