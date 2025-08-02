// components/Layout/Sidebar.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { menuItems, socialLinks } from '../Common/navigationData';

export default function Sidebar() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('profile');

  useEffect(() => {
    const path = router.pathname;
    const matchedItem = menuItems.find(item => item.path === path);
    if (matchedItem) {
      setCurrentSection(matchedItem.id);
    }
  }, [router.pathname]);

  return (
    <aside className="hidden md:block md:w-64 bg-white p-8 border-r border-gray-100 md:sticky md:top-0 md:h-screen">
      <div className="h-full flex flex-col">
        <div className="flex-none">
          <h1 className="text-2xl mb-8 text-gray-800">西巻 拓真 / Takuma Nishimaki</h1>
          <h2 className="text-xl mb-12 text-gray-500">Data Scientist (Freelance)</h2>
        </div>
        
        {/* メインナビゲーション */}
        <nav className="flex-1 space-y-1 mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
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
    </aside>
  );
}