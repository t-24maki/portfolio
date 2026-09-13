import { Github, Linkedin, FileText, User, Mic, Wrench, Youtube } from 'lucide-react';
import { XLogo } from './Icons';

export const menuItems = [
  { id: 'about', label: 'About', icon: User, path: '/' },
  { id: 'media', label: 'Media', icon: Mic, path: '/media/' },
  { id: 'research', label: 'Research', icon: FileText, path: '/research/' },
  { id: 'works', label: 'Works', icon: Wrench, path: '/works/' },
];

export const contactEmail = 'takuma.nishimaki@gmail.com';

export const socialLinks = [
  { icon: Github, href: 'https://github.com/t-24maki/', label: 'GitHub' },
  { icon: XLogo, href: 'https://x.com/t_nsmk', label: 'X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nishimaki/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@nishimaki/', label: 'YouTube' },
];
