import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from './config';
import { Product, Testimonial, Promotion, Banner } from '../types';

const IS_PROD = import.meta.env.PROD;

const COLLECTIONS = {
  PRODUCTS: 'products',
  PROMOTIONS: 'promotions',
  TESTIMONIALS: 'testimonials',
  BANNERS: 'banners',
  CATEGORIES: 'categories',
  SETTINGS: 'settings',
};

// ─── Dev-only in-memory store ──────────────────────────────────────────────
const memStore: Record<string, Map<string, any>> = {
  products: new Map(),
  promotions: new Map(),
  testimonials: new Map(),
  banners: new Map(),
};

function memGet<T>(col: string): T[] {
  return Array.from(memStore[col]?.values() ?? []) as T[];
}
function memSet(col: string, id: string, data: any) {
  if (!memStore[col]) memStore[col] = new Map();
  memStore[col].set(id, { ...data, id });
}
function memDel(col: string, id: string) {
  memStore[col]?.delete(id);
}

// ─── Default seed data (dev mode) ─────────────────────────────────────────
function seedDefaultData() {
  if (memStore.products.size > 0) return;

  const defaultProducts: Product[] = [
    {
      id: 'prod_1',
      name: 'Conjunto Alfaiataria Premium',
      category: 'vestuario',
      subcategory: 'Conjuntos',
      price: 2500,
      originalPrice: 2900,
      description: 'Conjunto de alfaiataria premium em tecido estruturado de alta qualidade. Ideal para eventos sofisticados ou look profissional elegante.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      bestseller: true,
      news: false,
      createdAt: new Date('2026-06-01').toISOString(),
    },
    {
      id: 'prod_2',
      name: 'Vestido de Linho Elegance',
      category: 'vestuario',
      subcategory: 'Vestidos',
      price: 1800,
      description: 'Vestido longo de linho puro com modelagem fluida e decote sutil.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      news: true,
      createdAt: new Date('2026-06-15').toISOString(),
    },
    {
      id: 'prod_3',
      name: 'Moletom Oversized Carbono',
      category: 'vestuario',
      subcategory: 'Moletons',
      price: 2200,
      originalPrice: 2400,
      description: 'Moletom oversized com interior flanelado. Bolso canguru e acabamento premium.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'],
      bestseller: true,
      createdAt: new Date('2026-06-10').toISOString(),
    },
    {
      id: 'prod_7',
      name: 'Tênis Air Runner Sport',
      category: 'calcados',
      subcategory: 'Tênis',
      price: 4500,
      originalPrice: 5200,
      description: 'Tênis de alta performance com amortecimento responsivo.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      createdAt: new Date('2026-06-18').toISOString(),
    },
    {
      id: 'sorvete_250',
      name: 'Sorvete de Malambe 250ml',
      category: 'sorvete',
      subcategory: 'Sorvete 250ml',
      price: 150,
      description: 'Sorvete artesanal cremoso com o autêntico sabor do fruto de embondeiro (malambe). 250ml.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      bestseller: true,
      nutritionalInfo: { calories: '180kcal', vitaminC: '28mg', calcium: '120mg', fiber: '2g' },
      createdAt: new Date('2026-06-01').toISOString(),
    },
    {
      id: 'sorvete_500',
      name: 'Sorvete de Malambe 500ml',
      category: 'sorvete',
      subcategory: 'Sorvete 500ml',
      price: 280,
      description: 'Sorvete artesanal cremoso com o autêntico sabor tropical do malambe. 500ml para partilhar.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      nutritionalInfo: { calories: '360kcal', vitaminC: '56mg', calcium: '240mg', fiber: '4g' },
      createdAt: new Date('2026-06-01').toISOString(),
    },
    {
      id: 'sorvete_700',
      name: 'Sorvete de Malambe 700ml',
      category: 'sorvete',
      subcategory: 'Sorvete 700ml',
      price: 380,
      description: 'Sorvete artesanal premium de malambe em embalagem familiar 700ml. Sabor exótico do embondeiro.',
      status: 'disponivel',
      images: ['https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=80'],
      featured: true,
      nutritionalInfo: { calories: '504kcal', vitaminC: '78mg', calcium: '336mg', fiber: '5.6g' },
      createdAt: new Date('2026-06-01').toISOString(),
    },
  ];

  defaultProducts.forEach(p => memSet('products', p.id, p));

  const defaultTestimonials: Testimonial[] = [
    { id: 'test_1', name: 'Ana Machava', role: 'Cliente Fiel', comment: 'O sorvete de malambe é incrível! Nunca tinha provado algo tão original e delicioso.', rating: 5 },
    { id: 'test_2', name: 'Carlos Sitoe', role: 'Empresário', comment: 'As roupas têm uma qualidade excelente. Atendimento via WhatsApp muito rápido!', rating: 5 },
  ];
  defaultTestimonials.forEach(t => memSet('testimonials', t.id, t));
}

if (!IS_PROD && !isFirebaseConfigured) {
  seedDefaultData();
}

// ─── Firestore service ─────────────────────────────────────────────────────
export const firestoreService = {
  async getProducts(): Promise<Product[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.PRODUCTS));
        const items: Product[] = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() } as Product));
        return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (err) {
        console.error('Firestore getProducts failed:', err);
        if (IS_PROD) throw err;
      }
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    return memGet<Product>('products').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async saveProduct(product: Product): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.PRODUCTS, product.id), product);
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memSet('products', product.id, product);
  },

  async deleteProduct(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await deleteDoc(doc(firestore, COLLECTIONS.PRODUCTS, id));
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memDel('products', id);
  },

  async getPromotions(): Promise<Promotion[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.PROMOTIONS));
        const items: Promotion[] = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() } as Promotion));
        return items;
      } catch (err) {
        console.error('Firestore getPromotions failed:', err);
        if (IS_PROD) throw err;
      }
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    return memGet<Promotion>('promotions');
  },

  async savePromotion(promo: Promotion): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.PROMOTIONS, promo.id), promo);
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memSet('promotions', promo.id, promo);
  },

  async deletePromotion(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await deleteDoc(doc(firestore, COLLECTIONS.PROMOTIONS, id));
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memDel('promotions', id);
  },

  async getBanners(): Promise<Banner[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.BANNERS));
        const items: Banner[] = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() } as Banner));
        return items;
      } catch (err) {
        console.error('Firestore getBanners failed:', err);
        if (IS_PROD) throw err;
      }
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    return memGet<Banner>('banners');
  },

  async saveBanner(banner: Banner): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.BANNERS, banner.id), banner);
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memSet('banners', banner.id, banner);
  },

  async deleteBanner(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await deleteDoc(doc(firestore, COLLECTIONS.BANNERS, id));
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memDel('banners', id);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.TESTIMONIALS));
        const items: Testimonial[] = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() } as Testimonial));
        return items;
      } catch (err) {
        console.error('Firestore getTestimonials failed:', err);
        if (IS_PROD) throw err;
      }
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    return memGet<Testimonial>('testimonials');
  },

  async saveTestimonial(test: Testimonial): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.TESTIMONIALS, test.id), test);
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memSet('testimonials', test.id, test);
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await deleteDoc(doc(firestore, COLLECTIONS.TESTIMONIALS, id));
      return;
    }
    if (IS_PROD) throw new Error('Firebase não configurado.');
    memDel('testimonials', id);
  },

  async getCategories(): Promise<string[]> {
    if (isFirebaseConfigured && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.CATEGORIES, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) return docSnap.data().list || ['vestuario', 'calcados', 'sorvete'];
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    return ['vestuario', 'calcados', 'sorvete'];
  },

  async saveCategories(list: string[]): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.CATEGORIES, 'main'), { list });
    }
  },

  async getSettings(): Promise<any> {
    const defaults = {
      whatsappNumber: '+258866473065',
      catalogTitle: 'Malambe & Moda',
      maintenanceMode: false,
    };
    if (isFirebaseConfigured && firestore) {
      try {
        const docSnap = await getDoc(doc(firestore, COLLECTIONS.SETTINGS, 'general'));
        if (docSnap.exists()) return { ...defaults, ...docSnap.data() };
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    }
    return defaults;
  },

  async saveSettings(settings: any): Promise<void> {
    if (isFirebaseConfigured && firestore) {
      await setDoc(doc(firestore, COLLECTIONS.SETTINGS, 'general'), settings);
    }
  },
};
