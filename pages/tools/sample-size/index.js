// pages/tools/sample-size/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import katex from 'katex';

const r_norm = [
  1.281552, 1.310579, 1.340755, 1.372204, 1.405072,
  1.439531, 1.475791, 1.514102, 1.554774, 1.598193,
  1.644854, 1.695398, 1.750686, 1.811911, 1.880794,
  1.959964, 2.053749, 2.17009, 2.326348, 2.575829,
];

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

function TooltipIcon({ content }) {
  return (
    <span className="calc-tooltip-wrapper">
      <span className="calc-tooltip-icon">?</span>
      <span className="calc-tooltip-content">{content}</span>
    </span>
  );
}

export default function SampleSizeCalculator() {
  const [totalPopulation, setTotalPopulation] = useState('');
  const [errorMargin, setErrorMargin] = useState('5');
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [responseRate, setResponseRate] = useState('50');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateSampleSize = () => {
    setIsCalculated(true);
    const n = Number(totalPopulation);
    const d = Number(errorMargin);
    const r = Number(confidenceLevel);
    const p = Number(responseRate);

    if (n < 1 || n > 10000000000 || !totalPopulation) {
      setMessage('全体数は1〜100億の整数で入力して下さい');
      setResult(null);
    } else if (d < 1 || d > 20) {
      setMessage('許容誤差は1〜20%の範囲の整数で入力して下さい');
      setResult(null);
    } else if (r < 80 || r > 99) {
      setMessage('信頼度は80〜99%の範囲の整数で入力して下さい');
      setResult(null);
    } else if (p < 1 || p > 99) {
      setMessage('回答比率は1〜99%の範囲の整数で入力して下さい');
      setResult(null);
    } else {
      const res = (p / 100) * (1 - p / 100) * (r_norm[r - 80] / (d / 100)) ** 2;
      const res2 = n / ((n - 1) / res + 1);
      setResult(Math.ceil(res2));
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      calculateSampleSize();
    }
  };

  const resultRatio = result !== null && totalPopulation
    ? ((result / Number(totalPopulation)) * 100).toFixed(2)
    : null;

  return (
    <>
      <Head>
        <title>Sample Size Calculator - 西巻 拓真 / Takuma Nishimaki</title>
        <meta name="description" content="アンケート調査に必要なサンプルサイズを統計学的に算出するツール。母集団・許容誤差・信頼度・回答比率から必要数を計算します。" />
        <meta property="og:title" content="Sample Size Calculator - 西巻 拓真 / Takuma Nishimaki" />
        <meta property="og:description" content="アンケート調査に必要なサンプルサイズを統計学的に算出するツール。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tnishimaki.com/tools/sample-size/" />
        <link rel="canonical" href="https://tnishimaki.com/tools/sample-size/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sample Size Calculator - 西巻 拓真 / Takuma Nishimaki" />
        <meta name="twitter:description" content="アンケート調査に必要なサンプルサイズを統計学的に算出するツール。" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tnishimaki.com/" }, { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tnishimaki.com/tools/" }, { "@type": "ListItem", "position": 3, "name": "Sample Size Calculator" }] }) }} />
      </Head>

      <div>
        {/* Breadcrumb */}
        <header className="page-header">
          <div className="page-eyebrow">
            <Link href="/tools/" style={{ color: 'inherit', textDecoration: 'none' }}>Tools</Link>
            <span style={{ margin: '0 0.25rem' }}>/</span>
            <span>Sample Size Calculator</span>
          </div>
          <h1 className="page-title">Sample Size Calculator</h1>
          <p className="page-description">
            統計学的に充分となるアンケート調査人数をブラウザ上で計算できます。「全体数」に全対象者人数を入れ、「計算」ボタンをクリックして下さい。
          </p>
          <p className="page-description" style={{ marginTop: '0.75rem' }}>
            「許容誤差」「信頼度」「回答比率」について特にこだわりがないor良く分からなければデフォルトの値を用いて下さい。（詳細は後述します。）また、「信頼度」は整数値で入力して下さい。
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
                {/* 全体数 */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label htmlFor="total-population" className="calc-label">全体数</label>
                    <TooltipIcon content="調査対象となる全体の人数を入力してください。例: 国の人口、会社の従業員数など。" />
                  </div>
                  <div className="calc-input-wrapper">
                    <input
                      id="total-population"
                      type="number"
                      value={totalPopulation}
                      onChange={(e) => setTotalPopulation(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="calc-input"
                      placeholder="人数を入力"
                      min="1"
                      max="10000000000"
                    />
                    <span className="calc-input-unit">人</span>
                  </div>
                </div>

                {/* 許容誤差 */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label htmlFor="error-margin" className="calc-label">許容誤差</label>
                    <TooltipIcon content="標本から推測した全体の結果のブレの許容範囲です。慣例的に5%が使われます。1〜20の整数値を入力してください。" />
                  </div>
                  <div className="calc-input-wrapper">
                    <input
                      id="error-margin"
                      type="number"
                      value={errorMargin}
                      onChange={(e) => setErrorMargin(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="calc-input"
                      placeholder="5"
                      min="1"
                      max="20"
                    />
                    <span className="calc-input-unit">%</span>
                  </div>
                </div>

                {/* 信頼度 */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label htmlFor="confidence-level" className="calc-label">信頼度</label>
                    <TooltipIcon content="許容誤差内に全体の値が収まる確率です。慣例的に95%が使われます。80〜99の整数値を入力してください。" />
                  </div>
                  <div className="calc-input-wrapper">
                    <input
                      id="confidence-level"
                      type="number"
                      value={confidenceLevel}
                      onChange={(e) => setConfidenceLevel(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="calc-input"
                      placeholder="95"
                      min="80"
                      max="99"
                    />
                    <span className="calc-input-unit">%</span>
                  </div>
                </div>

                {/* 回答比率 */}
                <div className="calc-field">
                  <div className="calc-label-row">
                    <label htmlFor="response-rate" className="calc-label">回答比率</label>
                    <TooltipIcon content="事前に予想される結果の割合です。未知の場合は50%を使用すると最大のサンプル数が算出されます。1〜99の整数値を入力してください。" />
                  </div>
                  <div className="calc-input-wrapper">
                    <input
                      id="response-rate"
                      type="number"
                      value={responseRate}
                      onChange={(e) => setResponseRate(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="calc-input"
                      placeholder="50"
                      min="1"
                      max="99"
                    />
                    <span className="calc-input-unit">%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateSampleSize}
                className="calc-button"
              >
                計算
              </button>

              <p className="calc-error" style={{ visibility: message ? 'visible' : 'hidden' }}>{message || '\u00A0'}</p>
            </div>

            {/* Result */}
            <div className="calc-result-card">
              <div className="calc-result-inner">
                <span className="calc-result-label">必要なサンプル数</span>
                <span className="calc-result-value">
                  {isCalculated ? (result !== null ? result.toLocaleString() : '-') : '-'}
                </span>
                <span className="calc-result-unit">人</span>
                {resultRatio !== null && (
                  <span className="calc-result-ratio">（全体の {resultRatio}%）</span>
                )}
              </div>

              {result !== null && (
                <div className="calc-result-summary">
                  <div className="calc-summary-row">
                    <span className="calc-summary-label">全体数</span>
                    <span className="calc-summary-value">{Number(totalPopulation).toLocaleString()} 人</span>
                  </div>
                  <div className="calc-summary-row">
                    <span className="calc-summary-label">許容誤差</span>
                    <span className="calc-summary-value">{errorMargin}%</span>
                  </div>
                  <div className="calc-summary-row">
                    <span className="calc-summary-label">信頼度</span>
                    <span className="calc-summary-value">{confidenceLevel}%</span>
                  </div>
                  <div className="calc-summary-row">
                    <span className="calc-summary-label">回答比率</span>
                    <span className="calc-summary-value">{responseRate}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="calc-description">
            {/* 解説 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">解説</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  社内アンケート調査などでデータを収集する際に何人からデータを集めれば充分な量になるのでしょう。
                </p>
                <p>
                  例えば10,000人の会社で100人からしか回答を集めなかった（集まらなかった）場合、その集計結果を「全社員の傾向」と見てしまうのは流石にマズそうです。では、何人から回答があったら、「全社員の傾向」と考えても差し支えないのでしょうか。
                </p>
                <p>
                  これには「許容誤差」「信頼度」「回答比率」を決めれば、統計学的に計算することができます。
                </p>
              </div>
            </div>

            {/* 許容誤差 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">許容誤差</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  「アンケート回答者のみの結果」を「全社員の回答結果」だと見なす以上、どうしても結果のブレが発生します。
                </p>
                <p>
                  例えば「アンケート回答者の中で会社が好きな人の割合は80%」だったとしても、「全社員で会社が好きな人の割合は約80%だろう」と推測する事しか出来ません。
                </p>
                <p>
                  この「約」の範囲をどこまで許すのかを「許容誤差」と言います。
                </p>
                <p>
                  つまり、前後5%程度のブレならば問題ないと見なすのか、それとも厳密に前後1%程度しかブレて欲しくないのか。（先の例で言えば、「75%〜85%」に入っていれば問題ないと考えるのか、「79%〜81%」に入っていなければ困るのか）
                </p>
                <p>
                  よって許容誤差が小さければ小さいほど「必要な回答数」は多くなります。（許容誤差を0%にしたいのであれば全社員からアンケートを募るしかありません。）
                </p>
                <p>
                  ここはアンケートの内容によって違ってくるでしょうが、慣例的に許容誤差は5%（前後5%のブレは許容する）と設定する事が多いです。
                </p>
              </div>
            </div>

            {/* 信頼度 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">信頼度</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  「許容誤差」を設定しても、「必ずその指定した範囲内に収まる」という事もありません。
                </p>
                <p>
                  つまり、許容誤差5%で「アンケート回答者の会社満足度は80%」という結果が出たからと言って、「必ず全社員の会社満足度は75%〜85%に収まる」訳ではないという事です。実際は、「全社員の会社満足度が75%〜85%に収まる可能性は○○%」という事になります。そして、この○○%の部分が信頼度と言われるものです。
                </p>
                <p>
                  慣例的に信頼度は95%という値が使われることが多いですが、もっと信頼性が欲しければ99%にしますし、ざっとしたアンケートであれば90%で良いと考えることもあります。
                </p>
              </div>
            </div>

            {/* 回答比率 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">回答比率</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  最後は回答比率です。ここは事前にアンケート結果が「70%程度」など分かっている場合に設定します。事前におおよその傾向が分かっていれば、サンプル数は少なくて済みます。
                </p>
                <p>
                  ただし、一般的には結果が分からないからこそアンケートを取るはずですので、基本的には数値が最大になる50%を用いればOKです。
                </p>
              </div>
            </div>

            {/* 計算方法 */}
            <div className="category">
              <div className="category-header">
                <h2 className="category-title">計算方法</h2>
              </div>
              <div className="calc-description-content">
                <p>
                  以上の情報が決まると、あとは以下の公式を使って簡単に必要サンプル数を求めることができます。
                </p>

                <h3 className="calc-param-name" style={{ marginTop: '1.5rem' }}>必要サンプル数の計算式</h3>
                <div className="calc-formula">
                  <KaTeX math="n = \frac{\lambda^2 \, p(1 - p)}{d^2}" display={true} />
                </div>
                <p>
                  <KaTeX math="d" />は許容誤差、<KaTeX math="p" />は回答比率です。<KaTeX math="\lambda" />は信頼度ですが、そのままの値ではなくその値に対応するZ値を代入します。Z値とは、データを「平均が0、標準偏差が1」になるように変換した際の数値の事で、信頼度=95%なら1.96、信頼度=99%なら2.58というように、信頼度が決まれば一意に決まります。
                </p>
                <p>
                  ちなみに、全てデフォルトの値を入れると<KaTeX math="n" />は約384.146となります。つまり、全体の人数が1万人でも1億人でも、385人にアンケートを取れば充分と考えられるのです。なかなか面白い結果では無いでしょうか。（もちろん、データは偏りなく無作為に抽出しているという前提が必要です。）
                </p>
                <p>
                  ・・・しかし、逆に全体人数が少なかったらどうでしょう。例えば全体人数が300人しかいないのに、対象者数が385人だったらおかしな事になってしまいます。このため、全体人数が少なかった場合を考えて、この式に修正を加える必要があります。
                </p>

                <h3 className="calc-param-name" style={{ marginTop: '1.5rem' }}>必要サンプル数の計算式の修正式</h3>
                <div className="calc-formula">
                  <KaTeX math="n' = \frac{nN}{N + n - 1}" display={true} />
                </div>
                <p>
                  <KaTeX math="N" />は全体数です。このように全体数の大きさによって結果を修正することを「有限修正」と呼びます。全体数が多くなれば自動的に<KaTeX math="n'" />は<KaTeX math="n" />に近づいていきますので、全体数が何人でも一律でこの式を適用して問題ありません。
                </p>
                <p>
                  最終的にこの<KaTeX math="n'" />が必要なサンプル数となります。この式を通すと、全体数が100人なら必要サンプル数は80、1000人なら278と計算されます。
                </p>
                <p>
                  上部のツールではこの通りに計算を行い、最後に切り上げて整数にしたものを結果として返しています。
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
