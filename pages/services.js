import SEO from '../components/Common/SEO';
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <SEO
        title="Services - 西巻 拓真 / Takuma Nishimaki"
        description="データ利活用の戦略策定、組織作り、教育など、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。"
        path="/services/"
      />

      <div>
        <header className="page-header">
          <div className="page-eyebrow">What I Do</div>
          <h1 className="page-title">Services</h1>
          <p className="page-description">
            データ利活用の戦略策定、組織作り、教育など、企業のデータ活用推進を幅広く支援しています。まずはお気軽にご相談ください。
          </p>
        </header>

        <main className="content-section">
          {/* データ利活用顧問・アドバイザリー */}
          <section className="category" id="advisory">
            <div className="category-header">
              <h2 className="category-title">データ利活用支援・アドバイザリー</h2>
            </div>
            <div className="services-detail">
              <p className="services-detail-description">
                経営課題の解決に向けたデータ利活用の推進と全体設計を行います。要件定義からモデル構築・効果測定まで、一貫して継続的にご支援します。
              </p>
              <div className="services-detail-grid">
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">データ利活用戦略の策定</h3>
                  <p className="services-detail-card-text">
                    事業KPIの整理、データ基盤の設計、分析ロードマップの作成まで、データドリブンな意思決定体制の構築を支援します。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">AI・分析アルゴリズム設計</h3>
                  <p className="services-detail-card-text">
                    学術的な裏付けと実用性を兼ね備えた分析手法の設計・実装を行います。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">プロトタイプ・シミュレータ開発</h3>
                  <p className="services-detail-card-text">
                    分析結果の実用化に向けたダッシュボードや簡易的なシミュレータ、デモアプリケーションの開発を行います。
                  </p>
                </div>
              </div>
              {/* <p className="services-detail-note">※参考：月額50万円〜（月10時間程度）</p> */}
            </div>
          </section>

          {/* 企業研修・データ活用人材育成 */}
          <section className="category" id="training">
            <div className="category-header">
              <h2 className="category-title">データ活用人材育成</h2>
            </div>
            <div className="services-detail">
              <p className="services-detail-description">
                企業・大学向けのデータ利活用に関する講義講演、フォローアップを一貫して行います。
              </p>
              <div className="services-detail-grid">
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">データリテラシー講座</h3>
                  <p className="services-detail-card-text">
                  「データを読む目」を養うための、ビジネスパーソンのための統計リテラシーについて扱います。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">実践統計学講座</h3>
                  <p className="services-detail-card-text">
                    統計学をただ学ぶだけでなく、「現場で使える」ようにするためのノウハウを扱います。
                  </p>
                </div>
                <div className="services-detail-card">
                  <h3 className="services-detail-card-title">データドリブンマーケ講座</h3>
                  <p className="services-detail-card-text">
                  企業がデータ活用を進める、その第一歩を踏み出すための思考法や具体的な行動について扱います。
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
