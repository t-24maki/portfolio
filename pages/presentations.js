// pages/presentations.js
import Head from 'next/head';

export default function Presentations() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Presentations]</title>
        <meta name="description" content="学会発表、研究発表などの一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Presentations]" />
        <meta property="og:description" content="学会発表、研究発表などの一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/presentations" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Presentations]" />
        <meta name="twitter:description" content="学会発表、研究発表などの一覧です。" />
      </Head>

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Presentations</h2>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">口頭発表(英語)</h3>
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              An extension of the Kimura two-parameter model for nucleotide sequences containing gaps
            </h3>
            <p className="text-gray-600 mb-2">
              <b><u>T.Nishimaki</u></b>, K.Sato
            </p>
            <p className="text-gray-500">
              Biotech Asia Pacific Congress 2019, Kyoto, Japan, 2019
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">ポスター発表(英語)</h3>
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Development of a web application for phylogenetic analysis based on genetic difference considering the effect of gaps
            </h3>
            <p className="text-gray-600 mb-2">
              <b><u>T.Nishimaki</u></b>, K.Sato
            </p>
            <p className="text-gray-500">
              QBIC Workshop 2020, Tokyo University of Science, Japan, 2020
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              An extension of the Kimura two-parameter model to evolutionary process including insertions and deletions
            </h3>
            <p className="text-gray-600 mb-2">
              <b><u>T.Nishimaki</u></b>, K.Sato
            </p>
            <p className="text-gray-500">
              QBIC Workshop 2019, Tokyo University of Science, Japan, 2019
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">口頭発表(日本語)</h3>
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">ギャップサイトを活用した新しい進化距離の尺度</h3>
            <p className="text-gray-600 mb-2">
              <b><u>西巻拓真</u></b>
            </p>
            <p className="text-gray-500">
              生命情報科学若手の会第7回研究会, 山形, 2015年10月
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入欠失を考慮した遺伝的差異の有用性</h3>
            <p className="text-gray-600 mb-2">
              <b><u>西巻拓真</u></b>, 佐藤圭子
            </p>
            <p className="text-gray-500">
              日本遺伝学会第87回大会, 宮城, 2015年9月
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入欠失を含む進化モデルに基づく系統解析</h3>
            <p className="text-gray-600 mb-2">
              <b><u>西巻拓真</u></b>, 佐藤圭子, 原利英
            </p>
            <p className="text-gray-500">
              第39回生命の起源および進化学会, 広島, 2014年3月
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Kimuraの2変数法の拡張</h3>
            <p className="text-gray-600 mb-2">
              <b><u>西巻拓真</u></b>, 佐藤圭子, 原利英
            </p>
            <p className="text-gray-500">
              第38回生命の起源および進化学会, 福岡, 2013年3月
            </p>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">ポスター発表(日本語)</h3>
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入／欠失を考慮した遺伝的差異</h3>
            <p className="text-gray-600 mb-2">
              <b><u>西巻拓真</u></b>, 佐藤圭子
            </p>
            <p className="text-gray-500">
              日本進化学会第17回大会, 東京, 2015年8月
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Static Site Generation
export async function getStaticProps() {
  return {
    props: {},
  };
}