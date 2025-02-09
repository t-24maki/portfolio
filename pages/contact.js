// pages/contact.js
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>西巻 拓真 / Takuma Nishimaki [Contact]</title>
        <meta name="description" content="お問い合わせはこちらからお願いいたします。" />
        
        {/* OGP Tags */}
        <meta property="og:title" content="西巻 拓真 / Takuma Nishimaki [Contact]" />
        <meta property="og:description" content="お問い合わせはこちらからお願いいたします。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/contact" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="西巻 拓真 / Takuma Nishimaki [Contact]" />
        <meta name="twitter:description" content="お問い合わせはこちらからお願いいたします。" />
      </Head>

      <div className="space-y-8">
        <h2 className="text-4xl mb-6 text-gray-800">Contact</h2>
        <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <p className="text-gray-600 mb-4">
            お問い合わせは以下のメールアドレスまでお願いいたします。
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-800 select-all">
              takuma.nishimaki[at]gmail.com
            </span>
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