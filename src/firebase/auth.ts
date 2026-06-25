import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

// Simulate simple token for fallback session
const FALLBACK_AUTH_KEY = 'malambe_admin_logged';
const FALLBACK_PASS_KEY = 'malambe_admin_password';

export const loginUser = async (email: string, pass: string): Promise<boolean> => {
  if (isFirebaseConfigured && auth) {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return true;
    } catch (error) {
      console.error('Firebase authentication failed:', error);
      throw error;
    }
  } else {
    // Fallback authentication simulation
    const savedPass = localStorage.getItem(FALLBACK_PASS_KEY) || 'admin123';
    const isSuccess = email === 'admin@malambe.com' && pass === savedPass;
    if (isSuccess) {
      localStorage.setItem(FALLBACK_AUTH_KEY, 'true');
      return true;
    }
    throw new Error('Credenciais inválidas no modo de simulação.');
  }
};

export const logoutUser = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem(FALLBACK_AUTH_KEY);
  }
};

export const subscribeToAuthChanges = (callback: (user: { email: string | null } | null) => void) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({ email: firebaseUser.email });
      } else {
        callback(null);
      }
    });
  } else {
    // Fallback simulation periodic check/instant trigger
    const checkAuth = () => {
      const isLogged = localStorage.getItem(FALLBACK_AUTH_KEY) === 'true';
      if (isLogged) {
        callback({ email: 'admin@malambe.com' });
      } else {
        callback(null);
      }
    };
    checkAuth();
    // Return a dummy unsubscribe function
    return () => {};
  }
};

export const isUserLoggedIn = (): boolean => {
  if (isFirebaseConfigured && auth) {
    return !!auth.currentUser;
  } else {
    return localStorage.getItem(FALLBACK_AUTH_KEY) === 'true';
  }
};

export const changeAdminFallbackPassword = (newPass: string): void => {
  localStorage.setItem(FALLBACK_PASS_KEY, newPass);
};

export { isFirebaseConfigured };
