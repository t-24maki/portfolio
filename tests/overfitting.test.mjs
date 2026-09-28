import assert from 'node:assert/strict';
import test from 'node:test';
import { createData, createExperiment, fitCoefficients, MAX_DEGREE, MAX_NOISE, predict, rmse, SAMPLE_COUNTS, trueTrend } from '../lib/overfitting.mjs';

test('recovers the generating cubic without noise, including the domain boundaries', () => {
  for (const count of SAMPLE_COUNTS) {
    const { train } = createData({ count, noise: 0 });
    const coefficients = fitCoefficients(train);
    for (const degree of [3, 12, MAX_DEGREE]) {
      for (const x of [0, 0.125, 2, 5, 8.37, 10]) {
        assert.ok(Math.abs(predict(coefficients, degree, x) - trueTrend(x)) < 1e-10);
      }
    }
  }
});

test('degree one agrees with an independent closed-form ordinary least squares fit', () => {
  const { train, validation } = createData();
  const meanX = train.reduce((s, p) => s + p.x, 0) / train.length;
  const meanY = train.reduce((s, p) => s + p.y, 0) / train.length;
  const slope = train.reduce((s, p) => s + (p.x - meanX) * (p.y - meanY), 0) / train.reduce((s, p) => s + (p.x - meanX) ** 2, 0);
  const intercept = meanY - slope * meanX;
  const coefficients = fitCoefficients(train);
  for (const x of [0, 1, 3.4, 6.9, 10]) assert.ok(Math.abs(predict(coefficients, 1, x) - (intercept + slope * x)) < 1e-10);
  const referenceError = Math.sqrt(validation.reduce((s, p) => s + (p.y - intercept - slope * p.x) ** 2, 0) / validation.length);
  assert.ok(Math.abs(rmse(validation, coefficients, 1) - referenceError) < 1e-10);
});

test('the default demonstration distinguishes underfitting, a useful fit, and overfitting', () => {
  const { models } = createExperiment();
  const [simple, medium, complex] = [models[0], models[2], models[MAX_DEGREE - 1]];
  assert.ok(simple.trainError > medium.trainError);
  assert.ok(simple.validationError > medium.validationError);
  assert.ok(complex.trainError < medium.trainError);
  assert.ok(complex.validationError > medium.validationError);
});

test('training sample sizes vary independently of the fixed 100 validation observations', () => {
  for (const count of SAMPLE_COUNTS) {
    const { train, validation } = createData({ count });
    assert.equal(train.length, count);
    assert.equal(validation.length, 100);
    assert.equal(new Set(train.map(point => point.x)).size, count);
  }
});

test('the larger noise range scales the same residuals without resampling the data', () => {
  const baseline = createData({ noise: 2.5 });
  const noisy = createData({ noise: MAX_NOISE });
  for (const kind of ['train', 'validation']) {
    for (let i = 0; i < baseline[kind].length; i += 1) {
      const point = baseline[kind][i];
      assert.equal(noisy[kind][i].x, point.x);
      const expected = trueTrend(point.x) + (point.y - trueTrend(point.x)) * MAX_NOISE / 2.5;
      assert.ok(Math.abs(noisy[kind][i].y - expected) < 1e-10);
    }
  }
});

test('changing training count preserves the independent validation sample and seed replay is deterministic', () => {
  assert.deepEqual(createData(), createData());
  assert.deepEqual(createData({ count: SAMPLE_COUNTS[0] }).validation, createData({ count: SAMPLE_COUNTS.at(-1) }).validation);
  assert.notDeepEqual(createData({ seed: 157 }).train, createData({ seed: 158 }).train);
  const data = createData();
  const coefficients = fitCoefficients(data.train);
  data.validation.forEach(point => { point.y += 1000; });
  assert.deepEqual(fitCoefficients(data.train), coefficients);
});

test('all supported settings remain finite and training error never increases with degree', () => {
  for (const count of SAMPLE_COUNTS) for (const noise of [0, 0.5, 2.5, 5, 7.5, MAX_NOISE]) for (const seed of [1, 157, 158, 999]) {
    const experiment = createExperiment({ count, noise, seed });
    let previousError = Infinity;
    for (const model of experiment.models) {
      assert.ok(Number.isFinite(model.trainError) && Number.isFinite(model.validationError));
      assert.ok(model.trainError <= previousError + 1e-10);
      previousError = model.trainError;
      for (const point of model.curve) {
        assert.ok(Number.isFinite(point.y));
        assert.ok(point.y >= experiment.domain[0] && point.y <= experiment.domain[1]);
      }
    }
  }
});
