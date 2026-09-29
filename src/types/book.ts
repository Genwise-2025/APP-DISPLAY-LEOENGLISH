export interface BookItem {
  id: string;
  title: string;
  vietnameseTitle?: string;
  subtitle?: string;
  coverImage: string;
  originalPrice: number; // 80,000 VND
  promoPrice: number;    // 40,000 VND (50% off for new students)
  discountPercent: number; // 50
  category: 'communication' | 'vocabulary' | 'business' | 'grammar-ielts' | 'chinese' | 'story';
  categoryLabel: string;
  pages: number;
  fileSize: string;
  level: string;
  description: string;
  highlights: string[];
  pdfDownloadUrl?: string;
  samplePreviewUrl?: string;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface BookGroup {
  id: string;
  code: string; // T390, L1000, L299VIP
  name: string;
  subtitle: string;
  badge: string;
  tagline: string;
  accentColor: string;
  gradientClass: string;
  borderGlowClass: string;
  description: string;
  books: BookItem[];
  allDownloadUrl: string;
  sampleFileName: string;
}

export interface AdminPassCodeConfig {
  group1Code: string; // L1000
  group2Code: string; // T390
  group3Code: string; // L299VIP
  adminEmail: string; // nguyentoandinh.0511@gmail.com
}
