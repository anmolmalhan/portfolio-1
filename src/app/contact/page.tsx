"use client";

import { useState } from "react";
import { Terminal, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "compiling" | "success">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("compiling");
    setLogs(["[init] Starting payload assembly..."]);
    
    setTimeout(() => setLogs(l => [...l, "[network] Establishing secure connection..."]), 600);
    setTimeout(() => setLogs(l => [...l, "[auth] Verifying tokens... OK"]), 1200);
    setTimeout(() => setLogs(l => [...l, "[db] Writing record..."]), 1600);
    setTimeout(() => {
      setLogs(l => [...l, "[success] Message transmitted successfully."]);
      setStatus("success");
    }, 2200);
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-6 py-20 flex-1 page-reveal">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Terminal className="text-accent w-8 h-8" />
          Contact Request
        </h1>
        <p className="text-[var(--syntax-comment)] text-lg">
          Execute a transmission to standard out. I usually reply within 1-2 business days.
        </p>
      </div>

      <div className="rounded-xl border border-surface bg-background overflow-hidden shadow-2xl">
        <div className="bg-surface px-4 py-3 flex items-center gap-2 border-b border-surface">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-xs font-mono text-[var(--syntax-comment)] mx-auto">contact.sh</div>
        </div>

        <div className="p-6 md:p-8">
          {status === "idle" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <label className="font-mono text-sm text-[var(--syntax-blue)] flex">
                  const <span className="text-foreground mx-2">name</span> = 
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-surface/30 border border-surface rounded-md p-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder='"Enter your name"'
                />
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-sm text-[var(--syntax-blue)] flex">
                  const <span className="text-foreground mx-2">email</span> = 
                </label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-surface/30 border border-surface rounded-md p-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder='"Email address"'
                />
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-sm text-[var(--syntax-blue)] flex">
                  const <span className="text-foreground mx-2">message</span> = 
                </label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-surface/30 border border-surface rounded-md p-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="`Hello, I’d like to discuss...`"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-accent text-background font-bold font-mono py-3 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> await transmit()
              </button>
            </form>
          ) : (
            <div className="min-h-[300px] flex flex-col font-mono text-sm">
              <div className="flex-1 space-y-2 text-[var(--syntax-comment)]">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes("success") ? "text-[var(--syntax-green)] mt-4" : ""}>
                    {log}
                  </div>
                ))}
                {status === "compiling" && (
                  <div className="animate-pulse text-accent">_</div>
                )}
              </div>
              
              {status === "success" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-4">
                  <div className="flex items-center gap-3 text-[var(--syntax-green)] mb-6">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg">Transmission Complete</span>
                  </div>
                  <button 
                    onClick={() => { setStatus("idle"); setLogs([]); }}
                    className="border border-surface-hover hover:bg-surface px-6 py-2 rounded-md font-mono transition-colors"
                  >
                    reset()
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
