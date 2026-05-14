// components/Layout/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuItems } from '../Common/navigationData';
import { YouTubeIcon, NoteIcon, LinkedInIcon } from '../Common/Icons';

export default function Layout({ children }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

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
        <Link href="/" className="nav-logo">T. Nishimaki</Link>
        <ul className="nav-links">
          <li><Link href="/">Profile</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/education">Education</Link></li>
          <li><Link href="/talks">Talks</Link></li>
          <li><Link href="/publications">Publications</Link></li>
          <li><Link href="/tools">Tools</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="nav-social">
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

        {/* Mobile hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニュー"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <ul className="mobile-menu-links">
          <li><Link href="/">Profile</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/education">Education</Link></li>
          <li><Link href="/talks">Talks</Link></li>
          <li><Link href="/publications">Publications</Link></li>
          <li><Link href="/tools">Tools</Link></li>
          <li><Link href="/contact">Contact</Link></li>
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
