export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  priceVal: number;
  originalPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  stock: number;
  sold: number;
}

export const CATEGORIES = [
  'All Products',
  'Head Protection',
  'Footwear',
  'Fire Safety',
  'Apparel',
  'Fall Protection',
  'Hearing & Eye',
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vanguard Industrial Hard Hat',
    category: 'Head Protection',
    price: '$150.50',
    priceVal: 150.50,
    originalPrice: '$180.00',
    discount: '-16%',
    rating: 4.8,
    reviews: 36,
    image: '/ams-product-removebg-preview.webp',
    description: 'ANSI Z89.1 certified Type I Class E hard hat. Engineered with a high-density ABS polymer shell and a 6-point suspension ratchet system for premium impact absorption. Designed specifically for uncompromised safety in mining, construction, and heavy industrial sites.',
    features: [
      'ANSI Z89.1-2014 Type I Class E certification',
      '6-point ratchet suspension for customized fit',
      'High-density impact-absorbing ABS outer shell',
      'Integrated sweatband and breathable ventilation slots'
    ],
    specs: {
      'Shell Material': 'High-impact ABS Polymer',
      'Suspension': '6-point ratchet suspension',
      'Certification': 'ANSI Z89.1 Type I Class E',
      'Weight': '420g',
      'Country of Origin': 'USA'
    },
    stock: 544,
    sold: 256,
  },
  {
    id: '2',
    name: 'ProShield Steel Toe Safety Boots',
    category: 'Footwear',
    price: '$160.40',
    priceVal: 160.40,
    originalPrice: '$200.00',
    discount: '-20%',
    rating: 4.9,
    reviews: 42,
    image: '/prod-boots.webp',
    description: 'ASTM F2413 certified steel toe safety boots. Features oil-resistant, puncture-resistant rubber outsoles with high-traction treads and full-grain waterproof leather. Handcrafted to offer max comfort and support on structural rigs and heavy manufacturing shop floors.',
    features: [
      'ASTM F2413-18 Steel Toe impact protection',
      'Slip-resistant, oil-resistant rubber traction outsole',
      'Handcrafted full-grain waterproof leather upper',
      'Anti-fatigue dual-density comfort footbed'
    ],
    specs: {
      'Toe Protection': 'Steel Toe Cap (ASTM F2413)',
      'Upper Material': 'Full-Grain Leather',
      'Sole Material': 'Oil-resistant Rubber',
      'Waterproofing': 'Breathable Waterproof Membrane',
      'Weight': '820g per boot'
    },
    stock: 312,
    sold: 198,
  },
  {
    id: '3',
    name: 'Titan ABC Fire Extinguisher 5kg',
    category: 'Fire Safety',
    price: '$120.30',
    priceVal: 120.30,
    originalPrice: '$150.00',
    discount: '-20%',
    rating: 4.7,
    reviews: 28,
    image: '/prod-extinguisher.webp',
    description: 'Multi-purpose dry chemical fire extinguisher certified for Class A, B, and C fires. Built with a durable metal valve assembly, clear pressure gauge, and mounting bracket. Essential safety equipment for warehouses, marine operations, and kitchens.',
    features: [
      'Certified Class A, B, and C multi-purpose protection',
      'Heavy-duty commercial grade brass valve assembly',
      'Color-coded pressure gauge for instant status checks',
      'Wall mounting bracket included in package'
    ],
    specs: {
      'Agent Type': 'Monoammonium Phosphate',
      'Capacity': '5.0 kg',
      'Discharge Time': '15.2 seconds',
      'Operating Pressure': '195 PSI',
      'Certifications': 'UL Listed, ABC Rated'
    },
    stock: 450,
    sold: 112,
  },
  {
    id: '4',
    name: 'High-Vis Thermal Safety Jacket',
    category: 'Apparel',
    price: '$120.99',
    priceVal: 120.99,
    originalPrice: '$145.00',
    discount: '-16%',
    rating: 4.8,
    reviews: 31,
    image: '/prod-jacket.webp',
    description: 'ANSI/ISEA 107 Class 3 certified high-visibility safety jacket. Constructed with heavy-duty thermal insulation, a windproof/waterproof exterior shell, and premium 2-inch reflective strips. Built to keep operators visible and warm in extreme sub-zero field operations.',
    features: [
      'ANSI/ISEA 107 Class 3 high-visibility standard',
      'Waterproof seam-sealed 300D Oxford polyester outer shell',
      'Removable high-loft thermal fleece inner lining',
      '2-inch silver glass bead reflective safety strips'
    ],
    specs: {
      'Class Standard': 'ANSI Class 3',
      'Shell Fabric': '300D Oxford Polyester with PU coating',
      'Reflective Tape': '2" Silver Glass Bead',
      'Waterproof Rating': '5,000mm hydrostatic head',
      'Thermal Rating': 'Comfortable down to -20°C'
    },
    stock: 280,
    sold: 165,
  },
  {
    id: '5',
    name: 'Quantum Full-Body Fall Harness',
    category: 'Fall Protection',
    price: '$150.50',
    priceVal: 150.50,
    originalPrice: '$185.00',
    discount: '-18%',
    rating: 4.9,
    reviews: 24,
    image: '/prod-harness.webp',
    description: 'Premium fall protection harness featuring a zinc-plated alloy steel rear D-ring, quick-connect leg straps, and ergonomically padded shoulder/hip supports. OSHA and ANSI compliant. Offers ultimate safety, reliability, and all-day comfort for high-altitude steel workers.',
    features: [
      'OSHA 1926 & ANSI Z359.11 compliant safety harness',
      'Zinc-plated alloy steel back D-ring for secure anchorage',
      'Molded foam shoulder and waist pads for pressure relief',
      'Quick-connect chest and leg strap buckles'
    ],
    specs: {
      'Weight Capacity': '140 kg (including gear)',
      'Webbing Material': 'High-tenacity Polyester Webbing',
      'D-Ring Material': 'Alloy Steel (Zinc-plated)',
      'Standards': 'ANSI Z359.11, OSHA 1926.502',
      'Weight': '1.85 kg'
    },
    stock: 140,
    sold: 89,
  },
  {
    id: '6',
    name: 'Acoustic Pro Ear Defenders 34dB',
    category: 'Hearing & Eye',
    price: '$110.20',
    priceVal: 110.20,
    originalPrice: '$130.00',
    discount: '-15%',
    rating: 4.6,
    reviews: 19,
    image: '/prod-earmuffs.webp',
    description: 'High-attenuation hearing defenders with 34dB Noise Reduction Rating (NRR). Twin-cup design with soft liquid-foam cushions offers exceptional pressure equalization and noise reduction. Specially designed for airport tarmacs, mining, and drilling rigs.',
    features: [
      'Ultra-high 34dB Noise Reduction Rating (NRR)',
      'Twin-cup acoustic housing to minimize low-frequency rumble',
      'Padded stainless steel headband for consistent clamping force',
      'Replaceable liquid/gel filled ear cushions'
    ],
    specs: {
      'Noise Reduction': '34dB NRR',
      'Cup Material': 'ABS High-Impact Polymer',
      'Headband': 'Stainless Steel wire core, padded',
      'Weight': '350g',
      'Standard': 'ANSI S3.19, CE EN352-1'
    },
    stock: 670,
    sold: 340,
  },
  {
    id: '7',
    name: 'Stealth Z87 Clear Safety Glasses',
    category: 'Hearing & Eye',
    price: '$85.50',
    priceVal: 85.50,
    originalPrice: '$100.00',
    discount: '-15%',
    rating: 4.7,
    reviews: 52,
    image: '/prod-glasses.webp',
    description: 'ANSI Z87.1 certified anti-fog, scratch-resistant protective eyewear. Sleek frameless design with wrap-around polycarbonate lens offers uncompromised lateral coverage and 99.9% UVA/UVB protection. Ideal for manufacturing, cleanrooms, and wood shops.',
    features: [
      'ANSI Z87.1-2015 high impact certification',
      'Dual-action anti-fog and anti-scratch hard lens coatings',
      'Wrap-around design with clear visual clarity',
      '99.9% UVA/UVB/UVC radiation protection'
    ],
    specs: {
      'Lens Material': 'Optical Grade Polycarbonate',
      'Frame Type': 'Frameless Wrap-Around',
      'Certifications': 'ANSI Z87.1+, CSA Z94.3',
      'UV Protection': '99.9% UV filter',
      'Weight': '28g'
    },
    stock: 920,
    sold: 610,
  },
  {
    id: '8',
    name: 'Apex Heavy Duty Welding Visor',
    category: 'Head Protection',
    price: '$175.00',
    priceVal: 175.00,
    originalPrice: '$210.00',
    discount: '-16%',
    rating: 4.8,
    reviews: 33,
    image: '/ams-product-removebg-preview.webp', // We reuse the hard hat style or general styling
    description: 'Professional auto-darkening welding visor with shade variable DIN 9-13. Equipped with four arc sensors, solar-assisted cell power, and a high-definition optical viewport. Provides complete face and eye shielding from UV/IR rays during TIG/MIG/Arc welding.',
    features: [
      'Variable Shade DIN 9-13 auto-darkening lens',
      '4 independent arc sensors for lightning-fast 1/25,000s switching',
      'Optical clarity rating 1/1/1/2 for true-color welding',
      'Comfort-fit halo harness with multi-point adjustments'
    ],
    specs: {
      'Shade Control': 'DIN 9-13 Variable',
      'Arc Sensors': '4 sensors',
      'Switching Speed': '1/25,000 second',
      'Optical Rating': '1/1/1/2 optical class',
      'Power Source': 'Solar cell + replaceable CR2032 batteries'
    },
    stock: 150,
    sold: 72,
  },
];
