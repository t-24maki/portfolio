// pages/publications.js
import Head from 'next/head';

export default function Publications() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Publications]</title>
        <meta name="description" content="論文発表、学会発表などの研究業績一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Publications]" />
        <meta property="og:description" content="論文発表、学会発表などの研究業績一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/publications" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Publications]" />
        <meta name="twitter:description" content="論文発表、学会発表などの研究業績一覧です。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Research Output</div>
          <h1 className="page-title">Publications</h1>
          <p className="page-description">査読付き学術論文の一覧です。分子系統解析における進化モデルの拡張とその応用に関する研究を行っています。</p>
        </header>

        {/* Content */}
        <main className="content-section">
          {/* 学術雑誌（査読あり） */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">学術雑誌（査読あり）</h2>
              <span className="category-count">2</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Details</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2021</td>
                  <td className="entry-content">
                    <div className="entry-title">P*R*O*P: a web application to perform phylogenetic analysis considering the effect of gaps</div>
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                    <div className="entry-journal">BMC Bioinformatics 22, 36 (2021)</div>
                  </td>
                  <td className="entry-actions">
                    <a
                      href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-03978-z"
                      className="entry-link"
                      target="_blank"
                      rel="noopener"
                    >
                      View
                      <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="entry-year">2019</td>
                  <td className="entry-content">
                    <div className="entry-title">An Extension of the Kimura Two-Parameter Model to the Natural Evolutionary Process</div>
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                    <div className="entry-journal">Journal of Molecular Evolution 87.1 (2019): 60-67</div>
                  </td>
                  <td className="entry-actions">
                    <a
                      href="https://link.springer.com/article/10.1007/s00239-018-9885-1"
                      className="entry-link"
                      target="_blank"
                      rel="noopener"
                    >
                      View
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

// Static Site Generation
export async function getStaticProps() {
  return {
    props: {},
  };
}