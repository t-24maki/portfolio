import { useCallback, useEffect, useRef, useState } from 'react';
import { BookOpen, Lightbulb, Trophy, ChevronRight, ExternalLink } from 'lucide-react';
import SEO from '../../../components/Common/SEO';
import GardenEmblem from '../../../components/MiracleGarden/GardenEmblem';
import Controls from '../../../components/MiracleGarden/Controls';
import ExperimentGarden, { GrowingStage } from '../../../components/MiracleGarden/ExperimentGarden';
import FinalGarden, { PlanningGarden } from '../../../components/MiracleGarden/FinalGarden';
import Notebook from '../../../components/MiracleGarden/Notebook';
import Explanation from '../../../components/MiracleGarden/Explanation';
import Ranking from '../../../components/MiracleGarden/Ranking';
import { GARDEN_CONFIG } from '../../../data/miracle-garden.mjs';
import { chooseRecipe, createGame, formatScore, freshSeed, gardenScore, growFinalGarden, planningDrafts, readBestScore, runExperiment, saveBestScore, startPlanning } from '../../../lib/miracle-garden.mjs';
import styles from '../../../styles/MiracleGarden.module.css';

const initialCondition = (flowerId = GARDEN_CONFIG.flowers[0].id) => ({ flowerId, water: GARDEN_CONFIG.water.initial, fertilizerId: GARDEN_CONFIG.fertilizers[0].id });
const initialDrafts = () => Object.fromEntries(GARDEN_CONFIG.flowers.map(f => [f.id, initialCondition(f.id)]));

function Help({ config, dialogRef }) {
  return <dialog id="help-dialog" ref={dialogRef} className={styles.helpDialog} aria-labelledby="help-title" onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
    <div className={styles.helpInner}><h2 id="help-title">あそびかた</h2>
      <ol>
        <li><strong>おためし</strong><p>水・肥料をえらび、{config.plantsPerExperiment}本ずつ育てます。試せるのは{config.experimentLimit}回。育った花は実験順に花だんに残ります。区画をおすと、その育て方をもう一度えらべます。</p></li>
        <li><strong>分析ノート</strong><p>横は水の量、たては長さ。点の形は肥料のちがいです。点を選ぶと、その水・肥料が操作欄に入り、記録の詳細も見られます。点がなければ記録なし。育たなかった花も0cmとして記録し、平均に含めます。</p></li>
        <li><strong>本番</strong><p>育て方を決め、{config.flowers.length * config.plantsPerFlowerInFinal}本を1本ずつ咲かせます。表示された長さの合計が得点です。1cmで1点、小数第{config.scoreDecimals}位まで記録します。点数に応じてアーチや蝶が現れます。完成した庭は画像にして保存・共有できます。</p></li>
      </ol>
      <p className={styles.helpNote}>同じ水・肥料でも、育つ長さは少しずつ変わります。水だけがよく育つこともあります。育ち方や花の色はゲーム用の設定で、新しい庭では水・肥料との相性が変わります。ノートは再挑戦・再読み込みでリセット。自己ベストは、このブラウザに保存します。ランキングへの参加は任意です。登録すると名前と得点が公開されます。</p>
      <button className={styles.primaryButton} onClick={() => dialogRef.current.close()} autoFocus>閉じる</button>
    </div>
  </dialog>;
}

export default function MiracleGarden() {
  const [game, setGame] = useState(null);
  const [condition, setCondition] = useState(initialCondition);
  const [drafts, setDrafts] = useState(initialDrafts);
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [best, setBest] = useState(null);
  const [recordBefore, setRecordBefore] = useState(null);
  const [rankingOpen, setRankingOpen] = useState(false);
  const rankingRef = useRef(null);
  const previousSeed = useRef(null);
  const helpRef = useRef(null);
  const explanationRef = useRef(null);
  const resetRef = useRef(null);
  const introRef = useRef(null);
  const timer = useRef(null);
  const operationLock = useRef(false);
  const config = game?.config || GARDEN_CONFIG;
  const phase = game?.phase || 'experiment';
  const finalCount = config.flowers.length * config.plantsPerFlowerInFinal;

  const initializeGarden = useCallback(() => {
    // Playing never waits for Firebase. Only viewing/submitting scores uses it.
    const fresh = createGame({ seed: freshSeed(previousSeed.current) });
    previousSeed.current = fresh.seed;
    setGame(fresh);
    setCondition(planningDrafts(fresh)[fresh.config.flowers[0].id]);
    setDrafts(planningDrafts(fresh));
    operationLock.current = false;
  }, []);

  useEffect(() => {
    initializeGarden();
    try {
      setBest(readBestScore(localStorage, GARDEN_CONFIG));
    } catch { /* Private browsing can disallow storage. The game still works. */ }
    return () => clearTimeout(timer.current);
  }, [initializeGarden]);

  useEffect(() => {
    if (phase !== 'finished' || !busy) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(finalCount);
      setBusy(false);
      operationLock.current = false;
      return undefined;
    }
    const timeout = setTimeout(() => {
      if (revealed < finalCount) setRevealed(revealed + 1);
      else { setBusy(false); operationLock.current = false; }
    }, revealed === 0 ? 200 : config.finalRevealMs);
    return () => clearTimeout(timeout);
  }, [phase, busy, revealed, finalCount, config.finalRevealMs]);

  useEffect(() => {
    if (!game || phase !== 'finished' || busy || revealed !== finalCount) return;
    let score = gardenScore(game);
    try {
      score = saveBestScore(localStorage, config, score);
    } catch { /* Keep the in-memory record when storage is unavailable. */ }
    setBest(previous => previous === null ? score : Math.max(previous, score));
  }, [game, phase, busy, revealed, finalCount, config]);

  const focusTop = () => requestAnimationFrame(() => {
    introRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  const restart = () => {
    clearTimeout(timer.current);
    operationLock.current = false;
    setBusy(false);
    setRevealed(0);
    initializeGarden();
    resetRef.current?.close();
    focusTop();
  };
  const grow = () => {
    if (operationLock.current || !game || game.experiments.length >= config.experimentLimit) return;
    operationLock.current = true;
    setBusy(true);
    setGame(current => runExperiment(current, condition));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(() => { operationLock.current = false; setBusy(false); }, reduced ? 0 : config.animationMs);
  };
  const plan = () => { setDrafts(planningDrafts(game, condition)); setGame(current => startPlanning(current)); focusTop(); };
  const editDraft = next => {
    setCondition(next);
    setDrafts(current => ({ ...current, [next.flowerId]: next }));
  };
  const selectRecord = next => phase === 'planning' ? editDraft(next) : setCondition(next);
  const finish = () => {
    if (operationLock.current || game.phase !== 'planning') return;
    operationLock.current = true;
    setRecordBefore(best);
    setRevealed(0);
    setBusy(true);
    setGame(current => growFinalGarden(config.flowers.reduce((next, flower) => chooseRecipe(next, drafts[flower.id]), current)));
    focusTop();
  };
  const skipReveal = () => { setRevealed(finalCount); setBusy(false); operationLock.current = false; };
  const openRanking = () => { setRankingOpen(true); rankingRef.current?.showModal(); };
  const remaining = config.experimentLimit - (game?.experiments.length || 0);
  return <>
    <SEO title={`${config.title}｜ためして育てるガーデンゲーム`} description="花に水と肥料をあげて、育ち方をくらべるブラウザゲーム。" path="/tools/miracle-garden/" noindex
      shareImage={{ path: '/images/og/data-garden-v3.png', width: 1200, height: 630, type: 'image/png', alt: 'データの庭。芽と光のロゴ、3本のコスモス、散布図を描いた紹介画像' }} />
    <div className={`${styles.game} ${phase === 'experiment' ? styles.experimentMode : styles.finalMode}`} style={{ '--grow-duration': `${config.animationMs * .75}ms` }}>
      <header className={styles.header}>
        <div className={styles.brand}><span className={styles.brandMark}><GardenEmblem /></span><h1>{config.titleRuby && config.title.endsWith(config.titleRuby.text) ? <>{config.title.slice(0, -config.titleRuby.text.length)}<ruby>{config.titleRuby.text}<rt>{config.titleRuby.reading}</rt></ruby></> : config.title}</h1></div>
        <nav className={styles.infoNav} aria-label="ゲームの案内">
          <button onClick={() => helpRef.current.showModal()} aria-haspopup="dialog" aria-controls="help-dialog"><BookOpen size={17} aria-hidden="true" />あそびかた</button>
          <button onClick={() => explanationRef.current.showModal()} aria-haspopup="dialog" aria-controls="explanation-dialog"><Lightbulb size={17} aria-hidden="true" />解説</button>
        </nav>
      </header>
      <main className={styles.main} tabIndex="-1" ref={introRef}>
        <div className={styles.pageIntro}>
          {phase === 'experiment' ? <p className={styles.gameDescription}>
            <span>水と肥料を変え、育った結果を分析して、よく育つ組み合わせを探そう。</span>
            <span>{config.experimentLimit}回のおためしのあと、本番へ。{finalCount}本の合計の長さが得点です。</span>
          </p> : phase === 'planning' ? <h2>本番の育て方を決めよう</h2> : null}
          <div className={styles.recordPanel} role="group" aria-label="成績">
            <div className={styles.bestScore}><span>自己ベスト</span><div><strong>{best === null ? '—' : formatScore(best, config)}</strong>{best !== null && <small>点</small>}</div></div>
            <button className={styles.rankingLink} onClick={openRanking} aria-haspopup="dialog" aria-controls="ranking-dialog"><Trophy size={19} aria-hidden="true" /><span>ランキング</span><ChevronRight size={15} aria-hidden="true" /></button>
          </div>
        </div>
        {phase !== 'finished' && <div className={styles.progressRow}>
          <nav className={styles.steps} aria-label="ゲームのながれ">{['おためし', '本番の準備', '本番'].map((label, i) => {
            const active = ['experiment', 'planning', 'finished'].indexOf(phase);
            return <div className={i === active ? styles.currentStep : i < active ? styles.completedStep : ''} aria-current={i === active ? 'step' : undefined} key={label}><span>{i < active ? '✓' : i + 1}</span>{label}</div>;
          })}</nav>
          {phase === 'experiment' && <div className={styles.remaining}><span>あと</span><strong>{remaining}</strong><span>回</span></div>}
        </div>}
        {!game ? <div className={styles.loading}>読み込み中…</div> : <>
          {phase === 'experiment' && <div className={styles.experimentWorkspace}>
            <GrowingStage game={game} busy={busy} />
            <Controls game={game} condition={condition} onSelect={setCondition} onGrow={grow} onPlan={plan} busy={busy} />
            <Notebook key={game.seed} game={game} condition={condition} onSelect={selectRecord} disabled={busy} embedded />
          </div>}
          {phase === 'planning' && <PlanningGarden game={game} drafts={drafts} onEdit={editDraft} onFinish={finish} />}
          {phase === 'finished' && <FinalGarden key={game.seed} game={game} revealed={revealed} busy={busy} recordBefore={recordBefore} onRestart={restart} onSkip={skipReveal} onRanking={openRanking} />}
          {phase === 'finished' ? !busy && <details className={styles.resultReview}>
            <summary>実験を振り返る</summary>
            <ExperimentGarden game={game} condition={condition} busy={busy} onSelect={selectRecord} />
            <Notebook key={game.seed} game={game} condition={condition} onSelect={selectRecord} disabled={busy} />
          </details> : <>
            <ExperimentGarden game={game} condition={condition} busy={busy} onSelect={selectRecord} />
            {phase === 'planning' && <Notebook key={game.seed} game={game} condition={condition} onSelect={selectRecord} disabled={busy} />}
          </>}
        </>}
        <footer className={styles.footer}>
          <a href="/" target="_blank" rel="noopener noreferrer" aria-label="作者のページへ（別タブで開きます）">作者のページへ<ExternalLink size={13} aria-hidden="true" /></a>
          {phase !== 'finished' && <button onClick={() => resetRef.current.showModal()} disabled={!game || busy}>はじめから ↻</button>}
        </footer>
      </main>
      <Help config={config} dialogRef={helpRef} />
      <Explanation config={config} dialogRef={explanationRef} />
      <Ranking dialogRef={rankingRef} open={rankingOpen} onClose={() => setRankingOpen(false)} />
      <dialog ref={resetRef} className={styles.helpDialog} aria-labelledby="reset-title"><div className={styles.helpInner}><h2 id="reset-title">新しい庭をはじめる？</h2><p>ノートと花の相性がリセットされます。自己ベストは残ります。</p><div className={styles.resetActions}><button className={styles.secondaryButton} onClick={() => resetRef.current.close()} autoFocus>もどる</button><button className={styles.primaryButton} onClick={restart}>新しい庭へ</button></div></div></dialog>
    </div>
  </>;
}

// Keep the game independent of the portfolio navigation and footer.
MiracleGarden.getLayout = page => page;
