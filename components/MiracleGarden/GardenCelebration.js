import { useEffect, useMemo, useState } from 'react';
import { celebrationParticles } from '../../lib/miracle-garden-presentation.mjs';
import styles from '../../styles/MiracleGarden.module.css';

export default function GardenCelebration({ game }) {
  const particles = useMemo(() => celebrationParticles(game), [game]);
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setActive(false); return undefined; }
    const end = Math.max(0, ...particles.map(p => p.delay + p.duration));
    const timer = setTimeout(() => setActive(false), end + 100);
    return () => clearTimeout(timer);
  }, [particles]);
  if (!active || !particles.length) return null;
  return <svg className={styles.gardenCelebration} viewBox="0 0 1200 750" aria-hidden="true" focusable="false">
    {particles.map((p, i) => <g key={i} transform={`translate(${p.x} -16)`}>
      <g className={styles.confettiFall} style={{ '--confetti-drift': `${p.drift}px`, '--confetti-duration': `${p.duration}ms`, '--confetti-delay': `${p.delay}ms` }}>
        <g className={styles.confettiTurn} style={{ '--confetti-turn': `${p.rotation}deg` }} fill={p.color}>
          {p.star ? <path d="M0 -9L2 -2L9 0L2 2L0 9L-2 2L-9 0L-2 -2Z" /> : <rect x="-4" y="-6" width="8" height="12" rx="2" />}
        </g>
      </g>
    </g>)}
  </svg>;
}
