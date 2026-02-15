// components/Layout/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuItems } from '../Common/navigationData';

export default function Layout({ children }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavPath = (path) => {
    if (path === '/') return '#';
    return path;
  };

  return (
    <>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isScrolled 
          ? 'var(--color-bg)' 
          : 'linear-gradient(to bottom, var(--color-bg) 60%, transparent 100%)',
        transition: 'background 0.3s ease',
      }}>
        <div className="nav-logo">T. Nishimaki</div>
        <ul className="nav-links">
          <li>
            <Link href="/">Top</Link>
          </li>
          <li>
            <Link href="/tools">Tools</Link>
          </li>
          <li>
            <Link href="/lectures">Lectures</Link>
          </li>
          <li>
            <Link href="/presentations">Presentations</Link>
          </li>
          <li>
            <Link href="/publications">Publications</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '3rem',
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div className="footer-copy" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-text-tertiary)',
          letterSpacing: '0.1em',
        }}>
          © 2025 Takuma Nishimaki
        </div>
        <a href="#" className="footer-top" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-tertiary)',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <span>Go To Top</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </footer>
    </>
  );
}