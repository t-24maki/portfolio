import Head from 'next/head';

export default function SEO({ 
  title, 
  description = "フリーランスのデータサイエンティスト／AIエンジニアです。",
  path = ""
}) {
  const baseUrl = "https://tnishimaki.com";
  const url = `${baseUrl}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OGP Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content="データサイエンティスト,データサイエンス,AI,機械学習,統計学,分子系統学,Python,Excel,データ分析,教育" />
      <meta name="author" content="Takuma Nishimaki" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Head>
  );
}