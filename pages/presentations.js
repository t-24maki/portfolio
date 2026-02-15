// pages/presentations.js
import Head from 'next/head';

export default function Presentations() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Presentations]</title>
        <meta name="description" content="基調講演、学会発表、研究発表などの一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Presentations]" />
        <meta property="og:description" content="基調講演、学会発表、研究発表などの一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/presentations" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Presentations]" />
        <meta name="twitter:description" content="基調講演、学会発表、研究発表などの一覧です。" />
      </Head>

      <div>
        {/* Page Header */}
        <header className="page-header">
          <div className="page-eyebrow">Academic Activities</div>
          <h1 className="page-title">Presentations</h1>
          <p className="page-description">学会発表・講演の一覧です。分子系統解析を中心に、国内外の学会で研究成果を発表しています。</p>
        </header>

        {/* Content */}
        <main className="content-section">
          {/* 講演 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">講演</h2>
              <span className="category-count">1</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2025</td>
                  <td className="entry-title">医学知識の無いデータサイエンティストがRWDを扱うという選択肢</td>
                  <td className="entry-venue">医学研究のデータはここが面白い！『データサイエンティストのためのこれからのキャリア戦略』, Webinar</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 国際学会 口頭発表 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">国際学会 口頭発表</h2>
              <span className="category-count">2</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2025</td>
                  <td className="entry-title">
                    Evaluation of molecular phylogenetic trees by an information-theoretic metric
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                  </td>
                  <td className="entry-venue">Evolution 2025, Athens, GA</td>
                </tr>
                <tr>
                  <td className="entry-year">2019</td>
                  <td className="entry-title">
                    An extension of the Kimura two-parameter model for nucleotide sequences containing gaps
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                  </td>
                  <td className="entry-venue">Biotech Asia Pacific Congress 2019, Kyoto</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 国際学会 ポスター発表 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">国際学会 ポスター発表</h2>
              <span className="category-count">2</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2020</td>
                  <td className="entry-title">
                    Development of a web application for phylogenetic analysis based on genetic difference considering the effect of gaps
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                  </td>
                  <td className="entry-venue">QBIC Workshop 2020, Tokyo University of Science</td>
                </tr>
                <tr>
                  <td className="entry-year">2019</td>
                  <td className="entry-title">
                    An extension of the Kimura two-parameter model to evolutionary process including insertions and deletions
                    <div className="entry-authors"><strong>T. Nishimaki</strong>, K. Sato</div>
                  </td>
                  <td className="entry-venue">QBIC Workshop 2019, Tokyo University of Science</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 国内学会 口頭発表 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">国内学会 口頭発表</h2>
              <span className="category-count">4</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2015</td>
                  <td className="entry-title">
                    ギャップサイトを活用した新しい進化距離の尺度
                    <div className="entry-authors"><strong>西巻拓真</strong></div>
                  </td>
                  <td className="entry-venue">生命情報科学若手の会第7回研究会, 山形</td>
                </tr>
                <tr>
                  <td className="entry-year">2015</td>
                  <td className="entry-title">
                    塩基の挿入欠失を考慮した遺伝的差異の有用性
                    <div className="entry-authors"><strong>西巻拓真</strong>, 佐藤圭子</div>
                  </td>
                  <td className="entry-venue">日本遺伝学会第87回大会, 宮城</td>
                </tr>
                <tr>
                  <td className="entry-year">2014</td>
                  <td className="entry-title">
                    塩基の挿入欠失を含む進化モデルに基づく系統解析
                    <div className="entry-authors"><strong>西巻拓真</strong>, 佐藤圭子, 原利英</div>
                  </td>
                  <td className="entry-venue">第39回生命の起源および進化学会, 広島</td>
                </tr>
                <tr>
                  <td className="entry-year">2013</td>
                  <td className="entry-title">
                    Kimuraの2変数法の拡張
                    <div className="entry-authors"><strong>西巻拓真</strong>, 佐藤圭子, 原利英</div>
                  </td>
                  <td className="entry-venue">第38回生命の起源および進化学会, 福岡</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 国内学会 ポスター発表 */}
          <section className="category">
            <div className="category-header">
              <h2 className="category-title">国内学会 ポスター発表</h2>
              <span className="category-count">1</span>
            </div>
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Title</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="entry-year">2015</td>
                  <td className="entry-title">
                    塩基の挿入／欠失を考慮した遺伝的差異
                    <div className="entry-authors"><strong>西巻拓真</strong>, 佐藤圭子</div>
                  </td>
                  <td className="entry-venue">日本進化学会第17回大会, 東京</td>
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