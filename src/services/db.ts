/**
 * DEVELOPMENT-ONLY in-memory database.
 * This file is NOT used in production — Firebase Firestore is used instead.
 * It exists solely so the build doesn't break if some component still imports it.
 * 
 * In production (isFirebaseConfigured = true), all data goes through
 * src/firebase/firestore.ts which reads/writes to Firestore directly.
 */

import { Product, Testimonial, Banner, Promotion } from '../types';

// In-memory store (resets on page reload — dev only)
const store = {
  products: new Map<string, Product>(),
  testimonials: new Map<string, Testimonial>(),
  banners: new Map<string, Banner>(),
  promotions: new Map<string, Promotion>(),
};

export const db = {
  getProducts: (): Product[] => Array.from(store.products.values()),
  saveProduct: (p: Product) => { store.products.set(p.id, p); },
  deleteProduct: (id: string) => { store.products.delete(id); },

  getTestimonials: (): Testimonial[] => Array.from(store.testimonials.values()),
  saveTestimonial: (t: Testimonial) => { store.testimonials.set(t.id, t); },
  deleteTestimonial: (id: string) => { store.testimonials.delete(id); },

  getBanners: (): Banner[] => Array.from(store.banners.values()),
  saveBanner: (b: Banner) => { store.banners.set(b.id, b); },
  deleteBanner: (id: string) => { store.banners.delete(id); },

  getPromotions: (): Promotion[] => Array.from(store.promotions.values()),
  savePromotion: (p: Promotion) => { store.promotions.set(p.id, p); },
  deletePromotion: (id: string) => { store.promotions.delete(id); },
};
