import SEO from '../components/Common/SEO';
import { YouTubeIcon, NoteIcon, LinkedInIcon, XIcon, GitHubIcon } from '../components/Common/Icons';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact - 西巻 拓真 / Takuma Nishimaki"
        description="データ利活用のご相談、研修のご依頼など、お気軽にお問い合わせください。"
        path="/contact/"
      />

      <div>
        <header className="page-header">
          <div className="page-eyebrow">Get In Touch</div>
          <h1 className="page-title">Contact</h1>
          <p className="page-description">
            データ利活用のご相談、研修のご依頼など、お気軽にお問い合わせください。
          </p>
        </header>

        <main className="content-section">
          <div className="contact-card">
            <div className="contact-label">Email</div>
            <a href="mailto:takuma.nishimaki@gmail.com" className="contact-email">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              takuma.nishimaki@gmail.com
            </a>
          </div>

          <div className="social-section">
            <div className="social-label">Social</div>
            <div className="social-links">
              <a href="https://www.youtube.com/@nishimaki/" className="social-link" target="_blank" rel="noopener" aria-label="YouTube">
                <YouTubeIcon />
              </a>
              <a href="https://note.com/tnishimaki" className="social-link" target="_blank" rel="noopener" aria-label="note">
                <NoteIcon />
              </a>
              <a href="https://www.linkedin.com/in/nishimaki/" className="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://x.com/t_nsmk" className="social-link" target="_blank" rel="noopener" aria-label="X">
                <XIcon />
              </a>
              <a href="https://github.com/t-24maki/" className="social-link" target="_blank" rel="noopener" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
