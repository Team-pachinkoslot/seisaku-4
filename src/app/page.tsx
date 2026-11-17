"use client";

import dynamic from "next/dynamic";

const LinuxTerminal = dynamic(() => import("@/components/LinuxTerminal"), {
  ssr: false,
  loading: () => (
    <div className="bg-black text-green-400 p-4 rounded-lg font-mono">
      Linux仮想マシンを起動中...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">信号システム復旧ターミナル</h1>
      <LinuxTerminal />
    </main>
  );
}