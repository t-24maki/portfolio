// pages/web-contents.js
import Head from 'next/head';
import Image from 'next/image';

export default function WebContents() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Web Contents]</title>
        <meta name="description" content="データサイエンス・AI関連のWeb配信コンテンツ一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Web Contents]" />
        <meta property="og:description" content="データサイエンス・AI関連のWeb配信コンテンツ一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/web-contents" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Web Contents]" />
        <meta name="twitter:description" content="データサイエンス・AI関連のWeb配信コンテンツ一覧です。" />
      </Head>

      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">Web Contents</h2>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div className="content-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ 
                  width: '100%', 
                  paddingTop: '75%', 
                  position: 'relative',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border-subtle)',
                }}>
                  <Image 
                    src="/images/ds-youtube.jpg"
                    alt="データサイエンス塾!!"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  letterSpacing: '0.01em',
                }}>データサイエンス塾!!</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}>
                  データ分析や人工知能(AI)開発の基本を無料で学べるYouTubeチャンネルです。ExcelやPythonによる実践を重視しています。
                </p>
                <a
                  href="https://www.youtube.com/@nishimaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <span>View Site</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="content-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ 
                  width: '100%', 
                  paddingTop: '75%', 
                  position: 'relative',
                  background: 'var(--color-surface-alt)',
                  border: '1px solid var(--color-border-subtle)',
                }}>
                  <Image 
                    src="/images/ds-site.jpg"
                    alt="データサイエンス塾"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  marginBottom: '1rem',
                  letterSpacing: '0.01em',
                }}>データサイエンス塾</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}>
                  YouTubeチャンネル「データサイエンス塾!!」と連動したデータサイエンス・統計学などの無料講座、ブラウザ上で動作する計算ツールなどを公開しているWebサイトです。
                </p>
                <a
                  href="https://analysis-navi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <span>View Site</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
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