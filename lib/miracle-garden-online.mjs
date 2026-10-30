import { GARDEN_FIREBASE } from '../data/miracle-garden-firebase.mjs';

const emulating = process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === 'true';
export const rankingEnabled = GARDEN_FIREBASE.enabled || emulating;
let clientPromise;
let signInPromise;
let emulatorConnected = false;
async function client() {
  if (!rankingEnabled) throw new Error('Ranking is not configured');
  if (!clientPromise) clientPromise = (async () => {
    const [{ initializeApp, getApps }, authSDK, firestoreSDK, store] = await Promise.all([
      import('firebase/app'), import('firebase/auth'), import('firebase/firestore'), import('./miracle-garden-firestore.mjs'),
    ]);
    const options = emulating ? { apiKey: 'demo-key', authDomain: 'demo-data-garden.firebaseapp.com', projectId: 'demo-data-garden' } : GARDEN_FIREBASE.app;
    const app = getApps().find(item => item.name === 'data-garden') || initializeApp(options, 'data-garden');
    const auth = authSDK.getAuth(app);
    const db = firestoreSDK.getFirestore(app);
    if (emulating && !emulatorConnected) {
      if (!auth.emulatorConfig) authSDK.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      firestoreSDK.connectFirestoreEmulator(db, '127.0.0.1', 8080);
      emulatorConnected = true;
    }
    await auth.authStateReady();
    return { auth, authSDK, db, store };
  })().catch(error => { clientPromise = null; throw error; });
  return clientPromise;
}
async function signedInClient() {
  const context = await client();
  if (!context.auth.currentUser) {
    signInPromise ||= context.authSDK.signInAnonymously(context.auth).finally(() => { signInPromise = null; });
    await signInPromise;
  }
  return context;
}
async function withTimeout(operation) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw Object.assign(new Error('Offline'), { code: 'unavailable' });
  }
  let timer;
  try {
    return await Promise.race([operation(), new Promise((_, reject) => {
      timer = setTimeout(() => reject(Object.assign(new Error('Connection timed out'), { code: 'unavailable' })), 15000);
    })]);
  } finally { clearTimeout(timer); }
}
export async function submitRankedGarden(game, name) {
  return withTimeout(async () => {
    const { auth, db, store } = await signedInClient();
    return store.saveGardenScore(db, auth.currentUser.uid, game, name);
  });
}
export async function loadGardenRanking() {
  return withTimeout(async () => {
    const { auth, db, store } = await client();
    return store.readGardenRanking(db, auth.currentUser?.uid);
  });
}
export async function removeGardenScore() {
  return withTimeout(async () => {
    const { auth, db, store } = await client();
    return store.deleteGardenScore(db, auth.currentUser?.uid);
  });
}
export async function changeGardenPlayerName(name) {
  return withTimeout(async () => {
    const { auth, db, store } = await client();
    return store.renameGardenPlayer(db, auth.currentUser?.uid, name);
  });
}
