// MobileNav.js
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileNav({ menuItems, socialLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // コンポーネントのマウント状態を管理
  useEffect(() => {
    setMounted(true);
  }, []);

  // URLからactiveなセクションを判定
  const activeSection = mounted 
    ? menuItems.find(item => item.path === router.pathname)?.id || 'profile'
    : 'profile'; // デフォルト値

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  // 初期レンダリング時はサーバーサイドの状態を維持
  if (!mounted) {
    return (
      <div className="md:hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100">
          <h1 className="text-lg text-gray-800">西巻 拓真 / Takuma Nishimaki</h1>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-100">
        <h1 className="text-lg text-gray-800">西巻 拓真 / Takuma Nishimaki</h1>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={handleMenuClick}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}