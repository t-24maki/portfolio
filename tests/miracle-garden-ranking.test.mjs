import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gardenScore } from '../lib/miracle-garden.mjs';
import { normalizePlayerName, scoreForRanking, rankingFromRows, GARDEN_RANKING_SCHEMA } from '../lib/miracle-garden-ranking.mjs';
import { finishedGame } from './helpers/miracle-garden-ranking-fixtures.mjs';
import { submitRankedGarden, loadGardenRanking, removeGardenScore, changeGardenPlayerName } from '../lib/miracle-garden-online.mjs';

test('submitted integer tenths exactly equal the three visible flowers, including zero and over 100cm', () => {
  for (let seed = 0; seed < 100; seed++) {
    const game = finishedGame(seed);
    const score = scoreForRanking(game, '庭のひと');
    assert.equal(score.scoreUnits, Math.round(gardenScore(game) * 10));
    assert.equal(score.lengthUnits.reduce((a, b) => a + b, 0), score.scoreUnits);
  }
  const game = finishedGame();
  game.finalPlants[0].lengths = [0, 100.04, 115.06];
  assert.deepEqual(scoreForRanking(game, 'テスト').lengthUnits, [0, 1000, 1151]);
});
test('unfinished, non-finite or stale-rule games cannot be submitted through the client', () => {
  for (const change of [
    game => { game.phase = 'planning'; }, game => { game.experiments.pop(); },
    game => { game.finalPlants[0].lengths[0] = NaN; }, game => { game.finalPlants[0].lengths[0] = -1; },
    game => { game.config.standardDeviation = 5; },
  ]) {
    const game = structuredClone(finishedGame()); change(game);
    assert.throws(() => scoreForRanking(game, '庭のひと'), { code: 'failed-precondition' });
  }
});
test('names support Japanese and emoji while rejecting blank, long and invisible inputs', () => {
  assert.equal(normalizePlayerName('  庭のひと  '), '庭のひと');
  assert.equal(normalizePlayerName('ＡＢＣ'), 'ABC');
  assert.equal(normalizePlayerName('🌸'.repeat(12)), '🌸'.repeat(12));
  for (const value of ['', ' '.repeat(3), 'a'.repeat(13), 'a\n\nb', 'a\u202Eb', '<b>', null]) assert.throws(() => normalizePlayerName(value));
});
test('rankings share ranks on ties and use global counts for positions beyond the top 50', () => {
  const rows = [{id:'a',name:'A',scoreUnits:2400},{id:'b',name:'B',scoreUnits:2400},{id:'c',name:'C',scoreUnits:2200}];
  const result = rankingFromRows(rows, rows[1], 'b', { total: 3, higherCount: 0 });
  assert.deepEqual(result.entries.map(row => row.rank), [1, 1, 3]);
  assert.equal(result.self.rank, 1);
  assert.equal(result.entries.filter(row => row.isYou).length, 1);
  const top = Array.from({length:50}, (_,i) => ({id:String(i),name:'庭',scoreUnits:3000-i}));
  const outside = rankingFromRows(top,{scoreUnits:100},'outside', { total: 1234, higherCount: 122 });
  assert.equal(outside.self.rank, 123);
  assert.equal(outside.total, 1234);
  assert.equal(rankingFromRows(top,{scoreUnits:2951},'tied-outside', { total: 100, higherCount: 49 }).self.rank, 50);
  assert.deepEqual(rankingFromRows([], null, null, { total: 0, higherCount: null }), { entries: [], self: null, total: 0 });
});
test('deployed rule schema and client schema identify the same game category', async () => {
  const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
  assert.ok(rules.includes(GARDEN_RANKING_SCHEMA.boardId));
  assert.ok(rules.includes(`d.lengthUnits.size() == ${GARDEN_RANKING_SCHEMA.plantCount}`));
});
test('the UI refuses to start submissions, renames or deletions when the browser reports offline', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', { value: { onLine: false }, configurable: true });
  try {
    await assert.rejects(submitRankedGarden(finishedGame(), '庭'), { code: 'unavailable' });
    await assert.rejects(loadGardenRanking(), { code: 'unavailable' });
    await assert.rejects(removeGardenScore(), { code: 'unavailable' });
    await assert.rejects(changeGardenPlayerName('庭'), { code: 'unavailable' });
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor);
    else delete globalThis.navigator;
  }
});
