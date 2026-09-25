export type Language = 'English' | 'Chinese' | 'Both';
export type ProductType = 'book' | 'ebook' | 'software' | 'combo';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  language: Language;
  type: ProductType;
  description: string;
  fullDescription: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  ratingCount: number;
  sold: number;
  badge?: 'Bán chạy' | 'Mới' | 'Ưu đãi' | 'Độc quyền' | 'Hot';
  images: string[];
  features: string[];
  includedItems: string[];
  targetAudience: string[];
  benefits: string[];
  lifetimeAccess?: boolean;
  samplePages?: string[]; // Sample pages preview for ebooks/books
  videoDemoUrl?: string; // Video demo for software
  thickness?: number; // 3D depth in px (default 30-40px)
  spineColor?: string;
  coverAccent?: string;
  zaloCatalogUrl?: string; // Direct link to Zalo Catalog
  appType?: 'pro' | 'mandaleo' | 'leo10' | '1000reflex' | 'combo' | 'course' | 'general';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFormat?: 'paper' | 'ebook' | 'bundle';
}

export type FilterCategory = 'all' | 'app' | 'English' | 'Chinese' | 'book' | 'ebook' | 'software' | 'combo';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'best-selling' | 'highest-discount';
