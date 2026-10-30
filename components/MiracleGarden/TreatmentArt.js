import { useId } from 'react';

// The bottle labels, notebook legend and observations use the same geometry.
export function TreatmentMark({ treatment, x = 10, y = 10, size = 4.5 }) {
  const paint = { fill: treatment.color, stroke: treatment.color, strokeWidth: 1.4 };
  if (treatment.shape === 'diamond') return <path d={`M${x},${y - size - 1}l${size + 1},${size + 1}l-${size + 1},${size + 1}l-${size + 1},-${size + 1}Z`} {...paint} />;
  if (treatment.shape === 'triangle') return <path d={`M${x},${y - size - 1}l${size + 1},${size * 2 + 1}h-${size * 2 + 2}Z`} {...paint} />;
  return <circle cx={x} cy={y} r={size} {...paint} fill="#fffef9" />;
}

export function TreatmentBadge({ treatment, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"><TreatmentMark treatment={treatment} /></svg>;
}

export default function TreatmentIllustration({ treatment, size = 60 }) {
  const id = `treatment-${useId().replace(/:/g, '')}`;
  const waterOnly = treatment.id === 'none';
  return <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2=".6"><stop stopColor={treatment.color} /><stop offset=".38" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor={treatment.color} /></linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#faf4df" /><stop offset="1" stopColor="#c7bda0" /></linearGradient>
    </defs>
    <ellipse cx="36" cy="65" rx="23" ry="3" fill="#6d7454" opacity=".13" />
    {waterOnly ? <>
      <path d="M20 28C1 22 3 52 21 48" fill="none" stroke={treatment.color} strokeWidth="5" />
      <path d="M19 28C7 25 8 46 19 44" fill="none" stroke="#c4dce0" strokeWidth="2" />
      <path d="M45 41L59 24L65 28L51 53" fill={treatment.color} stroke="#446e80" strokeWidth="1" />
      <path d="M56 23l6 -4l7 9l-4 4Z" fill="#bdd4d5" stroke="#628997" />
      <path d="M16 29Q34 23 49 30L51 57Q35 66 18 58Z" fill={treatment.color} />
      <path d="M16 29Q34 23 49 30L51 57Q35 66 18 58Z" fill={`url(#${id}-body)`} opacity=".8" />
      <ellipse cx="32" cy="28" rx="16" ry="4" fill="#a0c2cb" stroke="#658e9b" />
      <path d="M23 28V22Q33 16 42 22V28" fill="none" stroke="#5d8794" strokeWidth="3" />
      <path d="M21 35l1 18" stroke="#e1f0ea" strokeWidth="2" opacity=".55" />
      <circle cx="34" cy="45" r="10" fill="#fff9e9" />
      <TreatmentMark treatment={treatment} x={34} y={45} size={5.5} />
    </> : <>
      <path d="M26 17V23Q17 27 17 34V57Q17 63 36 63Q55 63 55 57V34Q55 27 46 23V17Z" fill={treatment.color} stroke={treatment.color} strokeWidth="1.2" />
      <path d="M26 17V23Q17 27 17 34V57Q17 63 36 63Q55 63 55 57V34Q55 27 46 23V17Z" fill={`url(#${id}-body)`} opacity=".75" />
      <rect x="24" y="10" width="24" height="11" rx="3" fill={`url(#${id}-rim)`} stroke="#a69976" strokeWidth=".7" />
      <path d="M29 12v6m5-6v6m5-6v6m5-6v6" stroke="#ad9c74" strokeWidth="1" opacity=".5" />
      <path d="M23 32v21" stroke="#eff1d9" strokeWidth="2" opacity=".45" />
      <rect x="23" y="33" width="26" height="23" rx="5" fill="#fffae9" />
      <TreatmentMark treatment={treatment} x={36} y={44} size={6.2} />
      <path d="M23 58Q36 62 49 58" fill="none" stroke="#263c28" strokeWidth="1" opacity=".22" />
    </>}
  </svg>;
}
