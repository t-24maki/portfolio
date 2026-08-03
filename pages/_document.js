import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/images/icon_transparent.png" />
        <link rel="apple-touch-icon" href="/images/icon_transparent.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:site_name" content="西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:image" content="https://tnishimaki.com/images/site-image.jpg" />
        <meta property="og:image:width" content="3000" />
        <meta property="og:image:height" content="1688" />
        <meta property="og:image:alt" content="西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="https://tnishimaki.com/images/site-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
