import { useEffect, useRef } from 'react';
import { Blossom, GrowthRuler, Plant, StemAndLeaves } from './Flowers';
import { TreatmentBadge } from './TreatmentArt';
import { formatLength, summarize } from '../../lib/miracle-garden.mjs';
import { flowerAppearance } from '../../lib/miracle-garden-presentation.mjs';
import styles from '../../styles/MiracleGarden.module.css';

function PlotDrawing({ experiment, flower, maximum, bloom, identity }) {
  // Every plot has the same baseline and scale, including failed plants.
  const baseline = 144;
  return <svg className={styles.experimentDrawing} viewBox="0 0 120 170" aria-hidden="true">
    <g className={styles.experimentScale} fill="#798b70" fontSize="8">
      <path d="M7 32H3V144H7M3 88H6" fill="none" stroke="#a5b498" strokeWidth=".6" />
      <text x="2" y="24">{maximum}cm</text><text x="2" y="156">0</text>
    </g>
    <path d="M14 145Q60 138 111 145L107 161Q60 168 18 161Z" fill={experiment ? '#cbb18a' : '#dcd5b9'} />
    <ellipse cx="62" cy="145" rx="49" ry="6" fill={experiment ? '#bba17b' : '#cfc9ac'} />
    <path d="M25 157l3 1m19 0 3 1m22-1 4 1m17-2 3-1" stroke="#a88f6d" strokeWidth="1.4" opacity=".45" />
    {!experiment && <path d="M32 145h7m19 0h7m19 0h7" stroke="#a8aa8c" strokeWidth="1" />}
    {experiment?.lengths.map((length, index, lengths) => {
      const x = 17 + (index + .5) * 90 / lengths.length;
      const height = length / maximum * 112;
      const appearance = flowerAppearance(flower, length, bloom);
      const blossomSize = 25 * appearance.scale;
      return <g key={index} transform={`translate(${x} ${baseline})`}>
        {length === 0 ? <>
          <ellipse cy="-1" rx="3.5" ry="2.2" fill="#805f42" transform="rotate(-25)" />
          <text y="-9" textAnchor="middle" fill="#806b51" fontSize="9">0</text>
        </> : <g className={styles.experimentGrowth} style={{ '--delay': `${index * 65}ms` }}>
          <StemAndLeaves length={length} height={height} identity={identity} index={index} leafSize={10} strokeWidth={1.8} />
          <g transform={`translate(${-blossomSize / 2} ${-height - blossomSize / 2})`}><Blossom flower={appearance} size={blossomSize} /></g>
        </g>}
      </g>;
    })}
  </svg>;
}

export function GrowingStage({ game, busy }) {
  const last = game.experiments.at(-1);
  const flower = game.config.flowers.find(f => f.id === last?.flowerId) || game.config.flowers[0];
  const fertilizer = game.config.fertilizers.find(f => f.id === last?.fertilizerId);
  const drawingHeight = game.config.art?.experimentScale ?? 145;
  const identity = `${game.seed}:${last?.number ?? 0}:${flower.id}`;
  const maximum = Math.ceil(Math.max(game.config.displayMax, ...game.experiments.flatMap(row => row.lengths)) / 20) * 20;
  return <section className={`${styles.stageCard} ${styles.heroStage}`} aria-label="育成画面" style={{ '--plant-scale': `${drawingHeight}px` }}>
    {game.config.flowers.length > 1 && <div className={styles.stageHeader}><span><Blossom flower={flower} size={24} />{flower.name}</span>{last && <small>{last.number}回め</small>}</div>}
    <div className={styles.gardenScene} style={{ '--garden-background': game.config.art?.background ? `url("${game.config.art.background}")` : 'none' }} data-growing={busy || undefined}>
      <div className={styles.gardenLight} aria-hidden="true" />
      <GrowthRuler maximum={maximum} height={drawingHeight} />
      <div className={styles.growthBaseline} aria-hidden="true" />
      <div className={styles.plantRow} key={`${game.seed}-${last?.number ?? 0}`}>
        {Array.from({ length: game.config.plantsPerExperiment }, (_, index) => <Plant key={index} flower={flower} length={last?.lengths[index]} maximum={maximum} bloom={game.config.bloom} index={index} drawingHeight={drawingHeight} identity={identity} />)}
      </div>
    </div>
    <div className={styles.experimentFooter} aria-live="polite">
      {last && <><span>水 {last.water}ml · <TreatmentBadge treatment={fertilizer} size={14} />{fertilizer.name}</span><strong>{busy ? '育っています…' : `平均 ${formatLength(summarize(last.lengths).mean)} cm`}</strong></>}
    </div>
  </section>;
}

export default function ExperimentGarden({ game, condition, busy, onSelect }) {
  const { config, experiments } = game;
  const last = experiments.at(-1);
  const strip = useRef(null);
  const maximum = Math.ceil(Math.max(config.displayMax, ...experiments.flatMap(row => row.lengths)) / 20) * 20;
  useEffect(() => {
    if (!last) { strip.current?.scrollTo({ left: 0, behavior: 'instant' }); return; }
    if (busy) return;
    const item = strip.current?.children[last.number - 1];
    if (item && strip.current.scrollWidth > strip.current.clientWidth) {
      strip.current.scrollTo({ left: item.offsetLeft - strip.current.offsetLeft - strip.current.clientWidth + item.offsetWidth + 12, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [last, busy]);
  return <section className={styles.historyCard} aria-labelledby="history-title">
    <header className={styles.historyHeader}><h2 id="history-title">これまでの花だん</h2><span>{experiments.length} / {config.experimentLimit}回</span></header>
    <ol ref={strip} className={styles.experimentBeds} style={{ '--history-count': config.experimentLimit }} aria-label="実験順の花だん" tabIndex="0">
      {Array.from({ length: config.experimentLimit }, (_, index) => {
        const experiment = experiments[index];
        const number = index + 1;
        if (!experiment || (experiment === last && busy && game.phase === 'experiment')) return <li key={`${game.seed}-${number}`}>
          <div className={`${styles.experimentPlot} ${styles.emptyExperiment}`} role="group" aria-label={`${number}回め：${experiment ? '育成中' : '未実験'}`}>
            <span className={styles.experimentPlotHeading}>{number}回</span>
            <PlotDrawing maximum={maximum} />
            <span className={styles.experimentFlower}>{experiment ? '育成中' : '—'}</span>
          </div>
        </li>;
        const flower = config.flowers.find(f => f.id === experiment.flowerId);
        const fertilizer = config.fertilizers.find(f => f.id === experiment.fertilizerId);
        const selected = condition.flowerId === experiment.flowerId && condition.water === experiment.water && condition.fertilizerId === experiment.fertilizerId;
        const label = `${number}回め：${flower.name}、水${experiment.water}ml、${fertilizer.name}。${experiment.lengths.map(value => `${formatLength(value)}cm${value === 0 ? '（育たなかった）' : ''}`).join('、')}`;
        return <li key={`${game.seed}-${number}`}>
          <button className={styles.experimentPlot} type="button" title={label} aria-label={label} aria-pressed={selected} aria-disabled={busy}
            data-latest={experiment === last} onClick={() => { if (!busy) onSelect({ flowerId: experiment.flowerId, water: experiment.water, fertilizerId: experiment.fertilizerId }); }}>
            <span className={styles.experimentPlotHeading}><span>{number}回</span>{experiment === last && <small>今回</small>}</span>
            <PlotDrawing experiment={experiment} flower={flower} maximum={maximum} bloom={config.bloom} identity={`${game.seed}:${experiment.number}:${flower.id}`} />
            <span className={styles.experimentFlower}><TreatmentBadge treatment={fertilizer} size={13} /> {experiment.water}ml</span>
          </button>
        </li>;
      })}
    </ol>
  </section>;
}
