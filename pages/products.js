// pages/products.js
import Head from 'next/head';
import Image from 'next/image';
import { Box } from 'lucide-react';

export default function Products() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Products]</title>
        <meta name="description" content="開発・リリースしたプロダクト一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Products]" />
        <meta property="og:description" content="開発・リリースしたプロダクト一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/products" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Products]" />
        <meta name="twitter:description" content="開発・リリースしたプロダクト一覧です。" />
      </Head>

      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">Products</h2>
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
                    src="/images/decidenow.jpg"
                    alt="DecideNow"
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
                }}>DecideNow</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}>
                  AHP（階層分析法）を用いた"論理的な意思決定"をスマートフォンでいつでも簡単に実行できるアプリです。
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://apps.apple.com/jp/app/id6596765054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Box size={16} />
                    <span>iOS App Store</span>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.rollapps.decidenow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Box size={16} />
                    <span>Google Play Store</span>
                  </a>
                </div>
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
                    src="/images/yasai.jpg"
                    alt="野菜価格"
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
                }}>野菜価格</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}>
                  リアルタイムで安く買える野菜／果物が確認できる、家計お助けアプリです。市場に多く出回っている野菜が優先的に購入されることで、日本全体のフードロス削減にも繋がります。
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a
                    href="https://apps.apple.com/jp/app/id6737188459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Box size={16} />
                    <span>iOS App Store</span>
                  </a>
                </div>
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