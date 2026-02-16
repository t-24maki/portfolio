// pages/tools.js
import Head from 'next/head';
import Link from 'next/link';

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Free Web Tools</div>
          <h1 className="page-title">Tools</h1>
          <p className="page-description">データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。</p>
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
              <p className="tool-card-description">アンケート調査に必要なサンプルサイズを算出できます。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Statistics</span>
                <span className="tool-tag">A/B Test</span>
              </div>
              <div className="tool-card-cta">
                <span>ツールを使う</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>

            {/* A/B Test Calculator */}
            <Link href="/tools/ab-test/" className="tool-card">
              <span className="tool-card-badge">Live</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h7v2H4zm0 4h7v2H4zm0 4h7v2H4zm9-8h7v2h-7zm0 4h7v2h-7zm0 4h7v2h-7z"/>
                  <path d="M2 4v16h20V4H2zm18 14H4V6h16v12z"/>
                </svg>
              </div>
              <h3 className="tool-card-title">A/B Test Calculator</h3>
              <p className="tool-card-description">A/Bテストの結果に有意差があるかをカイ二乗検定で判定し、p値と成功率を比較表示します。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Statistics</span>
                <span className="tool-tag">A/B Test</span>
              </div>
              <div className="tool-card-cta">
                <span>ツールを使う</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>

            {/* Normal Distribution Graph Maker */}
            <Link href="/tools/normal-distribution/" className="tool-card">
              <span className="tool-card-badge">Live</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20Q5 20 7 18Q9 10 12 10Q15 10 17 18Q19 20 21 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="tool-card-title">Normal Distribution Graph Maker</h3>
              <p className="tool-card-description">任意の正規分布曲線を作成し、背景透過PNG画像としてダウンロードできるフリー素材ツール。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Visualization</span>
                <span className="tool-tag">Statistics</span>
              </div>
              <div className="tool-card-cta">
                <span>ツールを使う</span>
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>

            {/* Cocyclic Game */}
            <Link href="/tools/cocyclic/" className="tool-card">
              <span className="tool-card-badge">Live</span>
              <div className="tool-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8" cy="7" r="2" fill="currentColor"/>
                  <circle cx="17" cy="10" r="2" fill="currentColor"/>
                  <circle cx="15" cy="18" r="2" fill="currentColor"/>
                  <circle cx="6" cy="15" r="2" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="tool-card-title">Cocyclic</h3>
              <p className="tool-card-description">碁盤上に石を置いて、4つの石が同一円周上に並ばないようにする理系パズルゲーム。</p>
              <div className="tool-card-tags">
                <span className="tool-tag">Puzzle</span>
                <span className="tool-tag">Geometry</span>
              </div>
              <div className="tool-card-cta">
                <span>遊んでみる</span>
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
