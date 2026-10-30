import { finalRevealOrder, formatFinalLength, formatScore, gardenScore, revealedScore, targetScore } from './miracle-garden.mjs';

// Cosmetic variation is derived from a stable specimen identity, independently
// of the game's random stream. Every stem ends at the same measured height.
export function plantGeometry({ length, height, identity = '', index = 0, leafSize = 40 }) {
  let hash = 2166136261;
  for (const char of String(identity)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  const variant = (hash + index) % 3;
  const h = Number.isFinite(height) ? Math.max(0, height) : 0;
  const observed = Number.isFinite(length) ? Math.max(0, length) : 0;
  const bends = [[.08, -.12], [-.65, -.95], [.85, .45]][variant];
  const bend = Math.min(25, h * .22);
  const c1 = bends[0] * bend, c2 = bends[1] * bend;
  const xAt = t => 3 * (1 - t) ** 2 * t * c1 + 3 * (1 - t) * t ** 2 * c2;
  const count = observed > 0 && h > 0 ? Math.min(4, 2 + Math.floor(observed / 35)) : 0;
  const leaves = Array.from({ length: count }, (_, i) => {
    const at = .24 + i * .43 / Math.max(1, count - 1) + (variant - 1) * .025;
    return {
      x: xAt(at), y: -h * at,
      side: (i + index) % 2 ? -1 : 1,
      angle: [0, -14, 12][(variant + i) % 3],
      scale: Math.min(leafSize, h * .48) / 44 * (i % 2 ? .86 : 1),
      variant: (variant + i) % 3,
    };
  });
  return { variant, height: h, tip: { x: 0, y: -h }, stem: `M0 0C${c1} ${-h / 3} ${c2} ${-h * 2 / 3} 0 ${-h}`, leaves };
}

// One appearance rule for the growing stage, history and final/share image.
// No hidden parameters, axes or random draws can change an observed flower.
export function flowerAppearance(flower, length, bloom) {
  if (!Number.isFinite(length) || length <= 0) return { ...flower, scale: 0, colorName: null };
  if (!bloom) return { ...flower, scale: 1, colorName: null };
  const progress = Math.max(0, Math.min(1, length / bloom.fullSizeLength));
  // Match the displayed tenth of a cm: the visual and its milestone agree.
  const displayedLength = Number(length.toFixed(1));
  const tier = bloom.colors.reduce((best, candidate) =>
    displayedLength >= candidate.minLength && (!best || candidate.minLength >= best.minLength) ? candidate : best, null);
  return {
    ...flower,
    color: tier?.color ?? flower.color,
    center: tier?.center ?? flower.center,
    image: tier?.image ?? flower.image,
    colorName: tier?.name ?? null,
    scale: bloom.minScale + (bloom.maxScale - bloom.minScale) * progress,
  };
}

// Presentation derives only from the visible results, never from hidden means.
export function gardenGoals(game, score = gardenScore(game)) {
  return game.config.goals.map(goal => {
    const target = Math.round(targetScore(game) * goal.multiplier);
    return { ...goal, target, reached: score >= target, progress: Math.max(0, Math.min(1, score / target)) };
  });
}

export function gardenResult(game, revealed = finalRevealOrder(game).length) {
  const plants = finalRevealOrder(game).slice(0, revealed);
  const score = revealedScore(game, revealed);
  const longest = plants.reduce((best, plant) => !best || plant.length > best.length ? plant : best, null);
  return {
    score,
    longest: longest ? { ...longest, name: game.config.flowers.find(f => f.id === longest.flowerId).name } : null,
    goals: gardenGoals(game, score),
  };
}

export function publicGardenUrl(href) {
  try {
    const url = new URL(href);
    if (!['https:', 'http:'].includes(url.protocol) || /^(localhost|127\.|\[::1\])/.test(url.hostname)) return '';
    return `${url.origin}${url.pathname}`;
  } catch { return ''; }
}

export function gardenShareText(game, href = '') {
  const result = gardenResult(game);
  return [
    `${game.config.title}｜${formatScore(result.score, game.config)}点`,
    finalRevealOrder(game).map(plant => `${formatFinalLength(plant.length, game.config)}cm`).join(' ＋ '),
    `#${game.config.title.replace(/\s/g, '')}`, publicGardenUrl(href),
  ].filter(Boolean).join('\n');
}

export function gardenShareLinks(game, href = '') {
  const text = encodeURIComponent(gardenShareText(game, href));
  return [
    { id: 'x', label: 'Xでシェア', href: `https://x.com/intent/tweet?text=${text}` },
    { id: 'line', label: 'LINEで送る', href: `https://line.me/R/share?text=${text}` },
    { id: 'bluesky', label: 'Blueskyでシェア', href: `https://bsky.app/intent/compose?text=${text}` },
  ];
}

// Decorative randomness never consumes the simulation's random stream.
export function celebrationParticles(game) {
  const settings = game.config.celebration;
  const score = gardenScore(game);
  if (!settings || score <= 0) return [];
  const fullScore = finalRevealOrder(game).length * settings.fullScorePerPlant;
  const strength = Math.min(1, Math.max(0, score / Math.max(1, fullScore)));
  const count = Math.round(settings.minParticles + (settings.maxParticles - settings.minParticles) * strength ** 2);
  const fraction = n => ((Math.imul((game.seed ^ n) >>> 0, 2654435761) >>> 0) % 10000) / 10000;
  return Array.from({ length: count }, (_, i) => ({
    x: fraction(i * 5 + 1) * 1200,
    drift: (fraction(i * 5 + 2) - .5) * 260,
    delay: fraction(i * 5 + 3) * 700,
    duration: settings.durationMs * (.85 + fraction(i * 5 + 4) * .3),
    rotation: fraction(i * 5 + 5) * 720 - 360,
    color: ['#dca536', '#df8f9e', '#8cac76', '#fff2ac', '#83b4c1'][i % 5],
    star: strength > .8 && i % 7 === 0,
  }));
}

// Image resources must be embedded before an SVG is decoded through an <img>.
// A serialized SVG cannot load the external PNGs used in the live garden.
export async function embedGardenImages(svg, loadImage) {
  const images = [...svg.querySelectorAll('image')];
  const sources = [...new Set(images.map(image => image.getAttribute('href')).filter(href => href && !href.startsWith('data:')))];
  const embedded = new Map(await Promise.all(sources.map(async href => [href, await loadImage(href)])));
  for (const image of images) {
    const href = image.getAttribute('href');
    if (embedded.has(href)) image.setAttribute('href', embedded.get(href));
  }
}

async function loadImageData(href) {
  const response = await fetch(href);
  if (!response.ok) throw new Error('庭の画像素材を読み込めませんでした');
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('庭の画像素材を読み込めませんでした'));
    reader.readAsDataURL(blob);
  });
}

export async function gardenPng(svg) {
  await document.fonts?.ready;
  const copy = svg.cloneNode(true);
  copy.setAttribute('width', '1600');
  copy.setAttribute('height', '1000');
  copy.removeAttribute('class');
  await embedGardenImages(copy, loadImageData);
  const source = new Blob([new XMLSerializer().serializeToString(copy)], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(source);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('画像を作れませんでした')); image.src = url; });
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1000;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('画像を作れませんでした');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return await new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('画像を作れませんでした')), 'image/png'));
  } finally { URL.revokeObjectURL(url); }
}
