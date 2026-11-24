// src/app/page.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const scenarios = [
  { id: "01", title: "初期侵入", log: "09:12  公開サイトの模擬アクセス記録で異常を確認。" },
  { id: "02", title: "権限昇格", log: "09:18  運行管理画面の模擬記録で権限変更を確認。" },
  { id: "03", title: "横展開", log: "09:24  信号設備の模擬 API に関連する通信を確認。" },
  { id: "04", title: "最終到達", log: "09:31  中央サーバーの模擬監査ログで関連する異常を確認。" },
];

export default function Home() {
  const [selected, setSelected] = useState(scenarios[0]);
  const [reviewed, setReviewed] = useState<string[]>([]);
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
    setCommand("");
    if (!input) return;

    if (input === "clear") {
      setHistory([]);
      return;
    }

    if (input === "cat record.txt") {
      setReviewed((previous) =>
        previous.includes(selected.id) ? previous : [...previous, selected.id]
      );
    }

    const responses = new Map([
      ["help", "help            コマンド一覧\nls              ファイル一覧\ncat record.txt  選択中の模擬記録を表示\nclear           出力を消去"],
      ["ls", "record.txt"],
      ["cat record.txt", `シナリオ ${selected.id} ${selected.title}\n${selected.log}`],
    ]);

    const result = responses.get(input) ?? "未対応のコマンドです。help で一覧を表示できます。";
    setHistory((previous) => [...previous, `lab@minato:~$ ${input}\n${result}`]);
  }

  return (
    <main className="rail-lab" aria-label="みなと鉄道シナリオラボ">
      <section className="rail-progress" aria-label="シナリオの進捗">
        <div className="rail-line">
          <span>Start</span>
          <div className="rail-track">
            <progress
              value={reviewed.length}
              max={scenarios.length}
              aria-label="確認済みのシナリオ数"
            />
          </div>
          <span>Goal</span>
        </div>
        <p role="status">
          {reviewed.length === scenarios.length
            ? "すべてのシナリオを確認しました"
            : `${scenarios.length}件中 ${reviewed.length}件確認済み`}
        </p>
      </section>

      <section className="rail-scenarios" aria-labelledby="scenario-title">
        <h1 id="scenario-title">シナリオ番号</h1>

        <ol className="rail-scenario-list">
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <button
                type="button"
                aria-pressed={selected.id === scenario.id}
                onClick={() => setSelected(scenario)}
              >
                <strong>{scenario.id}</strong>
                <span>{scenario.title}</span>
                {reviewed.includes(scenario.id) && <small>確認済み</small>}
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="rail-console" aria-labelledby="console-title">
        <header>
          <h2 id="console-title">CLI</h2>
          <span>シナリオ {selected.id} · {selected.title}</span>
        </header>

        <div
          className="rail-output"
          ref={outputRef}
          role="log"
          aria-label="コマンド出力"
          tabIndex={0}
        >
          <p><code>cat record.txt</code> で選択中の模擬記録を確認できます。</p>
          {history.map((entry, index) => <pre key={index}>{entry}</pre>)}
        </div>

        <form className="rail-prompt" onSubmit={runCommand}>
          <code aria-hidden="true">lab@minato:~$</code>
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
        body {
          margin: 0;
          background: #fff;
        }

        .rail-lab,
        .rail-lab * {
          box-sizing: border-box;
        }

        .rail-lab {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: minmax(10rem, 31svh) minmax(24rem, 1fr);
          gap: 1px;
          width: auto;
          max-width: none;
          min-height: 100svh;
          margin: 0;
          padding: .65rem;
          background: #b8c1ce;
          color: #18213b;
          font-family: system-ui, sans-serif;
        }

        .rail-lab h1,
        .rail-lab h2,
        .rail-lab p {
          margin: 0;
        }

        .rail-progress,
        .rail-scenarios {
          background: #fff;
        }

        .rail-progress {
          grid-column: 1 / -1;
          display: grid;
          align-content: center;
          gap: 1rem;
          padding: clamp(1rem, 4vw, 3rem);
        }

        .rail-line {
          display: flex;
          align-items: center;
          gap: clamp(.75rem, 3vw, 2rem);
          font-size: clamp(1rem, 2vw, 1.5rem);
        }

        .rail-track {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
        }

        .rail-track::before,
        .rail-track::after {
          position: absolute;
          z-index: 1;
          width: .85rem;
          height: .85rem;
          border: 2px solid #536079;
          border-radius: 50%;
          background: #fff;
          content: "";
        }

        .rail-track::before { left: 0; }
        .rail-track::after { right: 0; }

        .rail-track progress {
          appearance: none;
          width: 100%;
          height: .25rem;
          border: 0;
          background: #b8c1ce;
        }

        .rail-track progress::-webkit-progress-bar { background: #b8c1ce; }
        .rail-track progress::-webkit-progress-value { background: #217894; }
        .rail-track progress::-moz-progress-bar { background: #217894; }

        .rail-progress p {
          color: #455372;
          text-align: center;
          font-size: .875rem;
        }

        .rail-scenarios {
          min-width: 0;
          padding: clamp(1rem, 4vw, 3rem);
        }

        .rail-lab h1,
        .rail-lab h2 {
          font-size: clamp(1.35rem, 2.5vw, 2rem);
        }

        .rail-scenario-list {
          display: grid;
          gap: .6rem;
          margin: 1.25rem 0 0;
          padding: 0;
          list-style: none;
        }

        .rail-scenario-list button {
          display: flex;
          align-items: center;
          gap: .75rem;
          width: 100%;
          padding: .8rem;
          border: 1px solid #c1cbd9;
          border-radius: .4rem;
          background: #f0f4f9;
          color: #18213b;
          text-align: left;
          font: inherit;
          cursor: pointer;
        }

        .rail-scenario-list button[aria-pressed="true"] {
          border-color: #18213b;
          background: #18213b;
          color: #fff;
        }

        .rail-scenario-list small {
          margin-left: auto;
        }

        .rail-console {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 24rem;
          background: #101827;
          color: #edf4f9;
        }

        .rail-console header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: .5rem;
          padding: 1rem;
          border-bottom: 1px solid #42516a;
        }

        .rail-console header span {
          color: #c5d1e4;
          font-size: .875rem;
        }

        .rail-output {
          flex: 1 1 0;
          min-height: 10rem;
          overflow: auto;
          padding: 1rem;
          font: .875rem/1.65 ui-monospace, monospace;
        }

        .rail-output pre {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          font: inherit;
        }

        .rail-console code {
          color: #a9edce;
        }

        .rail-prompt {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .5rem;
          padding: .85rem 1rem;
          border-top: 1px solid #42516a;
        }

        .rail-prompt input {
          flex: 1 1 8rem;
          min-width: 0;
          padding: .5rem;
          border: 1px solid #526580;
          border-radius: .35rem;
          background: #172338;
          color: #fff;
          font: .875rem ui-monospace, monospace;
        }

        .rail-prompt button {
          padding: .5rem .75rem;
          border: 0;
          border-radius: .35rem;
          background: #a9edce;
          color: #10281e;
          font-weight: 700;
          cursor: pointer;
        }

        .rail-lab :focus-visible {
          outline: 2px solid #468ad1;
          outline-offset: 2px;
        }

        @media (max-width: 700px) {
          .rail-lab {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: 10rem auto minmax(24rem, 1fr);
          }
        }
      `}</style>
    </main>
  );
}