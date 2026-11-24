// src/app/page.tsx

const stages = [
  {
    number: 1,
    title: "公開サイト",
    description: "入力の検証と、サーバーから外部への通信制限を確認する。",
    accent: "#2583a1",
  },
  {
    number: 2,
    title: "権限管理",
    description: "運行管理画面で、利用者の役割に応じたアクセス制限を確認する。",
    accent: "#73a2cb",
  },
  {
    number: 3,
    title: "内部 API",
    description: "信号設備の状態を表示する模擬 API で、認証とキーの管理を確認する。",
    accent: "#b75b71",
  },
  {
    number: 4,
    title: "中央サーバー",
    description: "模擬監査ログを確認し、各段階で見つけた課題を整理する。",
    accent: "#ef4868",
  },
];

export default function Home() {
  return (
    <main className="scenario-home">
      <header className="scenario-heading">
        <p className="line-label">架空のみなと鉄道</p>
        <h1>シナリオ全体像</h1>
        <p className="scenario-intro">
          運行管理システムを題材に、公開サイトから中央サーバーまで、4段階でセキュリティを確認します。
        </p>
      </header>

      <ol className="stage-flow" aria-label="4段階のシナリオ">
        {stages.map((stage) => (
          <li className="stage-card" key={stage.number}>
            <div className="stage-accent" style={{ backgroundColor: stage.accent }} />
            <div>
              <p className="stage-number" lang="en">Stage {stage.number}</p>
              <h2>{stage.title}</h2>
            </div>
            <p className="stage-description">{stage.description}</p>
          </li>
        ))}
      </ol>

      <style>{`
        .scenario-home {
          box-sizing: border-box;
          display: grid;
          align-content: center;
          gap: clamp(2rem, 7vw, 5rem);
          min-height: 100svh;
          padding: clamp(1.5rem, 5vw, 5rem);
          background: #f8f9fc;
          color: #17213c;
          font-family: system-ui, sans-serif;
        }

        .scenario-heading,
        .stage-flow {
          width: min(100%, 88rem);
          margin-inline: auto;
        }

        .line-label {
          margin: 0 0 .55rem;
          color: #226c84;
          font-size: .875rem;
          font-weight: 700;
          letter-spacing: .1em;
        }

        .scenario-heading h1 {
          margin: 0;
          font-size: clamp(2rem, 5vw, 3.75rem);
          line-height: 1.2;
        }

        .scenario-intro {
          margin: 1rem 0 0;
          color: #41516b;
          line-height: 1.8;
        }

        .stage-flow {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(1.5rem, 3vw, 3rem);
          margin-block: 0;
          padding: 0;
          list-style: none;
        }

        .stage-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 17rem;
          padding: 1.25rem;
          border-radius: .8rem;
          background: #17213c;
          color: #fff;
        }

        .stage-card:not(:last-child)::after {
          position: absolute;
          top: 50%;
          left: calc(100% + .25rem);
          width: clamp(1rem, 2.25vw, 2.25rem);
          height: 1rem;
          background: #ef4868;
          clip-path: polygon(0 30%, 68% 30%, 68% 0, 100% 50%, 68% 100%, 68% 70%, 0 70%);
          content: "";
          transform: translateY(-50%);
        }

        .stage-accent {
          height: .4rem;
          border-radius: .15rem;
        }

        .stage-number {
          margin: 0 0 .3rem;
          color: #c8d4ec;
          font-size: .9rem;
          font-weight: 700;
        }

        .stage-card h2 {
          margin: 0;
          font-size: clamp(1.15rem, 2vw, 1.6rem);
        }

        .stage-description {
          margin: auto 0 0;
          color: #e0e7f6;
          font-size: .95rem;
          line-height: 1.75;
        }

        @media (max-width: 900px) {
          .stage-flow {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.75rem;
          }

          .stage-card {
            min-height: 0;
            gap: 1rem;
          }

          .stage-card:not(:last-child)::after {
            top: calc(100% + .375rem);
            left: 50%;
            width: 1rem;
            height: 1rem;
            transform: translateX(-50%) rotate(90deg);
          }
        }
      `}</style>
    </main>
  );
}