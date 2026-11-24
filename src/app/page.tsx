// src/app/page.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const scenarios = [
  { id: "01", title: "初期侵入", record: "09:12　公開サイトの模擬アクセス記録で異常を確認。" },
  { id: "02", title: "権限昇格", record: "09:18　運行管理画面の模擬記録で権限変更を確認。" },
  { id: "03", title: "横展開", record: "09:24　信号設備の模擬通信記録で関連する異常を確認。" },
  { id: "04", title: "最終到達", record: "09:31　中央サーバーの模擬監査ログで関連する異常を確認。" },
];

export default function Home() {
  const [selected, setSelected] = useState(scenarios[0]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  const position = `${(reviewed.length / scenarios.length) * 100}%`;
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

    const responses = new Map([
      ["help", "help  ls  cat record.txt  clear"],
      ["ls", "record.txt"],
      ["cat record.txt", `シナリオ ${selected.id} ${selected.title}\n${selected.record}`],
    ]);

    if (input === "cat record.txt") {
      setReviewed((previous) =>
        previous.includes(selected.id) ? previous : [...previous, selected.id]
      );
    }

    const result = responses.get(input) ?? "未対応のコマンドです。help で一覧を確認できます。";
    setHistory((previous) => [...previous, `lab@minato:~$ ${input}\n${result}`]);
  }

  return (
    <main className="rail-lab" aria-label="みなと鉄道シナリオラボ">
      <section className="departure-board" aria-label="路線案内と調査の進捗">
        <header className="board-sign">
          <div>
            <strong>みなと線</strong>
            <span lang="en">Minato Line</span>
          </div>
          <i className="line-color" aria-hidden="true" />
          <div>
            <strong>港中央方面</strong>
            <span lang="en">for Minato-central</span>
          </div>
        </header>

        <div className="led-display">
          <p className="led-status" role="status">
            {arrived ? "到着" : reviewed.length > 0 ? "進行中" : "出発待ち"}
            <span>{reviewed.length} / {scenarios.length} 確認済み</span>
          </p>

          <div className="led-route" aria-hidden="true">
            <div className="led-rail">
              <div className="led-traveled" style={{ width: position }} />

              {Array.from({ length: scenarios.length + 1 }, (_, index) => (
                <i
                  key={index}
                  className="led-station"
                  data-passed={index <= reviewed.length}
                  data-goal={index === scenarios.length}
                  style={{ left: `${(index / scenarios.length) * 100}%` }}
                />
              ))}

              <i className="led-train" style={{ left: position }} />
            </div>
            <div className="led-labels"><span>Start</span><span>Goal</span></div>
          </div>

          <progress
            className="visually-hidden"
            value={reviewed.length}
            max={scenarios.length}
            aria-label="確認済みシナリオ数"
          />
        </div>
      </section>

      <section className="scenario-panel" aria-labelledby="scenario-title">
        <h1 id="scenario-title">シナリオ番号</h1>

        <ol className="scenario-list">
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <button
                type="button"
                aria-pressed={scenario.id === selected.id}
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

      <section className="cli-panel" aria-labelledby="cli-title">
        <header className="cli-heading">
          <h2 id="cli-title">CLI</h2>
          <span>シナリオ {selected.id} · {selected.title}</span>
        </header>

        <div ref={outputRef} className="cli-output" role="log" aria-label="実行結果" tabIndex={0}>
          <p><code>cat record.txt</code> で選択中の模擬記録を表示できます。</p>
          {history.map((entry, index) => <pre key={index}>{entry}</pre>)}
        </div>

        <form className="cli-prompt" onSubmit={runCommand}>
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
        body { margin: 0; background: #0b1017; }
        .rail-lab, .rail-lab * { box-sizing: border-box; }

        .rail-lab {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: auto minmax(24rem, 1fr);
          gap: .85rem;
          width: 100%;
          max-width: 75rem;
          min-height: 100svh;
          margin-inline: auto;
          padding: clamp(.75rem, 3vw, 2rem);
          color: #e9eef5;
          font-family: system-ui, sans-serif;
          color-scheme: dark;
        }

        .rail-lab h1, .rail-lab h2, .rail-lab p { margin: 0; }
        .rail-lab button, .rail-lab input { font: inherit; }
        .rail-lab button { cursor: pointer; }
        .rail-lab :focus-visible { outline: 2px solid #f5df49; outline-offset: 3px; }

        .departure-board {
          grid-column: 1 / -1;
          overflow: hidden;
          border: .4rem solid #323d46;
          border-radius: .5rem;
          background: #090b0d;
        }

        .board-sign {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(.6rem, 3vw, 1.25rem);
          padding: .7rem 1rem;
          background: #35434c;
          color: #fff;
        }

        .board-sign div { display: grid; gap: .1rem; }
        .board-sign strong { font-size: clamp(1rem, 3vw, 1.55rem); }
        .board-sign span { color: #e2e8ec; font-size: clamp(.65rem, 2vw, .9rem); }
        .line-color { align-self: stretch; width: .85rem; background: #f6df38; }

        .led-display {
          --led: #e7f53b;
          --orange: #ffab3d;
          padding: 1rem clamp(1.25rem, 5vw, 4rem) 1.1rem;
          background: radial-gradient(circle, #283000 1px, transparent 1.1px) 0 0 / 4px 4px, #0b0e06;
          color: var(--led);
          font-family: ui-monospace, monospace;
        }

        .led-status {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: .75rem;
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 700;
          text-shadow: 0 0 .5rem #baca5277;
        }

        .led-status span { font-size: .75rem; font-weight: 400; }
        .led-route { margin: 0 .5rem; padding-top: 1.75rem; }

        .led-rail {
          position: relative;
          height: .45rem;
          border-block: 1px solid var(--led);
          background: repeating-linear-gradient(90deg, #bcc829 0 2px, #384600 2px 4px);
        }

        .led-traveled {
          height: 100%;
          background: var(--orange);
          transition: width .6s ease;
        }

        .led-station {
          position: absolute;
          top: 50%;
          width: clamp(.85rem, 4vw, 2rem);
          height: .82rem;
          border: 2px solid var(--led);
          background: #101406;
          transform: translate(-50%, -50%);
        }

        .led-station[data-passed="true"] { background: #6b7717; }
        .led-station[data-goal="true"] { border-color: var(--orange); }

        .led-train {
          position: absolute;
          bottom: .7rem;
          width: clamp(1.2rem, 5vw, 2rem);
          height: .75rem;
          background: repeating-linear-gradient(90deg, #ffd16a 0 2px, #ff9e36 2px 4px);
          clip-path: polygon(0 0, 72% 0, 100% 55%, 100% 100%, 0 100%);
          filter: drop-shadow(0 0 .25rem #ff9e36);
          transform: translateX(-50%);
          transition: left .6s ease;
        }

        .led-labels {
          display: flex;
          justify-content: space-between;
          margin: .7rem -.5rem 0;
          font-size: .75rem;
          text-transform: uppercase;
        }

        .visually-hidden { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); }

        .scenario-panel, .cli-panel {
          min-width: 0;
          border: 1px solid #36434f;
          border-radius: .5rem;
          background: #141d26;
        }

        .scenario-panel { padding: clamp(1rem, 3vw, 1.5rem); }
        .rail-lab h1, .rail-lab h2 { font-size: 1.15rem; }
        .scenario-list { display: grid; gap: .55rem; margin: 1rem 0 0; padding: 0; list-style: none; }

        .scenario-list button {
          display: flex;
          align-items: center;
          gap: .75rem;
          width: 100%;
          padding: .75rem;
          border: 1px solid #414e5b;
          border-radius: .35rem;
          background: #1c2833;
          color: inherit;
          text-align: left;
        }

        .scenario-list button[aria-pressed="true"] { border-color: #f5df49; background: #303321; }
        .scenario-list strong { color: #f5df49; font-family: ui-monospace, monospace; }
        .scenario-list small { margin-left: auto; }

        .cli-panel { display: flex; flex-direction: column; min-height: 24rem; background: #090e14; }

        .cli-heading {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: .5rem;
          padding: 1rem;
          border-bottom: 1px solid #36434f;
        }

        .cli-heading span { color: #bdc9d6; font-size: .85rem; }

        .cli-output {
          flex: 1 1 0;
          min-height: 10rem;
          overflow: auto;
          padding: 1rem;
          font: .875rem/1.65 ui-monospace, monospace;
        }

        .cli-output pre { white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; }
        .cli-panel code { color: #b4ec89; }

        .cli-prompt {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: .5rem;
          padding: .85rem 1rem;
          border-top: 1px solid #36434f;
        }

        .cli-prompt input {
          flex: 1 1 8rem;
          min-width: 0;
          padding: .5rem;
          border: 1px solid #506273;
          border-radius: .3rem;
          background: #171f28;
          color: #fff;
        }

        .cli-prompt button {
          padding: .5rem .75rem;
          border: 0;
          border-radius: .3rem;
          background: #b4ec89;
          color: #182616;
        }

        @media (max-width: 700px) {
          .rail-lab {
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto auto minmax(24rem, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .led-train, .led-traveled { transition: none; }
        }
      `}</style>
    </main>
  );
}