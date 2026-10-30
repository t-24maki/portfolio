import { useEffect, useState } from 'react';
import { conditionRecords, formatLength, observationPoints, observedConditions, summarize } from '../../lib/miracle-garden.mjs';
import { Blossom, DropIcon } from './Flowers';
import { TreatmentBadge, TreatmentMark as Mark } from './TreatmentArt';
import styles from '../../styles/MiracleGarden.module.css';

export function ScatterPlot({ game, flower, condition, onSelect, disabled, maximum, compact, embedded }) {
  const { config } = game;
  const points = observationPoints(game, flower.id);
  const groups = observedConditions(game, flower.id);
  const right = config.flowers.length === 1 && !compact ? embedded ? 431 : 541 : 331;
  const center = (43 + right) / 2;
  const x = water => 43 + (water - config.water.min) / (config.water.max - config.water.min || 1) * (right - 43);
  const y = length => 217 - length / maximum * 181;
  const waters = [...new Set(Array.from({ length: 5 }, (_, i) => Math.round(config.water.min + (config.water.max - config.water.min) * i / 4)))];
  const isSelected = point => condition.flowerId === flower.id && condition.water === point.water && condition.fertilizerId === point.fertilizerId;
  const select = point => !disabled && onSelect({ flowerId: flower.id, water: point.water, fertilizerId: point.fertilizerId });
  const selectedTreatment = config.fertilizers.find(f => f.id === condition.fertilizerId);
  const selectNearest = (event, fallback) => {
    // Enlarged hit areas may overlap. Use the nearest visible mark so an
    // adjacent treatment's invisible hit circle cannot steal a pointer click.
    const svg = event.currentTarget.ownerSVGElement;
    const matrix = svg?.getScreenCTM();
    if (!matrix || !event.detail) { select(fallback); return; }
    const cursor = svg.createSVGPoint();
    cursor.x = event.clientX; cursor.y = event.clientY;
    const local = cursor.matrixTransform(matrix.inverse());
    const distance = point => (x(point.water) - local.x) ** 2 + (y(point.length) - local.y) ** 2;
    const nearest = points.reduce((best, point) => distance(point) < distance(best) - .001 ? point : best, fallback);
    select(nearest);
  };
  return <article className={styles.scatterCard}>
    {config.flowers.length > 1 && <header><h3><Blossom flower={flower} size={29} />{flower.name}</h3><span>{points.length}本</span></header>}
    <svg className={styles.scatterPlot} viewBox={`0 0 ${right + 23} 284`} role="group" aria-label={`${flower.name}の散布図。横軸は水の量、縦軸は長さ。${points.length}本の記録。`}>
      <rect x="43" y="36" width={right - 43} height="181" rx="3" fill="#fffdf5" />
      {[0, 2].map(band => <rect key={band} x="43" y={36 + band * 181 / 4} width={right - 43} height={181 / 4} fill="#f1f3e7" />)}
      <g className={styles.axisBadge}>
        <rect x="5" y="2" width="108" height="24" rx="12" fill="#e8efdf" />
        <path d="M19 7v14m-3.5-10.5L19 7l3.5 3.5m-7 7L19 21l3.5-3.5" stroke="#54714e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true" />
        <text x="30" y="18" className={styles.axisLabel}>長さ（cm）</text>
      </g>
      {[0, .25, .5, .75, 1].map(t => <g key={t}>
        <line x1="43" x2={right} y1={y(maximum * t)} y2={y(maximum * t)} className={styles.chartGrid} />
        <path d={`M38 ${y(maximum * t)}h5`} className={styles.chartAxis} />
        <text x="34" y={y(maximum * t) + 4} textAnchor="end">{maximum * t}</text>
      </g>)}
      {waters.map(water => <g key={water}>
        <line x1={x(water)} x2={x(water)} y1="36" y2="217" className={styles.chartVerticalGrid} />
        <path d={`M${x(water)} 217v5`} className={styles.chartAxis} />
        {<text x={x(water)} y="236" textAnchor="middle">{water}</text>}
      </g>)}
      <path d={`M43 36V217H${right}`} className={styles.chartAxis} />
      <line x1={x(condition.water)} x2={x(condition.water)} y1="36" y2="217" stroke={selectedTreatment.color} strokeWidth="1.5" strokeDasharray="4 4" opacity=".65" pointerEvents="none" />
      <g className={styles.axisBadge} transform={`translate(${center - 62} 249)`}>
        <rect width="124" height="25" rx="12.5" fill="#e6f0ef" />
        <g transform="translate(8 5)" color="#548797"><DropIcon size={14} /></g>
        <text x="28" y="17" className={styles.axisLabel}>水の量（ml）</text>
      </g>
      {!points.length && <g><rect x={center - 65} y="103" width="130" height="34" rx="17" fill="#fffdf5" stroke="#c9d4be" /><text x={center} y="125" textAnchor="middle" className={styles.emptyChart}>まだ記録なし</text></g>}
      {points.map(point => {
        const treatment = config.fertilizers.find(f => f.id === point.fertilizerId);
        const label = `${flower.name}、水${point.water}ml、${treatment.name}、${formatLength(point.length)}cm`;
        return <g key={point.id} role="button" tabIndex={disabled ? -1 : 0} aria-label={label} aria-disabled={disabled} aria-pressed={isSelected(point)}
          className={styles.chartPoint} onClick={event => selectNearest(event, point)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(point); } }}>
          <title>{label}</title>
          <circle cx={x(point.water)} cy={y(point.length)} r="10" fill="transparent" />
          <circle cx={x(point.water)} cy={y(point.length)} r="6.5" fill="#fffdf5" opacity=".8" pointerEvents="none" />
          {isSelected(point) && <circle cx={x(point.water)} cy={y(point.length)} r="8.5" fill="none" stroke={treatment.color} strokeWidth="1.4" opacity=".55" />}
          <Mark treatment={treatment} x={x(point.water)} y={y(point.length)} size={4.5} />
        </g>;
      })}
    </svg>
    <details className={styles.observedList}><summary>育て方ごとの記録</summary>
      {groups.length ? <ul>{groups.map(group => {
        const treatment = config.fertilizers.find(f => f.id === group.fertilizerId);
        return <li key={`${group.water}-${group.fertilizerId}`}><button disabled={disabled} onClick={() => select(group)}><span>水{group.water}ml · <TreatmentBadge treatment={treatment} size={13} /> {treatment.short}</span><span>{group.count}本 / 平均{formatLength(group.mean)}cm</span></button></li>;
      })}</ul> : <p>まだ試していません。</p>}
    </details>
  </article>;
}

export default function Notebook({ game, condition, onSelect, disabled, embedded = false }) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const { config } = game;
  const flower = config.flowers.find(f => f.id === condition.flowerId);
  const treatment = config.fertilizers.find(f => f.id === condition.fertilizerId);
  const lengths = conditionRecords(game, condition);
  const summary = summarize(lengths);
  // Axes depend only on observed data, shared with the growing stage and history.
  const maximum = Math.ceil(Math.max(config.displayMax, ...game.experiments.flatMap(row => row.lengths)) / 20) * 20;
  return <section className={`${styles.notebook} ${embedded ? styles.workspaceNotebook : ''}`} aria-labelledby="notebook-title">
    <div className={styles.notebookHeading}><h2 id="notebook-title">分析ノート</h2><span className={styles.recordCount}>{game.experiments.reduce((count, row) => count + row.lengths.length, 0)}本</span></div>
    <div className={styles.plotLegend}>
      {config.fertilizers.map(f => <span key={f.id}><TreatmentBadge treatment={f} />{f.name}</span>)}
    </div>
    <div className={styles.notebookContent}><div className={styles.scatterGrid}>{config.flowers.map(f => <ScatterPlot key={f.id} game={game} flower={f} condition={condition} onSelect={onSelect} disabled={disabled} maximum={maximum} compact={compact} embedded={embedded} />)}</div>
    <div className={styles.selectionDetail} aria-live="polite">
      <div>{config.flowers.length > 1 && <><Blossom flower={flower} size={25} /><strong>{flower.name}</strong></>}<span>水{condition.water}ml · <TreatmentBadge treatment={treatment} size={14} />{treatment.name}</span></div>
      {summary.count ? <><p><strong>{summary.count}本</strong>　平均 <strong>{formatLength(summary.mean)} cm</strong></p><details><summary>1本ずつの長さ</summary><p>{lengths.map(value => `${formatLength(value)} cm${value === 0 ? '（育たなかった）' : ''}`).join(' / ')}</p></details></> : <p className={styles.untriedText}>記録なし</p>}
    </div></div>
  </section>;
}
