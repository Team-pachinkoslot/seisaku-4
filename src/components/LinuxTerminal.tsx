"use client";

import { useEffect, useRef } from "react";

export default function LinuxTerminal() {
  const screenRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);

  useEffect(() => {
    if (emulatorRef.current || !screenRef.current) return;

    const initV86 = async () => {
      const { V86 } = await import("v86");

      emulatorRef.current = new V86({
        wasm_path: "/v86/v86.wasm",
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        screen_container: screenRef.current,
        bios: {
          url: "/v86/seabios.bin",
        },
        vga_bios: {
          url: "/v86/vgabios.bin",
        },
        bzimage: {
          url: "/v86/buildroot-bzimage.bin",
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
    <div className="bg-black text-white p-4 rounded-lg border border-gray-700 overflow-hidden">
      <div
        ref={screenRef}
        className="font-mono text-sm leading-tight"
        style={{ whiteSpace: "pre", minHeight: "400px" }}
      >
        <div style={{ fontFamily: "monospace", fontSize: "14px", lineHeight: "1.2" }}></div>
        <canvas style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
}