import assert from 'node:assert/strict';
import test from 'node:test';
import { GARDEN_CONFIG } from '../data/miracle-garden.mjs';
import { bestScoreKey, chooseRecipe, conditionRecords, createGame, finalRevealOrder, formatFinalLength, formatScore, freshSeed, gardenScore, growFinalGarden, meanGrowth, normalSample, planningDrafts, observationPoints, observedConditions, observedLength, randomStream, readBestScore, revealedScore, runExperiment, saveBestScore, startPlanning, summarize, targetScore } from '../lib/miracle-garden.mjs';

const makeGame = options => createGame({ config: { ...GARDEN_CONFIG, flowers: [GARDEN_CONFIG.flowers[0]] }, ...options });

const condition = { flowerId: GARDEN_CONFIG.flowers[0].id, water: 50, fertilizerId: 'none' };
const multiFlowerConfig = count => ({
  ...structuredClone(GARDEN_CONFIG), flowerCount: count,
  flowers: Array.from({ length: count }, (_, i) => ({ ...GARDEN_CONFIG.flowers[0], id: i ? `test-${i}` : condition.flowerId })),
});

test('water alone and both fertilizers can each have the highest attainable mean', () => {
  const winners = new Set();
  for (let seed = 1; seed <= 40; seed++) {
    const game = makeGame({ seed });
    for (const flower of game.config.flowers) {
      const peaks = game.config.fertilizers.map(f => ({ id: f.id, value: Math.max(...Array.from({ length: 101 }, (_, water) => meanGrowth(game, { flowerId: flower.id, water, fertilizerId: f.id }))) }));
      peaks.sort((a, b) => b.value - a.value);
      winners.add(peaks[0].id);
      assert.ok(peaks[0].value - peaks[1].value > 9);
      assert.ok(peaks[0].value >= 79.9 && peaks[0].value <= 80);
    }
  }
  assert.deepEqual([...winners].sort(), GARDEN_CONFIG.fertilizers.map(f => f.id).sort());
});

test('0–100 ml accepts both endpoints and 1 ml changes, with broad response near an optimum', () => {
  const game = makeGame({ seed: 53 });
  for (const water of [0, 1, 49, 50, 51, 99, 100]) {
    assert.equal(runExperiment(game, { ...condition, water }).experiments[0].water, water);
  }
  const optimum = Math.round(game.hidden[condition.flowerId].optimum * 100);
  const value = water => meanGrowth(game, { ...condition, water });
  assert.ok(Math.abs(value(optimum) - value(optimum + 1)) < .3);
  assert.ok(Math.abs(value(optimum) - value(optimum + 5)) < 5);
});

test('negative generated lengths become exactly zero; positive lengths remain continuous', () => {
  const values = [1 - Math.exp(-.5), .5]; // Box–Muller gives -1.
  let index = 0;
  assert.equal(observedLength(2, 8, () => values[index++]), 0);
  assert.equal(observedLength(-12, 8, () => 0), 0);
  assert.equal(observedLength(3.14159265, 0, () => 0), 3.14159265);
  assert.ok(normalSample(() => 0) === 0); // Either sign of floating-point zero is valid.
});

test('normal individual differences have mean zero and configured common standard deviation', () => {
  const stream = randomStream(456);
  const n = 80000;
  let sum = 0;
  let squares = 0;
  for (let i = 0; i < n; i++) {
    const value = observedLength(1000, GARDEN_CONFIG.standardDeviation, () => stream.next()) - 1000;
    sum += value;
    squares += value * value;
  }
  assert.ok(Math.abs(sum / n) < .1);
  const sd = Math.sqrt(squares / n - (sum / n) ** 2);
  assert.ok(Math.abs(sd - GARDEN_CONFIG.standardDeviation) < .1);
});

test('summaries include every failure and distinguish untried conditions from observed zero', () => {
  assert.deepEqual(summarize([]), { count: 0, mean: null, failures: 0 });
  assert.deepEqual(summarize([0, 0, 0]), { count: 3, mean: 0, failures: 3 });
  assert.deepEqual(summarize([0, 10, 20, 0]), { count: 4, mean: 7.5, failures: 2 });
  const game = makeGame({ seed: 1 });
  game.experiments = [
    { ...condition, lengths: [0, 10, 20] },
    { ...condition, lengths: [0, 0, 0] },
    { ...condition, water: 6, lengths: [100, 100, 100] },
    { ...condition, flowerId: 'sky', lengths: [100, 100, 100] },
    { ...condition, fertilizerId: 'leaf', lengths: [100, 100, 100] },
  ];
  assert.deepEqual(summarize(conditionRecords(game, condition)), { count: 6, mean: 5, failures: 4 });
});

test('negative-mean experiments retain failures in both records and aggregation', () => {
  const config = structuredClone(GARDEN_CONFIG);
  config.standardDeviation = 0;
  config.model.peakRange = [-10, -10];
  config.flowers = config.flowers.slice(0, 1);
  const game = runExperiment(makeGame({ seed: 3, config }), condition);
  assert.deepEqual(game.experiments[0].lengths, [0, 0, 0]);
  assert.deepEqual(summarize(conditionRecords(game, condition)), { count: 3, mean: 0, failures: 3 });
});

test('hidden parameters stay frozen in-game; replay of a transition cannot reroll; repeats are fresh samples', () => {
  const initial = makeGame({ seed: 12 });
  const before = JSON.stringify(initial.hidden);
  const next = runExperiment(initial, condition);
  assert.deepEqual(next, runExperiment(initial, condition));
  const repeated = runExperiment(next, condition);
  assert.equal(repeated.hidden, initial.hidden);
  assert.equal(JSON.stringify(repeated.hidden), before);
  assert.throws(() => { repeated.hidden[condition.flowerId].optimum = .99; }, TypeError);
  assert.notDeepEqual(next.experiments[0].lengths, repeated.experiments[1].lengths);
  assert.equal(initial.experiments.length, 0);
});

test('new games change hidden parameters and clear all old observations, recipes and results', () => {
  const oldGame = runExperiment(makeGame({ seed: 100 }), condition);
  const newGame = makeGame({ seed: 101 });
  assert.notDeepEqual(oldGame.hidden, newGame.hidden);
  assert.deepEqual(newGame.experiments, []);
  assert.deepEqual(conditionRecords(newGame, condition), []);
  assert.deepEqual(newGame.recipes, {});
  assert.deepEqual(newGame.finalPlants, []);
  assert.notEqual(freshSeed(oldGame.seed), oldGame.seed);
});

test('smooth water response has a broad interior peak and water/fertilizer interaction', () => {
  for (const seed of [1, 2, 12, 91, 404]) {
    const game = makeGame({ seed });
    for (const flower of game.config.flowers) {
      const base = { ...condition, flowerId: flower.id };
      const values = Array.from({ length: 101 }, (_, water) => meanGrowth(game, { ...base, water }));
      const best = values.indexOf(Math.max(...values));
      assert.ok(best > 0 && best < 100);
      for (let w = 1; w < best; w++) assert.ok(values[w] > values[w - 1]);
      for (let w = best + 1; w < 101; w++) assert.ok(values[w] < values[w - 1]);
      const benefit = water => meanGrowth(game, { ...base, water, fertilizerId: 'leaf' }) - meanGrowth(game, { ...base, water });
      assert.ok(Math.abs(benefit(10) - benefit(90)) > 10);
    }
  }
});

test('full lifecycle enforces budget, all species and one final garden; final never contaminates trials', () => {
  let game = makeGame({ seed: 70 });
  assert.equal(startPlanning(game), game);
  assert.equal(growFinalGarden(game), game);
  const hidden = game.hidden;
  for (let i = 0; i < GARDEN_CONFIG.experimentLimit; i++) game = runExperiment(game, { ...condition, flowerId: game.config.flowers[0].id });
  assert.equal(game.experiments.length, 12);
  assert.equal(runExperiment(game, condition), game);
  game = startPlanning(game);
  assert.equal(game.phase, 'planning');
  assert.equal(growFinalGarden(game), game);
  for (const flower of game.config.flowers) game = chooseRecipe(game, { ...condition, flowerId: flower.id });
  const observations = game.experiments;
  const before = game;
  game = growFinalGarden(game);
  assert.equal(game.phase, 'finished');
  assert.equal(game.hidden, hidden);
  assert.equal(game.experiments, observations);
  assert.equal(game.finalPlants.flatMap(row => row.lengths).length, 3);
  assert.equal(gardenScore(game), Number(game.finalPlants.flatMap(row => row.lengths).reduce((a, b) => a + Number(formatFinalLength(b, game.config)), 0).toFixed(1)));
  assert.equal(targetScore(game), 180);
  assert.deepEqual(growFinalGarden(before), game);
  assert.equal(growFinalGarden(game), game);
  assert.equal(runExperiment(game, condition), game);
});

test('scatter data retains exact water and continuous lengths, including zero and repeated conditions', () => {
  const game = makeGame({ seed: 3 });
  game.experiments = [
    { ...condition, number: 1, water: 0, lengths: [0, 1.23456789, 9] },
    { ...condition, number: 2, water: 0, lengths: [0, 0, 0] },
    { ...condition, number: 3, water: 0, fertilizerId: 'leaf', lengths: [30, 40, 50] },
    { ...condition, number: 4, flowerId: 'sky', lengths: [80, 80, 80] },
  ];
  const points = observationPoints(game, condition.flowerId);
  assert.equal(points.length, 9);
  assert.equal(new Set(points.map(p => p.id)).size, 9);
  assert.ok(points.every(p => p.water === 0));
  assert.equal(points[1].length, 1.23456789);
  assert.equal(points.filter(p => p.length === 0).length, 4);
  const groups = observedConditions(game, condition.flowerId);
  assert.equal(groups.length, 2);
  const none = groups.find(g => g.fertilizerId === 'none');
  assert.equal(none.count, 6);
  assert.equal(none.mean, (1.23456789 + 9) / 6);
  assert.equal(none.failures, 4);
  assert.deepEqual(observationPoints(makeGame({ seed: 4 }), condition.flowerId), []);
});

test('final reveal visits every plant exactly once, shows no future score and supports one or several plants', () => {
  for (const count of [1, 3, 5]) {
    const config = multiFlowerConfig(3);
    config.plantsPerFlowerInFinal = count;
    const game = makeGame({ seed: 5, config });
    game.finalPlants = config.flowers.map((flower, flowerIndex) => ({
      ...condition, flowerId: flower.id,
      lengths: Array.from({ length: count }, (_, plantIndex) => flowerIndex * 10 + plantIndex),
    }));
    const order = finalRevealOrder(game);
    assert.equal(order.length, count * config.flowers.length);
    assert.equal(new Set(order.map(p => `${p.flowerId}:${p.plantIndex}`)).size, order.length);
    assert.deepEqual(order.slice(0, 3).map(p => p.flowerId), config.flowers.map(f => f.id));
    assert.equal(revealedScore(game, 0), 0);
    assert.equal(revealedScore(game, 2), 10);
    assert.equal(revealedScore(game, order.length), gardenScore(game));
    for (let i = 1; i <= order.length; i++) assert.ok(revealedScore(game, i) >= revealedScore(game, i - 1));
  }
});

test('scores sum displayed tenths, preserve raw observations, and reveal only visible flowers', () => {
  const game = makeGame({ seed: 5 });
  game.finalPlants = [{ ...condition, lengths: [12.344, 12.344, 12.344] }];
  const before = structuredClone(game.finalPlants);
  assert.equal(revealedScore(game, 0), 0);
  assert.equal(formatFinalLength(12.344, game.config), '12.3');
  assert.equal(revealedScore(game, 1), 12.3);
  assert.equal(revealedScore(game, 2), 24.6);
  assert.equal(revealedScore(game, 3), 36.9);
  assert.equal(gardenScore(game), 36.9);
  assert.deepEqual(game.finalPlants, before);
  assert.equal(formatScore(gardenScore(game), game.config), '36.9');
  assert.equal(formatScore(0, game.config), '0.0');
  assert.equal(formatScore(240, game.config), '240.0');
  game.finalPlants[0].lengths = [12.36, 12.36, 12.36];
  assert.equal(gardenScore(game), 37.2);
  game.finalPlants[0].lengths = [0, 0, 0];
  assert.equal(gardenScore(game), 0);
  game.finalPlants[0].lengths = [0, 100.123, 115.987];
  assert.equal(gardenScore(game), 216.1);
});

test('tiny and decimal lengths use numeric final labels whose sum matches the score', () => {
  const game = makeGame({ seed: 5 });
  game.finalPlants = [{ ...condition, lengths: [.01, .06, .04] }];
  assert.deepEqual(game.finalPlants[0].lengths.map(value => formatFinalLength(value, game.config)), ['0.0', '0.1', '0.0']);
  assert.equal(gardenScore(game), .1);
  game.finalPlants[0].lengths = [.1, .2, .3];
  assert.equal(gardenScore(game), .6);
  assert.equal(formatScore(gardenScore(game), game.config), '0.6');
  const adjusted = { ...game, config: { ...game.config, scoreDecimals: 2 }, finalPlants: [{ ...condition, lengths: [12.344, 12.344, 12.344] }] };
  assert.equal(formatFinalLength(12.344, adjusted.config), '12.34');
  assert.equal(gardenScore(adjusted), 37.02);
});

test('decimal personal bests survive storage and reload; lower scores never replace them', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const config = GARDEN_CONFIG;
  const key = bestScoreKey(config);
  assert.equal(readBestScore(storage, config), null);
  assert.equal(saveBestScore(storage, config, 0), 0);
  assert.equal(values.get(key), '0.0');
  assert.equal(saveBestScore(storage, config, 239.2), 239.2);
  assert.equal(readBestScore(storage, config), 239.2);
  assert.equal(saveBestScore(storage, config, 239.1), 239.2);
  assert.equal(saveBestScore(storage, config, 239.3), 239.3);
  assert.equal(values.get(key), '239.3');
  for (const invalid of ['', ' ', 'NaN', 'Infinity', '-1', 'not a score']) {
    values.set(key, invalid);
    assert.equal(readBestScore(storage, config), null);
  }
  for (const invalid of [NaN, Infinity, -1]) assert.throws(() => saveBestScore(storage, config, invalid), RangeError);
  values.clear();
  const { scoreDecimals, ...oldConfig } = JSON.parse(key.split('miracle-garden-best-v5:')[1]);
  const oldKey = `miracle-garden-best-v3:${JSON.stringify(oldConfig)}`;
  const oldDecimalKey = key.replace('miracle-garden-best-v5:', 'miracle-garden-best-v4:').replace('"scoreDecimals":1', '"scoreDecimals":2');
  values.set(oldKey, '240');
  values.set(oldDecimalKey, '239.99');
  assert.equal(readBestScore(storage, config), null);
  saveBestScore(storage, config, 239.9);
  assert.equal(values.get(oldKey), '240');
  assert.equal(values.get(oldDecimalKey), '239.99');
  assert.equal(readBestScore(storage, config), 239.9);
});

test('personal-best categories separate scoring settings but ignore cosmetic changes and game seeds', () => {
  const config = structuredClone(GARDEN_CONFIG);
  const key = bestScoreKey(config);
  config.title = '新しい名前';
  config.flowers[0].color = '#fff';
  config.finalRevealMs = 2000;
  assert.equal(bestScoreKey(config), key);
  config.scoreDecimals = 2;
  assert.notEqual(bestScoreKey(config), key);
  config.scoreDecimals = GARDEN_CONFIG.scoreDecimals;
  config.plantsPerFlowerInFinal = 1;
  assert.notEqual(bestScoreKey(config), key);
  assert.equal(bestScoreKey(makeGame({ seed: 1 }).config), bestScoreKey(makeGame({ seed: 2 }).config));
});

test('invalid inputs do not spend experiments; tuning changes species, range and batch counts', () => {
  let game = makeGame({ seed: 1 });
  for (const bad of [{ water: -1 }, { water: 101 }, { water: 1.5 }, { flowerId: 'missing' }, { fertilizerId: 'missing' }]) {
    assert.equal(runExperiment(game, { ...condition, ...bad }), game);
  }
  const config = multiFlowerConfig(2);
  config.water = { min: 4, max: 8, initial: 6 };
  config.experimentLimit = 1;
  config.plantsPerExperiment = 2;
  config.plantsPerFlowerInFinal = 4;
  game = runExperiment(makeGame({ seed: 1, config }), { ...condition, water: 6 });
  assert.equal(game.experiments[0].lengths.length, 2);
  game = startPlanning(game);
  for (const flower of config.flowers) game = chooseRecipe(game, { ...condition, flowerId: flower.id, water: 6 });
  game = growFinalGarden(game);
  assert.equal(game.finalPlants.flatMap(row => row.lengths).length, 8);
  config.standardDeviation = 100;
  assert.equal(game.config.standardDeviation, 4);
});


test('the same flower is used in every game while optima and curve profiles still vary', () => {
  const appearances = new Set();
  const profiles = new Set();
  const optima = [];
  for (let seed = 1; seed <= 180; seed++) {
    const game = createGame({ seed });
    assert.equal(game.config.flowers.length, 1);
    assert.equal(game.config.standardDeviation, 4);
    assert.equal(game.config.experimentLimit, 12);
    assert.equal(game.config.plantsPerExperiment, 3);
    const flower = game.config.flowers[0];
    const hidden = game.hidden[flower.id];
    appearances.add(flower.id); profiles.add(hidden.profile); optima.push(hidden.optimum);
    assert.equal(hidden.peak, 80);
    assert.deepEqual(game, createGame({ seed }));
    assert.equal(bestScoreKey(game.config), bestScoreKey(GARDEN_CONFIG));
    assert.ok(bestScoreKey(game.config).startsWith('miracle-garden-best-v5:'));
    if (hidden.profile === 'waterSensitive') assert.ok(hidden.rightWidth < hidden.leftWidth * .71);
    else assert.equal(hidden.leftWidth, hidden.rightWidth);
  }
  assert.deepEqual([...appearances], [GARDEN_CONFIG.flowers[0].id]);
  assert.equal(profiles.size, 3);
  assert.ok(Math.min(...optima) < .28 && Math.max(...optima) > .72);
});

test('curve profiles are single-peaked, smooth at the summit, and do not all reduce to quadratics', () => {
  for (const profile of GARDEN_CONFIG.model.profiles) {
    const config = structuredClone(GARDEN_CONFIG);
    config.flowers = config.flowers.slice(0, 1);
    config.model.optimumRange = [.5, .5];
    config.model.profiles = [profile];
    const game = createGame({ seed: 21, config });
    const value = water => meanGrowth(game, { ...condition, water });
    const peak = value(50);
    const leftLoss = peak - value(40);
    const rightLoss = peak - value(60);
    assert.ok(value(0) < peak && value(100) < peak);
    assert.ok(Math.abs(value(49) - peak) < .3 && Math.abs(value(51) - peak) < .3);
    if (profile.id === 'broad') assert.ok(Math.abs((peak - value(30)) / leftLoss - 16) < 1e-8);
    if (profile.id === 'waterSensitive') assert.ok(rightLoss > leftLoss * 2);
    else assert.ok(Math.abs(leftLoss - rightLoss) < 1e-8);
  }
});

test('planning carries selected observations or untried input without recommending hidden optima', () => {
  let game = createGame({ seed: 7 });
  const flowerId = game.config.flowers[0].id;
  const first = { flowerId, water: 25, fertilizerId: 'none' };
  const last = { flowerId, water: 75, fertilizerId: 'leaf' };
  game = runExperiment(runExperiment(game, first), last);
  assert.deepEqual(planningDrafts(game)[flowerId], last);
  assert.deepEqual(planningDrafts(game, first)[flowerId], first);
  const untried = { ...first, water: 38 };
  assert.deepEqual(planningDrafts(game, untried)[flowerId], untried);
});
