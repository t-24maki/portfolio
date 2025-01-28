import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, User, Box, GraduationCap, Video, Youtube, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet';

import dsyoutubeImage from './assets/ds-youtube.jpg';
import dssiteImage from './assets/ds-site.jpg';
import decidenowImage from './assets/decidenow.jpg';
import yasaiImage from './assets/yasai.jpg';

const SEOMetaTags = ({ activeSection }) => {
  // セクションに応じてタイトルを動的に変更
  const getTitle = () => {
    const baseTitle = "西巻 拓真 / Takuma Nishimaki";
    switch (activeSection) {
      case 'profile':
        return `${baseTitle} | Profile`;
      case 'publications':
        return `${baseTitle} | Publications`;
      case 'presentations':
        return `${baseTitle} | Presentations`;
      case 'web-contents':
        return `${baseTitle} | Web Contents`;
      case 'products':
        return `${baseTitle} | Products`;
      case 'mail':
        return `${baseTitle} | Contact`;
      default:
        return baseTitle;
    }
  };

  return (
    <Helmet>
      <title>{getTitle()}</title>
      <meta name="description" content="フリーランスのデータサイエンティスト／AIエンジニアです。" />
      
      {/* OGP Tags */}
      <meta property="og:title" content={getTitle()} />
      <meta property="og:description" content="フリーランスのデータサイエンティスト／AIエンジニアです。" />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={getTitle()} />
      <meta name="twitter:description" content="フリーランスのデータサイエンティスト／AIエンジニアです。" />
      
      {/* Keywords */}
      <meta name="keywords" content="データサイエンティスト,データサイエンス,AI,機械学習,統計学,分子系統学,Python,Excel,データ分析,教育" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Takuma Nishimaki" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://tnishimaki.com" />
    </Helmet>
  );
};

const XLogo = ({ size = 20, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className}
    aria-hidden="true"
  >
    <path 
      fill="currentColor" 
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  </svg>
);

const SchemaOrg = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "西巻 拓真 / Takuma Nishimaki真",
    "alternateName": "Takuma Nishimaki",
    "jobTitle": "Freelance Data Scientist",
    "description": "フリーランスのデータサイエンティスト／AIエンジニアです。",
    "url": "https://tnishimaki.com",
    "sameAs": [
      "https://github.com/t-24maki/",
      "https://x.com/t_nsmk",
      "https://www.linkedin.com/in/takuma-nishimaki-172539289/",
      "https://www.youtube.com/@nishimaki/"
    ],
    "knowsAbout": [
      "データサイエンス",
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
    "knowsLanguage": ["ja", "en"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Data Scientist",
      "description": "フリーランスのデータサイエンティスト／AIエンジニアです。",
      "skills": "Python, R, Machine Learning, Statistical Analysis"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'presentations', label: 'Presentations', icon: Video },
    { id: 'web-contents', label: 'Web Contents', icon: Globe },
    { id: 'products', label: 'Products', icon: Box },
    { id: 'mail', label: 'Contact', icon: Mail },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/t-24maki/', label: 'GitHub' },
    { icon: XLogo, href: 'https://x.com/t_nsmk', label: 'X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/takuma-nishimaki-172539289/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@nishimaki/', label: 'YouTube' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Profile</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed">
                SIer・コンサルティングファームにおいて、エンジニアやデータサイエンティストとしてAI開発やデータドリブン経営支援などに10年以上従事しました。個人活動として、分子系統解析を始めとしたAI/データサイエンス技術に関するアルゴリズム研究開発・オンライン教育コンテンツ作成・Webアプリ企画開発に取り組んでいます。
              </p>
              <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">担当業務</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h4 className="text-xl font-bold mb-4 text-gray-800">データ利活用アドバイザリー</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-baseline">
                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      データサイエンスによる課題解決の一貫支援（課題抽出、データ解析、結果解釈、業務への組込み、効果検証）
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      組織データ利活用の推進支援
                    </li>
                  </ul>
                  <br></br>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">AI／データ分析ソリューション開発</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      データ分析関連プロダクト/ソリューション企画とモック開発
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      AIアルゴリズムの構築と改善
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      新規性の高い分析アルゴリズムの研究開発と論文執筆
                    </li>
                  </ul>
                  <br></br>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">AI／データサイエンス教育</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      企業や大学における研修企画と講師業
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      教育コンテンツ制作
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      データ活用人材の育成
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
                  <br></br>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">開発言語・フレームワーク</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      Python：NumPy, pandas, scikit-learn, TensorFlowなど
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      TypeScript/JavaScript：React
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      R：tidyverse, ggplot2など
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      SQL：PostgreSQL
                    </li>
                  </ul>
                  <br></br>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">開発環境</h4>
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
                      開発環境：JupyterLab, Google Colab
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      バージョン管理：Git, GitHub
                    </li>
                  </ul>
                  <br></br>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">分析・可視化ツール</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      BI：Tableau, Power BI
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2"></div>
                      データ加工：Alteryx
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'publications':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Publications</h2>
            <div className="space-y-6">
            <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">学術雑誌（査読あり）</h3>
              
            <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">P*R*O*P: a web application to perform phylogenetic analysis considering the effect of gaps </h3>
                  <p className="text-gray-600 mb-2">
                  <b><u>T.Nishimaki</u></b>, K.Sato
                  </p>
                  <p className="text-gray-500 mb-4">
                  BMC Bioinformatics 22, 36 (2021).
                  </p>
                  <a
                    href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-03978-z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Paper
                  </a>
                </div>                
                <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">An Extension of the Kimura Two-Parameter Model to the Natural Evolutionary Process </h3>
                  <p className="text-gray-600 mb-2">
                  <b><u>T.Nishimaki</u></b>, K.Sato
                  </p>
                  <p className="text-gray-500 mb-4">
                  Journal of molecular evolution 87.1 (2019): 60-67. 
                  </p>
                  <a
                    href="https://link.springer.com/article/10.1007/s00239-018-9885-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-shadow"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Paper
                  </a>

                </div>

            </div>
          </div>
        );
      case 'presentations':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Presentation</h2>
            <div className="space-y-6">
            <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">口頭発表(英語)</h3>
              
                <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">An extension of the Kimura two-parameter model for nucleotide sequences containing gaps </h3>
                  <p className="text-gray-600 mb-2">
                  <b><u>T.Nishimaki</u></b>, K.Sato
                  </p>
                  <p className="text-gray-500">
                  Biotech Asia Pacific Congress 2019, Kyoto, Japan, 2019
                  </p>
                </div>
                <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">ポスター発表(英語)</h3>
              
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Development of a web application for phylogenetic analysis based on genetic difference considering the effect of gaps </h3>
                <p className="text-gray-600 mb-2">
                <b><u>T.Nishimaki</u></b>, K.Sato
                </p>
                <p className="text-gray-500">
                QBIC Workshop 2020, Tokyo University of Science, Japan, 2020
                </p>
              </div>
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">An extension of the Kimura two-parameter model to evolutionary process including insertions and deletions </h3>
                <p className="text-gray-600 mb-2">
                <b><u>T.Nishimaki</u></b>, K.Sato
                </p>
                <p className="text-gray-500">
                QBIC Workshop 2019, Tokyo University of Science, Japan, 2019
                </p>
              </div>
              <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">口頭発表(日本語)</h3>
              
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">ギャップサイトを活用した新しい進化距離の尺度 </h3>
                <p className="text-gray-600 mb-2">
                <b><u>西巻拓真</u></b>
                </p>
                <p className="text-gray-500">
                生命情報科学若手の会第7回研究会, 山形, 2015年10月
                </p>
              </div>
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入欠失を考慮した遺伝的差異の有用性 </h3>
                <p className="text-gray-600 mb-2">
                <b><u>西巻拓真</u></b>, 佐藤圭子
                </p>
                <p className="text-gray-500">
                日本遺伝学会第87回大会, 宮城, 2015年9月
                </p>
              </div>
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入欠失を含む進化モデルに基づく系統解析 </h3>
                <p className="text-gray-600 mb-2">
                <b><u>西巻拓真</u></b>, 佐藤圭子, 原利英
                </p>
                <p className="text-gray-500">
                第39回生命の起源および進化学会, 広島, 2014年3月
                </p>
              </div>
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Kimuraの2変数法の拡張 </h3>
                <p className="text-gray-600 mb-2">
                <b><u>西巻拓真</u></b>, 佐藤圭子, 原利英
                </p>
                <p className="text-gray-500">
                第38回生命の起源および進化学会, 福岡, 2013年3月
                </p>
              </div>
             <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">ポスター発表(日本語)</h3>
              
              <div className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">塩基の挿入／欠失を考慮した遺伝的差異 </h3>
                <p className="text-gray-600 mb-2">
                <b><u>西巻拓真</u></b>, 佐藤圭子
                </p>
                <p className="text-gray-500">
                日本進化学会第17回大会, 東京, 2015年8月
                </p>
              </div>

            </div>
          </div>
        );
        case 'web-contents':
          return (
            <div className="space-y-8">
              <h2 className="text-4xl mb-6 text-gray-800">Web Contents</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/5">
                      <div className="h-48 flex items-center justify-center rounded-lg">
                        <img 
                          src={dsyoutubeImage}
                          alt="データサイエンス塾!!"
                          className="w-full h-full object-contain rounded-lg"
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
                      <div className="h-48 flex items-center justify-center rounded-lg">
                        <img 
                          src={dssiteImage}
                          alt="データサイエンス塾"
                          className="w-full h-full object-contain rounded-lg"
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
          );
          case 'products':
            return (
              <div className="space-y-8">
                <h2 className="text-4xl mb-6 text-gray-800">Products</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="w-full lg:w-2/5">
                        <div className="h-48 flex items-center justify-center rounded-lg">
                          <img 
                            src={decidenowImage}
                            alt="DecideNow"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-3/5">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">DecideNow</h3>
                        <p className="text-gray-600 mb-4">
                          AHP（階層分析法）を用いた"論理的な意思決定"をスマートフォンでいつでも簡単に実行できるようにしたアプリです。
                        </p>
                        <div className="flex gap-3">
                          <a
                            href="https://apps.apple.com/jp/app/id6596765054"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 transition-shadow"
                          >
                            <Box className="mr-2 h-4 w-4" />
                            iOS App Store
                          </a>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.rollapps.decidenow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 transition-shadow"
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
                        <div className="h-48 flex items-center justify-center rounded-lg">
                          <img 
                            src={yasaiImage}
                            alt="野菜価格"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-3/5">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">野菜価格</h3>
                        <p className="text-gray-600 mb-4">
                          いま安く買える野菜／果物を数値で一目で確認できる、家計お助けアプリです。市場に多く出回っている野菜が優先的に購入されることで、日本全体のフードロス削減にも繋がります。
                        </p>
                        <div className="flex gap-3">
                          <a
                            href="https://apps.apple.com/jp/app/id6737188459"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 transition-shadow"
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
            );
      case 'mail':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Contact</h2>
            <div className="bg-white p-6 shadow-lg border border-gray-100">
              <p className="text-gray-600 mb-4">
                お問い合わせは以下のメールアドレスまでお願いいたします。
              </p>
              takuma.nishimaki[at]gmail.com
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf7] to-[#f7f4f0]">
      <SEOMetaTags activeSection={activeSection} />
      <SchemaOrg />
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* 左サイドバー */}
          <div className="md:w-64 bg-white p-8 border-r border-gray-100 md:sticky md:top-0 md:h-screen">
            <div className="h-full flex flex-col">
              <div className="flex-none">
                <h1 className="text-2xl mb-8 text-gray-800">西巻 拓真 / Takuma Nishimaki</h1>
                <h2 className="text-1xl mb-12 text-gray-500">Freelance Data Scientist & Algorithm Researcher</h2>
              </div>
              
              {/* メインナビゲーション */}
              <nav className="flex-1 space-y-1 mb-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 py-3 rounded-lg transition-shadow ${
                        activeSection === item.id 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* SNSリンク */}
              <div className="flex-none">
                <h2 className="text-sm font-semibold text-gray-400 mb-4">SOCIAL LINKS</h2>
                <div className="flex flex-col space-y-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Icon size={20} />
                        <span className="font-medium">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* メインコンテンツ */}
          <main className="flex-1 p-8 md:p-12">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;