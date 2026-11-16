'use client';

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
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-links a:not(.btn) {
          color: #4b5563;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .nav-links a:not(.btn):hover {
          color: #111827;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-primary {
          background-color: #2563eb;
          color: #ffffff;
        }
        .btn-primary:hover {
          background-color: #1d4ed8;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background-color: #ffffff;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        .btn-secondary:hover {
          background-color: #f3f4f6;
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
          margin: 0 auto 36px;
          color: #4b5563;
          font-size: 1.125rem;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
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
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07);
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
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .footer-links {
          display: flex;
          gap: 20px;
        }
        .footer-links a {
          color: #6b7280;
          text-decoration: none;
        }
        .footer-links a:hover {
          color: #111827;
        }
      `}</style>

      {/* ヘッダーナビゲーション */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="logo">BrandName</a>
          <nav className="nav-links">
            <a href="#features">特徴</a>
            <a href="#about">私たちについて</a>
            <a href="#contact" className="btn btn-primary">お問い合わせ</a>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <section className="hero">
          <div className="container hero-content">
            <span className="badge">New Release 2026</span>
            <h1>
              お砂糖とお醤油、<br />
              新しい体験をここから。
            </h1>
            <p>
              無駄を削ぎ落としたデザインと直感的な操作性で、あなたのアイデアを最短距離で形にします。
            </p>
            <div className="hero-actions">
              <a href="#start" className="btn btn-primary">無料で始める</a>
              <a href="#learn-more" className="btn btn-secondary">詳しく見る</a>
            </div>
          </div>
        </section>

        {/* 特徴セクション（3カラム） */}
        <section id="features" className="features">
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
        <div className="container footer-inner">
          <p>&copy; 2026 BrandName. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">プライバシーポリシー</a>
            <a href="#">利用規約</a>
          </div>
        </div>
      </footer>
    </>
  );
}