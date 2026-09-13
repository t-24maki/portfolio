import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SEO from './SEO';

// Static export has no redirect server. Keep the old HTML routes as small
// redirect pages, with a usable link when JavaScript is unavailable.
export default function LegacyRedirect({ destination, label, hashDestinations, alternative }) {
  useEffect(() => {
    const target = hashDestinations?.[window.location.hash] || destination;
    const url = new URL(target, window.location.origin);
    url.search = window.location.search;
    window.location.replace(url.href);
  }, [destination, hashDestinations]);

  return (
    <>
      <SEO title={`${label}に移動します - 西巻 拓真`} noindex />
      <Head><link rel="canonical" href={`https://tnishimaki.com${destination.split('#')[0]}`} /></Head>
      <header className="page-header"><div className="page-eyebrow">Page Moved</div><h1 className="page-title">{label}</h1><p className="page-description">このページの内容は、以下にまとめました。</p></header>
      <div className="content-section">
        <div className="hero-cta"><Link href={destination} className="btn btn-primary">{label}へ <span aria-hidden="true">→</span></Link>{alternative && <Link href={alternative.href} className="btn">{alternative.label}</Link>}</div>
      </div>
    </>
  );
}
