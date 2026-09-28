import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500&family=Noto+Serif+JP:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/icon_transparent.png" />
        <link rel="apple-touch-icon" href="/images/icon_transparent.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:site_name" content="西巻 拓真 / Takuma Nishimaki" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
