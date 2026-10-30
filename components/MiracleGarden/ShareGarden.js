import { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, Download, Share2 } from 'lucide-react';
import { gardenPng, gardenShareText, gardenShareLinks } from '../../lib/miracle-garden-presentation.mjs';
import styles from '../../styles/MiracleGarden.module.css';

export default function ShareGarden({ game, svgRef }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [manualText, setManualText] = useState('');
  const [href, setHref] = useState('');
  const [nativeShare, setNativeShare] = useState(false);
  useEffect(() => {
    setHref(window.location.href);
    setNativeShare(typeof navigator.share === 'function');
  }, []);
  useEffect(() => {
    let cancelled = false;
    setError(false);
    setFile(null);
    gardenPng(svgRef.current).then(blob => {
      if (!cancelled) setFile(new File([blob], `${game.config.title}.png`, { type: 'image/png' }));
    }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [game, svgRef, attempt]);
  const save = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    setStatus('画像の保存を開始しました。');
  };
  const copy = async () => {
    const text = gardenShareText(game, window.location.href);
    try {
      await navigator.clipboard.writeText(text);
      setManualText('');
      setStatus('結果の文章をコピーしました。');
    } catch {
      setManualText(text);
      setStatus('下の文章を選んでコピーできます。');
    }
  };
  const share = async () => {
    const text = gardenShareText(game, window.location.href);
    if (!navigator.share) {
      setStatus('「画像を保存」と「結果をコピー」で、SNSに投稿できます。');
      return;
    }
    setStatus('共有メニューが開かない場合は、画像の保存と結果のコピーを使えます。');
    try {
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: game.config.title, text, files: [file] });
      } else {
        setStatus('得点を共有します。画像を添える場合は「画像を保存」を使えます。');
        await navigator.share({ title: game.config.title, text });
      }
    } catch (reason) {
      if (reason.name !== 'AbortError') setStatus('共有を開けませんでした。「画像を保存」と「結果をコピー」を使えます。');
    }
  };
  return <section className={styles.shareGarden} aria-labelledby="share-title">
    <h3 id="share-title">結果をシェア</h3>
    <div className={styles.socialShareLinks}>
      {gardenShareLinks(game, href).map(service => <a key={service.id} href={service.href} className={styles.socialShare} data-service={service.id} target="_blank" rel="noopener noreferrer" aria-label={`${service.label}（新しいタブ）`}>
        <span>{({ x: 'X', line: 'LINE', bluesky: 'Bluesky' })[service.id]}</span><ArrowUpRight size={16} aria-hidden="true" />
      </a>)}
    </div>
    <div className={styles.shareButtons}>
      <button onClick={copy}><Copy size={16} aria-hidden="true" />結果をコピー</button>
      <button onClick={save} disabled={!file}><Download size={16} aria-hidden="true" />画像を保存</button>
      {nativeShare && <button onClick={share}><Share2 size={16} aria-hidden="true" />その他</button>}
    </div>
    <p>画像も載せる場合は、保存して投稿に添付できます。</p>
    {error ? <p role="alert">画像を作れませんでした。<button className={styles.textButton} onClick={() => setAttempt(n => n + 1)}>もう一度作る</button></p> : !file && <p role="status">画像を準備中…</p>}
    <p className={styles.shareStatus} role="status">{status}</p>
    {manualText && <textarea className={styles.shareText} aria-label="共有する結果" readOnly value={manualText} onFocus={event => event.target.select()} rows={4} />}
  </section>;
}
