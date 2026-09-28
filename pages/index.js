import SEO from '../components/Common/SEO';
import Link from 'next/link';
import { YouTubeIcon, NoteIcon, UdemyIcon, LinkedInIcon, XIcon, GitHubIcon } from '../components/Common/Icons';
import { contactEmail } from '../components/Common/navigationData';
import { talks, pressArticles } from '../data/media';
import { publications, presentations } from '../data/research';
import styles from '../styles/About.module.css';

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "西巻 拓真 / Takuma Nishimaki",
  "alternateName": "Takuma Nishimaki",
  "url": "https://tnishimaki.com/"
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "西巻 拓真 / Takuma Nishimaki",
  "alternateName": "Takuma Nishimaki",
  "jobTitle": "Data Scientist",
  "description": "企業のデータ利活用支援や研修講師を行うデータサイエンティストです。",
  "url": "https://tnishimaki.com",
  "sameAs": [
    "https://github.com/t-24maki/",
    "https://x.com/t_nsmk",
    "https://www.linkedin.com/in/takuma-nishimaki-172539289/",
    "https://www.youtube.com/@nishimaki/",
    "https://note.com/tnishimaki"
  ],
  "knowsAbout": [
    "データサイエンス",
    "データサイエンティスト",
    "データアナリスト",
    "統計家",
    "フリーランス",
    "機械学習",
    "統計学",
    "分子系統学",
    "Python",
    "Excel"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "Tokyo University of Science"
  },
  "knowsLanguage": ["ja", "en"]
};

function OutboundLink({ href, children, className }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}<span className={styles.linkArrow} aria-hidden="true">&nbsp;↗</span>
    </a>
  );
}

export default function Home() {
  const socialLinks = [
    { name: 'YouTube', href: 'https://www.youtube.com/@nishimaki/', Icon: YouTubeIcon },
    { name: 'note', href: 'https://note.com/tnishimaki', Icon: NoteIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nishimaki/', Icon: LinkedInIcon },
    { name: 'X', href: 'https://x.com/t_nsmk', Icon: XIcon },
    { name: 'GitHub', href: 'https://github.com/t-24maki/', Icon: GitHubIcon },
  ];

  return (
    <>
      <SEO
        title="西巻 拓真 / Takuma Nishimaki"
        description="独立統計家・データサイエンティストです。データ利活用に関する支援、教育、サービス開発などに取り組んでいます。"
        path="/"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </SEO>

      <div className={styles.page}>
        <header className={styles.profile} aria-labelledby="about-title">
          <h1 className={styles.name} id="about-title">
            Takuma Nishimaki<span>西巻 拓真</span>
          </h1>
          <p className={styles.role}>独立統計家 / データサイエンティスト</p>
          <div className={styles.socialLinks} aria-label="SNS・外部プロフィール">
            {socialLinks.map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                <span aria-hidden="true"><Icon /></span>
              </a>
            ))}
          </div>
          <div className={styles.bio}>
            <p>SIer・コンサルティングファームにおける10年超の実務経験と、博士課程でのデータ解析研究を背景に、企業・大学向けのデータ利活用支援や人材育成に取り組んでいます。講義講演や<a href="https://www.youtube.com/@nishimaki/" target="_blank" rel="noopener noreferrer">YouTube</a>/<a href="https://note.com/tnishimaki" target="_blank" rel="noopener noreferrer">note</a>を通じて、統計学やデータ分析の考え方を発信しています。</p>
            <p>データドリブンな意思決定支援を行う合同会社propの代表、AI日報・分析システム開発を行う<a href="https://visionvoice.co.jp/" target="_blank" rel="noopener noreferrer">VisionVoice株式会社</a>の執行役員CTOを務めています。</p>
          </div>
        </header>

        <section className={styles.section} id="services" aria-labelledby="services-title">
          <h2 className={styles.sectionHeading} id="services-title">支援テーマ</h2>
          <div>
            <article className={styles.service} id="advisory">
              <h3>データ利活用支援</h3>
              <div>
                <p>データ利活用の戦略立案、マーケティング施策の検討・効果検証、分析アルゴリズムの設計まで、企業の課題に合わせてデータに基づく意思決定を支援します。</p>
              </div>
            </article>
            <article className={styles.service} id="analysis-advisory">
              <h3>データ分析アドバイザリー</h3>
              <div>
                <p>企業・大学・研究機関を対象に、研究デザインの検討、統計モデリング、分析結果の評価や解釈について助言し、研究・分析の取り組みを伴走支援します。</p>
              </div>
            </article>
            <article className={styles.service} id="training">
              <h3>講義・講演</h3>
              <div>
                <p>統計学やデータ分析を現場で使える知識にするための講義・講演を行います。</p>
                <ul className={styles.topics} aria-label="講義・講演のテーマ例">
                  <li>生成AI時代のデータリテラシー入門</li>
                  <li>統計解析に基づく意思決定の作法</li>
                  <li>データで判断する組織の作り方</li>
                </ul>
                <div className={styles.links} aria-label="講義・講演の実績とコンテンツ">
                  <a href="#talks">登壇実績<span className={styles.linkArrow} aria-hidden="true">&nbsp;↓</span></a>
                  <OutboundLink href="https://www.youtube.com/@nishimaki/">YouTube</OutboundLink>
                  <OutboundLink href="https://www.udemy.com/course/excel_data/?referralCode=1E852BD09A70231F82FD">Udemy</OutboundLink>
                </div>
              </div>
            </article>
            <article className={styles.service} id="writing">
              <h3>執筆・寄稿</h3>
              <div>
                <p>統計学やデータ分析に関する記事・解説を、書籍・雑誌・Webメディア向けに執筆します。特に実践的なノウハウや、生成AI時代のデータ分析の考え方・学び方について扱います。</p>
                <div className={styles.links}>
                  <OutboundLink href="https://note.com/tnishimaki">noteで記事を読む</OutboundLink>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} id="channels" aria-labelledby="channels-title">
          <h2 className={styles.sectionHeading} id="channels-title">Web発信</h2>
          <ul className={styles.records}>
            <li className={styles.record}>
              <p className={styles.recordTitle}>
                <OutboundLink href="https://www.youtube.com/@nishimaki/"><span className={styles.channelIcon} aria-hidden="true"><YouTubeIcon /></span>YouTube — データサイエンス塾!!</OutboundLink>
              </p>
              <p className={styles.recordMeta}>登録者2.4万人超。統計学や機械学習の基礎を、初学者から実務者に向けて解説しています。</p>
            </li>
            <li className={styles.record}>
              <p className={styles.recordTitle}>
                <OutboundLink href="https://note.com/tnishimaki"><span className={styles.channelIcon} aria-hidden="true"><NoteIcon /></span>note — データ分析の考え方</OutboundLink>
              </p>
              <p className={styles.recordMeta}>生成AI時代の統計家の役割や、データ分析のあり方を考える記事を発信しています。</p>
            </li>
            <li className={styles.record}>
              <p className={styles.recordTitle}>
                <OutboundLink href="https://www.udemy.com/course/excel_data/?referralCode=1E852BD09A70231F82FD"><span className={styles.channelIcon} aria-hidden="true"><UdemyIcon /></span>Udemy — Excelデータ分析／統計解析 超入門コース</OutboundLink>
              </p>
              <p className={styles.recordMeta}>Excelを使ったデータ分析の基本を、3時間で学ぶオンライン講座。Udemy Businessにも登録されています。</p>
            </li>
          </ul>
        </section>

        <section className={styles.section} id="talks" aria-labelledby="talks-title">
          <h2 className={styles.sectionHeading} id="talks-title"><span id="highlights">講義／講演</span></h2>
          <ul className={styles.records}>
            {talks.map((talk) => (
              <li className={styles.record} key={`${talk.year}-${talk.title}`}>
                <p className={styles.recordTitle}><time className={styles.date} dateTime={talk.year}>{talk.year}</time>{' '}{talk.url ? <OutboundLink href={talk.url}>{talk.title}</OutboundLink> : talk.title}</p>
                <p className={styles.recordMeta}>{talk.venue}{talk.description && <>。{talk.description}</>}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="press" aria-labelledby="press-title">
          <h2 className={styles.sectionHeading} id="press-title">メディア掲載情報</h2>
          <ul className={styles.records}>
            {pressArticles.map((article) => (
              <li className={styles.record} key={article.url}>
                <p className={styles.recordTitle}><time className={styles.date} dateTime={article.date}>{article.date.slice(0, 4)}</time>{' '}<OutboundLink href={article.url}>{article.title}</OutboundLink></p>
                <p className={styles.recordMeta}>{article.publisher} · PR TIMES</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="papers" aria-labelledby="papers-title">
          <h2 className={styles.sectionHeading} id="papers-title"><span id="research">論文（査読あり）</span></h2>
          <ul className={styles.records}>
            {publications.map((paper) => (
              <li className={styles.record} key={paper.url}>
                <p className={styles.recordTitle}><time className={styles.date} dateTime={paper.year}>{paper.year}</time>{' '}<OutboundLink href={paper.url}>{paper.title}</OutboundLink></p>
                <p className={styles.recordMeta}>{paper.authors}. <cite>{paper.journal}</cite>.</p>
                {paper.workUrl && <Link className={styles.relatedLink} href={paper.workUrl}>関連ツール<span className={styles.linkArrow} aria-hidden="true">&nbsp;→</span></Link>}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="presentations" aria-labelledby="presentations-title">
          <h2 className={styles.sectionHeading} id="presentations-title">学会発表</h2>
          <ul className={styles.records}>
            {presentations.map((presentation) => (
              <li className={styles.record} key={`${presentation.year}-${presentation.title}`}>
                <p className={styles.recordTitle}><time className={styles.date} dateTime={presentation.year}>{presentation.year}</time>{' '}{presentation.title}</p>
                <p className={styles.recordMeta}>{presentation.authors} · {presentation.venue} · {presentation.category}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="contact" aria-labelledby="contact-title">
          <h2 className={styles.sectionHeading} id="contact-title">お問い合わせ</h2>
          <p>データ利活用支援、データ分析アドバイザリー、講義・講演、執筆・寄稿のご依頼など、お気軽にメールでお問い合わせください。</p>
          <a href={`mailto:${contactEmail}`} className={styles.email}>{contactEmail}<span className={styles.linkArrow} aria-hidden="true">&nbsp;↗</span></a>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
