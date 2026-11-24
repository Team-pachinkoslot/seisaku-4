"use client";

import dynamic from "next/dynamic";

// xterm.jsはブラウザ専用のためSSRを無効化して読み込む
const TerminalView = dynamic(() => import("@/components/TerminalView"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-sky-400">
            緊急指令：鉄道信号システム復旧作戦
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            攻撃者によってロックされた信号システムを解析・復旧し、フラグを取得せよ。
          </p>
        </header>

        {/* ターミナル画面 */}
        <TerminalView />
      </div>
    </main>
  );
}