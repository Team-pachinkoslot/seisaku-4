'use client';

export default function Home() {
  return (
    <div className="brand-page" id="top">
      <style>{`
        .brand-page {
          --ink: #17283e;
          --muted: #5c6b7e;
          --blue: #235be8;
          color: var(--ink);
          background: #f7f9fc;
          font-family: Arial, "Noto Sans JP", sans-serif;
          line-height: 1.8;
          -webkit-font-smoothing: antialiased;
        }

        .brand-page *,
        .brand-page *::before,
        .brand-page *::after {
          box-sizing: border-box;
        }

        .brand-page :is(h1, h2, h3, p) {
          margin: 0;
        }

        .brand-page a {
          color: inherit;
          text-decoration: none;
        }

        .brand-page a:focus-visible {
          outline: 3px solid var(--blue);
          outline-offset: 5px;
        }

        .brand-page [id] {
          scroll-margin-top: 100px;
        }

        .brand-page .container {
          width: min(1120px, 100%);
          padding-inline: 32px;
          margin-inline: auto;
        }

        .brand-page .site-header {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.94);
          border-bottom: 1px solid #e5eaf2;
          backdrop-filter: blur(16px);
        }

        .brand-page .header-inner {
          min-height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand-page .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -0.8px;
        }

        .brand-page .logo::before {
          content: "";
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: var(--blue);
          box-shadow: inset -8px -8px 0 #ffffff35;
          transform: rotate(-10deg);
        }

        .brand-page .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
          font-size: 13px;
          font-weight: 600;
        }

        .brand-page .nav-links a:not(.btn) {
          color: var(--muted);
        }

        .brand-page .nav-links a:hover {
          color: var(--blue);
        }

        .brand-page .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          padding: 12px 25px;
          border: 1px solid transparent;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          transition:
            background 0.2s,
            transform 0.2s,
            box-shadow 0.2s;
        }

        .brand-page .btn-primary {
          color: white;
          background: var(--blue);
          box-shadow: 0 6px 18px #235be81c;
        }

        .brand-page .btn-primary:hover {
          color: white;
          background: #1948bf;
          transform: translateY(-2px);
          box-shadow: 0 9px 22px #235be830;
        }

        .brand-page .nav-links .btn {
          min-height: 42px;
          padding: 9px 19px;
          font-size: 12px;
        }

        .brand-page .btn-secondary {
          background: white;
          color: var(--ink);
          border-color: #dce3ee;
        }

        .brand-page .btn-secondary:hover {
          background: #edf2fc;
          transform: translateY(-2px);
        }

        .brand-page .hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 100px 0 105px;
          text-align: center;
          background:
            radial-gradient(
              ellipse at 10% 30%,
              #e7efff 0,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 95% 70%,
              #e5f4f4 0,
              transparent 45%
            ),
            #fff;
          border-bottom: 1px solid #e5eaf2;
        }

        .brand-page .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.45;
          background-image: radial-gradient(
            #a9bad6 0.8px,
            transparent 0.8px
          );
          background-size: 24px 24px;
          mask-image: linear-gradient(
            to right,
            #000,
            transparent 38%,
            transparent 62%,
            #000
          );
        }

        .brand-page .badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 6px 14px;
          border: 1px solid #d7e3fc;
          border-radius: 30px;
          background: #f0f5ff;
          color: #335db3;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 29px;
        }

        .brand-page .badge::before {
          content: "";
          width: 6px;
          height: 6px;
          background: var(--blue);
          border-radius: 50%;
        }

        .brand-page .hero h1 {
          font-size: clamp(30px, 4.7vw, 56px);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 1.5;
          text-wrap: balance;
        }

        .brand-page .hero h1 span {
          color: var(--blue);
        }

        .brand-page .hero p {
          max-width: 540px;
          margin: 24px auto 32px;
          color: var(--muted);
          font-size: 15px;
          line-height: 2;
          text-wrap: pretty;
        }

        .brand-page .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }

        .brand-page .hero-actions .btn {
          min-width: 170px;
        }

        .brand-page .features {
          padding: 85px 0 96px;
        }

        .brand-page .section-header {
          text-align: center;
          margin-bottom: 38px;
        }

        .brand-page .section-header::before {
          content: "FEATURES";
          display: block;
          margin-bottom: 10px;
          color: var(--blue);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
        }

        .brand-page .section-header h2 {
          font-size: clamp(24px, 3vw, 32px);
          letter-spacing: -0.04em;
          line-height: 1.5;
        }

        .brand-page .section-header p {
          margin-top: 13px;
          font-size: 13px;
          color: var(--muted);
        }

        .brand-page .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          counter-reset: feature;
        }

        .brand-page .card {
          position: relative;
          counter-increment: feature;
          padding: 32px 27px 34px;
          border: 1px solid #e2e8f1;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 15px #17283e03;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .brand-page .card::after {
          content: "0" counter(feature);
          position: absolute;
          top: 31px;
          right: 26px;
          color: #7d8da6;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .brand-page .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px #17283e0a;
        }

        .brand-page .card-icon {
          display: flex;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: #edf3ff;
          font-size: 23px;
          margin-bottom: 24px;
        }

        .brand-page .card:nth-child(2) .card-icon {
          background: #f4efff;
        }

        .brand-page .card:nth-child(3) .card-icon {
          background: #eaf6f3;
        }

        .brand-page .card h3 {
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .brand-page .card p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.95;
        }

        .brand-page .site-footer {
          padding: 29px 0;
          border-top: 1px solid #e2e8f1;
          background: white;
        }

        .brand-page .footer-inner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          color: var(--muted);
          font-size: 11px;
        }

        .brand-page .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .brand-page .footer-links a:hover {
          color: var(--blue);
        }

        @media (max-width: 760px) {
          .brand-page .container {
            padding-inline: 22px;
          }

          .brand-page .header-inner {
            min-height: 74px;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px 24px;
            padding-block: 15px;
          }

          .brand-page .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px 20px;
            font-size: 12px;
          }

          .brand-page .hero {
            padding: 65px 0 70px;
          }

          .brand-page .hero h1 {
            font-size: clamp(26px, 5.8vw, 40px);
          }

          .brand-page .hero p {
            font-size: 14px;
          }

          .brand-page .features {
            padding: 58px 0;
          }

          .brand-page .grid-3 {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .brand-page .card {
            padding: 25px;
          }

          .brand-page .card-icon {
            margin-bottom: 18px;
          }

          .brand-page .footer-inner {
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 380px) {
          .brand-page .hero-actions {
            flex-direction: column;
          }

          .brand-page .nav-links .btn {
            padding-inline: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-page .btn,
          .brand-page .card {
            transition: none;
          }

          .brand-page .btn:hover,
          .brand-page .card:hover {
            transform: none;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="logo">
            BrandName
          </a>

          <nav className="nav-links" aria-label="メインナビゲーション">
            <a href="#features">特徴</a>
            <a href="#about">私たちについて</a>
            <a href="#contact" className="btn btn-primary">
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <span className="badge">New Release 2026</span>

            <h1>
              お砂糖とお醤油、
              <br />
              <span>新しい体験をここから。</span>
            </h1>

            <p>
              無駄を削ぎ落としたデザインと直感的な操作性で、
              あなたのアイデアを最短距離で形にします。
            </p>

            <div className="hero-actions">
              <a href="#start" className="btn btn-primary">
                無料で始める
              </a>
              <a href="#features" className="btn btn-secondary">
                詳しく見る
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2>選ばれる3つの理由</h2>
              <p>
                日々のワークフローを劇的に改善する機能が揃っています。
              </p>
            </div>

            <div className="grid-3">
              <article className="card">
                <div className="card-icon" aria-hidden="true">
                  ⚡
                </div>
                <h3>圧倒的なスピード</h3>
                <p>
                  最新のアーキテクチャを採用し、ストレスのない軽快な動作を実現しました。
                </p>
              </article>

              <article className="card">
                <div className="card-icon" aria-hidden="true">
                  🎨
                </div>
                <h3>洗練されたデザイン</h3>
                <p>
                  細部までこだわり抜いたUIで、使うたびに心地よさを感じられます。
                </p>
              </article>

              <article className="card">
                <div className="card-icon" aria-hidden="true">
                  🔒
                </div>
                <h3>強固なセキュリティ</h3>
                <p>
                  大切なデータは最新の暗号化技術によって常に安全に保護されます。
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>&copy; 2026 BrandName. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">プライバシーポリシー</a>
            <a href="#">利用規約</a>
          </div>
        </div>
      </footer>
    </div>
  );
}