import { Building2, Github, Linkedin, User, Wrench, Youtube } from 'lucide-react';
import { XLogo } from './Icons';

export const menuItems = [
  { id: 'about', label: 'About', icon: User, path: '/' },
  { id: 'works', label: 'Works', icon: Wrench, path: '/works/' },
  { id: 'prop', label: '合同会社prop', icon: Building2, path: '/prop/' },
];

export const contactEmail = 'takuma.nishimaki@gmail.com';

export const socialLinks = [
  { icon: Github, href: 'https://github.com/t-24maki/', label: 'GitHub' },
  { icon: XLogo, href: 'https://x.com/t_nsmk', label: 'X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nishimaki/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@nishimaki/', label: 'YouTube' },
];
