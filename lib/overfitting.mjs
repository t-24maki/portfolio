export const MAX_DEGREE = 20;
export const SAMPLE_COUNTS = [25, 50, 100];
export const DEFAULT_COUNT = 25;
export const VALIDATION_COUNT = 100;
export const DEFAULT_NOISE = 5;
export const MAX_NOISE = 10;
export const DEFAULT_SEED = 157;

// A synthetic input/output relationship, with no physical units or domain.
export function trueTrend(x) {
  const t = x / 5 - 1;
  return 20 + 50 * (t ** 3 - t);
}

function randomSource(seed) {
  let state = seed >>> 0;
  const uniform = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return (state + 0.5) / 4294967296;
  };
  const normal = () => Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform());
  return { uniform, normal };
}

export function createData({ count = DEFAULT_COUNT, noise = DEFAULT_NOISE, seed = DEFAULT_SEED } = {}) {
  if (!SAMPLE_COUNTS.includes(count) || !Number.isFinite(noise) || noise < 0 || noise > MAX_NOISE) {
    throw new RangeError('Unsupported simulation settings');
  }
  const trainRandom = randomSource(seed);
  // Separate random streams keep validation observations fixed when only count changes.
  const validationRandom = randomSource(seed + 104729);
  const train = Array.from({ length: count }, (_, i) => {
    const angle = Math.PI * (i + 0.5) / count;
    const x = 5 + 5 * Math.cos(angle);
    return { x, y: trueTrend(x) + noise * trainRandom.normal(), angle };
  }).sort((a, b) => a.x - b.x);
  const validation = Array.from({ length: VALIDATION_COUNT }, () => {
    const x = 10 * validationRandom.uniform();
    return { x, y: trueTrend(x) + noise * validationRandom.normal() };
  }).sort((a, b) => a.x - b.x);
  return { train, validation };
}

// At Chebyshev nodes, these columns are orthogonal. Their projections give
// unregularized least squares without ill-conditioned powers or normal equations.
// Validation responses NEVER enter this calculation.
export function fitCoefficients(train) {
  return Array.from({ length: MAX_DEGREE + 1 }, (_, j) =>
    (j === 0 ? 1 : 2) / train.length * train.reduce((sum, point) => sum + point.y * Math.cos(j * point.angle), 0));
}

export function predict(coefficients, degree, x) {
  const t = x / 5 - 1;
  let previous = 1;
  let current = t;
  let value = coefficients[0];
  for (let j = 1; j <= degree; j += 1) {
    value += coefficients[j] * current;
    const next = 2 * t * current - previous;
    previous = current;
    current = next;
  }
  return value;
}

export function rmse(points, coefficients, degree) {
  return Math.sqrt(points.reduce((sum, point) => sum + (point.y - predict(coefficients, degree, point.x)) ** 2, 0) / points.length);
}

export function createExperiment(settings) {
  const data = createData(settings);
  const coefficients = fitCoefficients(data.train);
  const grid = Array.from({ length: 401 }, (_, i) => i / 40);
  const models = Array.from({ length: MAX_DEGREE }, (_, index) => {
    const degree = index + 1;
    return {
      degree,
      trainError: rmse(data.train, coefficients, degree),
      validationError: rmse(data.validation, coefficients, degree),
      curve: grid.map(x => ({ x, y: predict(coefficients, degree, x) })),
    };
  });
  const best = models.reduce((a, b) => a.validationError < b.validationError ? a : b);
  const allY = [...data.train, ...data.validation, ...models.flatMap(model => model.curve)].map(point => point.y);
  const min = Math.min(...allY);
  const max = Math.max(...allY);
  // Keep the scatter plot's domain fixed across degrees and truth visibility.
  const step = max - min > 60 ? 10 : 5;
  const domain = [Math.floor((min - 2) / step) * step, Math.ceil((max + 2) / step) * step];
  return { ...data, models, best, domain, truth: grid.map(x => ({ x, y: trueTrend(x) })) };
}
