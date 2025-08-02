// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

// Schema.orgのデータ
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "西巻 拓真 / Takuma Nishimaki",
  "alternateName": "Takuma Nishimaki",
  "jobTitle": "Freelance Data Scientist",
  "description": "企業のデータ利活用支援や研修講師を行うフリーランスのデータサイエンティストです。",
  "url": "https://tnishimaki.com",
  "sameAs": [
    "https://github.com/t-24maki/",
    "https://x.com/t_nsmk",
    "https://www.linkedin.com/in/takuma-nishimaki-172539289/",
    "https://www.youtube.com/@nishimaki/"
  ],
  "knowsAbout": [
    "データサイエンス",
    "フリーランス",
    "機械学習",
    "統計解析",
    "分子系統学",
    "Python",
    "Excel"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "Tokyo University of Science"
  },
  "knowsLanguage": ["ja", "en"]
};

export default function Home() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="企業のデータ利活用支援や研修講師を行うフリーランスのデータサイエンティストです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="企業のデータ利活用支援や研修講師を行うフリーランスのデータサイエンティストです。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="企業のデータ利活用支援や研修講師を行うフリーランスのデータサイエンティストです。" />
        
        {/* Keywords */}
        <meta name="keywords" content="データサイエンティスト,データサイエンス,AI,機械学習,統計学,分子系統学,Python,Excel,データ分析,教育" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Profile</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed">
            フリーランスとしてデータ利活用支援や研修講師の業務を請け負っているデータサイエンティストです。
            SIer／コンサルティングファームにおいて、データドリブンマーケティング支援やAI開発業務に10年以上従事し、独立しました。
            個人活動として、分子系統解析の研究開発・オンライン教育コンテンツ作成・Webアプリ企画開発に取り組んでいます。
          </p>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">担当業務</h3>
          <div className="space-y-6">
            <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold mb-4 text-gray-800">データ利活用アドバイザリー</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-baseline">
                  <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                  経営課題解決に向けたデータ利活用の推進と全体設計
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  要件定義から効果測定までの継続的な分析・業務設計の伴走
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  社内外の構造化・非構造化データを活用した意思決定
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  学術的な裏付けと実用性を兼ね備えた分析アルゴリズム設計
                </li>
              </ul>

              <h4 className="text-xl font-bold mb-4 mt-8 text-gray-800">データサイエンス教育／研修</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  企業・大学向けの教育企画、カリキュラム設計、教材開発、講義、フォロー
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  技術面と実務面をいずれも意識した、即戦力となる社内人材の育成
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">技術スタック</h3>
          <div className="space-y-6">
            <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-bold mb-4 text-gray-800">AIモデリング・データ分析技術</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  統計解析：多変量解析、ベイズ推定、因果推論など
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  機械学習：教師あり学習（回帰・分類）、教師なし学習（クラスタリングなど）
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  数理最適化：組合せ最適化、遺伝的アルゴリズムなど
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  自然言語処理：TF-IDF、Doc2vec、BERTなど
                </li>
              </ul>

              <h4 className="text-xl font-bold mb-4 mt-8 text-gray-800">開発言語・フレームワーク</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  Python：NumPy, pandas, scikit-learn, TensorFlowなど
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  TypeScript/JavaScript：React, React Native
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  R：tidyverse, ggplot2など
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  SQL：PostgreSQL, SQLite3
                </li>
              </ul>
              <h4 className="text-xl font-bold mb-4 mt-8 text-gray-800">分析・可視化ツール</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  BI：Tableau, Power BI
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  データ加工：Alteryx
                </li>
                 <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  Notebook環境：JupyterLab, GoogleColab
                </li>

              </ul>

              <h4 className="text-xl font-bold mb-4 mt-8 text-gray-800">開発環境</h4>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  クラウド：AWS
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  コンテナ：Docker
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                  バージョン管理：Git, GitHub
                </li>
              </ul>

            </div>
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