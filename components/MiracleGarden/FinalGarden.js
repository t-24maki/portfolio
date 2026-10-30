import { useRef } from 'react';
import { Blossom, Plant } from './Flowers';
import { CareInputs } from './Controls';
import { conditionRecords, finalRevealOrder, formatFinalLength, formatLength, formatScore, gardenScore, revealedScore, summarize } from '../../lib/miracle-garden.mjs';
import GardenPostcard from './GardenPostcard';
import ShareGarden from './ShareGarden';
import GardenCelebration from './GardenCelebration';
import { ScoreSubmission } from './Ranking';
import styles from '../../styles/MiracleGarden.module.css';

export function PlanningGarden({ game, drafts, onEdit, onFinish }) {
  const { config } = game;

  return <section className={styles.planningSection} aria-label="本番の準備">
    <div className={styles.planningBanner}><span>本番の準備</span><strong>{config.flowers.length * config.plantsPerFlowerInFinal}本の合計が得点</strong></div>
    <div className={styles.planningGrid}>{config.flowers.map(flower => {
      const draft = drafts[flower.id];
      const stats = summarize(conditionRecords(game, draft));
      return <section className={styles.planCard} key={flower.id} aria-label={`${flower.name}の本番設定`}>
        {config.flowers.length > 1 && <header><h2><Blossom flower={flower} size={34} />{flower.name}</h2><span>{config.plantsPerFlowerInFinal}本</span></header>}
        <div className={styles.planSeedlings}>{Array.from({ length: config.plantsPerFlowerInFinal }, (_, i) => <Plant key={i} flower={flower} maximum={config.displayMax} compact preview />)}</div>
        <div className={styles.careInputs}><CareInputs config={config} condition={draft} onSelect={onEdit} id={flower.name} /></div>
        <p className={styles.planEvidence}>{stats.count ? `おためし ${stats.count}本 · 平均 ${formatLength(stats.mean)}cm` : 'おためしの記録なし'}</p>

      </section>;
    })}</div>
    <div className={styles.planningAction}><button className={styles.primaryButton} onClick={onFinish}>この育て方で本番へ <span>→</span></button></div>
  </section>;
}

export default function FinalGarden({ game, revealed, busy, recordBefore, onRestart, onSkip, onRanking }) {
  const svgRef = useRef(null);
  const order = finalRevealOrder(game);
  const score = revealedScore(game, revealed);
  const scoreText = formatScore(score, game.config);
  const current = order[revealed - 1];
  const complete = !busy && revealed === order.length;
  const newRecord = complete && recordBefore !== null && gardenScore(game) > recordBefore;
  return <section className={styles.finalSection} aria-labelledby="final-title">
    <div className={styles.revealHeader}>
      <h2 id="final-title">{complete ? '庭が完成！' : '本番・開花中'}</h2>
      {newRecord && <strong className={styles.resultRecord}>✧ 自己ベスト更新！</strong>}
    </div>
    <div className={styles.finalArtwork}>
      <GardenPostcard ref={svgRef} game={game} revealed={revealed} />
      {complete && <GardenCelebration game={game} />}
    </div>
    <div className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">
      {complete ? `庭が完成。${scoreText}てん。${newRecord ? '自己ベスト更新！' : ''}`
        : current ? `${revealed}本め、${formatFinalLength(current.length, game.config)}cm。現在${scoreText}てん。` : '本番の開花が始まります。'}
    </div>
    <div className={styles.restartRow}>{complete ? <button className={styles.primaryButton} onClick={onRestart}>新しい庭に挑戦 <span>↗</span></button> : <button className={styles.secondaryButton} onClick={onSkip}>結果をまとめて見る</button>}</div>
    {complete && <ScoreSubmission game={game} onRanking={onRanking} />}
    {complete && <ShareGarden game={game} svgRef={svgRef} />}
  </section>;
}
