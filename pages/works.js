import SEO from '../components/Common/SEO';
import Link from 'next/link';
import Image from 'next/image';

const workPreviews = {
  'sample-size': [{ file: 'sample-size.webp', width: 1104, height: 704, alt: 'Sample Size Calculatorの入力画面と計算結果' }],
  'ab-test': [{ file: 'ab-test.webp', width: 1104, height: 675, alt: 'A/B Test Calculatorの有意差判定と成功率の比較画面' }],
  'normal-distribution': [{ file: 'normal-distribution.webp', width: 1104, height: 592, alt: '正規分布グラフの設定画面と生成した曲線' }],
  cocyclic: [{ file: 'cocyclic.webp', width: 426, height: 426, alt: '共円の盤面。4つの石を通る円を表示したプレイ画面' }],
  decidenow: [{ file: 'decidenow-icon.webp', width: 512, height: 512, alt: 'DecideNowのアプリアイコン' }],
  'vegetable-prices': [{ file: 'vegetable-prices-icon.webp', width: 512, height: 512, alt: '野菜価格のアプリアイコン' }],
  prop: [{ file: 'prop.webp', width: 1100, height: 820, alt: 'P*R*O*Pの配列データと系統解析の設定画面' }],
};

function WorkPreview({ project }) {
  return (
    <div className={`work-card-preview work-card-preview--${project}`}>
      {workPreviews[project].map(({ file, alt, width, height }) => (
        <Image key={file} src={`/images/works/${file}`} alt={alt} width={width} height={height} className="work-card-image" />
      ))}
    </div>
  );
}

export default function Works() {
  return (
    <>
      <SEO
        title="西巻 拓真 / Takuma Nishimaki - 作品"
        description="データ分析や日常生活に役立つものから、ちょっとしたお遊びまで、私が開発したツールの紹介です。"
        path="/works/"
      />

      <div className="archive-page works-page">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Works</h1>
          <p className="page-description">データ分析や日常生活に役立つものから、ちょっとしたお遊びまで、私が開発したツールの紹介です。</p>
          <div className="page-index" aria-label="ページ内の目次"><a href="#web-tools">Webツール</a><a href="#apps">アプリ</a><a href="#web-services">Webサイト</a></div>
        </header>

        {/* Content */}
        <div className="content-section">

          {/* ── Web Tools ── */}
          <section className="tools-category" id="web-tools">
            <h2 className="tools-category-title">Web Tools</h2>
            <p className="tools-category-description">データ分析や統計学習に役立つものから、ちょっとしたお遊びまで。すべて無料でご利用いただけるシンプルなWebツール集です。</p>
            <div className="tools-grid">
              {/* Sample Size Calculator */}
              <Link href="/tools/sample-size/" className="tool-card work-card">
                <WorkPreview project="sample-size" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">Sample Size Calculator</h3>
                  <p className="tool-card-description">アンケート調査に必要なサンプルサイズを算出できます。</p>
                  <div className="tool-card-cta">
                    <span>ツールを使う</span>
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>

              {/* A/B Test Calculator */}
              <Link href="/tools/ab-test/" className="tool-card work-card">
                <WorkPreview project="ab-test" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">A/B Test Calculator</h3>
                  <p className="tool-card-description">A/Bテストの結果に有意差があるかをカイ二乗検定で判定し、p値と成功率を比較表示します。</p>
                  <div className="tool-card-cta">
                    <span>ツールを使う</span>
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>

              {/* Normal Distribution Graph Maker */}
              <Link href="/tools/normal-distribution/" className="tool-card work-card">
                <WorkPreview project="normal-distribution" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">Normal Distribution Graph Maker</h3>
                  <p className="tool-card-description">任意の正規分布曲線を作成し、背景透過PNG画像としてダウンロードできるフリー素材ツールです。</p>
                  <div className="tool-card-cta">
                    <span>ツールを使う</span>
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>

              {/* Cocyclic Game */}
              <Link href="/tools/cocyclic/" className="tool-card work-card">
                <WorkPreview project="cocyclic" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">共円</h3>
                  <p className="tool-card-description">碁盤上に石を置いて、4つの石が同一円周上に並ばないようにするパズルゲームです。</p>
                  <div className="tool-card-cta">
                    <span>遊んでみる</span>
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* ── Mobile Apps ── */}
          <section className="tools-category" id="apps">
            <h2 className="tools-category-title">Mobile Apps</h2>
            <p className="tools-category-description">iOS / Android 向けにリリースしたモバイルアプリです。</p>
            <div className="tools-grid">
              {/* DecideNow */}
              <div className="tool-card work-card">
                <WorkPreview project="decidenow" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">DecideNow</h3>
                  <p className="tool-card-description">AHP（階層分析法）を用いた論理的な意思決定をスマートフォンでいつでも簡単に実行できるアプリです。</p>
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
              </div>

              {/* 野菜価格 */}
              <div className="tool-card work-card">
                <WorkPreview project="vegetable-prices" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">野菜価格</h3>
                  <p className="tool-card-description">市場のリアルタイムデータをもとに、お買い得な野菜・果物の価格情報を表示する家計応援アプリです。</p>
                  <div className="tool-card-store-links">
                    <a href="https://apps.apple.com/jp/app/id6737188459" target="_blank" rel="noopener noreferrer" className="tool-store-link">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                      <span>App Store</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Web Pages ── */}
          <section className="tools-category" id="web-services">
            <h2 className="tools-category-title">Web Pages</h2>
            <p className="tools-category-description">製作したWebサイトです。</p>
            <div className="tools-grid">
              {/* P*R*O*P */}
              <a href="https://www.rs.tus.ac.jp/bioinformatics/prop/" target="_blank" rel="noopener noreferrer" className="tool-card work-card">
                <WorkPreview project="prop" />
                <div className="work-card-content">
                  <h3 className="tool-card-title">P*R*O*P</h3>
                  <p className="tool-card-description">配列データから系統樹を推定・描画できるWebベースの系統解析ツールです。</p>
                  <div className="tool-card-cta">
                    <span>サイトを開く</span>
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </a>
            </div>
            <p className="related-research"><Link href="/research/#papers">P*R*O*Pの研究・論文を見る <span aria-hidden="true">→</span></Link></p>
          </section>

        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
