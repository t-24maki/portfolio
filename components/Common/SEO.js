import Head from 'next/head';
import { works } from '../../data/works';

const BASE_URL = 'https://tnishimaki.com';
const DEFAULT_DESCRIPTION = 'データ利活用支援や研修講師を行う独立統計家／データサイエンティストです。';
const DEFAULT_KEYWORDS =
  'データサイエンティスト,データサイエンス,統計家,AI,機械学習,統計学,分子系統学,Python,Excel,データ分析,教育';
const TWITTER_HANDLE = '@t_nsmk';
const DEFAULT_IMAGE = {
  path: '/images/site-image.jpg',
  width: 3000,
  height: 1688,
  alt: '西巻 拓真 / Takuma Nishimaki',
  type: 'image/jpeg',
};

/**
 * Centralized SEO / meta handling for all pages.
 *
 * Per-page meta (title, description, canonical, OGP, Twitter, structured data)
 * is rendered here. Site-wide tags (og:site_name, favicon, fonts,
 * viewport) live in _document.js / _app.js.
 *
 * @param {string}  title        Page <title> and og/twitter title.
 * @param {string}  description  Meta description, shared with og/twitter.
 * @param {string}  path         Path with leading slash, e.g. "/tools/". Builds canonical + og:url.
 * @param {string}  keywords     Optional keywords override.
 * @param {boolean} noindex      When true, emit noindex and skip canonical.
 * @param {React.ReactNode} children  Page-specific head tags (JSON-LD, stylesheets).
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  children,
}) {
  const url = `${BASE_URL}${path}`;
  const image = works.find(work => work.href === path)?.shareImage || DEFAULT_IMAGE;
  const imageUrl = `${BASE_URL}${image.path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OGP */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />
      <meta property="og:image:alt" content={image.alt} />
      <meta property="og:image:type" content={image.type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={image.alt} />

      {/* Misc */}
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Takuma Nishimaki" />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      {!noindex && <link rel="canonical" href={url} />}

      {children}
    </Head>
  );
}
