import { Product, Testimonial, Banner, Promotion } from '../types';

// Default seeded products
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Conjunto Alfaiataria Premium',
    category: 'vestuario',
    subcategory: 'Conjuntos',
    price: 2500,
    originalPrice: 2900,
    description: 'Conjunto de alfaiataria premium confeccionado em tecido estruturado de alta qualidade. Ideal para eventos sofisticados ou look profissional elegante.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    news: false,
    createdAt: new Date('2026-06-01').toISOString()
  },
  {
    id: 'prod_2',
    name: 'Vestido de Linho Verão Elegance',
    category: 'vestuario',
    subcategory: 'Vestidos',
    price: 1800,
    description: 'Vestido longo de linho puro com modelagem fluida e decote sutil. Conforto absoluto e caimento perfeito para dias quentes.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    news: true,
    createdAt: new Date('2026-06-15').toISOString()
  },
  {
    id: 'prod_3',
    name: 'Moletom Oversized Carbono',
    category: 'vestuario',
    subcategory: 'Moletons',
    price: 2200,
    originalPrice: 2400,
    description: 'Moletom com modelagem oversized e interior flanelado extremamente macio. Possui bolso canguru e acabamento de alta costura.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    bestseller: true,
    createdAt: new Date('2026-06-10').toISOString()
  },
  {
    id: 'prod_4',
    name: 'Camisa Slim Fit Oxford',
    category: 'vestuario',
    subcategory: 'Camisas',
    price: 1500,
    description: 'Camisa social clássica confeccionada em algodão Oxford premium. Modelagem slim fit que delineia o corpo com sofisticação.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date('2026-05-20').toISOString()
  },
  {
    id: 'prod_5',
    name: 'Calça Jeans Cargo Estilo',
    category: 'vestuario',
    subcategory: 'Calças',
    price: 2100,
    description: 'Calça cargo jeans com bolsos utilitários laterais e caimento reto moderno. Confortável, estilosa e resistente.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date('2026-06-20').toISOString()
  },
  {
    id: 'prod_6',
    name: 'Blusa de Cetim Alças',
    category: 'vestuario',
    subcategory: 'Blusas',
    price: 1200,
    description: 'Blusa feminina de alças finas reguláveis em cetim brilhante de alto padrão. Perfeita para usar individualmente ou sob blazers.',
    status: 'esgotado',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date('2026-05-15').toISOString()
  },
  {
    id: 'prod_7',
    name: 'Tênis Air Runner Sport',
    category: 'calcados',
    subcategory: 'Tênis',
    price: 4500,
    originalPrice: 5200,
    description: 'Tênis de alta performance com tecnologia de amortecimento responsiva. Excelente para corrida e uso diário com estilo esportivo contemporâneo.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    createdAt: new Date('2026-06-05').toISOString()
  },
  {
    id: 'prod_8',
    name: 'Sandália Couro Urban',
    category: 'calcados',
    subcategory: 'Sandálias',
    price: 2400,
    description: 'Sandália artesanal em couro legítimo com tiras largas e fivelas ajustáveis. Solado ergonômico que proporciona bem-estar ao caminhar.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec99930a?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date('2026-06-18').toISOString()
  },
  {
    id: 'prod_9',
    name: 'Chinelos Nuvem Confort',
    category: 'calcados',
    subcategory: 'Chinelos',
    price: 1100,
    description: 'Chinelos ultra macios com tecnologia de absorção de impacto. Sensação de caminhar nas nuvens. Resistente à água.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80'
    ],
    news: true,
    createdAt: new Date('2026-06-22').toISOString()
  },
  {
    id: 'prod_10',
    name: 'Sapatilha Classic Suede',
    category: 'calcados',
    subcategory: 'Sapatos',
    price: 3200,
    description: 'Sapatilha elegante confeccionada em camurça suede premium. Forro interno macio e solado antiderrapante flexível.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date('2026-06-11').toISOString()
  },
  {
    id: 'prod_11',
    name: 'Yougurt de Malambe - Pote 250ml',
    category: 'sorvete',
    subcategory: '250ml',
    price: 150,
    description: 'O autêntico e refrescante yougurt artesanal feito com a polpa natural de Malambe (fruto do Embondeiro/Baobab). Super cremoso, exótico e rico em Vitamina C e nutrientes essenciais. Ideal para uma sobremesa individual requintada.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1501443715940-a10640d59081?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    nutritionalInfo: {
      calories: '124 kcal',
      vitaminC: '85% IDR',
      calcium: '12% IDR',
      fiber: '4.2g'
    },
    createdAt: new Date('2026-06-01').toISOString()
  },
  {
    id: 'prod_12',
    name: 'Yougurt de Malambe - Pote 500ml',
    category: 'sorvete',
    subcategory: '500ml',
    price: 280,
    description: 'Yougurt artesanal premium de Malambe feito com ingredientes 100% naturais. Sabor exótico, refrescante e nutritivo. Tamanho perfeito para partilhar momentos especiais.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1501443715940-a10640d59081?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    nutritionalInfo: {
      calories: '248 kcal',
      vitaminC: '170% IDR',
      calcium: '24% IDR',
      fiber: '8.4g'
    },
    createdAt: new Date('2026-06-01').toISOString()
  },
  {
    id: 'prod_13',
    name: 'Yougurt de Malambe - Pote 700ml',
    category: 'sorvete',
    subcategory: '700ml',
    price: 380,
    description: 'A nossa versão familiar do delicioso yougurt de Malambe. Uma explosão de sabores tropicais e benefícios nutricionais da savana africana direto para a sua mesa.',
    status: 'disponivel',
    images: [
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=800&auto=format&fit=crop&q=80'
    ],
    featured: true,
    bestseller: true,
    news: true,
    nutritionalInfo: {
      calories: '346 kcal',
      vitaminC: '238% IDR',
      calcium: '33% IDR',
      fiber: '11.7g'
    },
    createdAt: new Date('2026-06-01').toISOString()
  }
];

// Seeded active promotions
const DEFAULT_PROMOTIONS: Promotion[] = [
  {
    id: 'promo_1',
    title: 'Festival do Malambe',
    discount: '15% OFF',
    description: 'Na compra de 2 potes de Yougurt de Malambe de 700ml, ganhe desconto especial.',
    bannerImage: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'promo_2',
    title: 'Renovação de Guarda-Roupa',
    discount: 'Até 20% OFF',
    description: 'Aproveite ofertas selecionadas na seção de Vestuário Premium.',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80'
  }
];

// Seeded banners
const DEFAULT_BANNERS: Banner[] = [
  {
    id: 'banner_1',
    title: 'Cantinho da Bianca & Moda Exclusiva',
    subtitle: 'Sabor tropical autêntico de Moçambique e as últimas tendências internacionais de vestuário e calçados.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80',
    link: '#catalogo',
    active: true
  },
  {
    id: 'banner_2',
    title: 'Yougurt Artesanal de Malambe',
    subtitle: 'A cremosidade perfeita do fruto sagrado do Embondeiro. 100% natural, refrescante e ultra nutritivo.',
    image: 'https://images.unsplash.com/photo-1501443715940-a10640d59081?w=1600&auto=format&fit=crop&q=80',
    link: '#sorvete-malambe',
    active: true
  }
];

// Seeded testimonials
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Ana Maria Macuácua',
    role: 'Cliente VIP - Maputo',
    comment: 'O Yougurt de Malambe é simplesmente espetacular! Super cremoso e com o verdadeiro sabor azedinho doce do Malambe. E o vestido de linho que encomendei serve como uma luva. Recomendo imenso!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'test_2',
    name: 'Nelson Dzimba',
    role: 'Cliente Fiel - Beira',
    comment: 'Atendimento via WhatsApp super rápido e profissional. Os tênis são muito confortáveis e de ótima qualidade. O yougurt chegou ainda geladinho em caixa térmica!',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'test_3',
    name: 'Isabel Matsinhe',
    role: 'Estilista - Nampula',
    comment: 'A qualidade do vestuário superou as minhas expectativas. Costuras bem finalizadas e tecido de primeira. E o yougurt de 700ml já é sobremesa obrigatória de domingo na minha casa.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
  }
];

// Key storage keys
const KEYS = {
  PRODUCTS: 'malambe_catalogo_products',
  PROMOTIONS: 'malambe_catalogo_promotions',
  BANNERS: 'malambe_catalogo_banners',
  TESTIMONIALS: 'malambe_catalogo_testimonials',
  ADMIN_LOGGED: 'malambe_admin_logged',
  ADMIN_PASSWORD: 'malambe_admin_password',
};

// Initialize localStorage if not present
export function initDB() {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.PROMOTIONS)) {
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(DEFAULT_PROMOTIONS));
  }
  if (!localStorage.getItem(KEYS.BANNERS)) {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(DEFAULT_BANNERS));
  }
  if (!localStorage.getItem(KEYS.TESTIMONIALS)) {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(KEYS.ADMIN_PASSWORD, 'admin123'); // Default password
  }
}

// Initialize on import
initDB();

// DB API Wrapper
export const db = {
  // Products
  getProducts(): Product[] {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct(id: string): void {
    const products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Promotions
  getPromotions(): Promotion[] {
    const data = localStorage.getItem(KEYS.PROMOTIONS);
    return data ? JSON.parse(data) : [];
  },

  savePromotion(promo: Promotion): void {
    const promos = this.getPromotions();
    const index = promos.findIndex(p => p.id === promo.id);
    if (index >= 0) {
      promos[index] = promo;
    } else {
      promos.push(promo);
    }
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(promos));
  },

  deletePromotion(id: string): void {
    const promos = this.getPromotions().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PROMOTIONS, JSON.stringify(promos));
  },

  // Banners
  getBanners(): Banner[] {
    const data = localStorage.getItem(KEYS.BANNERS);
    return data ? JSON.parse(data) : [];
  },

  saveBanner(banner: Banner): void {
    const banners = this.getBanners();
    const index = banners.findIndex(b => b.id === banner.id);
    if (index >= 0) {
      banners[index] = banner;
    } else {
      banners.push(banner);
    }
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
  },

  deleteBanner(id: string): void {
    const banners = this.getBanners().filter(b => b.id !== id);
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
  },

  // Testimonials
  getTestimonials(): Testimonial[] {
    const data = localStorage.getItem(KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : [];
  },

  saveTestimonial(testimonial: Testimonial): void {
    const testimonials = this.getTestimonials();
    const index = testimonials.findIndex(t => t.id === testimonial.id);
    if (index >= 0) {
      testimonials[index] = testimonial;
    } else {
      testimonials.push(testimonial);
    }
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },

  deleteTestimonial(id: string): void {
    const testimonials = this.getTestimonials().filter(t => t.id !== id);
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },

  // Admin Auth simulation
  isAdminLogged(): boolean {
    return localStorage.getItem(KEYS.ADMIN_LOGGED) === 'true';
  },

  login(password: string): boolean {
    const saved = localStorage.getItem(KEYS.ADMIN_PASSWORD) || 'admin123';
    if (password === saved) {
      localStorage.setItem(KEYS.ADMIN_LOGGED, 'true');
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(KEYS.ADMIN_LOGGED);
  },

  changeAdminPassword(newPassword: string): void {
    localStorage.setItem(KEYS.ADMIN_PASSWORD, newPassword);
  }
};

// Image utility to handle compress & convert file to Base64 (saving storage space)
export function compressAndConvertImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Max dimension 800px
        const MAX_DIM = 800;
        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
