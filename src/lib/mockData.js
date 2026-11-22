export const initialCategories = [
  {
    id: 'cat-1',
    name: 'Matcha',
    slug: 'matcha',
    description: 'Smooth and calm ceremonial grade & blends.',
    bg_color: '#2FD6A1',
    border_radius: '50%',
    sort_order: 1,
    icon: 'matcha'
  },
  {
    id: 'cat-2',
    name: 'Caffeine',
    slug: 'caffeine',
    description: 'Energy and focus on demand anytime.',
    bg_color: '#FFD83D',
    border_radius: '44px',
    sort_order: 2,
    icon: 'caffeine'
  },
  {
    id: 'cat-3',
    name: 'Disposables',
    slug: 'disposables',
    description: 'Open the box and go. Pick a flavor.',
    bg_color: '#2F4BFF',
    border_radius: '46% 54% 50% 50% / 56% 44% 56% 44%',
    sort_order: 3,
    icon: 'disposables'
  },
  {
    id: 'cat-4',
    name: 'E-Liquids',
    slug: 'e-liquids',
    description: 'Nic-salt and freebase bottles.',
    bg_color: '#FF5CA8',
    border_radius: '60px 30px 60px 30px',
    sort_order: 4,
    icon: 'eliquids'
  },
  {
    id: 'cat-5',
    name: 'Devices',
    slug: 'devices',
    description: 'Pod kits and starter devices.',
    bg_color: '#FFFFFF',
    border_radius: '50%',
    sort_order: 5,
    icon: 'devices'
  },
  {
    id: 'cat-6',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Pods, coils and fast chargers.',
    bg_color: '#FF7A2F',
    border_radius: '30px 60px 30px 60px',
    sort_order: 6,
    icon: 'accessories'
  }
]

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Svape Lush Ice 7000 Puffs',
    slug: 'svape-lush-ice-7000',
    description: 'Crisp watermelon infused with chilling menthol. Rechargeable Type-C battery.',
    price: 3800,
    sale_price: 3400,
    category_id: 'cat-3',
    category_slug: 'disposables',
    image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: '7000 Puffs',
    nicotine: '50mg Salt Nic',
    flavor: 'Watermelon Ice',
    brand: 'Svape Signature'
  },
  {
    id: 'prod-2',
    name: 'Tokyo Iced Mango Salt Nic 30ml',
    slug: 'tokyo-iced-mango-30ml',
    description: 'Sweet, juicy tropical mango with a smooth icy throat hit.',
    price: 3200,
    sale_price: null,
    category_id: 'cat-4',
    category_slug: 'e-liquids',
    image_url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: null,
    nicotine: '30mg',
    flavor: 'Mango Ice',
    brand: 'Tokyo E-Juice'
  },
  {
    id: 'prod-3',
    name: 'Uwell Caliburn G3 Pod Kit',
    slug: 'uwell-caliburn-g3-kit',
    description: 'Integrated 900mAh battery, 2.5ml capacity, OLED display and dual airflow system.',
    price: 6500,
    sale_price: 5999,
    category_id: 'cat-5',
    category_slug: 'devices',
    image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: null,
    nicotine: null,
    flavor: null,
    brand: 'Uwell'
  },
  {
    id: 'prod-4',
    name: 'Kyoto Ceremonial Grade Matcha 50g',
    slug: 'kyoto-ceremonial-matcha-50g',
    description: 'First harvest shade-grown Japanese green tea powder. Rich in L-theanine and antioxidants.',
    price: 4500,
    sale_price: 4100,
    category_id: 'cat-1',
    category_slug: 'matcha',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: null,
    nicotine: '0mg',
    flavor: 'Pure Ceremonial',
    brand: 'Kyoto Harvest'
  },
  {
    id: 'prod-5',
    name: 'Focus Caffeine Inhaler Stick',
    slug: 'focus-caffeine-inhaler',
    description: 'Instant zero-calorie energy boost infused with taurine and vitamin B12.',
    price: 2400,
    sale_price: 1999,
    category_id: 'cat-2',
    category_slug: 'caffeine',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: '400 Inhalations',
    nicotine: '0mg (Caffeine 100mg)',
    flavor: 'Espresso Mint',
    brand: 'FocusLab'
  },
  {
    id: 'prod-6',
    name: 'Caliburn G3 Replacement Pods (4-Pack)',
    slug: 'caliburn-g3-replacement-pods',
    description: 'Original 0.6 ohm meshed refillable pods with ultrasonic welding technology.',
    price: 3600,
    sale_price: null,
    category_id: 'cat-6',
    category_slug: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: false,
    puffs: null,
    nicotine: null,
    flavor: null,
    brand: 'Uwell'
  },
  {
    id: 'prod-7',
    name: 'Elf Bar BC10000 Grape Cherry',
    slug: 'elf-bar-bc10000-grape-cherry',
    description: '10,000 puffs with real-time digital battery and e-liquid indicator.',
    price: 4800,
    sale_price: 4400,
    category_id: 'cat-3',
    category_slug: 'disposables',
    image_url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: true,
    puffs: '10000 Puffs',
    nicotine: '50mg',
    flavor: 'Grape Cherry',
    brand: 'Elf Bar'
  },
  {
    id: 'prod-8',
    name: 'Nasty Juice Cush Man Mango 60ml',
    slug: 'nasty-juice-cush-man-mango',
    description: 'World-famous authentic mango flavor with low mint hint in classic aluminum bottle.',
    price: 3500,
    sale_price: 3200,
    category_id: 'cat-4',
    category_slug: 'e-liquids',
    image_url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=500&auto=format&fit=crop&q=60',
    in_stock: true,
    featured: false,
    puffs: null,
    nicotine: '3mg Freebase',
    flavor: 'Ripe Mango',
    brand: 'Nasty Juice'
  }
]

export const initialReviews = [
  {
    id: 'rev-1',
    name: 'Hamza Khan',
    city: 'DHA Phase 5, Lahore',
    text: 'Ordered at 1:30 AM on a Friday night, rider was at my gate in 22 minutes sharp. Best delivery service in Lahore hands down!',
    bg_color: '#FFD83D',
    rotation: '-3deg',
    is_active: true
  },
  {
    id: 'rev-2',
    name: 'Ayesha Malik',
    city: 'Gulberg III, Lahore',
    text: 'Scratched the security code and verified online on Uwell official site: 100% genuine! No more fake pods from local kiosks.',
    bg_color: '#FFFFFF',
    rotation: '2deg',
    is_active: true
  },
  {
    id: 'rev-3',
    name: 'Usman Tariq',
    city: 'Model Town, Lahore',
    text: 'Cash on delivery with exact change, smooth rider behavior, and packaging was top notch with tamper seals intact.',
    bg_color: '#2FD6A1',
    rotation: '-2deg',
    is_active: true
  }
]

export const initialOrders = [
  {
    id: 'ord-1001',
    customer_name: 'Zaid Ali',
    phone: '0321-4567890',
    address: 'House 42, Street 8, Phase 6, DHA',
    city: 'Lahore',
    notes: 'Please call before ringing bell',
    status: 'delivering',
    total: 7200,
    payment_method: 'cod',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    items: [
      { product_name: 'Svape Lush Ice 7000 Puffs', quantity: 1, price: 3400 },
      { product_name: 'Tokyo Iced Mango Salt Nic 30ml', quantity: 1, price: 3200 }
    ]
  },
  {
    id: 'ord-1002',
    customer_name: 'Fatima Noor',
    phone: '0300-9876543',
    address: 'Apt 4B, Mall 1, Main Boulevard, Gulberg',
    city: 'Lahore',
    notes: 'Leave at reception',
    status: 'delivered',
    total: 5999,
    payment_method: 'cod',
    created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    items: [
      { product_name: 'Uwell Caliburn G3 Pod Kit', quantity: 1, price: 5999 }
    ]
  },
  {
    id: 'ord-1003',
    customer_name: 'Bilal Sheikh',
    phone: '0333-1122334',
    address: 'Plot 18, Block J, Johar Town',
    city: 'Lahore',
    notes: '',
    status: 'pending',
    total: 4500,
    payment_method: 'cod',
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    items: [
      { product_name: 'Kyoto Ceremonial Grade Matcha 50g', quantity: 1, price: 4500 }
    ]
  }
]
