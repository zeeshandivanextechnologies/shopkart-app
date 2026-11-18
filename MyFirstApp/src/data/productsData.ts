import { Ionicons } from '@expo/vector-icons';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[]; // Multi-image gallery for slider
  brand: string;
  inStock: boolean;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  discount: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export const BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Mega Summer Sale',
    subtitle: 'Flat 50% OFF on Top Brand Shoes & Wearables',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    discount: '50% OFF',
  },
  {
    id: 'b2',
    title: 'Sound & Audio Fest',
    subtitle: 'Noise Cancelling Headphones & Earbuds',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    discount: 'UP TO 40% OFF',
  },
  {
    id: 'b3',
    title: 'Smart Tech Zone',
    subtitle: 'Watches, Tablets & Work Essentials',
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80',
    discount: 'NEW LAUNCHES',
  },
];

export const CATEGORIES: CategoryItem[] = [
  { id: 'cat0', name: 'All', iconName: 'flash-outline' },
  { id: 'cat1', name: 'Shoes', iconName: 'footsteps-outline' },
  { id: 'cat2', name: 'Electronics', iconName: 'headset-outline' },
  { id: 'cat3', name: 'Fashion', iconName: 'shirt-outline' },
  { id: 'cat4', name: 'Watches', iconName: 'watch-outline' },
  { id: 'cat5', name: 'Accessories', iconName: 'briefcase-outline' },
];

export const PRODUCTS: Product[] = [
  // Shoes Category
  {
    id: '1',
    title: 'Nike Air Max 270 Flyknit',
    category: 'Shoes',
    brand: 'Nike',
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviewsCount: 342,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
    description: 'The Nike Air Max 270 delivers unmatched all-day comfort. Features a super lightweight mesh upper and visible Max Air cushioning.',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: ['#D32F2F', '#1976D2', '#212121'],
  },
  {
    id: '5',
    title: 'Adidas Ultraboost Light Running',
    category: 'Shoes',
    brand: 'Adidas',
    price: 11999,
    originalPrice: 15999,
    rating: 4.7,
    reviewsCount: 310,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&q=80',
    ],
    description: 'Experience epic energy return with lightweight BOOST cushioning engineered to keep you running strong on any terrain.',
    sizes: ['UK 8', 'UK 9', 'UK 10'],
    colors: ['#FFFFFF', '#D32F2F'],
  },
  {
    id: '7',
    title: 'Puma Nitro Elite Carbon Pro',
    category: 'Shoes',
    brand: 'Puma',
    price: 7499,
    originalPrice: 9999,
    rating: 4.6,
    reviewsCount: 185,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
    ],
    description: 'Engineered for top speed and responsive propulsion with dual nitrogen-infused foam midsole.',
    sizes: ['UK 7', 'UK 8', 'UK 9'],
    colors: ['#FF9800', '#212121'],
  },

  // Electronics Category
  {
    id: '2',
    title: 'Sony WH-1000XM5 ANC Wireless',
    category: 'Electronics',
    brand: 'Sony',
    price: 24990,
    originalPrice: 29990,
    rating: 4.9,
    reviewsCount: 890,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    ],
    description: 'Industry-leading noise cancellation optimized automatically to your environment with up to 30 hours battery life.',
    sizes: ['Standard'],
    colors: ['#212121', '#E0E0E0'],
  },
  {
    id: '6',
    title: 'Apple iPad Air M2 11-inch Liquid Retina',
    category: 'Electronics',
    brand: 'Apple',
    price: 59900,
    originalPrice: 64900,
    rating: 4.9,
    reviewsCount: 654,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80',
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80',
    ],
    description: 'Supercharged by Apple M2 chip. Brilliant Liquid Retina display, ultra-fast 5G, Apple Pencil Pro support.',
    sizes: ['128GB', '256GB'],
    colors: ['#4A6572', '#E0E0E0', '#34495E'],
  },
  {
    id: '8',
    title: 'JBL Charge 5 Waterproof Bluetooth Speaker',
    category: 'Electronics',
    brand: 'JBL',
    price: 13999,
    originalPrice: 17999,
    rating: 4.7,
    reviewsCount: 540,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    ],
    description: 'Bold Original Pro Sound with long excursion driver, separate tweeter, and dual pumping JBL bass radiators.',
    sizes: ['Standard'],
    colors: ['#1565C0', '#D32F2F', '#212121'],
  },

  // Fashion Category
  {
    id: '4',
    title: 'Levi Classic Regular Denim Jacket',
    category: 'Fashion',
    brand: 'Levis',
    price: 2999,
    originalPrice: 4999,
    rating: 4.6,
    reviewsCount: 425,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    ],
    description: 'A timeless silhouette made with durable cotton denim with side welt pockets and classic brass metal buttons.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#1565C0', '#424242'],
  },
  {
    id: '9',
    title: 'Zara Oversized Relaxed Fit Cotton Shirt',
    category: 'Fashion',
    brand: 'Zara',
    price: 2490,
    originalPrice: 3590,
    rating: 4.5,
    reviewsCount: 210,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
    description: 'Breathable 100% poplin cotton fabric with dropped shoulders and buttoned cuffs.',
    sizes: ['M', 'L', 'XL'],
    colors: ['#FFFFFF', '#90CAF9'],
  },
  {
    id: '10',
    title: 'H&M Urban Street Cargo Joggers',
    category: 'Fashion',
    brand: 'H&M',
    price: 1999,
    originalPrice: 2799,
    rating: 4.4,
    reviewsCount: 312,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80',
    ],
    description: 'Twill cargo joggers with elasticated drawstring waistband and multiple utility flap pockets.',
    sizes: ['30', '32', '34', '36'],
    colors: ['#3E2723', '#212121', '#558B2F'],
  },

  // Watches Category
  {
    id: '3',
    title: 'Fossil Gen 6 Smartwatch Touchscreen',
    category: 'Watches',
    brand: 'Fossil',
    price: 14495,
    originalPrice: 18995,
    rating: 4.5,
    reviewsCount: 198,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
    ],
    description: '2x faster charging speed, Qualcomm 4100+ platform, SpO2 & Heart Rate tracking. Compatible with Android & iOS.',
    sizes: ['44mm'],
    colors: ['#795548', '#212121'],
  },
  {
    id: '11',
    title: 'Casio G-Shock Rugged Sport Watch',
    category: 'Watches',
    brand: 'Casio',
    price: 8495,
    originalPrice: 10995,
    rating: 4.8,
    reviewsCount: 920,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80',
    ],
    description: 'Shock-resistant and 200-meter water resistant sports watch with world time and LED backlight.',
    sizes: ['Universal'],
    colors: ['#212121', '#B71C1C'],
  },

  // Accessories Category
  {
    id: '12',
    title: 'Wildcraft Heavy-Duty Trekking Backpack 45L',
    category: 'Accessories',
    brand: 'Wildcraft',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviewsCount: 460,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&q=80',
    ],
    description: 'Ergonomic back system with cushioned shoulder straps, rain cover, and multiple gear loops.',
    sizes: ['45 Litres'],
    colors: ['#1565C0', '#424242'],
  },
  {
    id: '13',
    title: 'Ray-Ban Aviator Classic Polarized Sunglasses',
    category: 'Accessories',
    brand: 'Ray-Ban',
    price: 7990,
    originalPrice: 9990,
    rating: 4.9,
    reviewsCount: 380,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    ],
    description: 'Iconic crystal green polarized lenses providing 100% UV protection and high clarity vision.',
    sizes: ['Standard 58mm'],
    colors: ['#FFD700', '#212121'],
  },
];
