import { useId } from 'react';
import styles from '../../styles/MiracleGarden.module.css';
import { flowerAppearance, plantGeometry } from '../../lib/miracle-garden-presentation.mjs';

export function BloomArtwork({ flower }) {
  if (flower.image) return <image href={flower.image} x="-28" y="-28" width="56" height="56" />;
  return <g>
    {Array.from({ length: flower.petals }, (_, i) => <ellipse key={i} cx="0" cy="-13" rx="8" ry="12" fill={flower.color} transform={`rotate(${i * 360 / flower.petals})`} />)}
    <circle r="8" fill={flower.center} /><circle cx="-2" cy="-2" r="2" fill="#fff" opacity=".4" />
  </g>;
}

export function Blossom({ flower, size = 36 }) {
  return <svg width={size} height={size} viewBox="-28 -28 56 56" aria-hidden="true"><BloomArtwork flower={flower} /></svg>;
}

export function FoliageArtwork({ variant = 0 }) {
  const pairs = [3, 4, 5][variant];
  const reach = [13, 9, 15][variant];
  return <g strokeLinecap="round" strokeLinejoin="round">
    {Array.from({ length: pairs }, (_, i) => {
      const x = -8 - i * 27 / (pairs - 1), y = x * .62;
      return <g key={i}>
        <path d={`M${x} ${y}q${-reach * .9} -4 ${-reach} -17q${reach * .8} 4 ${reach} 17Z`} fill={variant === 1 ? '#6d9465' : '#769b64'} />
        <path d={`M${x} ${y}q-7 7 ${-reach - 7} 1q8 -4 ${reach + 7} -1Z`} fill={variant === 2 ? '#8fa36b' : '#95ad74'} />
        <path d={`M${x} ${y}l${-reach * .7} -12m${reach * .7} 12l${-reach - 2} 1`} fill="none" stroke="#c4d39c" strokeWidth=".65" opacity=".75" />
      </g>;
    })}
    <path d="M0 0Q-16 -14 -43 -27" fill="none" stroke="#507849" strokeWidth="1.5" />
    <path d="M-34 -22Q-43 -28 -46 -36Q-35 -32 -34 -22Z" fill="#829f62" />
  </g>;
}

export function StemAndLeaves({ length, height, identity, index, leafSize = 40, strokeWidth = 3.5 }) {
  const id = `stem-${useId().replace(/:/g, '')}`;
  const form = plantGeometry({ length, height, identity, index, leafSize });
  return <g data-plant-form={form.variant}>
    <defs><linearGradient id={id}><stop stopColor="#3f6b43" /><stop offset=".45" stopColor="#94ad71" /><stop offset="1" stopColor="#537a47" /></linearGradient></defs>
    <path d={form.stem} stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
    {form.leaves.map((leaf, i) => <g key={i} transform={`translate(${leaf.x} ${leaf.y}) scale(${leaf.side * leaf.scale} ${leaf.scale}) rotate(${leaf.angle})`}><FoliageArtwork variant={leaf.variant} /></g>)}
  </g>;
}

export function GrowthRuler({ maximum, height }) {
  return <svg className={styles.growthRuler} width="58" height={height + 44} viewBox={`0 0 58 ${height + 44}`} role="img" aria-label={`長さの目盛り、0から${maximum}センチメートル`}>
    <rect x="1" y="1" width="56" height={height + 42} rx="9" fill="#fffdf1" stroke="#a8b798" strokeWidth="1.5" />
    <text x="43" y="13" textAnchor="middle" fontSize="9" fill="#68775b">cm</text>
    <path d={`M51 22V${height + 22}`} fill="none" stroke="#9ba98a" />
    {Array.from({ length: 21 }, (_, i) => {
      const y = 22 + height * i / 20, major = i % 5 === 0;
      return <g key={i}>
        <path d={`M${major ? 36 : 44} ${y}H51`} stroke={major ? '#55734c' : '#a4b093'} strokeWidth={major ? 1.5 : 1} />
        {major && <text x="30" y={y + 3.5} textAnchor="end" fill="#354d35" fontSize="10.5" fontWeight="600" fontFamily="ui-monospace, monospace">{maximum * (20 - i) / 20}</text>}
      </g>;
    })}
  </svg>;
}

export function Plant({ flower, length, maximum, bloom, index = 0, compact = false, preview = false, drawingHeight, identity = 'seedling' }) {
  const pending = length === undefined;
  const failed = length === 0;
  const scale = drawingHeight ?? (preview ? 25 : compact ? 135 : 230);
  const height = pending ? 22 : length / maximum * scale;
  const appearance = flowerAppearance(flower, length, bloom);
  const blossomSize = (compact ? 42 : 72) * appearance.scale;
  return <div className={`${styles.plant} ${compact ? styles.compactPlant : ''}`} style={{ '--delay': `${index * 65}ms` }}>
    <div className={styles.plantSpace} style={{ height: scale + 38 }}>
      {failed ? <div className={styles.failedSeed} aria-hidden="true"><span /> ·</div>
        : <div className={`${styles.growth} ${pending ? styles.seedling : ''}`} style={{ height }} aria-hidden="true">
          <svg className={styles.plantBody} width="112" height={height} viewBox={`-56 ${-height} 112 ${height}`}>
            <StemAndLeaves length={pending ? 8 : length} height={height} identity={identity} index={index} leafSize={compact ? 28 : 40} strokeWidth={compact ? 2.5 : 3.5} />
          </svg>
          {!pending && <span className={styles.bloom} style={{ width: blossomSize, height: blossomSize }}><Blossom flower={appearance} size={blossomSize} /></span>}
        </div>}
    </div>
    <div className={styles.pot} aria-hidden="true"><span /></div>
    {!preview && <div className={styles.plantLabel}>{pending ? '—' : failed ? '0 cm' : <>{length > 0 && length < .1 ? '<0.1' : length.toFixed(1)} <small>cm</small></>}</div>}
    {failed && <span className={styles.failedLabel}>育たなかった</span>}
  </div>;
}

export function SproutIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M12 21V11M12 15C3 15 3 8 3 8s9-1 9 7ZM12 11c0-8 9-8 9-8s1 9-9 8Z" /></svg>;
}

export function DropIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z" /><path d="M8 15c0 2 1 3 3 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>;
}
