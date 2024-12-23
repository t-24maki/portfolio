import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, User, Box, GraduationCap, Video, Youtube } from 'lucide-react';

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

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'presentations', label: 'Presentations', icon: Video },
    { id: 'education', label: 'Web Contents', icon: GraduationCap },
    { id: 'products', label: 'Products', icon: Box },
    { id: 'mail', label: 'Contact', icon: Mail },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: XLogo, href: '#', label: 'X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Profile</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed">
                5年以上のWeb開発経験を持つフルスタックエンジニアです。
                最新のテクノロジーを活用した開発に情熱を持ち、
                特にReactとTypeScriptを用いたフロントエンド開発を得意としています。
              </p>
              <h3 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">Skills</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h4 className="font-bold mb-4 text-gray-800">フロントエンド</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      React / Next.js
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      TypeScript
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Tailwind CSS
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h4 className="font-bold mb-4 text-gray-800">バックエンド</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Node.js
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Python
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      PostgreSQL
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6  shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">論文タイトル {i}</h3>
                  <p className="text-gray-600 mb-2">
                    著者名, 共著者名 (2024)
                  </p>
                  <p className="text-gray-500">
                    ジャーナル名 / カンファレンス名
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'presentations':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Presentations</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">発表タイトル {i}</h3>
                  <p className="text-gray-600 mb-2">
                    発表イベント名 (2024)
                  </p>
                  <p className="text-gray-500">
                    発表概要がここに入ります。
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Web Contents</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'DecideNow',
                  description: 'xxxx',
                  details: 'xxxx'
                },
                {
                  title: '野菜価格',
                  description: 'xxxx',
                  details: 'xxxx'
                }
              ].map((content, i) => (
                <div key={i} className="bg-white p-6 shadow-lg border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/5">
                      <img 
                        src="/api/placeholder/400/300" 
                        alt={content.title} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full lg:w-3/5">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">「{content.title}」</h3>
                      <p className="text-gray-600 mb-2">{content.description}</p>
                      <p className="text-gray-500">{content.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl mb-6 text-gray-800">Products</h2>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/5">
                      <img 
                        src="/api/placeholder/400/300" 
                        alt={`プロジェクト ${i}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full lg:w-3/5">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">プロジェクト {i}</h3>
                      <p className="text-gray-600 mb-4">
                        プロジェクトの簡単な説明文がここに入ります。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">React</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">TypeScript</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                your.email@example.com
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf7] to-[#f7f4f0]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* 左サイドバー */}
          <div className="md:w-64 bg-white p-8 border-r border-gray-100 md:sticky md:top-0 md:h-screen">
            <div className="h-full flex flex-col">
              <div className="flex-none">
                <h1 className="text-2xl mb-8 text-gray-800">西巻 拓真 / Takuma Nishimaki</h1>
                <h2 className="text-1xl mb-12 text-gray-500">Freelance Data Scientist & Independent App Developer</h2>
              </div>
              
              {/* メインナビゲーション */}
              <nav className="flex-1 space-y-1 mb-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 py-3 rounded-lg transition-all ${
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