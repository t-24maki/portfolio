import { Github, Linkedin, Mail, FileText, User, Briefcase, GraduationCap, Mic, Wrench, Youtube } from 'lucide-react';
import { XLogo } from './Icons';

export const menuItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/' },
  { id: 'services', label: 'Services', icon: Briefcase, path: '/services' },
  { id: 'education', label: 'Education', icon: GraduationCap, path: '/education' },
  { id: 'talks', label: 'Talks', icon: Mic, path: '/talks' },
  { id: 'publications', label: 'Publications', icon: FileText, path: '/publications' },
  { id: 'tools', label: 'Tools', icon: Wrench, path: '/tools' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
];

export const socialLinks = [
  { icon: Github, href: 'https://github.com/t-24maki/', label: 'GitHub' },
  { icon: XLogo, href: 'https://x.com/t_nsmk', label: 'X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/nishimaki/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@nishimaki/', label: 'YouTube' },
];
