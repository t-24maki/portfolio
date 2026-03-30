// pages/tools.js
import Head from 'next/head';
import Link from 'next/link';

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="Webツール、モバイルアプリ、Webサービスなど、開発した各種ツールをまとめています。" />

        {/* OGP Tags */}
        <meta property="og:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="Webツール、モバイルアプリ、Webサービスなど、開発した各種ツールをまとめています。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools/" />
        <link rel="canonical" href="https://tnishimaki.com/tools/" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tools - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="Webツール、モバイルアプリ、Webサービスなど、開発した各種ツールをまとめています。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Tools &amp; Apps</div>
          <h1 className="page-title">Tools</h1>
          <p className="page-description">Webツール、モバイルアプリ、Webサービスなど、開発した各種ツールをまとめています。</p>
        </header>

        {/* Content */}
        <main className="content-section">

          {/* ── Web Tools ── */}
          <section className="tools-category">
            <h2 className="tools-category-title">Web Tools</h2>
            <p className="tools-category-description">データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。</p>
            <div className="tools-grid">
              {/* Sample Size Calculator */}
              <Link href="/tools/sample-size/" className="tool-card">
                <span className="tool-card-badge">Live</span>
                <div className="tool-card-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <line x1="8" y1="6" x2="16" y2="6"/>
                    <line x1="8" y1="10" x2="10" y2="10"/>
                    <line x1="12" y1="10" x2="16" y2="10"/>
                    <line x1="8" y1="14" x2="10" y2="14"/>
                    <line x1="12" y1="14" x2="16" y2="14"/>
                    <line x1="8" y1="18" x2="10" y2="18"/>
                    <line x1="12" y1="18" x2="16" y2="18"/>
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
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="8" height="16" rx="1"/>
                    <rect x="14" y="4" width="8" height="16" rx="1"/>
                    <line x1="6" y1="10" x2="6" y2="16"/>
                    <line x1="18" y1="10" x2="18" y2="16"/>
                    <line x1="4" y1="13" x2="8" y2="13"/>
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
                <p className="tool-card-description">任意の正規分布曲線を作成し、背景透過PNG画像としてダウンロードできるフリー素材ツールです。</p>
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
                    <circle cx="12" cy="3" r="1.8" fill="currentColor"/>
                    <circle cx="21" cy="12" r="1.8" fill="currentColor"/>
                    <circle cx="12" cy="21" r="1.8" fill="currentColor"/>
                    <circle cx="3" cy="12" r="1.8" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="tool-card-title">共円</h3>
                <p className="tool-card-description">碁盤上に石を置いて、4つの石が同一円周上に並ばないようにするパズルゲームです。</p>
                <div className="tool-card-tags">
                  <span className="tool-tag">Puzzle</span>
                  <span className="tool-tag">Geometry</span>
                </div>
                <div className="tool-card-cta">
                  <span>遊んでみる</span>
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </Link>
            </div>
          </section>

          {/* ── Mobile Apps ── */}
          <section className="tools-category">
            <h2 className="tools-category-title">Mobile Apps</h2>
            <p className="tools-category-description">iOS / Android 向けにリリースしたモバイルアプリです。</p>
            <div className="tools-grid">
              {/* DecideNow */}
              <div className="tool-card">
                <span className="tool-card-badge">Released</span>
                <div className="tool-card-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="tool-card-title">DecideNow</h3>
                <p className="tool-card-description">AHP（階層分析法）を用いた論理的な意思決定をスマートフォンでいつでも簡単に実行できるアプリです。</p>
                <div className="tool-card-tags">
                  <span className="tool-tag">Decision Making</span>
                  <span className="tool-tag">AHP</span>
                </div>
                <div className="tool-card-store-links">
                  <a href="https://apps.apple.com/jp/app/id6596765054" target="_blank" rel="noopener noreferrer" className="tool-store-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <span>App Store</span>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.rollapps.decidenow" target="_blank" rel="noopener noreferrer" className="tool-store-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3.18 23.67c-.37-.2-.58-.58-.58-1.04V1.37c0-.45.2-.83.58-1.03l11.63 11.67L3.18 23.67zM15.72 12.95l-2.5 2.5 8.52 4.83c.65.37 1.22.06 1.22-.67 0-.22-.07-.47-.22-.72l-7.02-5.94zM13.22 10.45l2.5 2.5 7.02-5.94c.15-.25.22-.5.22-.72 0-.73-.57-1.04-1.22-.67l-8.52 4.83zM13.22 12l-9.62-9.62c-.05.12-.08.26-.08.4v18.44c0 .14.03.28.08.4L13.22 12z"/></svg>
                    <span>Google Play</span>
                  </a>
                </div>
              </div>

              {/* 野菜価格 */}
              <div className="tool-card">
                <span className="tool-card-badge">Released</span>
                <div className="tool-card-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c-4 0-7-2-7-6 0-5 3-10 7-14 4 4 7 9 7 14 0 4-3 6-7 6z"/>
                    <path d="M12 8v14"/>
                    <path d="M9 12c0-2 1.5-4 3-5"/>
                    <path d="M15 14c0-2-1.5-4-3-5"/>
                  </svg>
                </div>
                <h3 className="tool-card-title">野菜価格</h3>
                <p className="tool-card-description">市場のリアルタイムデータをもとに、お買い得な野菜・果物の価格情報を表示する家計応援アプリです。</p>
                <div className="tool-card-tags">
                  <span className="tool-tag">Household</span>
                  <span className="tool-tag">Market Data</span>
                </div>
                <div className="tool-card-store-links">
                  <a href="https://apps.apple.com/jp/app/id6737188459" target="_blank" rel="noopener noreferrer" className="tool-store-link">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <span>App Store</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Web Services ── */}
          <section className="tools-category">
            <h2 className="tools-category-title">Web Services</h2>
            <p className="tools-category-description">研究活動を通じて開発・公開しているWebサービスです。</p>
            <div className="tools-grid">
              {/* P*R*O*P */}
              <a href="https://www.rs.tus.ac.jp/bioinformatics/prop/" target="_blank" rel="noopener noreferrer" className="tool-card">
                <span className="tool-card-badge">Live</span>
                <div className="tool-card-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18"/>
                    <path d="M5 8l3-5h8l3 5"/>
                    <path d="M3 13l4-5"/>
                    <path d="M21 13l-4-5"/>
                    <path d="M3 13l5 5"/>
                    <path d="M21 13l-5 5"/>
                    <path d="M8 18h8"/>
                  </svg>
                </div>
                <h3 className="tool-card-title">P*R*O*P</h3>
                <p className="tool-card-description">配列データから系統樹を推定・描画できるWebベースの系統解析ツールです。</p>
                <div className="tool-card-tags">
                  <span className="tool-tag">Bioinformatics</span>
                  <span className="tool-tag">Phylogenetics</span>
                </div>
                <div className="tool-card-cta">
                  <span>サイトを開く</span>
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>
            </div>
          </section>

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
