// pages/404.js
import SEO from '../components/Common/SEO';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <SEO
        title="ページが見つかりません - 西巻 拓真 / Takuma Nishimaki"
        noindex
      />

      <div>
        <header className="page-header">
          <div className="page-eyebrow">404 Not Found</div>
          <h1 className="page-title">ページが見つかりません</h1>
          <p className="page-description">
            お探しのページは移動または削除された可能性があります。お手数ですが、トップページからお探しください。
          </p>
        </header>

        <main className="content-section">
          <Link href="/" className="btn btn-primary">
            <span>トップページへ戻る</span>
            <span className="btn-arrow">→</span>
          </Link>
        </main>
      </div>
    </>
  );
}
