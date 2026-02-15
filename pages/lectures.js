// pages/lectures.js
import Head from 'next/head';

export default function Lectures() {
  return (
    <>
      <Head>
        <title>Lectures - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="企業・大学向けの研修講師、オンライン教材の制作など、データサイエンス教育に関する活動実績です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="Lectures - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="企業・大学向けの研修講師、オンライン教材の制作など、データサイエンス教育に関する活動実績です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/lectures" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Lectures - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="企業・大学向けの研修講師、オンライン教材の制作など、データサイエンス教育に関する活動実績です。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Education & Training</div>
          <h1 className="page-title">Lectures</h1>
          <p className="page-description">企業・大学向けの研修講師、オンライン教材の制作など、データサイエンス教育に関する活動実績です。</p>
        </header>

        {/* Content */}
        <main className="content-section">
          {/* オンライン教材 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">オンライン教材</h2>
              <span className="category-count">1</span>
            </div>
            <div className="lectures-grid">
              <a href="https://www.udemy.com/course/excel_data/?referralCode=1E852BD09A70231F82FD" className="lecture-card" target="_blank" rel="noopener">
                <span className="lecture-card-badge">Udemy</span>
                <h3 className="lecture-card-title">【すぐ実践できる！】Excelデータ分析/統計解析 超入門コース【3時間速習】</h3>
                <p className="lecture-card-org">Udemy</p>
                <p className="lecture-card-description">マーケティング担当者、営業・経営企画担当者、業務改善を目指す方向けに、Excelを使ったデータ分析の基本を3時間で学べるコースです。</p>
                <div className="lecture-card-meta">
                  <span className="lecture-tag">Excel</span>
                  <span className="lecture-tag">統計解析</span>
                  <span className="lecture-tag">データ分析</span>
                </div>
                <div className="lecture-card-cta">
                  <span>コースを見る</span>
                  <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>
            </div>
          </section>

          {/* 企業向けセミナー・研修 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">企業向けセミナー・研修</h2>
              <span className="category-count">1</span>
            </div>
            <table className="entries-table">
              <tbody>
                <tr>
                  <td className="entry-year">2026</td>
                  <td className="entry-content">
                    <div className="entry-title">Excel＋XLSTATで始めるデータ分析（基本統計シリーズ）</div>
                    <div className="entry-org">ユサコ株式会社</div>
                  </td>
                  <td className="entry-actions">
                    <a href="https://rs.usaco.co.jp/seminar/xlstat/xlstat-Basic-statistics-vol1.html" className="entry-link" target="_blank" rel="noopener">
                      詳細
                      <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
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
