// pages/tools/normal-distribution/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';
import katex from 'katex';

function KaTeX({ math, display = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        displayMode: display,
        throwOnError: false,
      });
    }
  }, [math, display]);
  return <span ref={ref} />;
}

function generateNormalDistribution(variance) {
  const data = [];
  const stdDev = Math.sqrt(variance);
  const step = 0.05;
  for (let x = -10; x <= 10; x += step) {
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-(x ** 2) / (2 * variance));
    data.push({ x, y });
  }
  return data;
}

function drawGraph(data, ctx, variance, lineWidth, lineColor, curveOnly = false) {
  const displayWidth = 600;
  const displayHeight = 400;
  const padding = 40;
  const yAxisX = displayWidth / 2;

  ctx.clearRect(0, 0, displayWidth, displayHeight);

  if (!curveOnly) {
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, displayHeight - padding);
    ctx.lineTo(displayWidth - padding, displayHeight - padding);
    ctx.strokeStyle = '#343a40';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(yAxisX, displayHeight - padding);
    ctx.lineTo(yAxisX, padding);
    ctx.stroke();

    // Standard deviation dashed lines
    const stdDev = Math.sqrt(variance);
    const linePositions = [-stdDev, stdDev, -2 * stdDev, 2 * stdDev];
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#6c757d';
    ctx.lineWidth = 1;
    linePositions.forEach((pos) => {
      const x = ((pos + 10) / 20) * (displayWidth - 2 * padding) + padding;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, displayHeight - padding);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  // Draw curve
  ctx.beginPath();
  for (let i = 0; i < data.length; i++) {
    const x = ((data[i].x + 10) / 20) * (displayWidth - 2 * padding) + padding;
    const y = displayHeight - ((data[i].y / 0.6) * (displayHeight - 2 * padding) + padding);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export default function NormalDistributionGraphMaker() {
  const [variance, setVariance] = useState('1.0');
  const [lineWidth, setLineWidth] = useState('2');
  const [lineColor, setLineColor] = useState('blue');
  const [error, setError] = useState(null);
  const [hasGraph, setHasGraph] = useState(false);
  const canvasRef = useRef(null);

  // Draw initial graph on mount
  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = useCallback(() => {
    setError(null);
    const v = parseFloat(variance);

    if (isNaN(v) || v < 0.5 || v > 10.0) {
      setError('分散値は0.5〜10.0の範囲で入力してください。');
      return;
    }

    const data = generateNormalDistribution(v);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '600px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    drawGraph(data, ctx, v, parseInt(lineWidth), lineColor);
    setHasGraph(true);
  }, [variance, lineWidth, lineColor]);

  const downloadGraph = (curveOnly = false) => {
    const v = parseFloat(variance);
    if (isNaN(v) || v < 0.5 || v > 10.0) return;

    const downloadCanvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    downloadCanvas.width = 600 * dpr;
    downloadCanvas.height = 400 * dpr;
    const ctx = downloadCanvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const data = generateNormalDistribution(v);
    drawGraph(data, ctx, v, parseInt(lineWidth), lineColor, curveOnly);

    const dataURL = downloadCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = curveOnly ? 'normal_distribution_curve.png' : 'normal_distribution_full.png';
    link.href = dataURL;
    link.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      generateGraph();
    }
  };

  return (
    <>
      <Head>
        <title>Normal Distribution Graph Maker - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="任意の正規分布（ガウス分布）の曲線を作成し、背景透過画像(PNG)をダウンロードできるフリーツール。" />
        <meta property="og:title" content="Normal Distribution Graph Maker - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="任意の正規分布（ガウス分布）の曲線を作成し、背景透過画像(PNG)をダウンロードできるフリーツール。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools/normal-distribution/" />
        <link rel="canonical" href="https://tnishimaki.com/tools/normal-distribution/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Normal Distribution Graph Maker - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="任意の正規分布（ガウス分布）の曲線を作成し、背景透過画像(PNG)をダウンロードできるフリーツール。" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tnishimaki.com/" }, { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tnishimaki.com/tools/" }, { "@type": "ListItem", "position": 3, "name": "Normal Distribution Graph Maker" }] }) }} />
      </Head>

      <div>
        <header className="page-header">
          <div className="page-eyebrow">
            <Link href="/tools/" style={{ color: 'inherit', textDecoration: 'none' }}>Tools</Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
            <span>Normal Distribution Graph Maker</span>
          </div>
          <h1 className="page-title">Normal Distribution Graph Maker</h1>
          <p className="page-description">
            任意の正規分布（ガウス分布）の曲線を作成し、曲線部分の背景透過画像(png)をダウンロードできます。資料用の図の作成など、ご自由にお使いください。
          </p>
        </header>

        <main className="content-section">
          <div className="calc-layout">
            {/* Settings */}
            <div className="calc-card">
              <div className="calc-card-header">
                <h2 className="calc-card-title">パラメータ設定</h2>
              </div>

              <div className="calc-fields">
                <div className="calc-field">
                  <label htmlFor="nd-variance" className="calc-label">分散</label>
                  <div className="calc-input-wrapper">
                    <input
                      id="nd-variance"
                      type="number"
                      value={variance}
                      onChange={(e) => setVariance(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="calc-input"
                      placeholder="例: 1.0"
                      min="0.5"
                      max="10.0"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="calc-field">
                  <label htmlFor="nd-lineWidth" className="calc-label">線の太さ</label>
                  <div className="nd-select-wrapper">
                    <select
                      id="nd-lineWidth"
                      value={lineWidth}
                      onChange={(e) => setLineWidth(e.target.value)}
                      className="calc-input nd-select"
                    >
                      <option value="1">細め</option>
                      <option value="2">普通</option>
                      <option value="3">太め</option>
                    </select>
                  </div>
                </div>

                <div className="calc-field">
                  <label htmlFor="nd-lineColor" className="calc-label">線の色</label>
                  <div className="nd-select-wrapper">
                    <select
                      id="nd-lineColor"
                      value={lineColor}
                      onChange={(e) => setLineColor(e.target.value)}
                      className="calc-input nd-select"
                    >
                      <option value="blue">青</option>
                      <option value="green">緑</option>
                      <option value="red">赤</option>
                      <option value="purple">紫</option>
                      <option value="black">黒</option>
                    </select>
                  </div>
                </div>
              </div>

              <button onClick={generateGraph} className="calc-button">
                グラフ生成
              </button>

              {error && (
                <p className="calc-error">{error}</p>
              )}
            </div>

            {/* Canvas & Download */}
            <div className="calc-result-card">
              <div className="nd-canvas-container">
                <canvas
                  ref={canvasRef}
                  width="600"
                  height="400"
                  className="nd-canvas"
                />
              </div>
              <p className="nd-canvas-note">点線は±標準偏差、±標準偏差×2の位置に表示されています。</p>
              <div className="nd-download-buttons">
                <button
                  onClick={() => downloadGraph(false)}
                  disabled={!hasGraph}
                  className="nd-download-btn nd-download-full"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  グラフ全体
                </button>
                <button
                  onClick={() => downloadGraph(true)}
                  disabled={!hasGraph}
                  className="nd-download-btn nd-download-curve"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  曲線のみ（透過）
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="calc-description">
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">正規分布とは</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  正規分布（ガウス分布）は、統計学において最も重要な確率分布の一つです。自然界や社会現象の多くが正規分布に従うことが知られており、人の身長や体重、テストの点数、工場製品の品質ばらつきなど、あらゆるデータの分布を表現するのに使われます。
                </p>
                <p>
                  正規分布は左右対称のベル型（釣鐘型）をしており、平均値を中心に左右均等にデータが分布します。平均から離れるほど、データが観測される確率は低くなります。
                </p>
              </div>
            </div>

            <div className="category">
              <div className="category-header">
                <h2 className="category-title">分散と標準偏差</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  分散はデータの散らばり具合を表す指標で、値が大きいほどグラフは横に広がり（裾が広くなり）、値が小さいほどグラフは中央に集中した鋭い形になります。標準偏差は分散の正の平方根であり、元のデータと同じ単位で散らばりを表現できるため、直感的に理解しやすい指標です。
                </p>
                <p>正規分布の確率密度関数は以下の式で定義されます。</p>
                <div className="calc-formula">
                  <KaTeX math="f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{x^2}{2\sigma^2}\right)" display={true} />
                </div>
                <p>
                  ここで<KaTeX math="\sigma" />は標準偏差、<KaTeX math="\sigma^2" />が分散です。本ツールでは平均を0とした標準正規分布をベースに、分散の値を変えることで曲線の形状を変化させています。
                </p>
              </div>
            </div>

            <div className="category">
              <div className="category-header">
                <h2 className="category-title">点線の意味</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  グラフ上に表示される点線は、標準偏差の±1倍および±2倍の位置を示しています。正規分布では、平均±1標準偏差の範囲にデータ全体の約68.3%が含まれ、平均±2標準偏差の範囲には約95.4%が含まれます。この性質は「68-95-99.7ルール」と呼ばれ、正規分布の特徴を理解する上で重要な知識です。
                </p>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div style={{ marginTop: '3rem' }}>
            <Link href="/tools/" className="entry-link">
              <svg viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ツール一覧に戻る
            </Link>
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
