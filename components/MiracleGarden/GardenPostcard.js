import { forwardRef } from 'react';
import { finalRevealOrder, formatFinalLength, formatScore } from '../../lib/miracle-garden.mjs';
import { flowerAppearance, gardenResult } from '../../lib/miracle-garden-presentation.mjs';
import styles from '../../styles/MiracleGarden.module.css';
import { BloomArtwork, StemAndLeaves } from './Flowers';
import GardenEmblem from './GardenEmblem';

const palettes = [
  { sky: '#e5efed', glow: '#f8f4d9', hill: '#d1dfc9', far: '#e1e8d6', sun: '#f1d98b' },
  { sky: '#f1e6e3', glow: '#fff1d7', hill: '#d8dfc5', far: '#e8e5d0', sun: '#edbe83' },
  { sky: '#e5e9f2', glow: '#f2efec', hill: '#cbdcd1', far: '#dbe5de', sun: '#ede1ac' },
];

function FlowerHead({ flower, radius = 1 }) {
  return <g transform={`scale(${radius * 1.65})`}><BloomArtwork flower={flower} /></g>;
}

function Butterfly({ x, y, scale = 1, color = '#e5b469' }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <g className={styles.butterflyWings}><ellipse cx="-9" cy="-7" rx="9" ry="14" fill={color} transform="rotate(-30)" /><ellipse cx="9" cy="-7" rx="9" ry="14" fill={color} transform="rotate(30)" /><ellipse cx="-7" cy="8" rx="7" ry="9" fill={color} /><ellipse cx="7" cy="8" rx="7" ry="9" fill={color} /></g>
    <path d="M0 -12V14M0 -10L-5 -17M0 -10L5 -17" fill="none" stroke="#756b4b" strokeWidth="2" strokeLinecap="round" />
  </g>;
}

export default forwardRef(function GardenPostcard({ game, revealed }, ref) {
  const { config } = game;
  const order = finalRevealOrder(game);
  const visible = order.slice(0, revealed);
  const result = gardenResult(game, revealed);
  const scoreText = formatScore(result.score, config);
  const palette = palettes[game.seed % palettes.length];
  const prefix = `garden-${game.seed}`;
  const maximum = Math.max(config.displayMax, Math.ceil(Math.max(0, ...visible.map(p => p.length)) / 20) * 20);
  const goal = id => result.goals.find(g => g.id === id);
  const archProgress = goal('arch')?.progress ?? 0;
  const groupWidth = 840 / config.flowers.length;
  return <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" className={styles.postcard} role="img"
    aria-label={`${config.title}、合計${scoreText}てん。${visible.map((plant, i) => `${i + 1}本め ${formatFinalLength(plant.length, config)}cm`).join('、')}`}
    fontFamily="'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif" fill="#365344">
    <defs>
      <linearGradient id={`${prefix}-sky`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={palette.sky} /><stop offset="1" stopColor={palette.glow} /></linearGradient>
      <linearGradient id={`${prefix}-soil`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d4a47b" /><stop offset=".2" stopColor="#ecc397" /><stop offset=".4" stopColor="#c18b63" /><stop offset="1" stopColor="#a77556" /></linearGradient>
      <linearGradient id={`${prefix}-leaf`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b9c997" /><stop offset=".45" stopColor="#8ea66c" /><stop offset="1" stopColor="#587a4f" /></linearGradient>
      <clipPath id={`${prefix}-clip`}><rect x="22" y="22" width="1156" height="706" rx="20" /></clipPath>
    </defs>
    <rect width="1200" height="750" rx="26" fill="#fffcf2" />
    <g clipPath={`url(#${prefix}-clip)`}>
      <rect x="22" y="22" width="1156" height="706" fill={`url(#${prefix}-sky)`} />
      {config.art?.background && <image href={config.art.background} x="22" y="22" width="1156" height="706" preserveAspectRatio="xMidYMid slice" />}
      <rect x="22" y="22" width="1156" height="120" fill="#fffbed" opacity=".92" />
      <g transform="translate(58 59)"><GardenEmblem size={48} /></g>
      <text x="120" y="99" fontSize="34" className={styles.postcardTitle} letterSpacing="5" fontFamily="'Hiragino Mincho ProN', 'Yu Mincho', serif">{config.title}</text>
      <text x="1130" y="111" fontSize="72" fontWeight="700" className={styles.postcardScore} textAnchor="end">{scoreText}<tspan fontSize="24" className={styles.postcardScoreUnit} dx="12">てん</tspan></text>
      <rect x="22" y="616" width="1156" height="112" fill="#fffbed" />
      <path d="M111 554V352C111 109 1089 109 1089 352V554M131 554V355C131 137 1069 137 1069 355V554" stroke="#b5bea5" strokeWidth="5" fill="none" />
      {[0, 1].map(side => <g key={side} transform={side ? 'translate(1200 0) scale(-1 1)' : undefined}>
        <path d="M119 555C104 482 140 423 120 360C106 274 278 188 600 170" pathLength="100" stroke="#62875d" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray={`${archProgress * 100} 100`} />
        {Array.from({ length: 13 }, (_, i) => {
          const t = i / 12;
          const x = t < .4 ? 119 : 119 + ((t - .4) / .6) ** 1.5 * 466;
          const y = t < .4 ? 540 - t / .4 * 200 : 340 - Math.sin((t - .4) / .6 * Math.PI / 2) * 166;
          return <g key={i} opacity={t <= archProgress ? 1 : 0} transform={`translate(${x} ${y}) rotate(${i % 2 ? 45 : -40})`}><path d="M5 0Q-10 -18 -33 0Q-10 16 5 0Z" fill={`url(#${prefix}-leaf)`} /><path d="M-29 0H5m-23 0l-5 -5m11 5l-5 6" stroke="#577949" strokeWidth=".9" opacity=".7" /></g>;
        })}
      </g>)}
      {game.finalPlants.map((row, groupIndex) => {
        const flower = config.flowers.find(f => f.id === row.flowerId);
        const center = 180 + groupWidth * (groupIndex + .5);
        return <g key={flower.id}>
          <ellipse cx={center} cy="594" rx={groupWidth * .44} ry="19" fill="#a4b18e" opacity=".22" />
          <rect x={center - groupWidth * .43} y="559" width={groupWidth * .86} height="32" rx="13" fill={`url(#${prefix}-soil)`} />
          <ellipse cx={center} cy="560" rx={groupWidth * .43} ry="13" fill="#a68e73" stroke="#d7b58a" strokeWidth="3" />
          <path d={`M${center - groupWidth * .39} 580H${center + groupWidth * .39}`} stroke="#9b6d4f" strokeWidth="1" opacity=".45" />
          {row.lengths.map((length, plantIndex) => {
            const shown = visible.some(p => p.flowerId === row.flowerId && p.plantIndex === plantIndex);
            const appearance = shown ? flowerAppearance(flower, length, config.bloom) : null;
            const x = center + (plantIndex - (row.lengths.length - 1) / 2) * Math.min(340, groupWidth * .8 / Math.max(1, row.lengths.length - 1));
            const height = shown ? length / maximum * 340 : 20;
            const labelSize = Math.min(42, groupWidth / (row.lengths.length * 5));
            const mobileLabelSize = Math.min(64, groupWidth / (row.lengths.length * 4.4));
            return <g key={plantIndex}>
              {shown && length === 0 ? <ellipse cx={x} cy="555" rx="6" ry="3" fill="#735d44" /> : <g transform={`translate(${x} 558)`}>
                <g key={String(shown)} className={shown ? styles.postcardPlant : undefined}>
                  <StemAndLeaves length={shown ? length : 8} height={height} identity={`${game.seed}:final:${flower.id}`} index={plantIndex} leafSize={66} strokeWidth={5} />
                  {shown && <g transform={`translate(0 ${-height})`}><FlowerHead flower={appearance} radius={Math.min(1, groupWidth / 240) * appearance.scale} /></g>}
                </g>
              </g>}
              <text x={x} y="684" textAnchor="middle" fontSize={labelSize} fontWeight="700" fill="#294d3c" className={styles.postcardLength} style={{ '--mobile-length-size': `${mobileLabelSize}px`, '--mobile-unit-size': `${mobileLabelSize * .6}px` }}>{shown ? formatFinalLength(length, config) : '—'}{shown && <tspan fontSize={labelSize * .6} className={styles.postcardLengthUnit} dx="6">cm</tspan>}</text>
            </g>;
          })}
          {config.flowers.length > 1 && <text x={center} y="714" textAnchor="middle" fontSize="19">{flower.name}</text>}
        </g>;
      })}
      {goal('butterflies')?.reached && <><Butterfly x={330} y={240} scale={1.2} /><Butterfly x={850} y={307} scale={.85} color="#b2a0c8" /><Butterfly x={735} y={192} scale={.65} color="#e1ac9c" /></>}
      {goal('lights')?.reached && Array.from({ length: 14 }, (_, i) => <g key={i} transform={`translate(${160 + i * 68} ${233 + (i * 47) % 270})`} className={styles.gardenSparkle}><circle r="13" fill="#fff7bb" opacity=".22" /><path d="M0 -7Q1 -1 7 0Q1 1 0 7Q-1 1 -7 0Q-1 -1 0 -7Z" fill="#fffde6" /></g>)}
    </g>
    <rect x="22" y="22" width="1156" height="706" rx="20" stroke="#bac7ac" strokeWidth="1" fill="none" />
  </svg>;
});
