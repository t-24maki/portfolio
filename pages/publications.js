// pages/publications.js
import Head from 'next/head';
import { FileText } from 'lucide-react';

export default function Publications() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Publications]</title>
        <meta name="description" content="論文発表、学会発表などの研究業績一覧です。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Publications]" />
        <meta property="og:description" content="論文発表、学会発表などの研究業績一覧です。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/publications" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Publications]" />
        <meta name="twitter:description" content="論文発表、学会発表などの研究業績一覧です。" />
      </Head>

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Publications</h2>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">学術雑誌（査読あり）</h3>
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              P*R*O*P: a web application to perform phylogenetic analysis considering the effect of gaps
            </h3>
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
          
          <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              An Extension of the Kimura Two-Parameter Model to the Natural Evolutionary Process
            </h3>
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
    </>
  );
}

// Static Site Generation
export async function getStaticProps() {
  return {
    props: {},
  };
}