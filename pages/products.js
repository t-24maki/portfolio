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

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Products</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/5">
                <div className="h-48 flex items-center justify-center rounded-lg relative">
                  <Image 
                    src="/images/decidenow.jpg"
                    alt="DecideNow"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">DecideNow</h3>
                <p className="text-gray-600 mb-4">
                  AHP（階層分析法）を用いた"論理的な意思決定"をスマートフォンでいつでも簡単に実行できるアプリです。
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://apps.apple.com/jp/app/id6596765054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                  >
                    <Box className="mr-2 h-4 w-4" />
                    iOS App Store
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.rollapps.decidenow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                  >
                    <Box className="mr-2 h-4 w-4" />
                    Google Play Store
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/5">
                <div className="h-48 flex items-center justify-center rounded-lg relative">
                  <Image 
                    src="/images/yasai.jpg"
                    alt="野菜価格"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">野菜価格</h3>
                <p className="text-gray-600 mb-4">
                  リアルタイムで安く買える野菜／果物が確認できる、家計お助けアプリです。市場に多く出回っている野菜が優先的に購入されることで、日本全体のフードロス削減にも繋がります。
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://apps.apple.com/jp/app/id6737188459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                  >
                    <Box className="mr-2 h-4 w-4" />
                    iOS App Store
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