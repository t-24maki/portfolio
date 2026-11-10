import Image from 'next/image';
import Link from 'next/link';
import SEO from '../components/Common/SEO';
import { contactEmail } from '../components/Common/navigationData';
import { propCompany, propClients } from '../data/prop';
import aboutStyles from '../styles/About.module.css';
import styles from '../styles/Prop.module.css';

const description = '合同会社prop（プロップ）は、西巻拓真が代表を務める法人です。AI・データ利活用のアドバイザリーと教育を通じて、企業の意思決定や人材育成を支援します。';
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: propCompany.name,
  legalName: propCompany.registeredName,
  url: 'https://tnishimaki.com/prop/',
  logo: 'https://tnishimaki.com/images/prop/prop_logo_color.png',
  description,
  founder: { '@type': 'Person', name: propCompany.representative, url: 'https://tnishimaki.com/' },
  address: {
    '@type': 'PostalAddress',
    postalCode: propCompany.postalCode,
    addressRegion: '東京都',
    addressLocality: '世田谷区',
    streetAddress: propCompany.address.replace(/^東京都世田谷区/, ''),
    addressCountry: 'JP',
  },
  identifier: { '@type': 'PropertyValue', propertyID: '法人番号', value: propCompany.corporateNumber },
};

function Arrow() {
  return <span className={aboutStyles.linkArrow} aria-hidden="true">&nbsp;↗</span>;
}

export default function Prop() {
  return (
    <>
      <SEO title="合同会社prop（プロップ） - 西巻 拓真 / Takuma Nishimaki" description={description} path="/prop/">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </SEO>
      <div className={`${aboutStyles.page} ${styles.page} reveal-page`}>
        <header className={styles.introduction}>
          <h1 className={styles.title}><span>「{propCompany.name}」</span><span>について</span></h1>
          <div className={styles.introText}>
            <p>合同会社prop（プロップ）は、西巻拓真が企業様との契約などをスムーズに実施するために立ち上げた法人です。</p>
            <p>会社という形は取っておりますが、基本的には個人として動きます。</p>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="prop-company-title">
          <h2 className={aboutStyles.sectionHeading} id="prop-company-title">企業情報</h2>
          <dl className={styles.companyInfo}>
            <div><dt>商号</dt><dd>{propCompany.name}（{propCompany.reading}）</dd></div>
            <div><dt>代表社員</dt><dd><Link href="/">{propCompany.representative}<span className={aboutStyles.linkArrow} aria-hidden="true">&nbsp;→</span></Link></dd></div>
            <div>
              <dt>事業内容</dt>
              <dd>AI／データ利活用に関する助言・教育・開発支援</dd>
            </div>
            <div><dt>設立</dt><dd>{propCompany.established}</dd></div>
            <div><dt>資本金</dt><dd>{propCompany.capital}</dd></div>
            <div><dt>所在地</dt><dd>{propCompany.address}</dd></div>
            <div><dt>法人番号</dt><dd><a href={propCompany.registryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${propCompany.name}の法人番号 ${propCompany.corporateNumber}（国税庁法人番号公表サイト）`}>{propCompany.corporateNumber}<Arrow /></a></dd></div>
            <div><dt>お問い合わせ</dt><dd><a href={`mailto:${contactEmail}`}>{contactEmail}<Arrow /></a></dd></div>
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="prop-clients-title">
          <h2 className={aboutStyles.sectionHeading} id="prop-clients-title">取引実績</h2>
          <ul className={styles.list}>
            {propClients.map(name => <li key={name}>{name}</li>)}
          </ul>
          <p className={styles.clientNote}>五十音順・敬称略（法人格を除く）</p>
        </section>

        <section className={styles.section} aria-labelledby="prop-logos-title">
          <h2 className={aboutStyles.sectionHeading} id="prop-logos-title">企業ロゴ</h2>
          <div className={styles.logos}>
            <figure className={styles.logoVariant}>
              <div className={styles.logoArtwork}>
                <Image className={styles.brandWordmark} src="/images/prop/prop_logo_color.png" alt="prop ロゴマーク" width={2400} height={1484} />
              </div>
              <figcaption>ロゴマーク</figcaption>
            </figure>
            <figure className={styles.logoVariant}>
              <div className={styles.logoArtwork}>
                <Image className={styles.brandIcon} src="/images/prop/prop_icon_color.png" alt="prop シンボルマーク" width={1024} height={1024} />
              </div>
              <figcaption>シンボルマーク</figcaption>
            </figure>
          </div>
        </section>
      </div>
    </>
  );
}
