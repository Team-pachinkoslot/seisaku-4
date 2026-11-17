"use client";

import { useEffect, useRef } from "react";

export default function LinuxTerminal() {
  const screenRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);

  useEffect(() => {
    if (emulatorRef.current || !screenRef.current) return;

    const initV86 = async () => {
      (window as any).global = window;
      if (!(window as any).setImmediate) {
        (window as any).setImmediate = (fn: (...args: any[]) => void, ...args: any[]) =>
          setTimeout(fn, 0, ...args);
      }

      const { V86 } = await import("v86");

      const emulator = new V86({
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
        // キーボード入力を明示的に有効化
        disable_keyboard: false,
      });

      emulatorRef.current = emulator;

      // 起動して2秒後に自動で Enter キーを送ってブートを進める
      setTimeout(() => {
        if (emulatorRef.current) {
          emulatorRef.current.keyboard_send_text("\n");
        }
      }, 2000);
    };

    initV86();

    return () => {
      if (emulatorRef.current) {
        emulatorRef.current.destroy();
        emulatorRef.current = null;
      }
    };
  }, []);

  // 画面をクリックしたときにキーボード入力を有効化する関数
  const handleFocus = () => {
    if (emulatorRef.current) {
      emulatorRef.current.keyboard_set_status(true);
    }
  };

  return (
    <div
      onClick={handleFocus}
      tabIndex={0}
      className="bg-zinc-900 p-4 rounded-lg border-2 border-green-500 overflow-x-auto cursor-text focus:outline-none focus:ring-2 focus:ring-green-300"
    >
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