import { bestScoreKey, formatFinalLength } from './miracle-garden.mjs';
import { GARDEN_RANKING_SCHEMA } from '../data/miracle-garden-ranking-schema.mjs';

export { GARDEN_RANKING_SCHEMA };
export function normalizePlayerName(value) {
  if (typeof value !== 'string') throw new Error('名前を入力してください。');
  const name = value.normalize('NFKC').trim();
  if (!name || [...name].length > 12 || /[\p{C}<>]/u.test(name)) {
    throw new Error('名前は1〜12文字で入力してください。');
  }
  return name;
}

export function scoreForRanking(game, name) {
  const schema = GARDEN_RANKING_SCHEMA;
  const invalid = () => { throw Object.assign(new Error('Incomplete or outdated game'), { code: 'failed-precondition' }); };
  if (game?.phase !== 'finished' || bestScoreKey(game.config) !== schema.signature
    || game.experiments.length !== game.config.experimentLimit) invalid();
  const lengths = game.finalPlants.flatMap(row => row.lengths);
  if (lengths.length !== schema.plantCount || lengths.some(value => !Number.isFinite(value) || value < 0)) invalid();
  const lengthUnits = lengths.map(value => Math.round(Number(formatFinalLength(value, game.config)) * schema.scoreScale));
  const scoreUnits = lengthUnits.reduce((sum, value) => sum + value, 0);
  if (![...lengthUnits, scoreUnits].every(Number.isSafeInteger)) invalid();
  return { name: normalizePlayerName(name), scoreUnits, lengthUnits };
}

// Display only the top 50; independent count queries cover the entire board.
export function rankingFromRows(rows, own, uid, { total, higherCount }) {
  let rank = 0, lastScore = null;
  const entries = rows.map((row, index) => {
    if (row.scoreUnits !== lastScore) rank = index + 1;
    lastScore = row.scoreUnits;
    return { rank, name: row.name, scoreUnits: row.scoreUnits, isYou: row.id === uid };
  });
  const self = own ? { name: own.name, scoreUnits: own.scoreUnits, rank: higherCount + 1 } : null;
  return { entries, self, total };
}

export function rankingErrorMessage(error) {
  const code = error?.code?.split('/').at(-1);
  if (code === 'resource-exhausted') return '本日の利用枠に達したか、アクセスが集中しています。時間をおいてお試しください。';
  if (code === 'not-found') return '登録した記録が見つかりません。ランキングを更新してください。';
  if (code === 'failed-precondition') return 'この記録を登録できません。ページを更新して、新しい庭でお試しください。';
  if (code === 'permission-denied' || code === 'unauthenticated') return '記録を保存できませんでした。ページを更新してお試しください。';
  if (code === 'invalid-argument') return '名前や得点を確認してください。';
  return '接続できませんでした。通信を確認して、もう一度お試しください。';
}
