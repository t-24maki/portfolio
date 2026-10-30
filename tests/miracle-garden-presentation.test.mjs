import test from 'node:test';
import assert from 'node:assert/strict';
import { GARDEN_CONFIG } from '../data/miracle-garden.mjs';
import { bestScoreKey, chooseRecipe, createGame, gardenScore, growFinalGarden, runExperiment, startPlanning } from '../lib/miracle-garden.mjs';
import { celebrationParticles, embedGardenImages, flowerAppearance, gardenGoals, gardenResult, gardenShareLinks, gardenShareText, plantGeometry, publicGardenUrl } from '../lib/miracle-garden-presentation.mjs';

const finished = () => {
  const game = createGame({ seed: 37 });
  return { ...game, phase: 'finished', finalPlants: game.config.flowers.map((f, i) => ({ flowerId: f.id, water: 50, fertilizerId: 'none', lengths: [0, 50 + i, 80.123 + i] })) };
};

test('stem and leaf variants stay attached to their specimen and preserve measured heights', () => {
  const input = { identity: '37:4:peach', length: 75, height: 108.75 };
  const plants = [0, 1, 2].map(index => plantGeometry({ ...input, index }));
  assert.equal(new Set(plants.map(plant => plant.variant)).size, 3);
  assert.equal(new Set(plants.map(plant => plant.stem)).size, 3);
  plants.forEach((plant, index) => {
    assert.deepEqual(plant, plantGeometry({ ...input, index }));
    assert.deepEqual(plant.tip, { x: 0, y: -input.height });
    assert.ok(plant.leaves.every(leaf => leaf.y < 0 && leaf.y > -input.height && Number.isFinite(leaf.x)));
    const thumbnail = plantGeometry({ ...input, height: 84, leafSize: 10, index });
    assert.equal(thumbnail.variant, plant.variant);
    assert.deepEqual(thumbnail.leaves.map(leaf => leaf.variant), plant.leaves.map(leaf => leaf.variant));
  });
  assert.equal(plantGeometry({ ...input, length: 0 }).leaves.length, 0);
  assert.ok(plantGeometry({ ...input, length: 20 }).leaves.length < plants[0].leaves.length);
});

test('drawing plants never advances the game random stream or changes its observations', () => {
  const game = createGame({ seed: 37 });
  const before = structuredClone(game);
  const condition = { flowerId: game.config.flowers[0].id, water: 50, fertilizerId: 'none' };
  for (let index = 0; index < 36; index++) plantGeometry({ identity: `${game.seed}:${index}`, length: index * 3, height: index * 4, index });
  assert.deepEqual(game, before);
  assert.deepEqual(runExperiment(game, condition), runExperiment(before, condition));
});

test('flower size grows smoothly with observed length and stays bounded; failures and seedlings have no bloom', () => {
  const flower = GARDEN_CONFIG.flowers[0];
  const bloom = GARDEN_CONFIG.bloom;
  const appearance = length => flowerAppearance(flower, length, bloom);
  for (const length of [undefined, NaN, -1, 0]) assert.equal(appearance(length).scale, 0);
  const lengths = [.01, 20, 40, 60, 80, 100];
  for (let i = 1; i < lengths.length; i++) assert.ok(appearance(lengths[i]).scale > appearance(lengths[i - 1]).scale);
  assert.equal(appearance(1000).scale, bloom.maxScale);
  assert.ok(Math.abs(appearance(50.001).scale - appearance(50).scale) < .001);
  assert.equal(appearance(80).petals, flower.petals);
  assert.equal(appearance(80).id, flower.id);
  assert.deepEqual(appearance(80), appearance(80));
});

test('flower colors follow visible length thresholds, with no random color or size jump at a threshold', () => {
  const config = structuredClone(GARDEN_CONFIG);
  const before = JSON.stringify(config);
  const appearance = length => flowerAppearance(config.flowers[0], length, config.bloom);
  assert.equal(appearance(69.94).colorName, 'ピンク');
  assert.equal(appearance(70).colorName, '濃いピンク');
  assert.equal(appearance(84.94).colorName, '濃いピンク');
  assert.equal(appearance(85).colorName, '黄金');
  assert.equal(appearance(69.94).image, config.bloom.colors[0].image);
  assert.equal(appearance(70).image, config.bloom.colors[1].image);
  assert.equal(appearance(85).image, config.bloom.colors[2].image);
  // 84.96 is labelled 85.0, so it uses the same color as an exact 85.
  assert.equal(appearance(84.96).color, appearance(85).color);
  assert.equal(appearance(84.96).image, appearance(85).image);
  assert.ok(Math.abs(appearance(85).scale - appearance(84.99).scale) < .001);
  config.bloom.colors[1].minLength = 60;
  assert.equal(appearance(60).colorName, '濃いピンク');
  config.bloom.colors[1].minLength = 70;
  assert.equal(JSON.stringify(config), before);
});

test('appearance settings do not affect hidden parameters, sampled lengths, scores or existing personal bests', () => {
  const changed = structuredClone(GARDEN_CONFIG);
  changed.bloom.maxScale = 1.5;
  changed.bloom.colors[1].minLength = 45;
  changed.bloom.colors[1].color = '#ffffff';
  changed.bloom.colors[1].image = '/a-different-flower.png';
  changed.art.background = '/a-different-garden.png';
  const play = config => {
    let game = createGame({ seed: 14, config });
    const condition = { flowerId: game.config.flowers[0].id, water: 50, fertilizerId: 'none' };
    for (let i = 0; i < config.experimentLimit; i++) game = runExperiment(game, condition);
    return growFinalGarden(chooseRecipe(startPlanning(game), condition));
  };
  const original = play(GARDEN_CONFIG);
  const styled = play(changed);
  assert.deepEqual(styled.hidden, original.hidden);
  assert.equal(styled.randomState, original.randomState);
  assert.deepEqual(styled.experiments, original.experiments);
  assert.deepEqual(styled.finalPlants, original.finalPlants);
  assert.equal(gardenScore(styled), gardenScore(original));
  assert.equal(bestScoreKey(changed), bestScoreKey(GARDEN_CONFIG));
});

test('PNG export embeds every unique external image and leaves existing data images intact', async () => {
  const image = href => ({ href, getAttribute() { return this.href; }, setAttribute(name, value) { assert.equal(name, 'href'); this.href = value; } });
  const images = [image('/background.png'), image('/flower.png'), image('/flower.png'), image('data:image/png;base64,existing')];
  const calls = [];
  await embedGardenImages({ querySelectorAll: selector => { assert.equal(selector, 'image'); return images; } }, async href => {
    calls.push(href);
    return `data:image/png;base64,${href}`;
  });
  assert.deepEqual(calls, ['/background.png', '/flower.png']);
  assert.deepEqual(images.map(image => image.href), ['data:image/png;base64,/background.png', 'data:image/png;base64,/flower.png', 'data:image/png;base64,/flower.png', 'data:image/png;base64,existing']);
});

test('a missing artwork rejects export instead of silently saving a garden with missing flowers', async () => {
  const image = { getAttribute: () => '/missing.png', setAttribute: () => assert.fail('do not embed an incomplete result') };
  await assert.rejects(embedGardenImages({ querySelectorAll: () => [image] }, async () => { throw new Error('missing asset'); }), /missing asset/);
});

test('goal milestones use the decimal score without rounding it to an integer, and scale with plant count', () => {
  const game = finished();
  assert.deepEqual(gardenGoals(game, 0).map(g => g.target), [180, 210, 240]);
  assert.ok(gardenGoals(game, 0).every(g => g.progress === 0 && !g.reached));
  assert.equal(gardenGoals(game, 179)[0].reached, false);
  assert.equal(gardenGoals(game, 179.99)[0].reached, false);
  assert.equal(gardenGoals(game, 180)[0].reached, true);
  assert.equal(gardenGoals(game, 210)[1].reached, true);
  assert.ok(gardenGoals(game, 1000).every(g => g.progress === 1 && g.reached));
  const config = structuredClone(game.config);
  config.plantsPerFlowerInFinal = 1;
  assert.equal(gardenGoals({ ...game, config }, 0)[0].target, 60);
});

test('postcard reveals only visible plants, includes zero, and uses observations rather than hidden parameters', () => {
  const game = finished();
  assert.deepEqual(gardenResult(game, 0).longest, null);
  assert.equal(gardenResult(game, 0).score, 0);
  assert.equal(gardenResult(game, 1).score, 0);
  assert.equal(gardenResult(game, 1).longest.length, 0);
  assert.equal(gardenResult(game, 2).score, 50);
  assert.equal(gardenResult(game).score, 130.1);
  assert.equal(gardenResult(game).longest.name, game.config.flowers[0].name);
  assert.deepEqual(gardenResult(game), gardenResult({ ...game, hidden: {} }));
});

test('shared results omit hidden answers, growing recipes and unusable loopback URLs', () => {
  const game = finished();
  const text = gardenShareText(game, 'http://127.0.0.1:3000/tools/miracle-garden/');
  assert.match(text, /データの庭｜130\.1点/);
  assert.match(text, /#データの庭/);
  assert.doesNotMatch(text, /奇跡の庭/);
  assert.ok(text.includes('0.0cm ＋ 50.0cm ＋ 80.1cm'));
  assert.doesNotMatch(text, /127|localhost|optimum|肥料|50ml/);
  assert.equal(publicGardenUrl('http://localhost:3000/tools/miracle-garden/'), '');
  assert.equal(publicGardenUrl('http://[::1]:3000/tools/miracle-garden/'), '');
  assert.equal(publicGardenUrl('javascript:alert(1)'), '');
  assert.equal(publicGardenUrl('invalid'), '');
  assert.equal(publicGardenUrl('https://example.com/tools/miracle-garden/?private=1#secret'), 'https://example.com/tools/miracle-garden/');
});

test('SNS composer URLs encode the visible score and public URL, without query secrets or local URLs', () => {
  const game = finished();
  for (const href of ['http://127.0.0.1:3000/tools/miracle-garden/', 'https://example.com/tools/miracle-garden/?token=secret#private']) {
    const links = gardenShareLinks(game, href);
    assert.deepEqual(links.map(link => new URL(link.href).hostname), ['x.com', 'line.me', 'bsky.app']);
    for (const link of links) {
      const url = new URL(link.href);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.searchParams.get('text'), gardenShareText(game, href));
      assert.equal([...url.searchParams.keys()].length, 1);
      assert.doesNotMatch(url.searchParams.get('text'), /secret|private|127\.0\.0\.1/);
    }
  }
});

test('celebration scales with score, remains bounded and never changes gameplay randomness', () => {
  const game = finished();
  const counts = [0, 30, 50, 70, 85, 120].map(length => {
    const result = { ...game, finalPlants: [{ ...game.finalPlants[0], lengths: [length, length, length] }] };
    const before = structuredClone(result);
    const particles = celebrationParticles(result);
    assert.deepEqual(celebrationParticles(result), particles);
    assert.deepEqual(result, before);
    assert.ok(particles.every(p => p.x >= 0 && p.x <= 1200 && p.duration > 0 && p.delay <= 700));
    return particles.length;
  });
  assert.equal(counts[0], 0);
  for (let i = 1; i < counts.length; i++) assert.ok(counts[i] >= counts[i - 1]);
  assert.equal(counts.at(-1), game.config.celebration.maxParticles);
  assert.ok(counts[3] > counts[1]);
});
