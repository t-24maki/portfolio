// components/Layout/index.js
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuItems } from '../Common/navigationData';
import { YouTubeIcon, NoteIcon, LinkedInIcon } from '../Common/Icons';

export default function Layout({ children }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const isActive = (item) => item.id === 'works'
    ? router.pathname === '/works' || router.pathname.startsWith('/tools/')
    : router.pathname === item.path.replace(/\/$/, '') || (item.id === 'about' && router.pathname === '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = (event) => { if (event.matches) setMobileMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Navigation */}
      <nav aria-label="メインナビゲーション" className="site-nav" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isScrolled
          ? 'var(--color-bg)'
          : 'linear-gradient(to bottom, var(--color-bg) 60%, transparent 100%)',
        transition: 'background 0.3s ease',
      }}>
        <Link href="/" className="nav-logo">T. Nishimaki</Link>
        <ul className="nav-links">
          {menuItems.map((item) => (
            <li key={item.id}><Link href={item.path} aria-current={isActive(item) ? 'page' : undefined}>{item.label}</Link></li>
          ))}
        </ul>
        <div className="nav-actions">
          <Link href="/#contact" className="nav-contact" onClick={() => setMobileMenuOpen(false)}>お問い合わせ <span aria-hidden="true">↗</span></Link>

          {/* Mobile hamburger button */}
          <button
            className="nav-hamburger"
            ref={menuButton}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div id="mobile-menu" className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} inert={!mobileMenuOpen}>
        <ul className="mobile-menu-links">
          {menuItems.map((item) => (
            <li key={item.id}><Link href={item.path} aria-current={isActive(item) ? 'page' : undefined} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link></li>
          ))}
        </ul>
        <div className="mobile-menu-social">
          <a href="https://www.youtube.com/@nishimaki/" target="_blank" rel="noopener" aria-label="YouTube">
            <YouTubeIcon />
          </a>
          <a href="https://note.com/tnishimaki" target="_blank" rel="noopener" aria-label="note">
            <NoteIcon />
          </a>
          <a href="https://www.linkedin.com/in/nishimaki/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }} inert={mobileMenuOpen}>
        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer" inert={mobileMenuOpen} style={{
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
          © Takuma Nishimaki
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
