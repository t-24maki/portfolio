// Prototype tuning lives here. Water is an integer; model ranges use normalized
// water (0–1), so changing the input range preserves the broad growth curves.
export const GARDEN_CONFIG = {
  title: 'データの庭',
  titleRuby: { text: '庭', reading: 'にわ' },
  flowerCount: 1, // Use this many species from the fixed flowers list.
  water: { min: 0, max: 100, initial: 50, unit: 'ml' },
  experimentLimit: 12,
  plantsPerExperiment: 3,
  plantsPerFlowerInFinal: 3,
  scoreDecimals: 1, // Shared by the final flower labels and score.
  targetPerPlant: 60,
  standardDeviation: 4,
  animationMs: 1300,
  finalRevealMs: 1150,
  celebration: { minParticles: 10, maxParticles: 100, fullScorePerPlant: 85, durationMs: 3300 },
  displayMax: 100,
  art: { background: '/images/miracle-garden/garden-backdrop.png', experimentScale: 145 },
  goals: [
    { id: 'arch', label: '緑のアーチ', multiplier: 1, symbol: '⌒' },
    { id: 'butterflies', label: '蝶の庭', multiplier: 7 / 6, symbol: 'ʚɞ' },
    { id: 'lights', label: '光の庭', multiplier: 4 / 3, symbol: '✧' },
  ],
  flowers: [
    { id: 'peach', name: 'コスモス', color: '#e995a3', center: '#f9d870', petals: 8, image: '/images/miracle-garden/cosmos-simple.png' },
  ],
  bloom: {
    // Scales are relative to each renderer's flower size, never the chart axis.
    minScale: 0.55,
    maxScale: 1.2,
    fullSizeLength: 100,
    colors: [
      { minLength: 0, name: 'ピンク', label: '一重', color: '#e995a3', center: '#f9d870', image: '/images/miracle-garden/cosmos-simple.png' },
      { minLength: 70, name: '濃いピンク', label: '八重', color: '#dc5884', center: '#f9d870', image: '/images/miracle-garden/cosmos-full.png' },
      { minLength: 85, name: '黄金', label: '黄金の八重', color: '#f2ce72', center: '#e8b23d', image: '/images/miracle-garden/cosmos-gold-v2.png' },
    ],
  },
  fertilizers: [
    { id: 'none', name: '水だけ', short: '水だけ', color: '#548eaa', symbol: '○', shape: 'circle' },
    { id: 'leaf', name: '肥料A', short: '肥料A', color: '#477b5b', symbol: '◆', shape: 'diamond' },
    { id: 'gold', name: '肥料B', short: '肥料B', color: '#b47b22', symbol: '▲', shape: 'triangle' },
  ],
  model: {
    optimumRange: [0.25, 0.75],
    peakRange: [80, 80],
    falloff: 40, // Loss at one profile width from the optimum, before clipping.
    profiles: [
      { id: 'broad', power: 4, widthRange: [0.38, 0.43], rightWidthRatio: [1, 1] },
      { id: 'focused', power: 2, widthRange: [0.26, 0.30], rightWidthRatio: [1, 1] },
      { id: 'waterSensitive', power: 2, widthRange: [0.35, 0.40], rightWidthRatio: [0.60, 0.70] },
    ],
    // Every option, including water alone, can be the best treatment.
    // Similar attainable peaks keep different gardens broadly comparable.
    nonFavoredPenaltyRange: [10, 16],
    fertilizerShiftRange: [0.09, 0.14],
    fertilizerWidthRange: [0.92, 1.08],
  },
};
