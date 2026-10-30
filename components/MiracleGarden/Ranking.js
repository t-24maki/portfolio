import { useCallback, useEffect, useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { formatScore, gardenScore } from '../../lib/miracle-garden.mjs';
import { GARDEN_RANKING_SCHEMA, normalizePlayerName, rankingErrorMessage } from '../../lib/miracle-garden-ranking.mjs';
import { changeGardenPlayerName, loadGardenRanking, rankingEnabled, removeGardenScore, submitRankedGarden } from '../../lib/miracle-garden-online.mjs';
import styles from '../../styles/MiracleGarden.module.css';

export function ScoreSubmission({ game, onRanking }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const sending = useRef(false);
  useEffect(() => {
    try { setName(localStorage.getItem('data-garden-player-name') || ''); } catch { /* Optional. */ }
  }, []);
  if (!rankingEnabled) return null;
  if (result) return <div className={styles.scoreSubmission} role="status"><p>{result.improved ? `${formatScore(result.bestUnits / GARDEN_RANKING_SCHEMA.scoreScale)}点を登録しました。` : `登録済みの自己ベスト ${formatScore(result.bestUnits / GARDEN_RANKING_SCHEMA.scoreScale)}点を残しました。`}</p><button className={styles.secondaryButton} onClick={onRanking}>ランキングを見る</button></div>;
  if (!open) return <div className={styles.scoreSubmission}><button className={styles.secondaryButton} onClick={() => setOpen(true)}>ランキングに登録</button></div>;
  const submit = async event => {
    event.preventDefault();
    if (sending.current) return;
    let normalized;
    try { normalized = normalizePlayerName(name); }
    catch (validationError) { setError(validationError.message); return; }
    sending.current = true; setPending(true); setError('');
    try {
      const saved = await submitRankedGarden(game, normalized);
      setResult(saved);
      try { localStorage.setItem('data-garden-player-name', normalized); } catch { /* Optional. */ }
    } catch (submitError) { setError(rankingErrorMessage(submitError)); }
    finally { sending.current = false; setPending(false); }
  };
  return <form className={styles.scoreSubmission} onSubmit={submit}>
    <label htmlFor="ranking-player-name">ランキングに表示する名前</label>
    <div className={styles.submissionFields}><input id="ranking-player-name" value={name} onChange={event => setName(event.target.value)} maxLength={24} autoComplete="nickname" placeholder="名前（1〜12文字）" required disabled={pending} aria-describedby="ranking-privacy" /><button className={styles.primaryButton} disabled={pending}>{pending ? '登録中…' : `${formatScore(gardenScore(game))}点を登録`}</button></div>
    <p id="ranking-privacy" className={styles.rankingNote}>名前と得点を全体公開します。本名は使わなくてもOK。同じブラウザの最高記録を1件掲載します。名前はあとからランキング画面で変更できます。</p>
    {error && <p className={styles.rankingError} role="alert">{error}</p>}
  </form>;
}

export default function Ranking({ dialogRef, open, onClose }) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  const [namePending, setNamePending] = useState(false);
  const [nameError, setNameError] = useState('');
  const [nameStatus, setNameStatus] = useState('');
  const savingName = useRef(false);
  const editButton = useRef(null);
  const requestId = useRef(0);
  const refresh = useCallback(async () => {
    if (!rankingEnabled) return;
    const id = ++requestId.current;
    setPending(true); setError('');
    try { const next = await loadGardenRanking(); if (id === requestId.current) setData(next); }
    catch (loadError) { if (id === requestId.current) setError(rankingErrorMessage(loadError)); }
    finally { if (id === requestId.current) setPending(false); }
  }, []);
  useEffect(() => {
    if (open) { setConfirmDelete(false); setEditingName(false); setNameError(''); setNameStatus(''); refresh(); }
    return () => { requestId.current += 1; };
  }, [open, refresh]); // Open and explicit refresh fetch snapshots; no background polling.
  const close = () => { dialogRef.current?.close(); onClose(); };
  const remove = async () => {
    setPending(true); setError('');
    try { await removeGardenScore(); setConfirmDelete(false); await refresh(); }
    catch (removeError) { setError(rankingErrorMessage(removeError)); setPending(false); }
  };
  const editName = () => {
    setName(data.self.name); setNameError(''); setNameStatus('');
    setConfirmDelete(false); setEditingName(true);
  };
  const finishNameEdit = () => {
    setEditingName(false);
    requestAnimationFrame(() => editButton.current?.focus());
  };
  const rename = async event => {
    event.preventDefault();
    if (savingName.current) return;
    let normalized;
    try { normalized = normalizePlayerName(name); }
    catch (validationError) { setNameError(validationError.message); return; }
    savingName.current = true; setNamePending(true); setNameError('');
    try {
      const saved = await changeGardenPlayerName(normalized);
      setData(current => current?.self ? {
        ...current, self: { ...current.self, name: saved.name },
        entries: current.entries.map(row => row.isYou ? { ...row, name: saved.name } : row),
      } : current);
      try { localStorage.setItem('data-garden-player-name', saved.name); } catch { /* Optional. */ }
      setNameStatus('表示名を変更しました。');
      finishNameEdit();
    } catch (renameError) { setNameError(rankingErrorMessage(renameError)); }
    finally { savingName.current = false; setNamePending(false); }
  };
  return <dialog id="ranking-dialog" ref={dialogRef} className={`${styles.helpDialog} ${styles.rankingDialog}`} aria-labelledby="ranking-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className={styles.rankingHeader}><h2 id="ranking-title">世界ランキング</h2><button onClick={close} aria-label="ランキングを閉じる" autoFocus>×</button></div>
    <div className={styles.rankingBody}>
      {!rankingEnabled ? <p>ランキングは準備中です。</p> : <>
        <div className={styles.rankingToolbar}><span>{data ? `全${data.total.toLocaleString('ja-JP')}人${data.total > GARDEN_RANKING_SCHEMA.listLimit ? ` · 上位${GARDEN_RANKING_SCHEMA.listLimit}人を表示` : ''}` : '最高記録'}</span><button onClick={refresh} disabled={pending || namePending}>{pending ? '読み込み中…' : '更新 ↻'}</button></div>
        {error && <p className={styles.rankingError} role="alert">{error}</p>}
        {data && <>
          {data.self ? <div className={styles.rankingSelf}>
            <div><span className={styles.rankingSelfLabel}>あなたの順位</span><p><strong>{data.self.rank.toLocaleString('ja-JP')}<small>位</small></strong><span className={styles.rankingPopulation}> / {data.total.toLocaleString('ja-JP')}人</span></p></div>
            <div className={styles.rankingSelfScore}><span className={styles.rankingSelfLabel}>登録した最高記録</span><strong>{formatScore(data.self.scoreUnits / GARDEN_RANKING_SCHEMA.scoreScale)}<small>点</small></strong></div>
            <div className={styles.rankingIdentity}>
              {editingName ? <form onSubmit={rename} className={styles.rankingNameForm}>
                <label htmlFor="ranking-edit-name">表示名</label>
                <input id="ranking-edit-name" value={name} onChange={event => setName(event.target.value)} maxLength={24} autoComplete="nickname" required autoFocus disabled={namePending} aria-describedby={`ranking-name-hint${nameError ? ' ranking-name-error' : ''}`} aria-invalid={Boolean(nameError)} />
                <p id="ranking-name-hint">1〜12文字。得点と記録日時は変わりません。</p>
                {nameError && <p id="ranking-name-error" className={styles.rankingError} role="alert">{nameError}</p>}
                <div className={styles.rankingNameActions}><button className={styles.primaryButton} disabled={pending || namePending}>{namePending ? '保存中…' : '保存する'}</button><button type="button" className={styles.secondaryButton} disabled={namePending} onClick={finishNameEdit}>キャンセル</button></div>
              </form> : <div className={styles.rankingNameRow}><div><span className={styles.rankingSelfLabel}>表示名</span><span className={styles.rankingPlayerName}>{data.self.name}</span></div><button ref={editButton} className={styles.rankingEditButton} onClick={editName} disabled={pending || namePending}><Pencil size={14} aria-hidden="true" />名前を変更</button></div>}
              {nameStatus && <p className={styles.rankingNameStatus} role="status">{nameStatus}</p>}
            </div>
          </div> : data.total > 0 && <p className={styles.rankingInvitation}>本番の記録を登録すると、あなたの順位が表示されます。</p>}
          {data.entries.length ? <table className={styles.rankingTable}><caption className={styles.visuallyHidden}>データの庭の得点ランキング</caption><thead><tr><th scope="col">順位</th><th scope="col">名前</th><th scope="col">得点</th></tr></thead><tbody>{data.entries.map((row, index) => <tr key={index} className={row.isYou ? styles.rankingYou : undefined}><td>{row.rank}</td><td>{row.name}{row.isYou && <small>あなた</small>}</td><td>{formatScore(row.scoreUnits / GARDEN_RANKING_SCHEMA.scoreScale)}</td></tr>)}</tbody></table> : <p className={styles.rankingEmpty}>まだ記録はありません。最初の庭を登録してみよう。</p>}
          {data.self && <div className={styles.rankingDelete}>{confirmDelete ? <><p>公開している自分の記録を削除しますか？</p><button disabled={pending || namePending} onClick={remove}>削除する</button><button disabled={pending || namePending} onClick={() => setConfirmDelete(false)}>やめる</button></> : <button disabled={pending || namePending || editingName} onClick={() => setConfirmDelete(true)}>自分の記録を削除</button>}</div>}
        </>}
        <p className={styles.rankingNote}>同点は同じ順位。本人の記録はこのブラウザで識別します。別の端末への引き継ぎはできず、ブラウザのデータを消すと更新・削除ができなくなります。</p>
      </>}
    </div>
  </dialog>;
}
