import SEO from '../components/Common/SEO';
import Link from 'next/link';
import { YouTubeIcon, NoteIcon, LinkedInIcon, XIcon, GitHubIcon } from '../components/Common/Icons';
import { contactEmail } from '../components/Common/navigationData';

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

      <div className="about-page">
        <section className="hero about-hero" aria-labelledby="about-title">
          <div className="hero-content">
            <h1 className="hero-name" id="about-title">
              Takuma Nishimaki
              <span className="hero-name-ja">西巻 拓真</span>
            </h1>
            <div className="hero-meta">
              <p className="hero-title">独立統計家 / データサイエンティスト</p>
              <div className="hero-social-links" aria-label="SNS・外部プロフィール">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon /></a>
                ))}
              </div>
            </div>
            <p className="about-bio">
              SIer・コンサルティングファームでの実務経験と、博士課程でのデータ解析研究を背景に、企業のデータ利活用支援や人材育成に取り組んでいます。
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary"><span>お仕事のご相談</span><span className="btn-arrow" aria-hidden="true">→</span></a>
              <a href="#highlights" className="btn"><span>主な活動を見る</span></a>
            </div>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="services-section-inner">
            <div className="section-header"><span className="section-number">01</span><h2 className="section-title" id="services-title">What I Do<span className="section-subtitle">ご相談いただけること</span></h2></div>
            <div className="services-grid">
              <article className="service-card" id="advisory">
                <h3 className="service-title">データ利活用支援</h3>
                <p className="service-description">データ利活用の戦略立案、マーケティング施策の検討・効果検証、分析アルゴリズムの設計まで、企業の課題に合わせてデータに基づく意思決定を支援します。</p>
              </article>
              <article className="service-card" id="training">
                <h3 className="service-title">講義・講演</h3>
                <p className="service-description">統計学やデータ分析を現場で使える知識にするための講義・講演を行います。</p>
                <p className="service-topics">【テーマ】<br />データリテラシー／統計解析による意思決定／データで判断する組織の作り方</p>
              </article>
              <article className="service-card" id="writing">
                <h3 className="service-title">執筆・寄稿</h3>
                <p className="service-description">統計学やデータ分析に関する記事・解説を、書籍・雑誌・Webメディア向けに執筆します。特に実践的なノウハウや、生成AI時代のデータ分析の考え方・学び方について読者層に合わせた文章で届けます。</p>
              </article>
            </div>
          </div>
        </section>

        <section className="social-section highlights-section" id="highlights" aria-labelledby="highlights-title">
          <div className="social-section-inner">
            <div className="section-header"><span className="section-number">02</span><h2 className="section-title" id="highlights-title">Selected Activities<span className="section-subtitle">主な活動</span></h2></div>
            <div className="social-grid">
              <Link href="/media/" className="social-card activity-card">
                <div className="activity-category">Media <span aria-hidden="true">↗</span></div>
                <h3>統計学／データ分析教育</h3>
                <p className="social-description">登録者2.4万人超のYouTubeチャンネル「データサイエンス塾!!」を運営。その他、企業主催セミナー、Udemy、noteでもデータ分析のノウハウを発信しています。</p>
                <span className="activity-link">講演・掲載・発信を見る <span aria-hidden="true">→</span></span>
              </Link>
              <Link href="/research/#papers" className="social-card activity-card">
                <div className="activity-category">Research <span aria-hidden="true">↗</span></div>
                <h3>応用データ分析研究</h3>
                <p className="social-description">分子系統解析など、データ分析の知見に基づいた応用研究に取り組み、査読付き論文を複数発表しています。</p>
                <span className="activity-link">研究業績を見る <span aria-hidden="true">→</span></span>
              </Link>
              <Link href="/works/" className="social-card activity-card">
                <div className="activity-category">Works <span aria-hidden="true">↗</span></div>
                <h3>ツール・アプリ開発</h3>
                <p className="social-description">データ分析や日常生活に役立つアプリを多数開発・公開しています。</p>
                <span className="activity-link">ツール・アプリを見る <span aria-hidden="true">→</span></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-section-inner">
            <h2 className="contact-heading" id="contact-title">Contact</h2>
            <p className="contact-text">データ活用のご相談、研修・講演のご依頼など、<br />お気軽にメールでお問い合わせください。</p>
            <a href={`mailto:${contactEmail}`} className="contact-email about-email">{contactEmail}<span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
