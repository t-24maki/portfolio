// Design study only; the live game's GardenEmblem is deliberately unchanged.
// Run: node design/miracle-garden/logo-study.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const output = fileURLToPath(new URL('../../public/images/miracle-garden/logo-study/', import.meta.url));
const page = fileURLToPath(new URL('../../public/miracle-garden-logo-study.html', import.meta.url));
const green = '#294D3C';
const gold = '#B68A3C';
const cream = '#F7F7EF';
const serif = "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
const sans = "'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif";

// Open spaces are transparent, including the single-colour flower centres.
const petals = (fill, radius = 1) => `<g transform="scale(${radius})">${Array.from({ length: 8 }, (_, i) => `<path transform="rotate(${i * 45})" d="M-1.1-4.8C-3.3-6.6-4.9-12.8-2.4-15.7L0-14.4L2.4-15.7C4.9-12.8 3.3-6.6 1.1-4.8Z" fill="${fill}"/>`).join('')}</g>`;
const flower = (x, y, fill, scale = 1) => `<g transform="translate(${x} ${y})">${petals(fill, scale)}<circle r="${2.7 * scale}" fill="${fill}"/></g>`;

const designs = [
  {
    id: 'a', title: '一輪', detail: '花そのものを、すっきりと。', colors: [green],
    mark: `${flower(32, 21, green)}<path d="M32 38C32 44 35 49 31 58" fill="none" stroke="${green}" stroke-width="3.2" stroke-linecap="round"/><path d="M32 48C21 48 17 43 17 37C25 37 31 40 32 48ZM33 53C43 53 48 47 48 42C40 42 34 45 33 53Z" fill="${green}"/>`,
  },
  {
    id: 'b', title: '芽とひかり', detail: '育つ喜びと、小さな奇跡。', colors: [green, gold],
    mark: `<path d="M32 58C35 45 30 32 24 23" fill="none" stroke="${green}" stroke-width="3.5" stroke-linecap="round"/><path d="M31 37C15 38 8 26 10 13C24 14 33 23 31 37ZM33 48C33 35 43 28 55 30C55 43 46 51 33 48Z" fill="${green}"/><path d="M46 5C46.5 13 49 16 56 17C49 18 46.5 21 46 29C45 21 42 18 35 17C42 16 45 13 46 5Z" fill="${gold}"/>`,
  },
  {
    id: 'c', title: '庭の入口', detail: '庭をひとつのシンボルに。', colors: [green],
    mark: `<path d="M10 57V29A22 22 0 0 1 54 29V57M9 57H55" fill="none" stroke="${green}" stroke-width="3.2" stroke-linecap="round"/>${flower(32, 29, green, .68)}<path d="M32 41V55" stroke="${green}" stroke-width="2.8" stroke-linecap="round"/><path d="M32 49C24 50 20 45 20 41C26 40 31 43 32 49ZM32 53C40 53 44 49 44 45C38 44 33 47 32 53Z" fill="${green}"/>`,
  },
  {
    id: 'd', title: '花のしるし', detail: '小さくても印象に残る、花の紋。', colors: [green, gold],
    mark: `<defs><mask id="seal-cutout"><rect width="64" height="64" fill="white"/><g transform="translate(32 32)">${petals('black', 1.37)}</g><circle cx="32" cy="32" r="5.4" fill="black"/></mask></defs><circle cx="32" cy="32" r="29" fill="${green}" mask="url(#seal-cutout)"/><circle cx="32" cy="32" r="4.5" fill="${gold}"/>`,
  },
  {
    id: 'e', title: '伸びる庭', detail: '少しずつ伸びて、やがて咲く。', colors: [green, gold],
    mark: `<path d="M12 56V43M31 56V31M50 56V24" fill="none" stroke="${green}" stroke-width="3.2" stroke-linecap="round"/><path d="M12 46C5 46 3 41 4 37C10 37 13 41 12 46ZM31 36C22 36 18 30 19 24C26 24 32 28 31 36ZM31 46C39 46 42 42 42 37C36 37 31 40 31 46ZM50 43C42 43 39 38 40 33C46 33 51 38 50 43Z" fill="${green}"/>${flower(50, 15, gold, .66)}`,
  },
  {
    id: 'f', title: 'ひとしずく', detail: '水を与え、花を咲かせる。', colors: [green, gold],
    mark: `<path d="M32 5C27 14 11 27 11 39A21 21 0 0 0 53 39C53 27 37 14 32 5Z" fill="none" stroke="${green}" stroke-width="3.4" stroke-linejoin="round"/>${flower(32, 38, gold, .87)}`,
  },
];

function svg(mark, title, size = 64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="${title}"><title>${title}</title>${mark}</svg>`;
}
function icon(d, x, y, size) {
  // Each seal mask receives a unique ID when multiple icons share one SVG.
  const mark = d.mark.replaceAll('seal-cutout', `seal-${x}-${y}-${size}`);
  return `<g transform="translate(${x} ${y}) scale(${size / 64})">${mark}</g>`;
}
function wordmark(x, y, size, reading = true) {
  return `${reading ? `<text x="${x + size * 2.3}" y="${y - size * 1.13}" text-anchor="middle" font-size="${size * .39}" letter-spacing="${size * .14}" fill="${green}" font-family="${sans}">きせきのにわ</text>` : ''}<text x="${x}" y="${y}" font-family="${serif}" font-size="${size}" font-weight="600" letter-spacing="${size * .17}" fill="${green}">奇跡の庭</text>`;
}

await mkdir(output, { recursive: true });
for (const d of designs) {
  await writeFile(`${output}${d.id}-${d.title}.svg`, svg(d.mark, `奇跡の庭 — ${d.title}`));
  const lockup = `<svg xmlns="http://www.w3.org/2000/svg" width="252" height="72" viewBox="0 0 252 72" role="img" aria-label="奇跡の庭 — ${d.title}">${icon(d, 4, 9, 54)}${wordmark(71, 47, 23)}</svg>`;
  await writeFile(`${output}${d.id}-lockup.svg`, lockup);
}

const tiles = designs.map((d, index) => {
  const x = 40 + (index % 2) * 578;
  const y = 149 + Math.floor(index / 2) * 332;
  return `<g>
    <rect x="${x}" y="${y}" width="558" height="312" rx="16" fill="#FFFFFF" stroke="#DCE2D8"/>
    <text x="${x + 26}" y="${y + 38}" font-family="${sans}" font-size="17" font-weight="700" fill="${green}">${d.id.toUpperCase()}　${d.title}</text>
    <text x="${x + 531}" y="${y + 37}" text-anchor="end" font-family="${sans}" font-size="12" fill="#687468">${d.colors.length}色</text>
    ${icon(d, x + 57, y + 72, 100)}${wordmark(x + 181, y + 138, 36)}
    <text x="${x + 279}" y="${y + 200}" text-anchor="middle" font-family="${sans}" font-size="15" fill="#687468">${d.detail}</text>
    <path d="M${x + 26} ${y + 220}H${x + 532}" stroke="#E8EBE3"/>
    ${icon(d, x + 28, y + 239, 40)}${wordmark(x + 81, y + 269, 20)}
    <text x="${x + 531}" y="${y + 264}" text-anchor="end" font-family="${sans}" font-size="12" fill="#687468">小さな表示 · 40px</text>
  </g>`;
}).join('');
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="1216" height="1177" viewBox="0 0 1216 1177">
  <rect width="1216" height="1177" fill="${cream}"/>
  <text x="40" y="58" font-family="${serif}" font-size="29" font-weight="600" letter-spacing="2" fill="${green}">奇跡の庭 — ロゴの比較</text>
  <text x="40" y="101" font-family="${sans}" font-size="16" fill="#687468">深緑1色 ／ 深緑＋落ち着いた金色。書体を揃えて、シンボルの違いを比較。</text>
  ${tiles}
  <circle cx="48" cy="1150" r="6" fill="${green}"/><text x="63" y="1155" font-family="${sans}" font-size="12" fill="#687468">深緑 ${green}</text>
  <circle cx="208" cy="1150" r="6" fill="${gold}"/><text x="223" y="1155" font-family="${sans}" font-size="12" fill="#687468">金色 ${gold}</text>
</svg>`;
await writeFile(`${output}comparison.svg`, sheet);
await sharp(Buffer.from(sheet)).png().toFile(`${output}comparison.png`);

const assetRoot = '/images/miracle-garden/logo-study/';
const cards = designs.map(d => `<article class="card" data-design="${d.id}">
  <div class="card-heading"><h2>${d.id.toUpperCase()} <span>${d.title}</span></h2><span class="color-count">${d.colors.length}色</span></div>
  <div class="large-lockup"><img src="${assetRoot}${d.id}-${d.title}.svg" alt="${d.title}のシンボル" width="100" height="100"><span class="brand-name"><ruby>奇跡の庭<rt>きせきのにわ</rt></ruby></span></div>
  <p>${d.detail}</p>
  <div class="card-footer"><button class="select" type="button" data-select="${d.id}" aria-pressed="${d.id === 'a'}">${d.id.toUpperCase()}をヘッダーで見る</button><a href="${assetRoot}${d.id}-${d.title}.svg" download aria-label="${d.id.toUpperCase()}案のSVGを保存">SVG ↓</a></div>
</article>`).join('');

const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>奇跡の庭 — ロゴの比較</title>
<style>
  *{box-sizing:border-box} body{margin:0;background:${cream};color:${green};font-family:${sans};-webkit-font-smoothing:antialiased} button,a{-webkit-tap-highlight-color:transparent} button{font:inherit} a{color:inherit;text-underline-offset:4px} main{max-width:1192px;margin:auto;padding:42px 28px 70px} h1{font-family:${serif};font-size:28px;font-weight:600;letter-spacing:.07em;margin:0 0 12px} .intro{font-size:14px;color:#687468;line-height:1.8;margin:0 0 28px}.preview-wrap{position:sticky;top:0;z-index:2;padding:12px 0 22px;background:${cream}}.preview-label{font-size:12px;margin:0 0 8px;color:#687468}.header-preview{height:84px;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:0 26px;border:1px solid #dce2d8;border-radius:12px;background:#FCFCF6;box-shadow:0 5px 12px #294d3c06}.brand{display:flex;align-items:center;gap:13px;flex-shrink:0}.brand img{width:54px;height:54px}.brand-name{font-family:${serif};font-size:23px;font-weight:600;letter-spacing:.17em;line-height:1.3}.brand-name rt{font-size:.4em;letter-spacing:.3em;padding-bottom:3px;color:${green}}.selected-label{font-size:13px;color:#687468}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #dce2d8;border-radius:16px;padding:24px;min-width:0}.card[data-active]{border-color:${green};box-shadow:0 0 0 1px ${green}}.card-heading{display:flex;align-items:center;justify-content:space-between;gap:10px}.card h2{font-size:17px;margin:0;font-weight:700}.card h2 span{font-size:16px;margin-left:10px}.color-count{font-size:12px;color:#687468}.large-lockup{height:164px;display:flex;align-items:center;justify-content:center;gap:24px}.large-lockup .brand-name{font-size:36px}.large-lockup img{flex-shrink:0}.card p{text-align:center;font-size:14px;color:#687468;line-height:1.7;margin:0 0 22px}.card-footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e8ebe3;padding-top:18px;gap:16px}.select{border:1px solid #cbd5c9;background:#fff;color:${green};border-radius:8px;padding:10px 14px;cursor:pointer;font-size:13px;min-height:44px}.select:hover,.select[aria-pressed=true]{background:${green};color:#fff;border-color:${green}}.select:focus-visible,a:focus-visible{outline:3px solid ${gold};outline-offset:3px}.card-footer a{font-size:12px;white-space:nowrap}.notes{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:28px;font-size:12px;color:#687468}.swatch{display:inline-block;width:10px;height:10px;border-radius:50%;margin:0 6px 0 12px}.swatch:first-child{margin-left:0}
  @media(max-width:950px){.large-lockup{gap:18px}.large-lockup img{width:80px;height:80px}.large-lockup .brand-name{font-size:29px}}
  @media(max-width:700px){main{padding:26px 16px 44px}h1{font-size:23px}.intro{font-size:13px}.grid{grid-template-columns:1fr}.header-preview{height:72px;padding:0 16px}.brand{gap:10px}.brand img{width:40px;height:40px}.brand-name{font-size:20px}.selected-label{font-size:11px}.card{padding:22px}.large-lockup img{width:88px;height:88px}.large-lockup .brand-name{font-size:31px}.notes{align-items:flex-start;flex-direction:column;gap:12px}}
  @media(max-width:360px){.brand-name{font-size:18px}.selected-label{font-size:10px}.large-lockup{gap:12px}.large-lockup img{width:76px;height:76px}.large-lockup .brand-name{font-size:28px}.card{padding:18px}}
</style></head><body><main>
<h1>奇跡の庭 — ロゴの比較</h1><p class="intro">深緑1色、または深緑＋落ち着いた金色の6案。書体を揃えて、シンボルの違いを比較。</p>
<div class="preview-wrap"><p class="preview-label">ヘッダーでの見え方</p><div class="header-preview"><div class="brand"><img id="preview-icon" src="${assetRoot}a-一輪.svg" alt="A案：一輪" width="54" height="54"><span class="brand-name"><ruby>奇跡の庭<rt>きせきのにわ</rt></ruby></span></div><span id="selected-label" class="selected-label" aria-live="polite">A — 一輪</span></div></div>
<section class="grid" aria-label="6つのロゴ案">${cards}</section>
<div class="notes"><span><i class="swatch" style="background:${green}"></i>深緑 ${green}<i class="swatch" style="background:${gold}"></i>金色 ${gold}</span><a href="${assetRoot}comparison.png" download>比較画像を保存 ↓</a></div>
</main><script>
const designs = ${JSON.stringify(designs.map(({ id, title }) => ({ id, title })))};
function selectDesign(id) {
  const design = designs.find(item => item.id === id);
  if (!design) return;
  const icon = document.querySelector('#preview-icon');
  icon.src = '${assetRoot}' + design.id + '-' + design.title + '.svg';
  icon.alt = design.id.toUpperCase() + '案：' + design.title;
  document.querySelector('#selected-label').textContent = design.id.toUpperCase() + ' — ' + design.title;
  for (const button of document.querySelectorAll('[data-select]')) button.setAttribute('aria-pressed', String(button.dataset.select === id));
  for (const card of document.querySelectorAll('[data-design]')) card.toggleAttribute('data-active', card.dataset.design === id);
}
for (const button of document.querySelectorAll('[data-select]')) button.addEventListener('click', () => selectDesign(button.dataset.select));
selectDesign('a');
</script></body></html>`;
await writeFile(page, html);
console.log(`Created ${designs.length} SVG marks, lockups, comparison sheet and ${page}`);
