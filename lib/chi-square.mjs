// Survival probability for a chi-square distribution with one degree of freedom.
// This is Q(1/2, statistic/2), also equal to erfc(sqrt(statistic/2)).
// Series and continued fraction: https://dlmf.nist.gov/8.7.E1 and /8.9.E2.
export function chiSquareSurvival1(statistic) {
  if (!Number.isFinite(statistic) || statistic < 0) return NaN;
  if (statistic === 0) return 1;

  const x = statistic / 2;
  const a = 0.5;
  const epsilon = 1e-14;
  const maxIterations = 1000;
  const logScale = -x + a * Math.log(x) - 0.5 * Math.log(Math.PI);

  // Here the lower-tail series stays small, and Q is safely away from zero.
  if (x < a + 1) {
    let term = 1 / a;
    let sum = term;
    for (let n = 1; n <= maxIterations; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) <= Math.abs(sum) * epsilon) {
        return 1 - Math.exp(logScale) * sum;
      }
    }
    return NaN;
  }

  // Evaluate the upper tail directly with a continued fraction (modified Lentz).
  // Combining factors in log space avoids Infinity * 0 and loss in 1 - CDF.
  const tiny = 1e-300;
  let b = x + 1 - a;
  let c = 1 / tiny;
  let d = 1 / b;
  let fraction = d;
  for (let n = 1; n <= maxIterations; n++) {
    const numerator = -n * (n - a);
    b += 2;
    d = numerator * d + b;
    if (Math.abs(d) < tiny) d = d < 0 ? -tiny : tiny;
    c = b + numerator / c;
    if (Math.abs(c) < tiny) c = c < 0 ? -tiny : tiny;
    d = 1 / d;
    const delta = d * c;
    fraction *= delta;
    if (Math.abs(delta - 1) <= epsilon) {
      // Probabilities below floating-point range may round to zero legitimately.
      return Math.exp(logScale + Math.log(fraction));
    }
  }
  return NaN;
}
