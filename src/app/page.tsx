// src/app/page.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const scenarios = [
  {
    id: "01",
    title: "初期侵入",
    record: "09:12  公開サイトの模擬アクセス記録で異常を確認。",
  },
  {
    id: "02",
    title: "権限昇格",
    record: "09:18  運行管理画面の模擬記録で権限変更を確認。",
  },
  {
    id: "03",
    title: "横展開",
    record: "09:24  信号設備の模擬 API に関連する通信を確認。",
  },
  {
    id: "04",
    title: "最終到達",
    record: "09:31  中央サーバーの模擬監査ログで関連する異常を確認。",
  },
];

export default function Home() {
  const [selected, setSelected] = useState(scenarios[0]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  const trainPosition = `${(reviewed.length / scenarios.length) * 100}%`;
  const arrived = reviewed.length === scenarios.length;

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

    if (input === "cat record.txt") {
      setReviewed((previous) =>
        previous.includes(selected.id) ? previous : [...previous, selected.id]
      );
    }

    const responses = new Map([
      [
        "help",
        [
          "help            コマンド一覧を表示",
          "ls              ファイル一覧を表示",
          "cat record.txt  選択中の模擬記録を表示",
          "clear           CLI の出力を消去",
        ].join("\n"),
      ],
      ["ls", "record.txt"],
      [
        "cat record.txt",
        `シナリオ ${selected.id} ${selected.title}\n${selected.record}`,
      ],
    ]);

    const result =
      responses.get(input) ?? "未対応のコマンドです。help で一覧を確認できます。";

    setHistory((previous) => [
      ...previous,
      `lab@minato:~$ ${input}\n${result}`,
    ]);
  }

  return (
    <main className="rail-lab" aria-label="みなと鉄道シナリオラボ">
      <section className="rail-route" aria-label="シナリオの進捗">
        <div className="route-line">
          <span lang="en">Start</span>

          <div className="route-track">
            <progress
              className="route-progress"
              value={reviewed.length}
              max={scenarios.length}
              aria-label="確認済みのシナリオ数"
            />

            <div className="route-rails" aria-hidden="true">
              <span className="route-traveled" style={{ width: trainPosition }} />
            </div>

            <span
              className="route-train"
              style={{ left: trainPosition }}
              aria-hidden="true"
            >
              🚃
            </span>
          </div>

          <span lang="en">Goal</span>
        </div>

        <p role="status">
          {arrived
            ? "Goal に到着しました"
            : `${scenarios.length}件中 ${reviewed.length}件確認済み`}
        </p>
      </section>

      <section className="rail-scenarios" aria-labelledby="scenario-title">
        <h1 id="scenario-title">シナリオ番号</h1>

        <ol className="scenario-list">
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
        <header className="console-header">
          <h2 id="console-title">CLI</h2>
          <span>シナリオ {selected.id} · {selected.title}</span>
        </header>

        <div
          ref={outputRef}
          className="console-output"
          role="log"
          aria-label="コマンド出力"
          tabIndex={0}
        >
          <p>
            <code>cat record.txt</code> で選択中の模擬記録を確認できます。
          </p>

          {history.map((entry, index) => (
            <pre key={index}>{entry}</pre>
          ))}
        </div>

        <form className="console-prompt" onSubmit={runCommand}>
          <code aria-hidden="true">lab@minato:~$</code>
          <input
            aria-label="CLI コマンド"
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
        }

        .rail-lab,
        .rail-lab * {
          box-sizing: border-box;
        }

        .rail-lab {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: minmax(10rem, 31svh) minmax(25rem, 1fr);
          gap: 1px;
          width: 100%;
          max-width: none;
          min-height: 100svh;
          margin: 0;
          padding: .65rem;
          background: #c8d2df;
          color: #18213b;
          font-family: system-ui, sans-serif;
        }

        .rail-lab h1,
        .rail-lab h2,
        .rail-lab p {
          margin: 0;
        }

        .rail-route {
          display: grid;
          grid-column: 1 / -1;
          align-content: center;
          gap: 1rem;
          padding: clamp(1rem, 4vw, 3rem);
          background: #fff;
        }

        .route-line {
          display: flex;
          align-items: center;
          gap: clamp(.9rem, 4vw, 3rem);
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 600;
        }

        .route-track {
          position: relative;
          flex: 1;
          min-width: 0;
          height: 3.25rem;
          margin-inline: .35rem;
        }

        .route-progress {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
        }

        .route-rails {
          position: absolute;
          inset: auto 0 .5rem;
          height: .8rem;
          border-block: 2px solid #536079;
          background: repeating-linear-gradient(
            90deg,
            transparent 0 .65rem,
            #b0bccb .65rem .85rem
          );
        }

        .route-traveled {
          position: absolute;
          inset: 0 auto 0 0;
          background: #21789466;
          transition: width .6s ease;
        }

        .route-rails::before,
        .route-rails::after {
          position: absolute;
          z-index: 1;
          top: 50%;
          width: .8rem;
          height: .8rem;
          border: 2px solid #217894;
          border-radius: 50%;
          background: #fff;
          content: "";
        }

        .route-rails::before {
          left: 0;
          transform: translate(-50%, -50%);
        }

        .route-rails::after {
          right: 0;
          transform: translate(50%, -50%);
        }

        .route-train {
          position: absolute;
          z-index: 2;
          bottom: .95rem;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          line-height: 1;
          transform: translateX(-50%);
          transition: left .6s ease;
        }

        .rail-route p {
          color: #455372;
          text-align: center;
          font-size: .875rem;
        }

        .rail-scenarios {
          min-width: 0;
          padding: clamp(1rem, 4vw, 3rem);
          background: #fff;
        }

        .rail-lab h1,
        .rail-lab h2 {
          font-size: clamp(1.35rem, 2.5vw, 2rem);
          line-height: 1.25;
        }

        .scenario-list {
          display: grid;
          gap: .65rem;
          margin: 1.25rem 0 0;
          padding: 0;
          list-style: none;
        }

        .scenario-list button {
          display: flex;
          align-items: center;
          gap: .75rem;
          width: 100%;
          padding: .85rem;
          border: 1px solid #c1cbd9;
          border-radius: .4rem;
          background: #f0f4f9;
          color: #18213b;
          text-align: left;
          font: inherit;
          cursor: pointer;
        }

        .scenario-list button[aria-pressed="true"] {
          border-color: #172445;
          background: #172445;
          color: #fff;
        }

        .scenario-list strong {
          font: 700 1.1rem ui-monospace, monospace;
        }

        .scenario-list small {
          margin-left: auto;
        }

        .rail-console {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 25rem;
          background: #101827;
          color: #edf4f9;
        }

        .console-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: .5rem;
          padding: 1rem;
          border-bottom: 1px solid #42516a;
          background: #172445;
        }

        .console-header span {
          color: #c5d1e4;
          font-size: .875rem;
        }

        .console-output {
          flex: 1 1 0;
          min-height: 12rem;
          overflow: auto;
          padding: 1rem;
          font: .875rem/1.65 ui-monospace, monospace;
        }

        .console-output pre {
          margin: .85rem 0 0;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          font: inherit;
        }

        .rail-console code {
          color: #a9edce;
        }

        .console-prompt {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .5rem;
          padding: .85rem 1rem;
          border-top: 1px solid #42516a;
        }

        .console-prompt input {
          flex: 1 1 8rem;
          min-width: 0;
          padding: .55rem;
          border: 1px solid #526580;
          border-radius: .35rem;
          background: #172338;
          color: #fff;
          font: .875rem ui-monospace, monospace;
        }

        .console-prompt button {
          padding: .55rem .8rem;
          border: 0;
          border-radius: .35rem;
          background: #a9edce;
          color: #10281e;
          font: 700 .875rem system-ui, sans-serif;
          cursor: pointer;
        }

        .rail-lab :focus-visible {
          outline: 2px solid #468ad1;
          outline-offset: 2px;
        }

        @media (max-width: 700px) {
          .rail-lab {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: 10rem auto minmax(25rem, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .route-train,
          .route-traveled {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}