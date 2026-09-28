import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import SEO from '../../../components/Common/SEO';
import { createExperiment, DEFAULT_COUNT, DEFAULT_NOISE, DEFAULT_SEED, MAX_DEGREE, MAX_NOISE, SAMPLE_COUNTS } from '../../../lib/overfitting.mjs';
import styles from '../../../styles/Overfitting.module.css';

const colors = { train: '#28688a', validation: '#b2592c', curve: '#51453b', truth: '#7d756d' };
const presets = [{ degree: 1, label: '単純' }, { degree: 3, label: '中程度' }, { degree: MAX_DEGREE, label: '複雑' }];
const formatError = value => value < 0.005 ? '0.00' : value.toFixed(2);
const pathFor = (points, x, y) => points.map((point, i) => `${i ? 'L' : 'M'}${x(point.x).toFixed(2)},${y(point.y).toFixed(2)}`).join(' ');

function axisTicks(min, max) {
  const rough = (max - min) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = ([1, 2, 5, 10].find(value => value * magnitude >= rough) || 10) * magnitude;
  const first = Math.ceil(min / step) * step;
  return Array.from({ length: Math.floor((max - first) / step) + 1 }, (_, i) => first + step * i);
}

function useChartWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(460);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(220, entry.contentRect.width)));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

function PredictionChart({ train, validation, curve, truth, domain, showTruth, showResiduals }) {
  const [ref, width] = useChartWidth();
  const height = width < 500 ? 280 : 320;
  const margin = { left: 35, right: 12, top: 20, bottom: 34 };
  const x = value => margin.left + value / 10 * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - (value - domain[0]) / (domain[1] - domain[0]) * (height - margin.top - margin.bottom);
  const yTicks = axisTicks(...domain);
  const predictionAt = value => {
    const index = Math.min(curve.length - 2, Math.floor(value * 40));
    const fraction = value * 40 - index;
    return curve[index].y * (1 - fraction) + curve[index + 1].y * fraction;
  };
  return (
    <div ref={ref} className={styles.chart}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="prediction-chart-title prediction-chart-desc">
        <title id="prediction-chart-title">学習用・検証用のデータと1本の予測曲線</title>
        <desc id="prediction-chart-desc">{`横軸は入力x、縦軸は出力y。青い塗りつぶしの丸が学習用${train.length}点、オレンジの白抜きの丸が検証用${validation.length}点です。同じ傾向から生まれた2組のデータに対し、学習用の点だけから作った予測曲線を表示しています。次数を変えても目盛りは固定です。`}</desc>
        <defs><clipPath id="prediction-plot-clip"><rect x={margin.left} y={margin.top} width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} /></clipPath></defs>
        {yTicks.map(tick => <g key={tick}><line className={styles.gridLine} x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} /><text x={margin.left - 8} y={y(tick) + 4} textAnchor="end">{Number(tick.toFixed(1))}</text></g>)}
        {[0, 2, 4, 6, 8, 10].map(tick => <text key={tick} x={x(tick)} y={height - 17} textAnchor="middle">{tick}</text>)}
        <text x={margin.left} y={11} className={styles.axisUnit}>出力 y</text>
        <text x={(margin.left + width - margin.right) / 2} y={height - 2} textAnchor="middle">入力 x</text>
        <g clipPath="url(#prediction-plot-clip)">
          {showTruth && <path d={pathFor(truth, x, y)} fill="none" stroke={colors.truth} strokeWidth="2" strokeDasharray="6 5" />}
          {showResiduals && [
            { kind: 'validation', points: validation, opacity: 0.2 },
            { kind: 'train', points: train, opacity: 0.4 },
          ].map(({ kind, points, opacity }) => <g key={kind} stroke={colors[kind]} strokeWidth="1" opacity={opacity}>
            {points.map((point, i) => <line key={i} x1={x(point.x)} x2={x(point.x)} y1={y(point.y)} y2={y(predictionAt(point.x))} />)}
          </g>)}
          <path d={pathFor(curve, x, y)} fill="none" stroke={colors.curve} strokeWidth="2.5" strokeLinejoin="round" />
          <g data-points="validation" fill="none" stroke={colors.validation} strokeWidth="1.4" opacity="0.8">
            {validation.map((point, i) => <circle key={i} cx={x(point.x)} cy={y(point.y)} r="3.3" />)}
          </g>
          <g data-points="train" fill={colors.train} stroke="var(--color-surface)" strokeWidth="0.8">
            {train.map((point, i) => <circle key={i} cx={x(point.x)} cy={y(point.y)} r="4" />)}
          </g>
        </g>
      </svg>
    </div>
  );
}

function ErrorChart({ models, degree }) {
  const [ref, width] = useChartWidth();
  const height = 220;
  const max = Math.ceil(Math.max(...models.flatMap(model => [model.trainError, model.validationError])) + 0.5);
  const x = value => 42 + (value - 1) / (MAX_DEGREE - 1) * (width - 57);
  const y = value => height - 42 - value / max * (height - 65);
  const current = models[degree - 1];
  return (
    <div ref={ref} className={styles.chart}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="error-chart-title error-chart-desc">
        <title id="error-chart-title">モデルの複雑さと予測のずれ</title>
        <desc id="error-chart-desc">{`1次から${MAX_DEGREE}次までの学習誤差と検証誤差。現在は${degree}次、学習誤差${formatError(current.trainError)}、検証誤差${formatError(current.validationError)}。`}</desc>
        {axisTicks(0, max).map(tick => <g key={tick}><line className={styles.gridLine} x1={42} x2={width - 15} y1={y(tick)} y2={y(tick)} /><text x={34} y={y(tick) + 4} textAnchor="end">{tick}</text></g>)}
        {[1, 5, 10, 15, MAX_DEGREE].map(value => <text key={value} x={x(value)} y={height - 23} textAnchor="middle">{value}</text>)}
        <text x={42} y={12}>予測のずれ</text>
        <text x={(width + 27) / 2} y={height - 3} textAnchor="middle">モデルの複雑さ（次数）</text>
        <line x1={x(degree)} x2={x(degree)} y1={23} y2={height - 42} stroke={colors.curve} strokeDasharray="2 4" opacity="0.65" />
        {['train', 'validation'].map(kind => <g key={kind}>
          <path d={pathFor(models.map(model => ({ x: model.degree, y: model[`${kind}Error`] })), x, y)} fill="none" stroke={colors[kind]} strokeWidth="2.5" strokeDasharray={kind === 'validation' ? '6 4' : undefined} />
          <circle cx={x(degree)} cy={y(current[`${kind}Error`])} r="5" stroke={colors[kind]} strokeWidth="2" fill="var(--color-surface)" />
        </g>)}
      </svg>
    </div>
  );
}

export default function OverfittingSimulator() {
  const [degree, setDegree] = useState(1);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [noise, setNoise] = useState(DEFAULT_NOISE);
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const [showTruth, setShowTruth] = useState(false);
  const [showResiduals, setShowResiduals] = useState(false);
  const experiment = useMemo(() => createExperiment({ count, noise, seed }), [count, noise, seed]);
  const model = experiment.models[degree - 1];
  const reset = () => {
    setDegree(1); setCount(DEFAULT_COUNT); setNoise(DEFAULT_NOISE); setSeed(DEFAULT_SEED); setShowTruth(false); setShowResiduals(false);
  };

  return (
    <>
      <SEO
        title="過学習シミュレータ｜オーバーフィッティングをグラフで理解"
        description="機械学習の過学習（オーバーフィッティング）を体験できる無料シミュレータです。モデルの複雑さやデータ数を変え、学習不足・適合・過学習の違いと、学習誤差・検証誤差の変化をグラフで確認できます。"
        path="/tools/overfitting/"
      />
      <div className={`tool-page ${styles.page}`}>
        <header className="page-header">
          <nav className="tool-breadcrumb" aria-label="作品一覧へ"><Link href="/works/"><span aria-hidden="true">←</span> Works</Link></nav>
          <h1 className="page-title" id="simulator-title">過学習シミュレータ</h1>
          <p className={styles.introduction}>予測モデルがいくら学習データに合っていたとしても、そのモデルで未知の新しいデータをうまく予測できるとは限りません。このシミュレータでは、予測の複雑さを変えながら、機械学習における学習不足・適合・過学習の違いを体験できます。青い点（学習用）とオレンジの点（検証用）への当てはまりを見比べてみましょう。</p>
        </header>
        <div className="content-section">
          <section className={styles.lab} aria-labelledby="lab-title">
            <h2 className={styles.srOnly} id="lab-title">予測曲線と誤差を比べる</h2>
            <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">現在{degree}次。学習誤差{formatError(model.trainError)}、検証誤差{formatError(model.validationError)}。</p>
            <div className={styles.workspace} id="simulation">
              <div className={styles.controls}>
                <div className={styles.sliderField}>
                  <div className={styles.labelRow}><label htmlFor="model-degree">モデルの複雑さ</label><output htmlFor="model-degree">{degree}<span> 次</span></output></div>
                  <input id="model-degree" type="range" min="1" max={MAX_DEGREE} step="1" value={degree} onChange={event => setDegree(Number(event.target.value))} aria-valuetext={`${degree}次`} />
                  <div className={styles.rangeEnds}><span>単純な曲線</span><span>複雑な曲線</span></div>
                </div>
                <div className={styles.presets} role="group" aria-label="代表的な複雑さを選ぶ">
                  {presets.map(preset => <button key={preset.degree} type="button" aria-pressed={degree === preset.degree} onClick={() => setDegree(preset.degree)}>{preset.label}<span>{preset.degree}次</span></button>)}
                </div>
              </div>
              <figure className={styles.plotPanel}>
                <figcaption>
                  <div className={styles.plotHeading}>
                    <h3>データと予測曲線</h3>
                    <div className={styles.predictionLegend}>
                      <span className={styles.curveKey}>予測曲線</span>
                      {showTruth && <span className={styles.truthKey}>本来の傾向</span>}
                    </div>
                  </div>
                  <div className={styles.plotDetails}>
                    <p>同じ傾向から生まれた点です。青い学習用の点だけから予測曲線を作ります。</p>
                    <div className={styles.dataLegend}>
                      <span><i className={styles.trainDot} aria-hidden="true" />学習用 {count}点</span>
                      <span><i className={styles.validationDot} aria-hidden="true" />検証用 {experiment.validation.length}点<span className={styles.legendNote}> · 学習には不使用</span></span>
                    </div>
                  </div>
                </figcaption>
                <PredictionChart train={experiment.train} validation={experiment.validation} curve={model.curve} truth={experiment.truth} domain={experiment.domain} showTruth={showTruth} showResiduals={showResiduals} />
                <div className={styles.metrics}>
                  {['train', 'validation'].map(kind => <div key={kind} className={`${styles.metric} ${kind === 'train' ? styles.trainMetric : styles.validationMetric}`}>
                    <span className={styles.metricValue}>{kind === 'train' ? '学習誤差' : '検証誤差'}<strong>{formatError(model[`${kind}Error`])}</strong></span>
                  </div>)}
                  <small>予測のずれ · 小さいほどよい</small>
                </div>
              </figure>
              <div className={styles.errorSection}>
                <div className={styles.errorHeading}><h3>複雑にすると、予測のずれはどう変わる？</h3><div className={styles.errorLegend}><span className={styles.trainMark}>━ 学習誤差</span><span className={styles.validationMark}>┄ 検証誤差</span></div></div>
                <ErrorChart models={experiment.models} degree={degree} />
              </div>
            </div>
            <p className={`${styles.note} ${styles.errorNote}`}>丸印は今選んでいる複雑さです。学習誤差が下がっても、学習に使っていないデータへの予測がよくなるとは限りません。</p>
            <details className={styles.experiments}>
              <summary>条件を変えて試す<span>データの数・ばらつき・表示</span></summary>
              <div className={styles.experimentFields}>
                <div className={styles.countField}><label htmlFor="training-count">学習データの数</label><select id="training-count" value={count} onChange={event => setCount(Number(event.target.value))}>{SAMPLE_COUNTS.map(value => <option value={value} key={value}>{value}点</option>)}</select></div>
                <div className={styles.sliderField}><div className={styles.labelRow}><label htmlFor="data-noise">データのばらつき</label><output htmlFor="data-noise">{noise.toFixed(1)}</output></div><input id="data-noise" type="range" min="0" max={MAX_NOISE} step="0.5" value={noise} onChange={event => setNoise(Number(event.target.value))} aria-valuetext={`標準偏差 ${noise}`} /><div className={styles.rangeEnds}><span>なし（0）</span><span>大きい（{MAX_NOISE}）</span></div></div>
              </div>
              <p className={styles.note}>{MAX_DEGREE}次のままデータを増やすと、検証誤差はどう変わりますか？ ばらつきを0にした場合も比べてみましょう。ばらつきはノイズの標準偏差です。</p>
              <div className={styles.plotOptions} role="group" aria-label="グラフの表示">
                <label><input type="checkbox" checked={showResiduals} onChange={event => setShowResiduals(event.target.checked)} />点と曲線のずれを表示</label>
                <div className={styles.displayOption}>
                  <label><input type="checkbox" checked={showTruth} onChange={event => setShowTruth(event.target.checked)} aria-describedby="truth-display-description" />本来の傾向を表示</label>
                  <p id="truth-display-description" className={`${styles.note} ${styles.optionNote}`}>ばらつきを加える前の曲線を、破線で表示します。</p>
                </div>
              </div>
              <div className={styles.actions}><button type="button" onClick={() => setSeed(value => value + 1)}>別のデータで試す</button><button type="button" onClick={reset}>初期状態に戻す</button></div>
              <p className={styles.note}>データを増やすと、学習誤差と検証誤差の差が小さくなることもあります。差が小さい場合も、その変化を観察してみてください。データ数を変えると学習用の点を配置し直し、検証用の点は保持します。</p>
            </details>
          </section>
          <section className={styles.explanation} aria-labelledby="understanding-title">
            <h2 id="understanding-title">学習不足・適合・過学習の違い</h2>
            <div className={styles.concepts}>
              <div><h3>学習不足</h3><p>学習不足（アンダーフィッティング）は、モデルが単純すぎて、大まかな傾向を捉えきれない状態です。学習用のデータに対しても、ずれが大きく残ります。</p></div>
              <div><h3>適合</h3><p>大まかな傾向を捉え、学習に使っていないデータにもよく合う状態です。ばらつきがあれば、ずれが0になる必要はありません。</p></div>
              <div><h3>過学習</h3><p>過学習（オーバーフィッティング）は、学習用のデータの偶然のばらつきまで拾い、新しいデータへの予測が悪くなる状態です。学習誤差だけでは見抜けません。</p></div>
            </div>
          </section>
          <details className={styles.method}>
            <summary>このシミュレータの仕組み・誤差の意味</summary>
            <p>グラフの「学習誤差」「検証誤差」は、点と予測曲線の縦方向のずれを1つの数値にまとめたものです。学習用の点で計算した値が学習誤差、学習に使っていない検証用の点で計算した値が検証誤差です。小さいほど予測がよく当てはまり、0ならすべての点で予測と実際の値が一致します。</p>
            <p>この教材では、RMSE（二乗平均平方根誤差）という指標を使います。各点のずれを二乗して平均し、その平方根を取ることで計算します。出力 y と同じ尺度でずれを表し、大きく外れた予測ほど値に強く影響します。</p>
            <p>特定の題材や単位を持たない、入力 x と出力 y の架空データです。山と谷がある三次関数にランダムなノイズを加え、多項式回帰の次数を変えて比較しています。次数は表現できる曲線の複雑さを表し、1次は直線、次数を上げるほど細かく曲がれるようになります。</p>
            <p>学習用・検証用の点は、同じ曲線と同じ大きさのばらつきから別々に生成しています。学習用の点は数値計算を安定させるために決められた位置に、検証用の点はランダムな位置に配置しています。曲線は学習用の点だけから作り、検証用の点は予測の確認に使います。複雑さを変えてもグラフの目盛りは固定しています。</p>
            <p>「データのばらつき」の設定値は、出力 y に加えるノイズの標準偏差です。出力 y と同じ尺度でばらつきの大きさを表し、特定の単位はありません。</p>
            <p>ここで比較しているのは1組の学習・検証データです。検証データで複雑さを選んだ後の性能を確かめるには、さらに別のテストデータが必要です。</p>
          </details>
        </div>
      </div>
    </>
  );
}
