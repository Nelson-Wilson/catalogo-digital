import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain &&
  firebaseConfig.storageBucket
);

let app: ReturnType<typeof initializeApp> | undefined;
let auth: ReturnType<typeof getAuth> | null = null;
let firestore: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // Persist auth session across browser refreshes
    setPersistence(auth, browserLocalPersistence).catch(console.error);
    firestore = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
  }
} else {
  // Only allowed in development mode
  if (import.meta.env.PROD) {
    console.error('❌ CRITICAL: Firebase environment variables are not configured for production!');
  } else {
    console.warn('⚠️ Firebase not configured. Running in development fallback mode.');
  }
}

export { app, auth, firestore, storage };
