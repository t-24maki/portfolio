import SEO from '../components/Common/SEO';
import ExternalLink from '../components/Common/ExternalLink';
import { YouTubeIcon, NoteIcon, UdemyIcon } from '../components/Common/Icons';
import { pressArticles, talks } from '../data/media';

export default function Media() {
  return (
    <>
      <SEO title="西巻 拓真 / Takuma Nishimaki - メディア実績" description="講義講演やWeb媒体での発信実績です。" path="/media/" />
      <div className="archive-page media-page">
        <header className="page-header">
          <h1 className="page-title">Media</h1>
          <p className="page-description">講義講演やWeb媒体での発信実績です。</p>
          <div className="page-index" aria-label="ページ内の目次">
            <a href="#talks">講演・セミナー</a><a href="#press">掲載情報</a><a href="#courses">Web発信</a>
          </div>
        </header>
        <div className="content-section">
          <section className="category" id="talks" aria-labelledby="talks-title">
            <div className="category-header"><h2 className="category-title" id="talks-title">講演・セミナー</h2></div>
            <table className="entries-table archive-table media-table">
              <caption className="sr-only">講演・セミナーの実績</caption>
              <colgroup><col className="media-year-column" /><col /><col className="media-actions-column" /></colgroup>
              <thead><tr><th scope="col">年</th><th scope="col">講演・主催</th><th scope="col">詳細</th></tr></thead>
              <tbody>{talks.map((talk) => (
                <tr key={talk.title}>
                  <td className="entry-year">{talk.year}</td>
                  <td className="entry-content"><div className="entry-title">{talk.title}</div><div className="entry-org">{talk.venue}</div>{talk.description && <p className="entry-description">{talk.description}</p>}</td>
                  <td className="entry-actions">{talk.url && <ExternalLink href={talk.url}>詳細</ExternalLink>}</td>
                </tr>
              ))}</tbody>
            </table>
          </section>

          <section className="category" id="press" aria-labelledby="press-title">
            <div className="category-header"><h2 className="category-title" id="press-title">掲載情報</h2></div>
            <table className="entries-table archive-table media-table press-table">
              <caption className="sr-only">PR TIMES掲載記事（掲載日の新しい順）</caption>
              <colgroup><col className="media-date-column" /><col /><col className="media-actions-column" /></colgroup>
              <thead><tr><th scope="col">掲載日</th><th scope="col">記事・発信元</th><th scope="col">リンク</th></tr></thead>
              <tbody>{pressArticles.map((article) => (
                <tr key={article.url}>
                  <td className="entry-year"><time dateTime={article.date}>{article.date.replaceAll('-', '.')}</time></td>
                  <td className="entry-content"><div className="entry-title">{article.title}</div><div className="entry-org">{article.publisher}<span className="entry-kind">{article.type}</span></div></td>
                  <td className="entry-actions"><ExternalLink href={article.url}>記事を読む</ExternalLink></td>
                </tr>
              ))}</tbody>
            </table>
          </section>

          <section className="category" id="courses" aria-labelledby="courses-title">
            <div className="category-header"><h2 className="category-title" id="courses-title">Web発信</h2></div>
            <div className="social-grid media-channels">
              <a href="https://www.youtube.com/@nishimaki/" className="social-card activity-card" target="_blank" rel="noopener noreferrer">
                <div className="social-card-header"><div className="social-icon"><YouTubeIcon /></div><div className="social-platform">YouTube</div></div>
                <h3>データサイエンス塾!!</h3><p className="social-description">登録者2.4万人超のYouTubeチャンネル。統計学や機械学習の基礎を、初学者から実務者に向けて解説しています。</p><span className="activity-link">動画を見る <span aria-hidden="true">↗</span></span>
              </a>
              <a href="https://note.com/tnishimaki" className="social-card activity-card" target="_blank" rel="noopener noreferrer">
                <div className="social-card-header"><div className="social-icon"><NoteIcon /></div><div className="social-platform">note</div></div>
                <h3>データ分析の考え方</h3><p className="social-description">生成AI時代の統計家の役割や、データ分析のあり方を考える記事を発信しています。</p><span className="activity-link">記事を読む <span aria-hidden="true">↗</span></span>
              </a>
              <a href="https://www.udemy.com/course/excel_data/?referralCode=1E852BD09A70231F82FD" className="social-card activity-card" target="_blank" rel="noopener noreferrer">
                <div className="social-card-header"><div className="social-icon"><UdemyIcon /></div><div className="social-platform">Udemy · 2025</div></div>
                <h3><span className="title-phrase">Excelデータ分析／</span><span className="title-phrase">統計解析</span>{' '}<span className="title-phrase">超入門コース</span></h3><p className="social-description">Excelを使ったデータ分析の基本を、3時間で学ぶオンライン講座。Udemy Businessにも登録されています。</p><span className="activity-link">講座を見る <span aria-hidden="true">↗</span></span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() { return { props: {} }; }
