import { GARDEN_CONFIG } from '../data/miracle-garden.mjs';

// A stateful generator is confined to a single operation. Game transitions are
// pure: React replays cannot reroll outcomes or spend an experiment twice.
export function randomStream(seed) {
  let state = seed >>> 0;
  return {
    next() {
      state = (state + 0x6d2b79f5) >>> 0;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    },
    get state() { return state; },
  };
}

export function normalSample(random = Math.random) {
  // 1 - U is in (0, 1], including when the generator returns exactly zero.
  return Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
}

export function observedLength(mean, standardDeviation, random = Math.random) {
  return Math.max(0, mean + standardDeviation * normalSample(random));
}

function freezeTree(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeTree);
    Object.freeze(value);
  }
  return value;
}

export function freshSeed(previous) {
  const value = globalThis.crypto?.getRandomValues(new Uint32Array(1))[0]
    ?? Math.floor(Math.random() * 4294967296);
  return value === previous ? (value + 1) >>> 0 : value;
}

export function createGame({ seed = freshSeed(), config = GARDEN_CONFIG } = {}) {
  const settings = JSON.parse(JSON.stringify(config));
  const stream = randomStream(seed);
  const between = ([low, high]) => low + (high - low) * stream.next();
  const pool = [...settings.flowers];
  settings.flowerCount = Math.max(1, Math.min(pool.length, settings.flowerCount ?? pool.length));
  settings.flowers = pool.slice(0, settings.flowerCount);
  freezeTree(settings);
  const model = settings.model;
  // Species stay fixed. Each new garden still draws its optimum across the
  // full range; each treatment shares the garden's learnable curve family.
  const hidden = Object.fromEntries(settings.flowers.map(flower => {
    const treatments = settings.fertilizers;
    const favored = treatments[Math.floor(stream.next() * treatments.length)]?.id;
    const profile = model.profiles[Math.floor(stream.next() * model.profiles.length)];
    const leftWidth = between(profile.widthRange);
    return [flower.id, {
      optimum: between(model.optimumRange),
      peak: between(model.peakRange),
      profile: profile.id,
      power: profile.power,
      leftWidth,
      rightWidth: leftWidth * between(profile.rightWidthRatio),
      fertilizers: Object.fromEntries(treatments.map(f => [f.id, {
        boost: f.id === favored ? 0 : -between(model.nonFavoredPenaltyRange),
        shift: f.id === 'none' ? 0 : between(model.fertilizerShiftRange) * (stream.next() < 0.5 ? -1 : 1),
        widthScale: between(model.fertilizerWidthRange),
      }])),
    }];
  }));
  return {
    seed: seed >>> 0, config: settings, hidden: freezeTree(hidden), randomState: stream.state,
    phase: 'experiment', experiments: [], recipes: {}, finalPlants: [],
  };
}

export function validCondition(game, condition) {
  return Boolean(condition && game.hidden[condition.flowerId]
    && game.config.fertilizers.some(f => f.id === condition.fertilizerId)
    && Number.isInteger(condition.water)
    && condition.water >= game.config.water.min && condition.water <= game.config.water.max);
}

export function meanGrowth(game, condition) {
  if (!validCondition(game, condition)) throw new RangeError('Invalid growing condition');
  const { min, max } = game.config.water;
  const water = max === min ? 0.5 : (condition.water - min) / (max - min);
  const flower = game.hidden[condition.flowerId];
  const treatment = flower.fertilizers[condition.fertilizerId];
  const distance = water - flower.optimum - treatment.shift;
  const width = (distance < 0 ? flower.leftWidth : flower.rightWidth) * treatment.widthScale;
  // Both sides meet with zero slope. The broad profile has a flat top; the
  // asymmetric profile falls more steeply with excess water. Noise is separate.
  return flower.peak + treatment.boost
    - game.config.model.falloff * (Math.abs(distance) / width) ** flower.power;
}

function growBatch(game, condition, count, stream) {
  const mean = meanGrowth(game, condition);
  return Array.from({ length: count }, () => observedLength(mean, game.config.standardDeviation, () => stream.next()));
}

export function runExperiment(game, condition) {
  if (game.phase !== 'experiment' || game.experiments.length >= game.config.experimentLimit) return game;
  if (!validCondition(game, condition)) return game;
  const stream = randomStream(game.randomState);
  const experiment = {
    ...condition,
    number: game.experiments.length + 1,
    lengths: growBatch(game, condition, game.config.plantsPerExperiment, stream),
  };
  return { ...game, randomState: stream.state, experiments: [...game.experiments, experiment] };
}

export function summarize(lengths) {
  return {
    count: lengths.length,
    mean: lengths.length ? lengths.reduce((sum, value) => sum + value, 0) / lengths.length : null,
    failures: lengths.filter(value => value === 0).length,
  };
}

export function conditionRecords(game, { flowerId, water, fertilizerId }) {
  return game.experiments.filter(row => row.flowerId === flowerId && row.water === water && row.fertilizerId === fertilizerId)
    .flatMap(row => row.lengths);
}

export function startPlanning(game) {
  return game.phase === 'experiment' && game.experiments.length === game.config.experimentLimit
    ? { ...game, phase: 'planning' } : game;
}

// Carry the player's last selection forward, not a hidden or inferred optimum.
export function planningDrafts(game, selected) {
  return Object.fromEntries(game.config.flowers.map(flower => {
    const last = game.experiments.findLast(row => row.flowerId === flower.id);
    const recipe = selected?.flowerId === flower.id && validCondition(game, selected) ? selected : last;
    return [flower.id, recipe ? { flowerId: flower.id, water: recipe.water, fertilizerId: recipe.fertilizerId }
      : { flowerId: flower.id, water: game.config.water.initial, fertilizerId: game.config.fertilizers[0].id }];
  }));
}

export function chooseRecipe(game, condition) {
  if (game.phase !== 'planning' || !validCondition(game, condition)) return game;
  return { ...game, recipes: { ...game.recipes, [condition.flowerId]: { ...condition } } };
}

export function growFinalGarden(game) {
  if (game.phase !== 'planning' || game.config.flowers.some(f => !validCondition(game, game.recipes[f.id]))) return game;
  const stream = randomStream(game.randomState);
  const finalPlants = game.config.flowers.map(f => ({
    ...game.recipes[f.id],
    lengths: growBatch(game, game.recipes[f.id], game.config.plantsPerFlowerInFinal, stream),
  }));
  return { ...game, randomState: stream.state, phase: 'finished', finalPlants };
}

// Sum exactly the final labels, in integer display units to avoid float drift.
// Observations remain continuous; rounding is only for labels and scoring.
export const formatFinalLength = (length, config = GARDEN_CONFIG) => length.toFixed(config.scoreDecimals);
const scoreFromLengths = (lengths, config) => {
  const scale = 10 ** config.scoreDecimals;
  const units = lengths.reduce((sum, value) => sum + Math.round(Number(formatFinalLength(value, config)) * scale), 0);
  return units / scale;
};
export const gardenScore = game => scoreFromLengths(game.finalPlants.flatMap(row => row.lengths), game.config);
export const formatScore = (score, config = GARDEN_CONFIG) => score.toFixed(config.scoreDecimals);
export const targetScore = game => game.config.flowers.length * game.config.plantsPerFlowerInFinal * game.config.targetPerPlant;
export const formatLength = value => value > 0 && value < 0.1 ? '0.1未満' : value.toFixed(1);

// Observations only: never expose hidden response curves to the notebook.
export function observationPoints(game, flowerId) {
  return game.experiments.filter(row => row.flowerId === flowerId).flatMap(row =>
    row.lengths.map((length, index) => ({
      id: `${row.number}-${index}`, flowerId, water: row.water,
      fertilizerId: row.fertilizerId, length,
    })));
}

export function observedConditions(game, flowerId) {
  const groups = new Map();
  for (const point of observationPoints(game, flowerId)) {
    const key = `${point.water}:${point.fertilizerId}`;
    if (!groups.has(key)) groups.set(key, { flowerId, water: point.water, fertilizerId: point.fertilizerId, lengths: [] });
    groups.get(key).lengths.push(point.length);
  }
  return [...groups.values()].map(group => ({ ...group, ...summarize(group.lengths) }))
    .sort((a, b) => a.water - b.water || a.fertilizerId.localeCompare(b.fertilizerId));
}

// One flower of each species blooms before the next plant is revealed.
export function finalRevealOrder(game) {
  return Array.from({ length: game.config.plantsPerFlowerInFinal }, (_, plantIndex) =>
    game.finalPlants.map(row => ({ flowerId: row.flowerId, plantIndex, length: row.lengths[plantIndex] }))).flat();
}

export function revealedScore(game, revealedCount) {
  return scoreFromLengths(finalRevealOrder(game).slice(0, revealedCount).map(plant => plant.length), game.config);
}

// Scores persist separately from observations. A scoring/model change starts
// a new record category; names, colors and animation timing do not.
export function bestScoreKey(config) {
  return `miracle-garden-best-v5:${JSON.stringify({
    flowers: config.flowerCount ?? config.flowers.length, fertilizers: config.fertilizers.map(f => f.id),
    water: config.water, trials: config.experimentLimit, batch: config.plantsPerExperiment,
    final: config.plantsPerFlowerInFinal, scoreDecimals: config.scoreDecimals, noise: config.standardDeviation, model: config.model,
  })}`;
}

// Earlier records rounded the raw total instead of each displayed flower.
// Keep those keys intact; their component lengths cannot be reconstructed.
export function readBestScore(storage, config) {
  const stored = storage.getItem(bestScoreKey(config));
  if (stored === null || stored.trim() === '') return null;
  const score = Number(stored);
  return Number.isFinite(score) && score >= 0 ? score : null;
}

export function saveBestScore(storage, config, score) {
  if (!Number.isFinite(score) || score < 0) throw new RangeError('Invalid score');
  const next = Number(formatScore(score, config));
  const best = Math.max(readBestScore(storage, config) ?? 0, next);
  storage.setItem(bestScoreKey(config), formatScore(best, config));
  return best;
}
