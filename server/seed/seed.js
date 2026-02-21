require('dotenv').config();

const connectDb = require('../src/config/db');
const Product = require('../src/models/Product');

const imagePool = [
  'https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=900&q=80',
];

const fundPool = [
  'Axis Mutual Fund',
  'HDFC Mutual Fund',
  'SBI Mutual Fund',
  'ICICI Prudential Mutual Fund',
  'Nippon India Mutual Fund',
  'Kotak Mutual Fund',
];

const createEmiPlans = (price, index = 0) => {
  const planBlueprints = [
    { tenureMonths: 3, interestRate: 0, feeRatio: 0.004, cashbackRatio: 0.004 },
    { tenureMonths: 6, interestRate: 0, feeRatio: 0.006, cashbackRatio: 0.008 },
    { tenureMonths: 9, interestRate: 7.5, feeRatio: 0.008, cashbackRatio: 0.01 },
    { tenureMonths: 12, interestRate: 9.99, feeRatio: 0.01, cashbackRatio: 0.015 },
    { tenureMonths: 18, interestRate: 12.5, feeRatio: 0.012, cashbackRatio: 0.02 },
  ];

  return planBlueprints.map((blueprint, planIndex) => {
    const monthlyCore = price / blueprint.tenureMonths;
    const monthlyFee = (price * blueprint.feeRatio) / blueprint.tenureMonths;

    return {
      fundName: fundPool[(index + planIndex) % fundPool.length],
      monthlyPayment: Math.round(monthlyCore + monthlyFee),
      tenureMonths: blueprint.tenureMonths,
      interestRate: blueprint.interestRate,
      cashback: Math.round(price * blueprint.cashbackRatio),
    };
  });
};

const createVariantImages = (index = 0) => {
  const images = [];

  for (let cursor = 0; cursor < 5; cursor += 1) {
    images.push(imagePool[(index + cursor) % imagePool.length]);
  }

  return images;
};

const additionalProductConfigs = [
  { name: 'Google Pixel 9 Pro', slug: 'google-pixel-9-pro', shortDescription: 'Pixel flagship with advanced AI camera features.', basePrice: 109999 },
  { name: 'Xiaomi 14 Ultra', slug: 'xiaomi-14-ultra', shortDescription: 'Premium Xiaomi camera-centric flagship experience.', basePrice: 99999 },
  { name: 'Vivo X200 Pro', slug: 'vivo-x200-pro', shortDescription: 'Flagship Vivo phone with ZEISS imaging system.', basePrice: 94999 },
  { name: 'Oppo Find X8 Pro', slug: 'oppo-find-x8-pro', shortDescription: 'Sleek design with powerful all-day performance.', basePrice: 92999 },
  { name: 'Realme GT 7 Pro', slug: 'realme-gt-7-pro', shortDescription: 'Performance-focused flagship killer smartphone.', basePrice: 64999 },
  { name: 'Nothing Phone 3', slug: 'nothing-phone-3', shortDescription: 'Minimal design with clean software experience.', basePrice: 54999 },
  { name: 'Motorola Edge 60 Pro', slug: 'motorola-edge-60-pro', shortDescription: 'Curved display and balanced flagship hardware.', basePrice: 57999 },
  { name: 'iQOO 14', slug: 'iqoo-14', shortDescription: 'High-refresh performance phone for gamers.', basePrice: 61999 },
  { name: 'Asus ROG Phone 9', slug: 'asus-rog-phone-9', shortDescription: 'Gaming powerhouse with thermal optimization.', basePrice: 89999 },
  { name: 'Sony Xperia 1 VI', slug: 'sony-xperia-1-vi', shortDescription: 'Creator-focused smartphone with pro camera controls.', basePrice: 119999 },
  { name: 'Huawei P70 Pro', slug: 'huawei-p70-pro', shortDescription: 'Premium build with versatile multi-camera setup.', basePrice: 97999 },
  { name: 'Honor Magic 7 Pro', slug: 'honor-magic-7-pro', shortDescription: 'Flagship Honor model with vivid LTPO display.', basePrice: 88999 },
  { name: 'Nokia X50 Ultra', slug: 'nokia-x50-ultra', shortDescription: 'Durable smartphone with clean Android experience.', basePrice: 52999 },
  { name: 'Infinix Zero Ultra 2', slug: 'infinix-zero-ultra-2', shortDescription: 'Value flagship with ultra-fast charging.', basePrice: 45999 },
  { name: 'Tecno Phantom X3 Pro', slug: 'tecno-phantom-x3-pro', shortDescription: 'Large display and strong multimedia performance.', basePrice: 42999 },
  { name: 'Lava Agni X Pro', slug: 'lava-agni-x-pro', shortDescription: 'Made-for-India flagship with reliable 5G.', basePrice: 39999 },
  { name: 'Poco F7 Ultra', slug: 'poco-f7-ultra', shortDescription: 'Aggressive performance and flagship-grade display.', basePrice: 51999 },
  { name: 'Redmi K90 Pro', slug: 'redmi-k90-pro', shortDescription: 'Top-end chipset with camera-focused tuning.', basePrice: 56999 },
  { name: 'Samsung Galaxy Z Fold 7', slug: 'samsung-galaxy-z-fold-7', shortDescription: 'Foldable flagship with tablet-like productivity.', basePrice: 169999 },
  { name: 'Apple iPhone 17', slug: 'apple-iphone-17', shortDescription: 'Latest iPhone with fast performance and strong battery.', basePrice: 89999 },
];

const additionalProducts = additionalProductConfigs.map((config, index) => {
  const storageUpgrade = 12000 + (index % 4) * 2000;
  const baseMrp = config.basePrice + 6000;
  const proMrp = config.basePrice + storageUpgrade + 8000;

  return {
    name: config.name,
    slug: config.slug,
    shortDescription: config.shortDescription,
    variants: [
      {
        name: '256 GB · Standard',
        mrp: baseMrp,
        price: config.basePrice,
        imageUrl: imagePool[index % imagePool.length],
        emiPlans: createEmiPlans(config.basePrice, index),
      },
      {
        name: '512 GB · Premium',
        mrp: proMrp,
        price: config.basePrice + storageUpgrade,
        imageUrl: imagePool[(index + 1) % imagePool.length],
        emiPlans: createEmiPlans(config.basePrice + storageUpgrade, index + 2),
      },
    ],
  };
});

const products = [
  {
    name: 'Apple iPhone 17 Pro',
    slug: 'apple-iphone-17-pro',
    shortDescription: 'Flagship Apple smartphone with Pro camera system.',
    variants: [
      {
        name: '256 GB · Silver',
        mrp: 149900,
        price: 142999,
        imageUrl:
          'https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 11917, tenureMonths: 12, interestRate: 0, cashback: 3000 },
          { monthlyPayment: 6560, tenureMonths: 24, interestRate: 10.5, cashback: 2000 },
        ],
      },
      {
        name: '512 GB · Space Black',
        mrp: 169900,
        price: 162499,
        imageUrl:
          'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 13542, tenureMonths: 12, interestRate: 0, cashback: 5000 },
          { monthlyPayment: 7452, tenureMonths: 24, interestRate: 10.5, cashback: 2500 },
        ],
      },
    ],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    shortDescription: 'Premium Samsung device with S Pen and AI features.',
    variants: [
      {
        name: '256 GB · Titanium Gray',
        mrp: 129999,
        price: 122499,
        imageUrl:
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 10208, tenureMonths: 12, interestRate: 0, cashback: 2500 },
          { monthlyPayment: 5608, tenureMonths: 24, interestRate: 9.5, cashback: 1500 },
        ],
      },
      {
        name: '512 GB · Titanium Violet',
        mrp: 139999,
        price: 133499,
        imageUrl:
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 11125, tenureMonths: 12, interestRate: 0, cashback: 3000 },
          { monthlyPayment: 6112, tenureMonths: 24, interestRate: 9.5, cashback: 2000 },
        ],
      },
    ],
  },
  {
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    shortDescription: 'High-performance phone with fast charging.',
    variants: [
      {
        name: '256 GB · Arctic Dawn',
        mrp: 74999,
        price: 69999,
        imageUrl:
          'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 5833, tenureMonths: 12, interestRate: 0, cashback: 1500 },
          { monthlyPayment: 3275, tenureMonths: 24, interestRate: 8.99, cashback: 1000 },
        ],
      },
      {
        name: '512 GB · Obsidian Black',
        mrp: 82999,
        price: 77999,
        imageUrl:
          'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=900&q=80',
        emiPlans: [
          { monthlyPayment: 6500, tenureMonths: 12, interestRate: 0, cashback: 2000 },
          { monthlyPayment: 3651, tenureMonths: 24, interestRate: 8.99, cashback: 1200 },
        ],
      },
    ],
  },
  ...additionalProducts,
];

const normalizedProducts = products.map((product, productIndex) => ({
  ...product,
  variants: product.variants.map((variant, variantIndex) => {
    const seedIndex = productIndex * 2 + variantIndex;
    const images = createVariantImages(seedIndex);

    return {
      ...variant,
      imageUrl: images[0],
      images,
      emiPlans: createEmiPlans(variant.price, seedIndex),
    };
  }),
}));

const seed = async () => {
  try {
    await connectDb();
    await Product.deleteMany({});
    await Product.insertMany(normalizedProducts);
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
