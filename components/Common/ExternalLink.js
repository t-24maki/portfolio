export default function ExternalLink({ href, children, className = 'entry-link' }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
    </a>
  );
}
