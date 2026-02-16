// pages/tools/ab-test/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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

// Statistical helper functions
function logGamma(x) {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let sum = 1.000000000190015;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  for (let i = 0; i < 6; i++) {
    sum += c[i] / (x + i + 1);
  }
  return -tmp + Math.log(2.5066282746310005 * sum / x);
}

function lowRegGamma(a, x) {
  const MAX_ITERATIONS = 1000;
  const EPSILON = 1e-8;
  let sum = 0;
  let term = 1 / a;
  let n = 1;
  while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS) {
    sum += term;
    term *= (x / (a + n));
    n++;
  }
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

function chiSquareCDF(x, k) {
  if (x <= 0) return 0;
  return lowRegGamma(k / 2, x / 2);
}

export default function ABTestCalculator() {
  const [clicksA, setClicksA] = useState('');
  const [conversionsA, setConversionsA] = useState('');
  const [clicksB, setClicksB] = useState('');
  const [conversionsB, setConversionsB] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('5');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateSignificance = () => {
    setError(null);
    setIsCalculated(true);

    const alpha = parseInt(confidenceLevel) / 100;
    const cA = parseInt(clicksA);
    const cvA = parseInt(conversionsA);
    const cB = parseInt(clicksB);
    const cvB = parseInt(conversionsB);

    if (isNaN(cA) || isNaN(cvA) || isNaN(cB) || isNaN(cvB)) {
      setError('すべてのフィールドに有効な数値を入力してください。');
      setResult(null);
      return;
    }

    if (cvA > cA || cvB > cB) {
      setError('成功数は試行回数を超えることはできません。');
      setResult(null);
      return;
    }

    if (cA <= 0 || cB <= 0) {
      setError('試行回数は1以上の整数を入力してください。');
      setResult(null);
      return;
    }

    const pA = cvA / cA;
    const pB = cvB / cB;

    const nonConvA = cA - cvA;
    const nonConvB = cB - cvB;
    const totalConv = cvA + cvB;
    const totalNonConv = nonConvA + nonConvB;
    const grandTotal = cA + cB;

    const expectedConvA = (cA * totalConv) / grandTotal;
    const expectedNonConvA = (cA * totalNonConv) / grandTotal;
    const expectedConvB = (cB * totalConv) / grandTotal;
    const expectedNonConvB = (cB * totalNonConv) / grandTotal;

    if (expectedConvA === 0 || expectedNonConvA === 0 || expectedConvB === 0 || expectedNonConvB === 0) {
      setError('期待度数が0になるため検定を実施できません。入力値を確認してください。');
      setResult(null);
      return;
    }

    const chiSquare =
      Math.pow(cvA - expectedConvA, 2) / expectedConvA +
      Math.pow(nonConvA - expectedNonConvA, 2) / expectedNonConvA +
      Math.pow(cvB - expectedConvB, 2) / expectedConvB +
      Math.pow(nonConvB - expectedNonConvB, 2) / expectedNonConvB;

    const pValue = 1 - chiSquareCDF(chiSquare, 1);

    setResult({
      significant: pValue < alpha,
      pValue,
      chiSquare,
      conversionRateA: pA * 100,
      conversionRateB: pB * 100,
      relativeImprovement: pA > 0 ? ((pB - pA) / pA) * 100 : 0,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      calculateSignificance();
    }
  };

  // Bar chart widths — right edge is always 100%
  const barWidthA = result ? result.conversionRateA : 0;
  const barWidthB = result ? result.conversionRateB : 0;

  return (
    <>
      <Head>
        <title>A/B Test Calculator - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="A/Bテストの結果について統計的に有意な差があるかどうかをブラウザ上で検定できるツール。カイ二乗検定を採用。" />
        <meta property="og:title" content="A/B Test Calculator - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="A/Bテストの結果について統計的に有意な差があるかどうかをブラウザ上で検定できるツール。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools/ab-test/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="A/B Test Calculator - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="A/Bテストの結果について統計的に有意な差があるかどうかをブラウザ上で検定できるツール。" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
      </Head>

      <div>
        <header className="page-header">
          <div className="page-eyebrow">
            <Link href="/tools/" style={{ color: 'inherit', textDecoration: 'none' }}>Tools</Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
            <span>A/B Test Calculator</span>
          </div>
          <h1 className="page-title">A/B Test Calculator</h1>
          <p className="page-description">
            2つの施策の結果について、統計的に有意な差があるかどうかブラウザ上で検定できます。A、Bそれぞれの「試行回数」と「成功数」を入力し、「計算」ボタンをクリックしてください。
          </p>
          <p className="page-description" style={{ marginTop: '0.75rem' }}>
            検定手法はカイ二乗検定を採用しています。また有意水準は多くの場合95%を使用しますが、より厳密な結果を得たい場合は99%、やや緩い基準で良い場合は90%を選択してください。
          </p>
        </header>

        <main className="content-section">
          <div className="calc-layout">
            {/* Calculator */}
            <div className="calc-card">
              <div className="calc-card-header">
                <h2 className="calc-card-title">パラメータ設定</h2>
              </div>

              <div className="calc-fields">
                {/* Group A */}
                <div className="ab-group">
                  <span className="ab-group-label">A</span>
                  <div className="ab-group-fields">
                    <div className="calc-field">
                      <label htmlFor="clicks-a" className="calc-label">試行回数</label>
                      <div className="calc-input-wrapper">
                        <input
                          id="clicks-a"
                          type="number"
                          value={clicksA}
                          onChange={(e) => setClicksA(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input"
                          placeholder="例: 1000"
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="calc-field">
                      <label htmlFor="conversions-a" className="calc-label">成功数</label>
                      <div className="calc-input-wrapper">
                        <input
                          id="conversions-a"
                          type="number"
                          value={conversionsA}
                          onChange={(e) => setConversionsA(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input"
                          placeholder="例: 50"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Group B */}
                <div className="ab-group">
                  <span className="ab-group-label">B</span>
                  <div className="ab-group-fields">
                    <div className="calc-field">
                      <label htmlFor="clicks-b" className="calc-label">試行回数</label>
                      <div className="calc-input-wrapper">
                        <input
                          id="clicks-b"
                          type="number"
                          value={clicksB}
                          onChange={(e) => setClicksB(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input"
                          placeholder="例: 1000"
                          min="1"
                        />
                      </div>
                    </div>
                    <div className="calc-field">
                      <label htmlFor="conversions-b" className="calc-label">成功数</label>
                      <div className="calc-input-wrapper">
                        <input
                          id="conversions-b"
                          type="number"
                          value={conversionsB}
                          onChange={(e) => setConversionsB(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="calc-input"
                          placeholder="例: 65"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Significance Level */}
                <div className="calc-field">
                  <span className="calc-label">有意水準</span>
                  <div className="ab-radio-group">
                    {['10', '5', '1'].map((level) => (
                      <label key={level} className="ab-radio-label">
                        <input
                          type="radio"
                          name="confidence-level"
                          value={level}
                          checked={confidenceLevel === level}
                          onChange={(e) => setConfidenceLevel(e.target.value)}
                          className="ab-radio-input"
                        />
                        <span className="ab-radio-text">{level}%</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={calculateSignificance} className="calc-button">
                計算
              </button>

              {error && (
                <p className="calc-error">{error}</p>
              )}
            </div>

            {/* Result */}
            <div className="calc-result-card">
              <div className="ab-result-item ab-result-significance">
                <span className="ab-result-item-label">有意差</span>
                <span className={`ab-result-item-value ${isCalculated && result ? (result.significant ? 'ab-significant' : 'ab-not-significant') : ''}`}>
                  {isCalculated && result
                    ? (result.significant
                        ? `あり（p=${result.pValue.toFixed(4)}）`
                        : `なし（p=${result.pValue.toFixed(4)}）`)
                    : '-'}
                </span>
              </div>

              {/* Bar chart — always rendered to reserve space */}
              <div className="ab-chart">
                <span className="ab-chart-title">成功率の比較</span>
                <div className="ab-chart-row">
                  <span className="ab-chart-label">A</span>
                  <div className="ab-chart-bar-bg">
                    <div className="ab-chart-bar ab-chart-bar-a" style={{ width: `${barWidthA}%` }} />
                  </div>
                  <span className="ab-chart-value">{result ? result.conversionRateA.toFixed(2) + '%' : '-'}</span>
                </div>
                <div className="ab-chart-row">
                  <span className="ab-chart-label">B</span>
                  <div className="ab-chart-bar-bg">
                    <div className="ab-chart-bar ab-chart-bar-b" style={{ width: `${barWidthB}%` }} />
                  </div>
                  <span className="ab-chart-value">{result ? result.conversionRateB.toFixed(2) + '%' : '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="calc-description">
            {/* ABテストとは */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">ABテストとは</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  ABテストとは、2つの方法（AとB）のどちらがよりベターなのか、統計的に調べる方法です。例えば、お店のウェブサイトで「赤いボタン」と「青いボタン」のどちらがクリックされやすいか。文章をしっかり長く書くか、端的に短く書くか、どちらがユーザーの好感度が高いかなど、様々な場面で実際に使います。
                </p>
              </div>
            </div>

            {/* 有意差とは */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">有意差とは</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  「有意差」とは、AとBの結果に「偶然ではない」違いがあるかどうかを示すものです。例えば、コインを100回投げて「表が60回、裏が40回」出たとしてもこれは「偶然、表が多かっただけ」かもしれません。ですが「表が95回、裏が5回」だったら「偶然、表が多かっただけ」とは言い難く、そのコインは何かがおかしい、つまり偶然ではない違いがある気がします。これを感覚的でなくきちんと数字で示す、というのが「有意差」の考え方です。
                </p>
              </div>
            </div>

            {/* p値／有意水準とは */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">p値／有意水準とは</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  p値とは、「AとBに差がない」と仮定したときに、今出ている結果（またはもっと極端な結果）が起こる確率です。この値が小さいほど、「AとBには本当に差がある」と考えられます。多くの場合、p値が5%より小さいときに「統計的に意味のある」差がある、と判断します。この5%を「有意水準」と言います。有意水準は5%に設定することが多いですが、新薬の効果測定など厳密な結果を得る必要がある場面では1%にしたり、迅速な判断が求められるマーケティング領域で「少しでも効果がありそうなら実行に移す」ような場面では10%に設定することもあります。なお、「有意水準5%だと有意差なしだけど10%にしたら有意差ありになるので、有意水準は10%にしよう」というように結果を見てから有意水準を動かすことは御法度なのでご留意ください。
                </p>
              </div>
            </div>

            {/* カイ二乗検定とは */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">カイ二乗検定とは</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  カイ二乗検定はABテストの結果を判断するのに使う手法の一つで、「期待していた結果」と「実際の結果」がどれくらい違うかを統計的に評価する方法です。例えば、赤いボタンと青いボタンのクリック数を比べるとき：
                </p>
                <ol className="calc-ordered-list">
                  <li>まず、「もし色による違いがないなら、両方均等にクリックされるはず」と考えます。</li>
                  <li>次に、実際のクリック数と、均等だった場合の数との差を計算します。</li>
                  <li>その差が大きければ大きいほど、「色による違いがある」と考えられます。</li>
                </ol>
                <p>
                  この「差の大きさ」を数字で表したものが「カイ二乗値」であり、この値に基づきp値を計算しています。
                </p>
                <p>カイ二乗値は以下の式で求められます。</p>
                <div className="calc-formula">
                  <KaTeX math="\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}" display={true} />
                </div>
                <p>
                  <KaTeX math="O_i" />は実際の観測値、<KaTeX math="E_i" />は「差がない」と仮定した場合の期待値です。この値が大きいほど、AとBの差が偶然とは考えにくいことを示します。
                </p>
              </div>
            </div>

            {/* 結果の解釈 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">結果の解釈</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  「有意差あり」という結果が出たら、AとBには本当に違いがある可能性が高いです。・・・が、その違いが実際に重要かどうかは別問題です。例えば、有意差があったとしても赤いボタンのクリック率が49%で青いボタンが51%だったら、ボタンの色によるクリック率の違いはあるものの、その影響はかなり小さく「青のボタンに入れ替える人件費の方が高くつく」という事もあります。そのため、結果の評価の際には有意差を見るだけでなく、「実際に何％改善したか」や、「この効果が会社やサービスにどのくらい影響を与えるのか」も踏まえて、最終的に判断する必要があります。
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
