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

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Web Contents</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/5">
                <div className="h-48 flex items-center justify-center rounded-lg relative">
                  <Image 
                    src="/images/ds-youtube.jpg"
                    alt="データサイエンス塾!!"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">データサイエンス塾!!</h3>
                <p className="text-gray-600 mb-4">
                  データ分析や人工知能(AI)開発の基本を無料で学べるYouTubeチャンネルです。ExcelやPythonによる実践を重視しています。
                </p>
                <a
                  href="https://www.youtube.com/@nishimaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                >
                  View Site
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/5">
                <div className="h-48 flex items-center justify-center rounded-lg relative">
                  <Image 
                    src="/images/ds-site.jpg"
                    alt="データサイエンス塾"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">データサイエンス塾</h3>
                <p className="text-gray-600 mb-4">
                  YouTubeチャンネル「データサイエンス塾!!」と連動したデータサイエンス・統計学などの無料講座、ブラウザ上で動作する計算ツールなどを公開しているWebサイトです。
                </p>
                <a
                  href="https://analysis-navi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                >
                  View Site
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