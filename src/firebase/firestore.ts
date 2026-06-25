import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  getDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from './config';
import { Product, Testimonial, Promotion, Banner } from '../types';
import { db as localDB } from '../services/db';

// Firestore collection references
const COLLECTIONS = {
  PRODUCTS: 'products',
  PROMOTIONS: 'promotions',
  TESTIMONIALS: 'testimonials',
  BANNERS: 'banners',
  CATEGORIES: 'categories',
  SETTINGS: 'settings'
};

// Seed Firestore with default data if it is empty
async function seedFirestoreIfNeeded() {
  if (!isFirebaseConfigured || !firestore) return;
  
  try {
    const productsSnap = await getDocs(collection(firestore, COLLECTIONS.PRODUCTS));
    if (productsSnap.empty) {
      console.log('Seeding Firestore with default products...');
      const localProducts = localDB.getProducts();
      for (const prod of localProducts) {
        await setDoc(doc(firestore, COLLECTIONS.PRODUCTS, prod.id), prod);
      }
    }

    const promosSnap = await getDocs(collection(firestore, COLLECTIONS.PROMOTIONS));
    if (promosSnap.empty) {
      console.log('Seeding Firestore with default promotions...');
      const localPromos = localDB.getPromotions();
      for (const promo of localPromos) {
        await setDoc(doc(firestore, COLLECTIONS.PROMOTIONS, promo.id), promo);
      }
    }

    const testSnap = await getDocs(collection(firestore, COLLECTIONS.TESTIMONIALS));
    if (testSnap.empty) {
      console.log('Seeding Firestore with default testimonials...');
      const localTests = localDB.getTestimonials();
      for (const test of localTests) {
        await setDoc(doc(firestore, COLLECTIONS.TESTIMONIALS, test.id), test);
      }
    }

    const bannersSnap = await getDocs(collection(firestore, COLLECTIONS.BANNERS));
    if (bannersSnap.empty) {
      console.log('Seeding Firestore with default banners...');
      const localBanners = localDB.getBanners();
      for (const banner of localBanners) {
        await setDoc(doc(firestore, COLLECTIONS.BANNERS, banner.id), banner);
      }
    }
  } catch (error) {
    console.error('Error seeding Firestore default data:', error);
  }
}

// Automatically trigger background seed if Firestore is active
if (isFirebaseConfigured) {
  seedFirestoreIfNeeded();
}

export const firestoreService = {
  // --- Products ---
  async getProducts(): Promise<Product[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.PRODUCTS));
        const items: Product[] = [];
        querySnapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Product);
        });
        // Sort by createdAt descending
        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (error) {
        console.error('Failed to get products from Firestore:', error);
        return localDB.getProducts();
      }
    }
    return localDB.getProducts();
  },

  async saveProduct(product: Product): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.PRODUCTS, product.id);
        await setDoc(docRef, product);
        return;
      } catch (error) {
        console.error('Failed to save product to Firestore:', error);
        throw error;
      }
    }
    localDB.saveProduct(product);
  },

  async deleteProduct(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await deleteDoc(doc(firestore, COLLECTIONS.PRODUCTS, id));
        return;
      } catch (error) {
        console.error('Failed to delete product from Firestore:', error);
        throw error;
      }
    }
    localDB.deleteProduct(id);
  },

  // --- Promotions ---
  async getPromotions(): Promise<Promotion[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.PROMOTIONS));
        const items: Promotion[] = [];
        querySnapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Promotion);
        });
        return items;
      } catch (error) {
        console.error('Failed to get promotions from Firestore:', error);
        return localDB.getPromotions();
      }
    }
    return localDB.getPromotions();
  },

  async savePromotion(promo: Promotion): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await setDoc(doc(firestore, COLLECTIONS.PROMOTIONS, promo.id), promo);
        return;
      } catch (error) {
        console.error('Failed to save promotion to Firestore:', error);
        throw error;
      }
    }
    localDB.savePromotion(promo);
  },

  async deletePromotion(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await deleteDoc(doc(firestore, COLLECTIONS.PROMOTIONS, id));
        return;
      } catch (error) {
        console.error('Failed to delete promotion from Firestore:', error);
        throw error;
      }
    }
    localDB.deletePromotion(id);
  },

  // --- Banners ---
  async getBanners(): Promise<Banner[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.BANNERS));
        const items: Banner[] = [];
        querySnapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Banner);
        });
        return items;
      } catch (error) {
        console.error('Failed to get banners from Firestore:', error);
        return localDB.getBanners();
      }
    }
    return localDB.getBanners();
  },

  async saveBanner(banner: Banner): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await setDoc(doc(firestore, COLLECTIONS.BANNERS, banner.id), banner);
        return;
      } catch (error) {
        console.error('Failed to save banner to Firestore:', error);
        throw error;
      }
    }
    localDB.saveBanner(banner);
  },

  async deleteBanner(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await deleteDoc(doc(firestore, COLLECTIONS.BANNERS, id));
        return;
      } catch (error) {
        console.error('Failed to delete banner from Firestore:', error);
        throw error;
      }
    }
    localDB.deleteBanner(id);
  },

  // --- Testimonials ---
  async getTestimonials(): Promise<Testimonial[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const querySnapshot = await getDocs(collection(firestore, COLLECTIONS.TESTIMONIALS));
        const items: Testimonial[] = [];
        querySnapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Testimonial);
        });
        return items;
      } catch (error) {
        console.error('Failed to get testimonials from Firestore:', error);
        return localDB.getTestimonials();
      }
    }
    return localDB.getTestimonials();
  },

  async saveTestimonial(test: Testimonial): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await setDoc(doc(firestore, COLLECTIONS.TESTIMONIALS, test.id), test);
        return;
      } catch (error) {
        console.error('Failed to save testimonial to Firestore:', error);
        throw error;
      }
    }
    localDB.saveTestimonial(test);
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await deleteDoc(doc(firestore, COLLECTIONS.TESTIMONIALS, id));
        return;
      } catch (error) {
        console.error('Failed to delete testimonial from Firestore:', error);
        throw error;
      }
    }
    localDB.deleteTestimonial(id);
  },

  // --- Categories ---
  async getCategories(): Promise<string[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.CATEGORIES, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data().list || ['vestuario', 'calcados', 'sorvete'];
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    return ['vestuario', 'calcados', 'sorvete'];
  },

  async saveCategories(list: string[]): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await setDoc(doc(firestore, COLLECTIONS.CATEGORIES, 'main'), { list });
        return;
      } catch (error) {
        console.error('Failed to save categories:', error);
      }
    }
  },

  // --- General Settings ---
  async getSettings(): Promise<any> {
    const defaultSettings = {
      whatsappNumber: '+258866473065',
      catalogTitle: 'Cantinho da Bianca',
      maintenanceMode: false
    };
    if (isFirebaseConfigured && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.SETTINGS, 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { ...defaultSettings, ...docSnap.data() };
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
    return defaultSettings;
  },

  async saveSettings(settings: any): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      try {
        await setDoc(doc(firestore, COLLECTIONS.SETTINGS, 'general'), settings);
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  }
};
