// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

// Schema.orgのデータ
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "西巻 拓真 / Takuma Nishimaki",
  "alternateName": "Takuma Nishimaki",
  "jobTitle": "Data Scientist - Freelance",
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
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="データ利活用支援や研修講師を行う独立統計家／データサイエンティストです。" />

        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="データ利活用支援や研修講師を行う独立統計家／データサイエンティストです。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/" />
        <link rel="canonical" href="https://tnishimaki.com/" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="データ利活用支援や研修講師を行う独立統計家／データサイエンティストです。" />
        
        {/* Keywords */}
        <meta name="keywords" content="データサイエンティスト,データサイエンス,統計家,AI,機械学習,統計学,分子系統学,Python,Excel,データ分析,教育" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div>
        {/* Hero Section */}
        <section className="hero" style={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '8rem 3rem 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(220,220,215,0.6) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}></div>
          <div className="hero-content" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
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
            <p className="hero-description" style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              marginBottom: '3rem',
              lineHeight: 1.9,
            }}>
              10年超のビジネス経験と博士課程でのデータ解析研究実績を活かし、データドリブンな意思決定や人材育成を支援する独立統計家／データサイエンティストです。
            </p>
            <div className="hero-cta" style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}>
              <a href="#contact" className="btn btn-primary">
                <span>お仕事のご相談</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="#services" className="btn">
                <span>担当可能業務</span>
              </a>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="social-section" style={{
          padding: '6rem 3rem',
          background: 'var(--color-surface)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '3rem',
            right: '3rem',
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--color-border), transparent)',
          }}></div>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-number">01</span>
              <h2 className="section-title">Connect & Follow</h2>
            </div>
            <div className="social-grid">
            <a href="https://www.youtube.com/@nishimaki/" className="social-card" target="_blank" rel="noopener">
              <div className="social-card-header">
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <div className="social-platform">YouTube</div>
                  <div className="social-handle">@nishimaki</div>
                </div>
              </div>
              <p className="social-description">登録者数2.4万人を超えるデータサイエンス教育コンテンツ。初学者から実務者まで、統計・機械学習の基本を解説しています。</p>
              <div className="social-meta">Educational Videos</div>
            </a>

            <a href="https://note.com/tnishimaki" className="social-card" target="_blank" rel="noopener">
              <div className="social-card-header">
                <div className="social-icon">
                <svg fill="#000000" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Note</title><path d="M0 .279c4.623 0 10.953-.235 15.498-.117 6.099.156 8.39 2.813 8.468 9.374.077 3.71 0 14.335 0 14.335h-6.598c0-9.296.04-10.83 0-13.759-.078-2.578-.814-3.807-2.795-4.041-2.097-.235-7.975-.04-7.975-.04v17.84H0Z"/>
                </svg>
                </div>
                <div>
                  <div className="social-platform">note</div>
                  <div className="social-handle">@tnishimaki</div>
                </div>
              </div>
              <p className="social-description">データサイエンスの基本や実践ノウハウについて、より深い考察を記事として発信しています。</p>
              <div className="social-meta">Long-form Articles</div>
            </a>

            <a href="https://www.linkedin.com/in/nishimaki/" className="social-card" target="_blank" rel="noopener">
              <div className="social-card-header">
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="social-platform">LinkedIn</div>
                  <div className="social-handle">@nishimaki</div>
                </div>
              </div>
              <p className="social-description">仕事遍歴や実績などを公開しています。</p>
              <div className="social-meta">Articles & Insights</div>
            </a>

            <a href="https://x.com/t_nsmk" className="social-card" target="_blank" rel="noopener">
              <div className="social-card-header">
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </div>
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
                <div className="social-icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </div>
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
        <section className="services-section" id="services" style={{ 
          padding: '8rem 3rem',
          background: 'var(--color-surface)',
          position: 'relative',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-number">02</span>
              <h2 className="section-title">Services</h2>
            </div>
            <div className="services-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              marginTop: '4rem',
            }}>
            <div className="service-card" style={{
              padding: '2.5rem',
              border: '1px solid var(--color-border-subtle)',
              background: 'var(--color-bg)',
              position: 'relative',
            }}>
              <span className="service-number" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 400,
                color: 'var(--color-border)',
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                lineHeight: 1,
              }}>01</span>
              <h3 className="service-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
              }}>データ利活用アドバイザリー</h3>
              <p className="service-description" style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                経営課題解決に向けたデータ利活用の推進と全体設計を行います。要件定義・モデル構築・効果測定まで、一貫して継続的にご支援します。
              </p>
              <ul className="service-list" style={{ listStyle: 'none' }}>
                <li>経営課題解決に向けたデータ利活用の戦略策定</li>
                <li>学術的な裏付けと実用性を兼ね備えたAI/分析アルゴリズム設計</li>
                <li>簡易的なデモUI開発</li>
              </ul>
            </div>
            <div className="service-card" style={{
              padding: '2.5rem',
              border: '1px solid var(--color-border-subtle)',
              background: 'var(--color-bg)',
              position: 'relative',
            }}>
              <span className="service-number" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 400,
                color: 'var(--color-border)',
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                lineHeight: 1,
              }}>02</span>
              <h3 className="service-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                letterSpacing: '0.02em',
              }}>データサイエンス教育／研修</h3>
              <p className="service-description" style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                企業・大学向けの教育企画、カリキュラム設計、教材開発、講義、フォローを行います。
              </p>
              <ul className="service-list" style={{ listStyle: 'none' }}>
                <li>研修講師</li>
                <li>学習教材開発</li>
                <li>講義／講演</li>
              </ul>
            </div>
          </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section" id="skills" style={{ 
          padding: '6rem 3rem',
          background: 'var(--color-bg)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-number">03</span>
              <h2 className="section-title">Technical Stack</h2>
            </div>
            <div className="skills-container" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '3rem',
              marginTop: '3rem',
            }}>
            <div className="skill-category">
              <h3>AI・データ分析</h3>
              <div className="skill-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['統計解析', 'ベイズ推定', '因果推論', '機械学習', '数理最適化', '自然言語処理'].map((skill) => (
                  <span key={skill} className="skill-tag" style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    transition: 'all 0.3s ease',
                  }}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>開発言語</h3>
              <div className="skill-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Python', 'R', 'SQL', 'TypeScript'].map((skill) => (
                  <span key={skill} className="skill-tag" style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    transition: 'all 0.3s ease',
                  }}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>ツール・環境</h3>
              <div className="skill-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Tableau', 'Power BI', 'AWS', 'Docker', 'Git'].map((skill) => (
                  <span key={skill} className="skill-tag" style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    transition: 'all 0.3s ease',
                  }}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>ライブラリ</h3>
              <div className="skill-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['pandas', 'scikit-learn', 'TensorFlow', 'React', 'tidyverse'].map((skill) => (
                  <span key={skill} className="skill-tag" style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    padding: '0.4rem 0.8rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border-subtle)',
                    transition: 'all 0.3s ease',
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact" style={{
          padding: '8rem 3rem',
          background: 'var(--color-surface)',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, var(--color-border))',
          }}></div>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="contact-heading" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>Contact Me</h2>
            <p className="contact-text" style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '500px',
              margin: '0 auto 3rem',
              lineHeight: 1.8,
            }}>
              データ利活用関連のご相談、研修のご依頼など、お気軽にお問い合わせください。
            </p>
            <a href="/contact" className="btn btn-primary">
              <span>お問い合わせ</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </section>
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