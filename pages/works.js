import SEO from '../components/Common/SEO';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { works, workCategories, worksDescription } from '../data/works';

const filters = [{ id: 'all', label: 'すべて' }, ...workCategories];
const categoryLabels = Object.fromEntries(workCategories.map(({ id, label }) => [id, label]));

const storeIconPaths = {
  apple: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  google: 'M3.18 23.67c-.37-.2-.58-.58-.58-1.04V1.37c0-.45.2-.83.58-1.03l11.63 11.67L3.18 23.67zM15.72 12.95l-2.5 2.5 8.52 4.83c.65.37 1.22.06 1.22-.67 0-.22-.07-.47-.22-.72l-7.02-5.94zM13.22 10.45l2.5 2.5 7.02-5.94c.15-.25.22-.5.22-.72 0-.73-.57-1.04-1.22-.67l-8.52 4.83zM13.22 12l-9.62-9.62c-.05.12-.08.26-.08.4v18.44c0 .14.03.28.08.4L13.22 12z',
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function WorkCard({ work }) {
  const { image } = work;
  const title = work.href ? (
    work.external ? (
      <a href={work.href} className="work-card-primary" target="_blank" rel="noopener noreferrer">{work.title}</a>
    ) : (
      <Link href={work.href} className="work-card-primary">{work.title}</Link>
    )
  ) : work.title;

  return (
    <article
      className={`tool-card work-card${work.href ? ' work-card--linked' : ''}`}
      id={work.legacyAnchor || work.id}
      aria-labelledby={`work-title-${work.id}`}
    >
      <div className={`work-card-preview work-card-preview--${work.id}`}>
        <Image src={`/images/works/${image.file}`} alt={image.alt} width={image.width} height={image.height} className="work-card-image" />
      </div>
      <div className="work-card-content">
        <ul className="work-tags" aria-label="作品の分類">
          {work.tags.map((tag) => <li key={tag}>{categoryLabels[tag]}</li>)}
        </ul>
        <h2 className="tool-card-title" id={`work-title-${work.id}`}>{title}</h2>
        <p className="tool-card-description">{work.description}</p>
        <div className="work-card-actions">
          {work.action && <div className="tool-card-cta" aria-hidden="true"><span>{work.action}</span><ArrowIcon /></div>}
          {work.stores && (
            <div className="tool-card-store-links">
              {work.stores.map((store) => (
                <a key={store.id} href={store.href} target="_blank" rel="noopener noreferrer" className="tool-store-link" aria-label={`${work.title} — ${store.label}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={storeIconPaths[store.id]} /></svg>
                  <span>{store.label}</span>
                </a>
              ))}
            </div>
          )}
          {work.related && <Link href={work.related.href} className="work-related-link">{work.related.label} <span aria-hidden="true">→</span></Link>}
        </div>
      </div>
    </article>
  );
}

export default function Works() {
  const router = useRouter();
  const selected = filters.find(({ id }) => router.isReady && id === router.query.category) || filters[0];
  const visibleWorks = selected.id === 'all' ? works : works.filter((work) => work.tags.includes(selected.id));

  const selectCategory = (id) => {
    if (id === selected.id) return;
    const query = { ...router.query };
    if (id === 'all') delete query.category;
    else query.category = id;
    // Keep the filter when following a work and returning with browser Back.
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <SEO title="西巻 拓真 / Takuma Nishimaki - 作品" description={worksDescription} path="/works/" />
      <div className="archive-page works-page">
        <header className="page-header">
          <h1 className="page-title">Works</h1>
          <p className="page-description">{worksDescription}</p>
        </header>
        <div className="content-section">
          <div className="works-filter-bar">
            <div className="works-filters" role="group" aria-label="作品を分類で絞り込む">
              {filters.map(({ id, label }) => (
                <button key={id} type="button" className="works-filter" aria-pressed={selected.id === id} aria-controls="works-grid" onClick={() => selectCategory(id)}>
                  {label}
                </button>
              ))}
            </div>
            <p className="works-result-count" role="status" aria-live="polite" aria-atomic="true">{selected.label}：{visibleWorks.length}件</p>
          </div>
          <div className="tools-grid" id="works-grid">
            {visibleWorks.map((work) => <WorkCard key={work.id} work={work} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
