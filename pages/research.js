import Link from 'next/link';
import SEO from '../components/Common/SEO';
import ExternalLink from '../components/Common/ExternalLink';
import { publications, presentations } from '../data/research';

function Authors({ children }) {
  return <div className="entry-authors">{children.split(/(T\. Nishimaki|西巻\s?拓真)/).map((part, index) => /^(T\. Nishimaki|西巻\s?拓真)$/.test(part) ? <strong key={index}>{part}</strong> : part)}</div>;
}

export default function Research() {
  return (
    <>
      <SEO title="西巻 拓真 / Takuma Nishimaki - 研究実績" description="分子系統解析を中心とした研究活動の実績です。" path="/research/" />
      <div className="archive-page research-page">
        <header className="page-header">
          <h1 className="page-title">Research</h1>
          <p className="page-description">分子系統解析を中心とした研究活動の実績です。</p>
          <div className="page-index" aria-label="ページ内の目次"><a href="#papers">論文</a><a href="#presentations">学会発表</a></div>
        </header>
        <div className="content-section">
          <section className="category" id="papers" aria-labelledby="papers-title">
            <div className="category-header"><h2 className="category-title" id="papers-title">論文（査読あり）</h2><span className="category-meta">{publications.length} papers</span></div>
            <table className="entries-table archive-table research-table">
              <caption className="sr-only">査読付き学術論文</caption>
              <colgroup><col className="research-year-column" /><col /><col className="research-actions-column" /></colgroup>
              <thead><tr><th scope="col">年</th><th scope="col">論文・著者・掲載誌</th><th scope="col">リンク</th></tr></thead>
              <tbody>{publications.map((paper) => (
                <tr key={paper.url}>
                  <td className="entry-year">{paper.year}</td>
                  <td className="entry-content"><div className="entry-title">{paper.title}</div><Authors>{paper.authors}</Authors><div className="entry-journal">{paper.journal}</div></td>
                  <td className="entry-actions"><div className="entry-action-links"><ExternalLink href={paper.url}>論文を読む</ExternalLink>{paper.workUrl && <Link href={paper.workUrl} className="entry-link">関連ツール <span aria-hidden="true">→</span></Link>}</div></td>
                </tr>
              ))}</tbody>
            </table>
          </section>
          <section className="category" id="presentations" aria-labelledby="presentations-title">
            <div className="category-header"><h2 className="category-title" id="presentations-title">学会発表</h2><span className="category-meta">{presentations.length} presentations</span></div>
            <table className="entries-table archive-table research-table">
              <caption className="sr-only">国内外の学会発表（新しい年から順に掲載）</caption>
              <colgroup><col className="research-year-column" /><col /></colgroup>
              <thead><tr><th scope="col">年</th><th scope="col">発表・著者・学会</th></tr></thead>
              <tbody>{presentations.map((presentation) => (
                <tr key={`${presentation.year}-${presentation.title}`}>
                  <td className="entry-year">{presentation.year}</td>
                  <td className="entry-content"><span className="presentation-kind">{presentation.category}</span><div className="entry-title">{presentation.title}</div><Authors>{presentation.authors}</Authors><div className="entry-org">{presentation.venue}</div></td>
                </tr>
              ))}</tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() { return { props: {} }; }
