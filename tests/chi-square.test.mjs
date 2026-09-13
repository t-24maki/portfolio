import assert from 'node:assert/strict';
import test from 'node:test';
import { chiSquareSurvival1 } from '../lib/chi-square.mjs';

test('matches independently computed reference probabilities, including small tails', () => {
  // Python math.erfc(math.sqrt(statistic / 2)), using the platform math library.
  const references = [
    [1e-10, 0.9999920211543921],
    [0.1, 0.7518296340458492],
    [1, 0.317310507862914],
    [2.705543454095404, 0.10000000000000064],
    [2.99999999, 0.08326451717748484],
    [3, 0.08326451666355043],
    [3.00000001, 0.08326451614961594],
    [3.841458820694124, 0.05000000000000007],
    [6.6348966010212145, 0.010000000000000002],
    [25, 5.733031437583873e-7],
    [100, 1.5239706048320992e-23],
    [1000, 1.7958327848006394e-219],
    [1400, 2.101014516264275e-306],
  ];
  for (const [statistic, expected] of references) {
    const actual = chiSquareSurvival1(statistic);
    assert.ok(Math.abs(actual / expected - 1) < 1e-12, `${statistic}: ${actual} vs ${expected}`);
  }
});

test('preserves decisions on both sides of the selectable significance thresholds', () => {
  for (const [criticalValue, alpha] of [
    [2.705543454095404, 0.1],
    [3.841458820694124, 0.05],
    [6.6348966010212145, 0.01],
  ]) {
    assert.ok(chiSquareSurvival1(criticalValue - 1e-8) > alpha);
    assert.ok(chiSquareSurvival1(criticalValue + 1e-8) < alpha);
  }
});

test('the reported 100,000-trial regression returns a significant result instead of NaN', () => {
  const pValue = chiSquareSurvival1(3921.568627450981);
  assert.ok(Number.isFinite(pValue));
  assert.ok(pValue >= 0 && pValue < 0.0001);
});

test('probabilities decrease from one to zero without leaving the valid range', () => {
  let previous = 1;
  for (let statistic = 0; statistic <= 4000; statistic += 0.25) {
    const probability = chiSquareSurvival1(statistic);
    assert.ok(Number.isFinite(probability));
    assert.ok(probability >= 0 && probability <= previous);
    previous = probability;
  }
  assert.equal(chiSquareSurvival1(0), 1);
  assert.equal(chiSquareSurvival1(Number.MAX_VALUE), 0);
});

test('invalid statistics cannot produce a probability or a significance decision', () => {
  for (const statistic of [-1, NaN, Infinity, -Infinity]) {
    assert.ok(Number.isNaN(chiSquareSurvival1(statistic)));
  }
});
