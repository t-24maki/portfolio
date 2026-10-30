// Explicit, disposable live smoke test. Uses only the same public SDK as players.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { initializeApp, deleteApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, signInAnonymously, deleteUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, getDocFromServer, serverTimestamp, terminate, setLogLevel } from 'firebase/firestore';
import { GARDEN_FIREBASE } from '../data/miracle-garden-firebase.mjs';
import { GARDEN_RANKING_SCHEMA, scoreForRanking } from '../lib/miracle-garden-ranking.mjs';
import { saveGardenScore, readGardenRanking, deleteGardenScore, renameGardenPlayer } from '../lib/miracle-garden-firestore.mjs';
import { finishedGame } from '../tests/helpers/miracle-garden-ranking-fixtures.mjs';

if (process.argv[2] !== '--project' || process.argv[3] !== 'data-garden-game'
  || GARDEN_FIREBASE.app.projectId !== 'data-garden-game' || process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error('Pass --project data-garden-game to explicitly opt in to this disposable live test');
}
setLogLevel('silent');
const app=initializeApp(GARDEN_FIREBASE.app,`ranking-check-${randomUUID()}`);
const guestApp=initializeApp(GARDEN_FIREBASE.app,`ranking-guest-${randomUUID()}`);
const auth=initializeAuth(app,{persistence:inMemoryPersistence});
const db=getFirestore(app),guestDB=getFirestore(guestApp);
let registered=false;
try {
  await signInAnonymously(auth);
  const uid=auth.currentUser.uid;
  const game=finishedGame();
  const saved=await saveGardenScore(db,uid,game,'接続確認');registered=true;
  assert.equal(saved.scoreUnits,scoreForRanking(game,'接続確認').scoreUnits);
  const list=await readGardenRanking(db,uid);
  assert.equal(list.self.scoreUnits,saved.scoreUnits);
  assert.ok(Number.isSafeInteger(list.total) && list.total >= 1);
  assert.ok(Number.isSafeInteger(list.self.rank) && list.self.rank >= 1 && list.self.rank <= list.total);
  const publicList=await readGardenRanking(guestDB);
  assert.ok(publicList.entries.some(row=>row.name==='接続確認'&&row.scoreUnits===saved.scoreUnits));
  const ref=doc(guestDB,'gardenBoards',GARDEN_RANKING_SCHEMA.boardId,'scores',uid);
  await assert.rejects(setDoc(ref,{...scoreForRanking(game,'改変'),achievedAt:serverTimestamp()}),{code:'permission-denied'});
  await assert.rejects(getDocFromServer(ref),{code:'permission-denied'});
  const own=doc(db,'gardenBoards',GARDEN_RANKING_SCHEMA.boardId,'scores',uid);
  const before=(await getDocFromServer(own)).data();
  await renameGardenPlayer(db,uid,'変更確認');
  assert.deepEqual((await getDocFromServer(own)).data(),{...before,name:'変更確認'});
  const renamed=await readGardenRanking(db,uid);
  assert.equal(renamed.self.name,'変更確認');
  await assert.rejects(updateDoc(ref,{name:'他人から変更'}),{code:'permission-denied'});
  console.log('LIVE PASS: registration, score/rank, name-only update preserves score/lengths/timestamp, and unauthorized writes rejected.');
} finally {
  // This script created the identity and score; never touches any other player.
  if (auth.currentUser) {
    if (registered) {
      await deleteGardenScore(db,auth.currentUser.uid);
      assert.equal((await readGardenRanking(db,auth.currentUser.uid)).self,null);
    }
    await deleteUser(auth.currentUser);
  }
  await Promise.all([terminate(db),terminate(guestDB)]);
  await Promise.all([deleteApp(app),deleteApp(guestApp)]);
  console.log('Disposable live-check record and anonymous identity cleaned up.');
}
