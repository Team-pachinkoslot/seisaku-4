"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

export default function TerminalView() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      theme: {
        background: "#0f172a",
        foreground: "#38bdf8",
      },
      fontFamily: "monospace",
      fontSize: 14,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setStatus("connected");
      term.writeln("\x1b[32m[SYSTEM] 鉄道制御サーバーへの接続に成功しました。\x1b[0m");
      term.writeln("まずは ls や cat /etc/railway/signal.conf を実行してください。\r\n");
      ws.send("\n");
    };

    ws.onmessage = (event) => {
      term.write(event.data);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      term.writeln("\r\n\x1b[31m[SYSTEM] サーバーとの接続が切断されました。\x1b[0m");
    };

    ws.onerror = () => {
      setStatus("disconnected");
      term.writeln("\r\n\x1b[31m[ERROR] 接続エラー: Kali Linuxのサーバーが起動しているか確認してください。\x1b[0m");
    };

    term.onData((data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ws.close();
      term.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-300">
        <span>Railway Control Terminal (SSH/Docker)</span>
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status === "connected"
                ? "bg-emerald-400"
                : status === "connecting"
                ? "bg-amber-400 animate-pulse"
                : "bg-rose-500"
            }`}
          />
          {status === "connected" ? "接続中" : status === "connecting" ? "接続試行中..." : "切断"}
        </span>
      </div>
      <div ref={terminalRef} className="flex-1 p-2 min-h-[400px]" />
    </div>
  );
}