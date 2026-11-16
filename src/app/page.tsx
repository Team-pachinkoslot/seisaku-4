export default function Home() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1f2937;
          background-color: #f9fafb;
          line-height: 1.6;
        }
        .container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .site-header {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }
        .logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }
        .hero {
          padding: 100px 0 80px;
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          background-color: #dbeafe;
          color: #1e40af;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .hero h1 {
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.2;
          color: #111827;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .hero p {
          max-width: 600px;
          margin: 0 auto;
          color: #4b5563;
          font-size: 1.125rem;
        }
        .features {
          padding: 80px 0;
        }
        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }
        .section-header p {
          color: #6b7280;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .card {
          background: #ffffff;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
        }
        .card-icon {
          font-size: 2rem;
          margin-bottom: 16px;
        }
        .card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111827;
        }
        .card p {
          color: #6b7280;
          font-size: 0.95rem;
        }
        .site-footer {
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 32px 0;
          margin-top: 60px;
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
        }
      `}</style>

      {/* ヘッダー */}
      <header className="site-header">
        <div className="container header-inner">
          <span className="logo">BrandName</span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <section className="hero">
          <div className="container">
            <span className="badge">New Release 2026</span>
            <h1>
              横転だけで世界一周、<br />
              新しい体験をここから。
            </h1>
            <p>
              無駄を削ぎ落としたデザインと直感的な操作性で、あなたのアイデアを最短距離で形にします。
            </p>
          </div>
        </section>

        {/* 特徴セクション（3カラム） */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2>選ばれる3つの理由</h2>
              <p>日々のワークフローを劇的に改善する機能が揃っています。</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <div className="card-icon">⚡</div>
                <h3>圧倒的なスピード</h3>
                <p>最新のアーキテクチャを採用し、ストレスのない軽快な動作を実現しました。</p>
              </article>
              <article className="card">
                <div className="card-icon">🎨</div>
                <h3>洗練されたデザイン</h3>
                <p>細部までこだわり抜いたUIで、使うたびに心地よさを感じられます。</p>
              </article>
              <article className="card">
                <div className="card-icon">🔒</div>
                <h3>強固なセキュリティ</h3>
                <p>大切なデータは最新の暗号化技術によって常に安全に保護されます。</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="site-footer">
        <div className="container">
          <p>&copy; 2026 BrandName. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}