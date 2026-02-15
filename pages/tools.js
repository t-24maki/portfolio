// pages/tools.js
import Head from 'next/head';
import Link from 'next/link';

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="データ分析や統計学習に役立つ、ブラウザで完結するシンプルなWebツール集。すべて無料でご利用いただけます。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="データ分析や統計学習に役立つ、ブラウザで完結するシンプルなWebツール集。すべて無料でご利用いただけます。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="データ分析や統計学習に役立つ、ブラウザで完結するシンプルなWebツール集。すべて無料でご利用いただけます。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Free Web Tools</div>
          <h1 className="page-title">Tools</h1>
          <p className="page-description">データ分析や統計学習に役立つ、ブラウザで完結するシンプルなWebツール集。すべて無料でご利用いただけます。</p>
        </header>

        {/* Content */}
        <main className="content-section">
          <div className="tools-grid">
            {/* Sample Size Calculator */}
            <Link href="/tools/sample-size/" className="tool-card">
              <span className="tool-card-badge">Live</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0 4H7v2h2v-2zm4-8h-2v2h2V7zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm4-8h-2v2h2V7zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                </svg>
              </div>
              <h3 className="tool-card-title">Sample Size Calculator</h3>
              <p className="tool-card-description">A/Bテストや調査に必要なサンプルサイズを算出。検出力・有意水準・効果量から必要数を計算します。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Statistics</span>
                <span className="tool-tag">A/B Test</span>
              </div>
              <div className="tool-card-cta">
                <span>ツールを使う</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>

            {/* Correlation Visualizer */}
            <Link href="/tools/correlation/" className="tool-card">
              <span className="tool-card-badge">Live</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="17" r="2"/>
                  <circle cx="10" cy="12" r="2"/>
                  <circle cx="14" cy="14" r="2"/>
                  <circle cx="17" cy="8" r="2"/>
                  <path d="M3 3v18h18"/>
                </svg>
              </div>
              <h3 className="tool-card-title">Correlation Visualizer</h3>
              <p className="tool-card-description">散布図と相関係数をインタラクティブに可視化。CSVアップロードで手持ちのデータもすぐ分析。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Visualization</span>
                <span className="tool-tag">EDA</span>
              </div>
              <div className="tool-card-cta">
                <span>ツールを使う</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>

            {/* Coming Soon Placeholder */}
            <div className="tool-card placeholder">
              <span className="tool-card-badge coming-soon">Coming Soon</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3 className="tool-card-title">More Tools</h3>
              <p className="tool-card-description">統計検定ツール、データ変換ユーティリティなど、新しいツールを順次追加予定です。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">In Development</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
