// components/Layout/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { menuItems, socialLinks } from '../Common/navigationData';

export default function Layout({ children }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');

  // URLが変更されたときにactiveSectionを更新
  useEffect(() => {
    const currentPath = router.pathname;
    const currentMenuItem = menuItems.find(item => item.path === currentPath);
    if (currentMenuItem) {
      setActiveSection(currentMenuItem.id);
    }
  }, [router.pathname]);

  // セクション変更時のハンドラー
  const handleSectionChange = (sectionId) => {
    const menuItem = menuItems.find(item => item.id === sectionId);
    if (menuItem) {
      router.push(menuItem.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf7] to-[#f7f4f0]">
      <div className="container mx-auto">
        <MobileNav
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          menuItems={menuItems}
          socialLinks={socialLinks}
        />
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={handleSectionChange}
          />
          <main className="flex-1 p-8 md:p-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}