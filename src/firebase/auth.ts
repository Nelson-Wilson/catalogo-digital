import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

// ─── Production: Firebase Auth only ────────────────────────────────────────
// ─── Development fallback: localStorage simulation (DEV only) ──────────────
const IS_PROD = import.meta.env.PROD;
const FALLBACK_AUTH_KEY = 'malambe_admin_logged';

export const loginUser = async (email: string, pass: string): Promise<boolean> => {
  if (isFirebaseConfigured && auth) {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (error: any) {
      console.error('Firebase authentication failed:', error);
      // Surface readable error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        throw new Error('Email ou senha inválidos.');
      }
      if (error.code === 'auth/too-many-requests') {
        throw new Error('Muitas tentativas. Tente novamente mais tarde.');
      }
      throw new Error('Erro de autenticação. Verifique sua conexão.');
    }
  }

  if (IS_PROD) {
    throw new Error('Sistema de autenticação não configurado. Contacte o administrador.');
  }

  // DEV fallback only
  const isSuccess = email === 'admin@malambeemoda.com' && pass === 'admin123';
  if (isSuccess) {
    localStorage.setItem(FALLBACK_AUTH_KEY, 'true');
    return true;
  }
  throw new Error('Credenciais inválidas.');
};

export const logoutUser = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
    return;
  }
  if (!IS_PROD) {
    localStorage.removeItem(FALLBACK_AUTH_KEY);
  }
};

export const subscribeToAuthChanges = (
  callback: (user: { email: string | null } | null) => void
) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      callback(firebaseUser ? { email: firebaseUser.email } : null);
    });
  }

  if (!IS_PROD) {
    const isLogged = localStorage.getItem(FALLBACK_AUTH_KEY) === 'true';
    callback(isLogged ? { email: 'admin@malambeemoda.com' } : null);
  } else {
    callback(null);
  }
  return () => {};
};

export const isUserLoggedIn = (): boolean => {
  if (isFirebaseConfigured && auth) {
    return !!auth.currentUser;
  }
  if (!IS_PROD) {
    return localStorage.getItem(FALLBACK_AUTH_KEY) === 'true';
  }
  return false;
};

/**
 * Changes the fallback password used in development mode.
 * In production (Firebase configured), this is a no-op — passwords are
 * managed through Firebase Authentication console.
 */
export const changeAdminFallbackPassword = (newPass: string): void => {
  if (IS_PROD || isFirebaseConfigured) {
    console.warn('changeAdminFallbackPassword: no-op in production. Manage passwords via Firebase Console.');
    return;
  }
  // DEV only: store in sessionStorage (resets on tab close, safer than localStorage)
  sessionStorage.setItem('malambe_dev_pass', newPass);
};

export { isFirebaseConfigured };
