import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
import { collection, doc, setDoc, updateDoc, deleteField, deleteDoc, getDocFromServer, getDocsFromServer, getCountFromServer, query, where, limit, orderBy, startAfter, serverTimestamp, Timestamp, writeBatch, getFirestore, connectFirestoreEmulator, terminate, disableNetwork, enableNetwork } from 'firebase/firestore';
import { saveGardenScore, readGardenRanking, deleteGardenScore, renameGardenPlayer } from '../lib/miracle-garden-firestore.mjs';
import { GARDEN_RANKING_SCHEMA, scoreForRanking } from '../lib/miracle-garden-ranking.mjs';
import { finishedGame } from './helpers/miracle-garden-ranking-fixtures.mjs';

if (!process.env.FIRESTORE_EMULATOR_HOST || !process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.GCLOUD_PROJECT !== 'demo-data-garden') throw new Error('Run only against demo-data-garden emulators');
let env;
const board = `gardenBoards/${GARDEN_RANKING_SCHEMA.boardId}/scores`;
const dbFor = uid => uid ? env.authenticatedContext(uid).firestore() : env.unauthenticatedContext().firestore();
const record = (overrides={}) => ({name:'庭のひと',scoreUnits:1800,lengthUnits:[500,600,700],achievedAt:serverTimestamp(),...overrides});
before(async () => { env = await initializeTestEnvironment({projectId:'demo-data-garden',firestore:{host:'127.0.0.1',port:8080,rules:await readFile(new URL('../firestore.rules',import.meta.url),'utf8')}}); });
after(async () => { await env.cleanup(); });

test('previous 50-per-query rules already publicly exposed every score and anonymous document ID via pagination', async () => {
  const rules=await readFile(new URL('../firestore.rules',import.meta.url),'utf8');
  const previousRules=rules.replace('allow list: if currentBoard(boardId);', 'allow list: if currentBoard(boardId) && request.query.limit <= 50;');
  assert.notEqual(previousRules,rules);
  const previousEnv=await initializeTestEnvironment({projectId:'demo-garden-prior-scope',firestore:{host:'127.0.0.1',port:8080,rules:previousRules}});
  try {
    await previousEnv.clearFirestore();
    await previousEnv.withSecurityRulesDisabled(async context=>{
      const db=context.firestore(),batch=writeBatch(db);
      for(let i=0;i<56;i++) batch.set(doc(db,board,`public-user-${i}`),record({scoreUnits:3000-i,lengthUnits:[1000,1000,1000-i],achievedAt:Timestamp.fromMillis(i)}));
      await batch.commit();
    });
    const guest=previousEnv.unauthenticatedContext().firestore();
    const scores=collection(guest,board);
    const first=await assertSucceeds(getDocsFromServer(query(scores,orderBy('scoreUnits','desc'),limit(50))));
    const rest=await assertSucceeds(getDocsFromServer(query(scores,orderBy('scoreUnits','desc'),startAfter(first.docs.at(-1)),limit(50))));
    assert.equal(first.size,50);assert.equal(rest.size,6);
    assert.equal(rest.docs.at(-1).id,'public-user-55');
    assert.equal(rest.docs.at(-1).data().name,'庭のひと');
    await assertFails(getCountFromServer(scores));
    console.log('READ-SCOPE PROOF: previous rules expose all 56 records/IDs to unauthenticated paginated queries; the limit restricts batch size, not visibility.');
  } finally { await previousEnv.cleanup(); }
});

test('only the authenticated owner can create, improve or delete their record', async () => {
  await env.clearFirestore();
  const alice=dbFor('alice'),bob=dbFor('bob'),guest=dbFor();
  await assertFails(setDoc(doc(guest,board,'alice'),record()));
  await assertFails(setDoc(doc(bob,board,'alice'),record()));
  await assertSucceeds(setDoc(doc(alice,board,'alice'),record()));
  await assertFails(setDoc(doc(bob,board,'alice'),record({scoreUnits:2100,lengthUnits:[700,700,700]})));
  await assertFails(deleteDoc(doc(bob,board,'alice')));
  await assertFails(setDoc(doc(alice,board,'alice'),record({scoreUnits:1500,lengthUnits:[500,500,500]})));
  await assertFails(setDoc(doc(alice,board,'alice'),record({name:'別の名前'})));
  await assertSucceeds(setDoc(doc(alice,board,'alice'),record({scoreUnits:2100,lengthUnits:[700,700,700]})));
  await assertSucceeds(deleteDoc(doc(alice,board,'alice')));
});

test('rules enforce integer units, three lengths, exact totals, safe names, timestamps and an exact field set', async () => {
  await env.clearFirestore();
  const db=dbFor('validation'),ref=doc(db,board,'validation');
  const malformed=[
    {scoreUnits:-1}, {scoreUnits:0.5}, {scoreUnits:NaN}, {scoreUnits:Infinity}, {scoreUnits:'1800'},
    {scoreUnits:1801}, {scoreUnits:9007199254740992}, {lengthUnits:[500,600]},
    {lengthUnits:[500.1,599.9,700]}, {lengthUnits:[-100,1200,700]}, {lengthUnits:[500,600,700,0]},
    {name:''}, {name:' '}, {name:' a '}, {name:'a'.repeat(13)}, {name:'a\n\nb'}, {name:'a\u202Eb'}, {name:'<script>'},
    {achievedAt:Timestamp.fromMillis(0)}, {owner:'someone'}, {seed:1234},
  ];
  for(const bad of malformed) await assertFails(setDoc(ref,record(bad)));
  await assertSucceeds(setDoc(ref,record({name:'🌸'.repeat(12)})));
  await assertSucceeds(deleteDoc(ref));
  await assertSucceeds(setDoc(ref,record({scoreUnits:0,lengthUnits:[0,0,0]})));
  await assertSucceeds(setDoc(ref,record({scoreUnits:3150,lengthUnits:[1000,1050,1100]})));
  await assertFails(setDoc(doc(db,'gardenBoards/obsolete/scores/validation'),record()));
  await assertFails(setDoc(doc(db,'gardenPlayers/validation'),{seed:4}));
});

test('only owners can rename; a name-only edit cannot change, add or remove score fields', async () => {
  await env.clearFirestore();
  const alice=dbFor('alice'),ref=doc(alice,board,'alice');
  await setDoc(ref,record());
  const before=(await getDocFromServer(ref)).data();
  await assertFails(updateDoc(doc(dbFor('bob'),board,'alice'),{name:'他人'}));
  await assertFails(updateDoc(doc(dbFor(),board,'alice'),{name:'未認証'}));
  for (const name of ['', ' ', ' a ', 'a'.repeat(13), 'a\n\nb', 'a\u202Eb', '<script>', null, 123]) {
    await assertFails(updateDoc(ref,{name}));
  }
  for (const change of [
    {scoreUnits:1700}, {lengthUnits:[600,500,700]}, {achievedAt:serverTimestamp()},
    {extra:'field'}, {name:deleteField()}, {scoreUnits:deleteField()},
    {lengthUnits:deleteField()}, {achievedAt:deleteField()},
  ]) await assertFails(updateDoc(ref,{name:'新しい名前',...change}));
  await assertSucceeds(updateDoc(ref,{name:'🌸'.repeat(12)}));
  const after=(await getDocFromServer(ref)).data();
  assert.deepEqual(after,{...before,name:'🌸'.repeat(12)});
});

test('renaming preserves score, flower lengths, achievement time, tie order and participant count', async () => {
  await env.clearFirestore();
  const db=dbFor('renaming'),ref=doc(db,board,'renaming');
  await saveGardenScore(db,'renaming',finishedGame(),'元の名前');
  await saveGardenScore(dbFor('twin'),'twin',finishedGame(),'同点の庭');
  const before=(await getDocFromServer(ref)).data();
  const beforeList=await readGardenRanking(db,'renaming');
  assert.deepEqual(await renameGardenPlayer(db,'renaming','  ＡＢＣ  '),{name:'ABC'});
  await renameGardenPlayer(db,'renaming','ABC'); // Idempotent retry.
  const after=(await getDocFromServer(ref)).data();
  assert.deepEqual(after,{...before,name:'ABC'});
  const list=await readGardenRanking(db,'renaming');
  assert.equal(list.self.name,'ABC'); assert.equal(list.self.rank,beforeList.self.rank);
  assert.equal(list.total,beforeList.total);
  assert.deepEqual(list.entries.map(row=>row.isYou),beforeList.entries.map(row=>row.isYou));
  await assert.rejects(renameGardenPlayer(db,'renaming',''),/名前/);
  await assert.rejects(renameGardenPlayer(db,null,'名前'),{code:'unauthenticated'});
  await deleteGardenScore(db,'renaming');
  await assert.rejects(renameGardenPlayer(db,'renaming','消えた記録'),{code:'not-found'});
  assert.equal((await getDocFromServer(ref)).exists(),false);
});

test('a concurrent rename and new best never restore a stale score', async () => {
  await env.clearFirestore();
  const db=dbFor('concurrent'),game=finishedGame();
  await saveGardenScore(db,'concurrent',game,'最初の名前');
  const improved=structuredClone(game); improved.finalPlants[0].lengths=[90,90,90];
  await Promise.all([
    renameGardenPlayer(db,'concurrent','変更した名前'),
    saveGardenScore(db,'concurrent',improved,'更新した庭'),
  ]);
  const saved=(await getDocFromServer(doc(db,board,'concurrent'))).data();
  assert.equal(saved.scoreUnits,2700);
  assert.deepEqual(saved.lengthUnits,[900,900,900]);
  assert.ok(['変更した名前','更新した庭'].includes(saved.name));
});

test('global public counts are allowed; other boards and nonpublic paths remain denied', async () => {
  await env.clearFirestore();
  const owner=dbFor('owner'),guest=dbFor();
  await setDoc(doc(owner,board,'owner'),record());
  await assertSucceeds(getDocsFromServer(query(collection(guest,board),orderBy('scoreUnits','desc'),orderBy('achievedAt','asc'),limit(50))));
  assert.equal((await assertSucceeds(getCountFromServer(collection(guest,board)))).data().count, 1);
  assert.equal((await assertSucceeds(getCountFromServer(query(collection(guest,board),where('scoreUnits','>',1800))))).data().count, 0);
  // Firestore rules cannot distinguish a count from a document query.
  await assertSucceeds(getDocsFromServer(collection(guest,board)));
  await assertFails(getCountFromServer(collection(guest,'gardenBoards/obsolete/scores')));
  await assertFails(getCountFromServer(collection(guest,'gardenPlayers')));
  await assertFails(getDocFromServer(doc(guest,board,'owner')));
  await assertSucceeds(getDocFromServer(doc(owner,board,'owner')));
  await assertFails(getDocFromServer(doc(owner,'gardenPlayers/owner')));
});

test('production client operations handle registration, retries, concurrent bests, ties and deletion', async () => {
  await env.clearFirestore();
  const db=dbFor('player'),game=finishedGame();
  const [saved,retry] = await Promise.all([saveGardenScore(db,'player',game,'プレイヤー'),saveGardenScore(db,'player',game,'プレイヤー')]);
  assert.equal(saved.bestUnits,retry.bestUnits);
  const smaller=await saveGardenScore(db,'player',finishedGame(12,0),'小さい庭');
  assert.ok(smaller.scoreUnits < saved.bestUnits); assert.equal(smaller.bestUnits,saved.bestUnits);
  const improved=structuredClone(game); improved.finalPlants[0].lengths=[85,85,85];
  await Promise.all([saveGardenScore(db,'player',improved,'新しい庭'),saveGardenScore(db,'player',game,'古い庭')]);
  const twin=dbFor('twin'); await saveGardenScore(twin,'twin',improved,'同点の庭');
  const list=await readGardenRanking(db,'player');
  assert.equal(list.self.scoreUnits,2550); assert.equal(list.self.rank,1);
  assert.equal(list.total,2);
  assert.deepEqual(list.entries.map(row=>row.rank),[1,1]);
  assert.equal(list.entries.filter(row=>row.isYou).length,1);
  const publicList=await readGardenRanking(dbFor()); assert.equal(publicList.self,null);
  assert.deepEqual(Object.keys(publicList.entries[0]).sort(),['isYou','name','rank','scoreUnits']);
  await deleteGardenScore(db,'player');
  const afterDelete=await readGardenRanking(db,'player');
  assert.equal(afterDelete.self,null); assert.equal(afterDelete.total,1);
});

test('top 50 stays bounded while global counts rank everyone, including ties outside the list', async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async context=>{
    const db=context.firestore(),batch=writeBatch(db);
    for(let i=0;i<55;i++) batch.set(doc(db,board,`user${i}`),record({scoreUnits:3000-i,lengthUnits:[1000,1000,1000-i],achievedAt:Timestamp.fromMillis(i)}));
    batch.set(doc(db,board,'tied-last'),record({scoreUnits:2946,lengthUnits:[1000,1000,946],achievedAt:Timestamp.fromMillis(100)}));
    await batch.commit();
  });
  const list=await readGardenRanking(dbFor('user54'),'user54');
  assert.equal(list.entries.length,50); assert.equal(list.self.scoreUnits,2946); assert.equal(list.self.rank,55); assert.equal(list.total,56);
  const tie=await readGardenRanking(dbFor('tied-last'),'tied-last');
  assert.equal(tie.self.rank,55); assert.equal(tie.total,56);
  await deleteGardenScore(dbFor('user0'),'user0');
  const afterDelete=await readGardenRanking(dbFor('user54'),'user54');
  assert.equal(afterDelete.self.rank,54); assert.equal(afterDelete.total,55);
});

test('an empty board and an unregistered player have no invented rank', async () => {
  await env.clearFirestore();
  assert.deepEqual(await readGardenRanking(dbFor()), { entries: [], self: null, total: 0 });
  assert.deepEqual(await readGardenRanking(dbFor('new-player'),'new-player'), { entries: [], self: null, total: 0 });
  await setDoc(doc(dbFor('zero'),board,'zero'),record({scoreUnits:0,lengthUnits:[0,0,0]}));
  const zero=await readGardenRanking(dbFor('zero'),'zero');
  assert.equal(zero.self.rank,1); assert.equal(zero.total,1);
});

test('anonymous Auth plus Firestore works end to end; offline reads do not masquerade as fresh data', async () => {
  await env.clearFirestore();
  const app=initializeApp({projectId:'demo-data-garden',apiKey:'demo-key'},randomUUID());
  const auth=getAuth(app);connectAuthEmulator(auth,'http://127.0.0.1:9099',{disableWarnings:true});
  const db=getFirestore(app);connectFirestoreEmulator(db,'127.0.0.1',8080);
  try {
    await signInAnonymously(auth);
    const result=await saveGardenScore(db,auth.currentUser.uid,finishedGame(),'匿名の庭');
    assert.equal(result.bestUnits,scoreForRanking(finishedGame(),'匿名の庭').scoreUnits);
    assert.equal((await readGardenRanking(db,auth.currentUser.uid)).self.rank,1);
    await disableNetwork(db);
    await assert.rejects(readGardenRanking(db,auth.currentUser.uid));
    await enableNetwork(db);
    await deleteGardenScore(db,auth.currentUser.uid);
  } finally {await terminate(db);await deleteApp(app);}
});
