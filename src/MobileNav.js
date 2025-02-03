import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Github, Linkedin, Mail, FileText, User, Box, Video, Youtube, Globe, XLogo } from 'lucide-react';

const MobileNav = ({ activeSection, setActiveSection, menuItems, socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

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

      {/* Slide-down menu */}
      <div
        className={`fixed w-full bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
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
};

export default MobileNav;