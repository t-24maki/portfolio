import SEO from '../components/Common/SEO';
import Link from 'next/link';
import { YouTubeIcon, NoteIcon, LinkedInIcon, XIcon, GitHubIcon } from '../components/Common/Icons';

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
  return (
    <>
      <SEO
        title="西巻 拓真 / Takuma Nishimaki"
        description="データ利活用支援や講義講演業を行う独立統計家／データサイエンティストです。"
        path="/"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </SEO>

      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-eyebrow">
              Available for New Projects
            </div>
            <h1 className="hero-name">
              Takuma Nishimaki
              <span className="hero-name-ja">西巻 拓真</span>
            </h1>
            <p className="hero-title">
              Statistician / Data Scientist
            </p>
            <p className="hero-description">
            独立統計家(データサイエンティスト)です。SIer／コンサルファームでのビジネス経験と博士課程でのデータ解析研究実績を活かし、組織のデータ利活用や人材育成を支援しています。
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                <span>お仕事のご相談</span>
                <span className="btn-arrow">→</span>
              </a>
              <Link href="/services" className="btn">
                <span>ご支援テーマ</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="social-section">
          <div className="social-section-inner">
            <div className="section-header">
              <span className="section-number">01</span>
              <h2 className="section-title">Connect & Follow</h2>
            </div>
            <div className="social-grid">
              <a href="https://www.youtube.com/@nishimaki/" className="social-card" target="_blank" rel="noopener">
                <div className="social-card-header">
                  <div className="social-icon"><YouTubeIcon /></div>
                  <div>
                    <div className="social-platform">YouTube</div>
                    <div className="social-handle">@nishimaki</div>
                  </div>
                </div>
                <p className="social-description">登録者数2.4万人を超えるデータサイエンス教育コンテンツ。初学者から実務者に向け、統計学や機械学習の基本を解説しています。</p>
                <div className="social-meta">Educational Videos</div>
              </a>

              <a href="https://note.com/tnishimaki" className="social-card" target="_blank" rel="noopener">
                <div className="social-card-header">
                  <div className="social-icon"><NoteIcon /></div>
                  <div>
                    <div className="social-platform">note</div>
                    <div className="social-handle">@tnishimaki</div>
                  </div>
                </div>
                <p className="social-description">データ分析の基本や実践ノウハウについて、より深い考察を記事として発信しています。</p>
                <div className="social-meta">Long-form Articles</div>
              </a>

              <a href="https://www.linkedin.com/in/nishimaki/" className="social-card" target="_blank" rel="noopener">
                <div className="social-card-header">
                  <div className="social-icon"><LinkedInIcon /></div>
                  <div>
                    <div className="social-platform">LinkedIn</div>
                    <div className="social-handle">@nishimaki</div>
                  </div>
                </div>
                <p className="social-description">詳細な所属遍歴や実績などを公開しています。</p>
                <div className="social-meta">Articles & Insights</div>
              </a>

              <a href="https://x.com/t_nsmk" className="social-card" target="_blank" rel="noopener">
                <div className="social-card-header">
                  <div className="social-icon"><XIcon /></div>
                  <div>
                    <div className="social-platform">X (Twitter)</div>
                    <div className="social-handle">@t_nsmk</div>
                  </div>
                </div>
                <p className="social-description">日々の気づきや技術トピックを気軽に発信しています。</p>
                <div className="social-meta">Daily Updates</div>
              </a>

              <a href="https://github.com/t-24maki/" className="social-card" target="_blank" rel="noopener">
                <div className="social-card-header">
                  <div className="social-icon"><GitHubIcon /></div>
                  <div>
                    <div className="social-platform">GitHub</div>
                    <div className="social-handle">@t-24maki</div>
                  </div>
                </div>
                <p className="social-description">オープンソースプロジェクトやサンプルコードを公開しています。</p>
                <div className="social-meta">Code & Projects</div>
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section" id="services">
          <div className="services-section-inner">
            <div className="section-header">
              <span className="section-number">02</span>
              <h2 className="section-title">Services</h2>
            </div>
            <div className="services-grid">
              <Link href="/services#advisory" className="service-card">
                <span className="service-number">01</span>
                <h3 className="service-title">データ利活用アドバイザリー</h3>
                <p className="service-description">
                  経営課題解決に向けたデータ利活用の推進と全体設計を行います。要件定義・モデル構築・効果測定まで、一貫して継続的にご支援します。
                </p>
                <ul className="service-list">
                  <li>経営課題解決に向けたデータ利活用の戦略策定</li>
                  <li>学術的な裏付けと実用性を兼ね備えたAI/分析アルゴリズム設計</li>
                  <li>簡易的なデモUI開発</li>
                </ul>
              </Link>
              <Link href="/services#training" className="service-card">
                <span className="service-number">02</span>
                <h3 className="service-title">データサイエンス教育</h3>
                <p className="service-description">
                  企業・大学向けの教育カリキュラム設計、教材開発、講義、フォローを行います。
                </p>
                <ul className="service-list">
                  <li>データリテラシー</li>
                  <li>ビジネス統計解析</li>
                  <li>データドリブンマーケティング</li>
                </ul>
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section" id="skills">
          <div className="skills-section-inner">
            <div className="section-header">
              <span className="section-number">03</span>
              <h2 className="section-title">Technical Stack</h2>
            </div>
            <div className="skills-container">
              <div className="skill-category">
                <h3>AI・データ分析</h3>
                <div className="skill-list">
                  {['統計解析', 'ベイズ推定', '因果推論', '機械学習', '数理最適化', '自然言語処理'].map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>開発言語</h3>
                <div className="skill-list">
                  {['Python', 'R', 'SQL', 'TypeScript'].map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>ツール・環境</h3>
                <div className="skill-list">
                  {['Tableau', 'Power BI', 'AWS', 'Docker', 'Git'].map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h3>ライブラリ</h3>
                <div className="skill-list">
                  {['pandas', 'scikit-learn', 'TensorFlow', 'React', 'tidyverse'].map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="contact-section-inner">
            <h2 className="contact-heading">Contact Me</h2>
            <p className="contact-text">
              データ利活用関連のご相談、研修のご依頼など、お気軽にお問い合わせください。
            </p>
            <Link href="/contact" className="btn btn-primary">
              <span>お問い合わせ</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
