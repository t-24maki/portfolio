import { Github, Linkedin, Mail, FileText, User, Box, Video, Youtube, Globe } from 'lucide-react';
import { XLogo } from './Icons';

export const menuItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/' },
  { id: 'publications', label: 'Publications', icon: FileText, path: '/publications' },
  { id: 'presentations', label: 'Presentations', icon: Video, path: '/presentations' },
  { id: 'web-contents', label: 'Web Contents', icon: Globe, path: '/web-contents' },
  { id: 'products', label: 'Products', icon: Box, path: '/products' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
];

export const socialLinks = [
  { icon: Github, href: 'https://github.com/t-24maki/', label: 'GitHub' },
  { icon: XLogo, href: 'https://x.com/t_nsmk', label: 'X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/takuma-nishimaki-172539289/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@nishimaki/', label: 'YouTube' },
];