"use client";

import { useEffect, useRef } from "react";

export default function LinuxTerminal() {
  const screenRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);

  useEffect(() => {
    if (emulatorRef.current || !screenRef.current) return;

    const initV86 = async () => {
      // ブラウザ環境に Node.js の global 変数を擬似的に定義する
      (window as any).global = window;

      const { V86 } = await import("v86");

      emulatorRef.current = new V86({
        wasm_path: "/v86/v86.wasm",
        memory_size: 256 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        screen_container: screenRef.current,
        bios: {
          url: "/v86/seabios.bin",
        },
        vga_bios: {
          url: "/v86/vgabios.bin",
        },
        cdrom: {
          url: "/v86/alpine-virt.iso",
        },
        autostart: true,
      });
    };

    initV86();

    return () => {
      if (emulatorRef.current) {
        emulatorRef.current.destroy();
        emulatorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-zinc-900 p-4 rounded-lg border-2 border-green-500 overflow-x-auto">
      <div
        ref={screenRef}
        style={{
          whiteSpace: "pre",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: "1.2",
          color: "#4ade80",
          minHeight: "400px",
        }}
      >
        <div></div>
        <canvas style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
}