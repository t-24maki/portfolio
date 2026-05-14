import Head from 'next/head';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="データ利活用の戦略策定から組織づくり、教育・研修まで、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。" />
        <meta property="og:title" content="Services - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="データ利活用の戦略策定から組織づくり、教育・研修まで、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/services/" />
        <link rel="canonical" href="https://tnishimaki.com/services/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Services - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="データ利活用の戦略策定から組織づくり、教育・研修まで、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。" />
      </Head>

      <div>
        <header className="page-header">
          <div className="page-eyebrow">What I Do</div>
          <h1 className="page-title">Services</h1>
          <p className="page-description">
            データ利活用の戦略策定から組織づくり、教育・研修まで、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。
          </p>
        </header>

        <main className="content-section">
          {/* データ利活用顧問・アドバイザリー */}
          <section className="category" id="advisory">
            <div className="category-header">
              <h2 className="category-title">データ利活用顧問・アドバイザリー</h2>
            </div>
            <div className="services-detail">
              <p className="services-detail-description">
                経営課題の解決に向けたデータ利活用の推進と全体設計を行います。要件定義からモデル構築・効果測定まで、一貫して継続的にご支援します。
              </p>
              <div className="services-detail-grid">
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">データ利活用戦略の策定</h3>
                  <p className="services-detail-card-text">
                    事業KPIの整理から、データ基盤の設計、分析ロードマップの作成まで、データドリブンな意思決定体制の構築を支援します。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">AI・分析アルゴリズム設計</h3>
                  <p className="services-detail-card-text">
                    学術的な裏付けと実用性を兼ね備えた分析手法の選定・モデル設計を行います。予測モデル、因果推論、最適化など幅広い領域に対応します。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">プロトタイプ・デモUI開発</h3>
                  <p className="services-detail-card-text">
                    分析結果を関係者に共有するためのダッシュボードや簡易的なデモアプリケーションの開発を行います。
                  </p>
                </div>
              </div>
              {/* <p className="services-detail-note">※参考：月額50万円〜（月10時間程度）</p> */}
            </div>
          </section>

          {/* 企業研修・データ活用人材育成 */}
          <section className="category" id="training">
            <div className="category-header">
              <h2 className="category-title">企業研修・データ活用人材育成</h2>
            </div>
            <div className="services-detail">
              <p className="services-detail-description">
                企業・大学向けの教育企画、カリキュラム設計、教材開発、講義、フォローアップまでを一貫して行います。
              </p>
              <div className="services-detail-grid">
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">研修講師</h3>
                  <p className="services-detail-card-text">
                    統計学・機械学習・データ分析の基本から実践まで、受講者のレベルに合わせた研修を実施します。ハンズオン形式にも対応しています。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">学習教材開発</h3>
                  <p className="services-detail-card-text">
                    eラーニング教材、テキスト、演習課題など、組織のニーズに応じたオリジナル教材を企画・制作します。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">講義・講演</h3>
                  <p className="services-detail-card-text">
                    大学での講義や企業セミナーでの講演を承ります。データサイエンスの最新動向や実務への活用について、わかりやすくお伝えします。
                  </p>
                </div>
              </div>
              {/* <p className="services-detail-note">※参考：月額20〜30万円（半日研修）</p> */}
            </div>
          </section>

          {/* CTA */}
          <section className="services-cta">
            <p className="services-cta-text">
              ご相談・お見積もりなど、お気軽にお問い合わせください。
            </p>
            <Link href="/contact" className="btn btn-primary">
              <span>お問い合わせ</span>
              <span className="btn-arrow">→</span>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
