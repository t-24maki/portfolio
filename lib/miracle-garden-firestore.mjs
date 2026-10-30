import { collection, doc, query, where, orderBy, limit, getDocsFromServer, getDocFromServer, getCountFromServer, runTransaction, serverTimestamp } from 'firebase/firestore';
import { GARDEN_RANKING_SCHEMA, scoreForRanking, rankingFromRows, normalizePlayerName } from './miracle-garden-ranking.mjs';

const scores = db => collection(db, 'gardenBoards', GARDEN_RANKING_SCHEMA.boardId, 'scores');
const ownRef = (db, uid) => {
  if (!uid) throw Object.assign(new Error('Sign in first'), { code: 'unauthenticated' });
  return doc(scores(db), uid);
};

export async function saveGardenScore(db, uid, game, name) {
  const submitted = scoreForRanking(game, name);
  const ref = ownRef(db, uid);
  return runTransaction(db, async transaction => {
    const previous = await transaction.get(ref);
    const bestUnits = previous.exists() ? previous.data().scoreUnits : null;
    if (bestUnits !== null && bestUnits >= submitted.scoreUnits) {
      return { scoreUnits: submitted.scoreUnits, bestUnits, improved: false };
    }
    transaction.set(ref, { ...submitted, achievedAt: serverTimestamp() });
    return { scoreUnits: submitted.scoreUnits, bestUnits: submitted.scoreUnits, improved: true };
  }, { maxAttempts: 3 });
}

export async function readGardenRanking(db, uid = null) {
  const top = query(scores(db), orderBy('scoreUnits', 'desc'), orderBy('achievedAt', 'asc'), limit(GARDEN_RANKING_SCHEMA.listLimit));
  const [snapshot, own, count] = await Promise.all([
    getDocsFromServer(top), uid ? getDocFromServer(ownRef(db, uid)) : null,
    getCountFromServer(scores(db)),
  ]);
  const ownScore = own?.exists() ? own.data() : null;
  // Count strictly higher scores, including players beyond the displayed top 50.
  // Aggregation returns a number, not every player's document.
  const higher = ownScore ? await getCountFromServer(query(scores(db), where('scoreUnits', '>', ownScore.scoreUnits))) : null;
  return rankingFromRows(snapshot.docs.map(item => ({ ...item.data(), id: item.id })), ownScore, uid,
    { total: count.data().count, higherCount: higher?.data().count ?? null });
}

export async function deleteGardenScore(db, uid) {
  // Transactions fail offline instead of silently queuing a deletion for later.
  const ref = ownRef(db, uid);
  await runTransaction(db, async transaction => {
    if ((await transaction.get(ref)).exists()) transaction.delete(ref);
  }, { maxAttempts: 3 });
}

export async function renameGardenPlayer(db, uid, name) {
  const normalized = normalizePlayerName(name);
  const ref = ownRef(db, uid);
  // Read the latest record so a concurrent score update is never overwritten,
  // and a deleted record cannot be recreated by an old name-edit form.
  return runTransaction(db, async transaction => {
    const current = await transaction.get(ref);
    if (!current.exists()) throw Object.assign(new Error('Record no longer exists'), { code: 'not-found' });
    if (current.data().name !== normalized) transaction.update(ref, { name: normalized });
    return { name: normalized };
  }, { maxAttempts: 3 });
}
