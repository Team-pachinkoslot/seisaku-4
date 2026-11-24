// src/app/page.tsx
// 電車の画像: public/minato-train.png
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

const scenarios = [
  { id: "01", title: "初期侵入", description: "公開サイトの模擬アクセス記録から、最初の異常を確認する。" },
  { id: "02", title: "権限昇格", description: "運行管理画面の模擬記録から、アカウントの権限変更を確認する。" },
  { id: "03", title: "横展開", description: "信号設備の模擬通信記録から、異常が及んだ範囲を確認する。" },
  { id: "04", title: "最終到達", description: "中央サーバーの模擬監査ログから、調査の最後の手がかりを確認する。" },
];

export default function Home() {
  const [scenario, setScenario] = useState(scenarios[0]);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = command.trim().replace(/\s+/g, " ");
    if (!input) return;
    setCommand("");

    if (input === "clear") {
      setHistory([]);
      return;
    }

    const responses = new Map([
      ["help", "help  ls  cat scenario.txt  clear"],
      ["ls", "scenario.txt"],
      ["cat scenario.txt", `Stage ${scenario.id} ${scenario.title}\n${scenario.description}`],
    ]);
    const output = responses.get(input) ?? "未対応のコマンドです。help で一覧を表示できます。";
    setHistory((previous) => [...previous, `operator@minato:~$ ${input}\n${output}`]);
  }

  return (
    <main className="rail-lab">
      <header className="rail-hero">
        <Image
          src="/minato-train.png"
          alt="青緑の帯が入った、みなと鉄道の通勤電車"
          fill
          priority
          sizes="100vw"
        />
        <h1>みなと鉄道シナリオラボ</h1>
      </header>

      <section className="rail-scenarios" aria-labelledby="scenarios-title">
        <h2 id="scenarios-title">シナリオ番号</h2>

        <ol className="rail-scenario-list">
          {scenarios.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={item.id === scenario.id}
                onClick={() => setScenario(item)}
              >
                <span>{item.id}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>

        <p className="rail-description" role="status">{scenario.description}</p>
      </section>

      <section className="rail-cli" aria-labelledby="cli-title">
        <header className="rail-cli-header">
          <h2 id="cli-title">Linux CLI</h2>
          <span>ブラウザ内デモ</span>
        </header>

        <div className="rail-output" ref={outputRef} role="log" aria-label="コマンド出力" tabIndex={0}>
          <p><code>help</code> でコマンド一覧を表示できます。</p>
          <p><code>cat scenario.txt</code> で選択中のシナリオを確認できます。</p>
          {history.map((entry, index) => <pre key={index}>{entry}</pre>)}
        </div>

        <form className="rail-prompt" onSubmit={runCommand}>
          <code aria-hidden="true">operator@minato:~$</code>
          <input
            aria-label="コマンド"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <button type="submit">実行</button>
        </form>
      </section>

      <style>{`
        .rail-lab {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: clamp(11rem, 31svh, 22rem) minmax(24rem, 1fr);
          gap: .75rem;
          width: 100%;
          max-width: none;
          min-height: 100svh;
          padding: .75rem;
          background: #edf1f5;
          color: #18213b;
        }

        .rail-hero {
          position: relative;
          isolation: isolate;
          grid-column: 1 / -1;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          border-radius: .65rem;
        }

        .rail-hero img {
          z-index: -1;
          object-fit: cover;
          object-position: center;
        }

        .rail-hero h1 {
          width: 100%;
          margin: 0;
          padding: 2rem 1.25rem 1rem;
          background: linear-gradient(transparent, #0b1729ed);
          color: #fff;
          font-size: clamp(1.35rem, 3vw, 2.4rem);
        }

        .rail-scenarios,
        .rail-cli {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #c6d0df;
          border-radius: .65rem;
        }

        .rail-scenarios {
          padding: clamp(1rem, 3vw, 2rem);
          background: #fff;
        }

        .rail-lab h2 {
          margin: 0;
          font-size: 1.125rem;
        }

        .rail-scenario-list {
          display: grid;
          gap: .6rem;
          margin: 1rem 0;
          padding: 0;
          list-style: none;
        }

        .rail-scenario-list button {
          display: flex;
          align-items: center;
          gap: .85rem;
          width: 100%;
          padding: .7rem .85rem;
          border: 1px solid #c6d0df;
          border-radius: .4rem;
          background: #f1f5f9;
          color: #18213b;
          text-align: left;
        }

        .rail-scenario-list button[aria-pressed="true"] {
          border-color: #172445;
          background: #172445;
          color: #fff;
        }

        .rail-scenario-list span {
          font: 700 1.1rem ui-monospace, monospace;
        }

        .rail-description {
          color: #455372;
          line-height: 1.7;
        }

        .rail-cli {
          display: flex;
          flex-direction: column;
          min-height: 24rem;
          background: #0c1321;
          color: #e8effa;
        }

        .rail-cli-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: .5rem;
          padding: .9rem 1rem;
          border-bottom: 1px solid #33405b;
          background: #172445;
        }

        .rail-cli-header span {
          color: #c4d2eb;
          font-size: .8rem;
        }

        .rail-output {
          flex: 1 1 0;
          min-height: 12rem;
          overflow: auto;
          padding: 1rem;
          font: .875rem/1.7 ui-monospace, monospace;
        }

        .rail-output pre {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          font: inherit;
        }

        .rail-cli code {
          color: #a9edce;
        }

        .rail-prompt {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .5rem;
          padding: .85rem 1rem;
          border-top: 1px solid #33405b;
        }

        .rail-prompt input {
          flex: 1 1 8rem;
          min-width: 0;
          padding: .5rem;
          border: 1px solid #526580;
          border-radius: .35rem;
          background: #131e31;
          color: #fff;
          font: .875rem ui-monospace, monospace;
        }

        .rail-prompt button {
          padding: .5rem .75rem;
          border: 0;
          border-radius: .35rem;
          background: #a9edce;
          color: #10281e;
          cursor: pointer;
        }

        .rail-lab :focus-visible {
          outline: 2px solid #468ad1;
          outline-offset: 2px;
        }

        @media (max-width: 700px) {
          .rail-lab {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: 12rem auto minmax(24rem, 1fr);
          }
        }
      `}</style>
    </main>
  );
}