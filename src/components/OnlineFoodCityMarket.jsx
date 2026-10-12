import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  Tag,
  ThermometerSnowflake,
  ShieldCheck,
  Truck,
  Check,
  CheckCircle,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Info,
  Calendar,
  Percent,
  RefreshCw,
  Award,
} from 'lucide-react';

// Comprehensive Sri Lankan Food City Produce & Grocery Catalog
export const FOOD_CITY_PRODUCTS = [
  // 1. Highland Vegetables
  {
    id: 'fc-01',
    title: 'Nuwara Eliya Crisp Carrots',
    sinhalaName: 'නුවරඑළිය කැරට්',
    category: 'HIGHLAND',
    categoryLabel: 'Highland Veg',
    farm: 'Green Valley Organic Estate',
    district: 'Nuwara Eliya',
    priceLkr: 240,
    originalPriceLkr: 280,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '4°C Strict Cold Chain',
    stockKg: 1450,
    rating: 4.9,
    reviews: 184,
    discountBadge: '15% OFF',
    isOrganic: true,
    harvestTime: 'Harvested Today, 5:30 AM',
    image:
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80',
    description:
      'Premium export-grade crisp orange carrots harvested directly from highland volcanic soils in Nuwara Eliya. Packed in ventilated eco-crates.',
    nutritionalTip: 'High in Beta-Carotene & Vitamin A. Farmed with zero synthetic nitrates.',
  },
  {
    id: 'fc-02',
    title: 'Highland Crisp Tender Leeks',
    sinhalaName: 'නුවරඑළිය ලීක්ස්',
    category: 'HIGHLAND',
    categoryLabel: 'Highland Veg',
    farm: 'Kandapola Agro Depot',
    district: 'Nuwara Eliya',
    priceLkr: 180,
    originalPriceLkr: 220,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '4°C Cold Chain',
    stockKg: 920,
    rating: 4.8,
    reviews: 112,
    discountBadge: '18% OFF',
    isOrganic: false,
    harvestTime: 'Harvested Today, 6:00 AM',
    image:
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80',
    description:
      'Tender white-stemmed highland leeks, washed and trimmed for direct kitchen preparation. Shipped under refrigerated transit.',
    nutritionalTip: 'Rich in dietary fiber and allicin for cardiovascular wellness.',
  },
  {
    id: 'fc-03',
    title: 'Welimada Golden Table Potatoes',
    sinhalaName: 'වැලිමඩ අල',
    category: 'HIGHLAND',
    categoryLabel: 'Highland Veg',
    farm: 'Welimada Farmers Cooperative',
    district: 'Badulla',
    priceLkr: 195,
    originalPriceLkr: 230,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Insulated Ambient (12°C - 16°C)',
    stockKg: 3200,
    rating: 4.9,
    reviews: 240,
    discountBadge: '15% OFF',
    isOrganic: true,
    harvestTime: 'Harvested Yesterday Afternoon',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    description:
      'Authentic local Welimada table potatoes with thin golden skin and rich starchy texture. Ideal for curries, baking, and boiling.',
    nutritionalTip: 'Natural potassium and complex carbohydrates for sustained energy.',
  },
  {
    id: 'fc-04',
    title: 'Hakgala Garden Beetroot',
    sinhalaName: 'නැවුම් බීට්රූට්',
    category: 'HIGHLAND',
    categoryLabel: 'Highland Veg',
    farm: 'Hakgala Botanical Perimeter Farms',
    district: 'Nuwara Eliya',
    priceLkr: 220,
    originalPriceLkr: null,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '6°C Chilled',
    stockKg: 680,
    rating: 4.7,
    reviews: 88,
    discountBadge: null,
    isOrganic: true,
    harvestTime: 'Harvested Today, 6:15 AM',
    image:
      'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=500&q=80',
    description:
      'Deep crimson roots with firm sweetness. Grown under mist-shrouded mountain climates and packed immediately after cleaning.',
    nutritionalTip: 'Packed with nitrates and antioxidants that promote stamina and nitric oxide production.',
  },

  // 2. Lowland & Country Veg
  {
    id: 'fc-05',
    title: 'Dambulla Red Big Onions',
    sinhalaName: 'දඹුල්ල ලොකු ළූණු',
    category: 'LOWLAND',
    categoryLabel: 'Lowland Veg',
    farm: 'Rathna Agro Produce Hub',
    district: 'Matale',
    priceLkr: 310,
    originalPriceLkr: 360,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Dry Insulated Cargo',
    stockKg: 2800,
    rating: 4.8,
    reviews: 310,
    discountBadge: '14% OFF',
    isOrganic: false,
    harvestTime: 'Cured & Graded 2 Days Ago',
    image:
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
    description:
      'Thick-layered, sun-cured big onions sourced directly from the Dambulla Dedicated Economic Centre. Low moisture content ensures long kitchen shelf life.',
    nutritionalTip: 'High quercetin flavonoids providing natural immune support.',
  },
  {
    id: 'fc-06',
    title: 'Galewela Green Capsicum & Bell Peppers',
    sinhalaName: 'මාළු මිරිස්',
    category: 'LOWLAND',
    categoryLabel: 'Lowland Veg',
    farm: 'Galewela Harvest Depot',
    district: 'Matale',
    priceLkr: 420,
    originalPriceLkr: null,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '7°C Cold Chain',
    stockKg: 490,
    rating: 4.9,
    reviews: 79,
    discountBadge: 'Farm Fresh',
    isOrganic: true,
    harvestTime: 'Harvested Today, 7:00 AM',
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=80',
    description:
      'Crisp, thick-walled green capsicum with mild natural heat. Shipped in cushioned mesh containers to avoid skin bruising.',
    nutritionalTip: 'High vitamin C concentration — exceeds citrus fruits per 100 grams.',
  },
  {
    id: 'fc-07',
    title: 'Jaffna Red Sweet Shallots',
    sinhalaName: 'යාපනයේ රතු ළූණු',
    category: 'LOWLAND',
    categoryLabel: 'Lowland Veg',
    farm: 'Chavakachcheri Agro Cooperative',
    district: 'Jaffna',
    priceLkr: 380,
    originalPriceLkr: 440,
    unit: '500 g',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Dry Insulated Cargo',
    stockKg: 1200,
    rating: 5.0,
    reviews: 145,
    discountBadge: 'Jaffna Direct',
    isOrganic: true,
    harvestTime: 'Direct A9 Corridor Express',
    image:
      'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=500&q=80',
    description:
      'Intensely aromatic small red shallots from northern sandy soils. The cornerstone of authentic Sri Lankan curries and sambols.',
    nutritionalTip: 'Renowned in traditional Ayurveda for respiratory vitality.',
  },
  {
    id: 'fc-08',
    title: 'Thambuththegama Golden Sweet Pumpkin',
    sinhalaName: 'රන් වට්ටක්කා',
    category: 'LOWLAND',
    categoryLabel: 'Lowland Veg',
    farm: 'Rajarata Agro Farms',
    district: 'Anuradhapura',
    priceLkr: 140,
    originalPriceLkr: null,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Ambient Cargo',
    stockKg: 2400,
    rating: 4.7,
    reviews: 94,
    discountBadge: null,
    isOrganic: true,
    harvestTime: 'Picked Yesterday',
    image:
      'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=500&q=80',
    description:
      'Naturally sweet, velvety yellow-flesh pumpkin grown under dry zone sunshine. Heavy, thick rind protects inner flesh during transport.',
    nutritionalTip: 'Rich in lutein and dietary fiber, easily digestible.',
  },

  // 3. Tropical Island Fruits
  {
    id: 'fc-09',
    title: 'Kartha Kolomban Sweet Mangoes',
    sinhalaName: 'කාර්ත කොළඹන් අඹ',
    category: 'FRUITS',
    categoryLabel: 'Island Fruits',
    farm: 'Mahawa Sunlit Orchards',
    district: 'Kurunegala',
    priceLkr: 450,
    originalPriceLkr: 520,
    unit: '1 kg',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '12°C Controlled Atmosphere',
    stockKg: 780,
    rating: 5.0,
    reviews: 260,
    discountBadge: 'Top Bestseller',
    isOrganic: true,
    harvestTime: 'Tree-ripened, Hand-picked Today',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
    description:
      'Sri Lanka’s most celebrated mango variety. Fibreless golden flesh bursting with aromatic floral sweetness.',
    nutritionalTip: 'Loaded with enzymes that assist digestion and vibrant Vitamin C.',
  },
  {
    id: 'fc-10',
    title: 'Rathnapura Red Sweet Papaya',
    sinhalaName: 'පැණි ගස්ලබු',
    category: 'FRUITS',
    categoryLabel: 'Island Fruits',
    farm: 'Kuruwita Agro Groves',
    district: 'Ratnapura',
    priceLkr: 190,
    originalPriceLkr: null,
    unit: '1 fruit (~1.5 kg)',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '10°C Chilled Transit',
    stockKg: 620,
    rating: 4.9,
    reviews: 130,
    discountBadge: 'Fresh Harvest',
    isOrganic: true,
    harvestTime: 'Harvested Yesterday Afternoon',
    image:
      'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80',
    description:
      'Deep salmon-red tropical papaya with velvety texture and minimal seeds. Shipped in protective foam sleeves.',
    nutritionalTip: 'Contains papain enzyme, excellent for gut health and digestive comfort.',
  },
  {
    id: 'fc-11',
    title: 'Cavendish Farm Bananas (ඇවරිය)',
    sinhalaName: 'කෙසෙල් ඇවරිය',
    category: 'FRUITS',
    categoryLabel: 'Island Fruits',
    farm: 'Embilipitiya Riverbank Groves',
    district: 'Monaragala',
    priceLkr: 210,
    originalPriceLkr: 250,
    unit: '1 kg (Bunch)',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Ventilated Green Cargo',
    stockKg: 1100,
    rating: 4.8,
    reviews: 95,
    discountBadge: '16% OFF',
    isOrganic: false,
    harvestTime: 'Direct Farm Dispatch',
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    description:
      'Flawless yellow Cavendish bananas, harvested at mature green stage and naturally ripened in temperature-controlled rooms.',
    nutritionalTip: 'Instant source of electrolytes and vitamin B6.',
  },

  // 4. Farm Dairy & Poultry
  {
    id: 'fc-12',
    title: 'Traditional Ruhunu Buffalo Curd (Clay Pot)',
    sinhalaName: 'රුහුණු මී කිරි හට්ටිය',
    category: 'DAIRY',
    categoryLabel: 'Dairy & Curd',
    farm: 'Tissamaharama Heritage Dairy',
    district: 'Hambantota',
    priceLkr: 480,
    originalPriceLkr: 540,
    unit: '1 Clay Pot (850 ml)',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '4°C Strict Reefer',
    stockKg: 350,
    rating: 5.0,
    reviews: 310,
    discountBadge: 'Clay Pot Sealed',
    isOrganic: true,
    harvestTime: 'Freshly Set in Unglazed Clay Pots',
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=500&q=80',
    description:
      'Pure buffalo milk naturally fermented inside porous clay pots in Ruhuna. Thick, creamy, and mildly tart. Best paired with Kithul treacle.',
    nutritionalTip: 'High probiotic live cultures, double the protein of ordinary cow yogurt.',
  },
  {
    id: 'fc-13',
    title: 'Ambewela Fresh Farm Cow Milk',
    sinhalaName: 'නැවුම් එළකිරි',
    category: 'DAIRY',
    categoryLabel: 'Dairy & Curd',
    farm: 'Ambewela Highland Pastures',
    district: 'Nuwara Eliya',
    priceLkr: 360,
    originalPriceLkr: null,
    unit: '1 Litre Bottle',
    step: 1,
    minQty: 1,
    isColdChain: true,
    tempRequirement: '2°C - 4°C Strict Cold Chain',
    stockKg: 800,
    rating: 4.9,
    reviews: 175,
    discountBadge: 'Pasteurized',
    isOrganic: true,
    harvestTime: 'Bottled at Dawn, 4:30 AM',
    image:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
    description:
      '100% pure whole cow milk from grass-fed Friesian cattle in high-altitude Ambewela pastures. Gently pasteurized to preserve full creaminess.',
    nutritionalTip: 'Natural calcium, bioavailable protein, and Vitamin D3.',
  },
  {
    id: 'fc-14',
    title: 'Free-Range Country Brown Eggs (10 Pack)',
    sinhalaName: 'ගමේ බිත්තර (10 ඇසුරුම)',
    category: 'DAIRY',
    categoryLabel: 'Dairy & Curd',
    farm: 'Kuliyapitiya Village Poultry Cooperative',
    district: 'Kurunegala',
    priceLkr: 440,
    originalPriceLkr: 480,
    unit: '10 Pack Crate',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Shock-proof Insulated Carton',
    stockKg: 950,
    rating: 4.9,
    reviews: 210,
    discountBadge: 'Farm Fresh',
    isOrganic: true,
    harvestTime: 'Collected Today',
    image:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=500&q=80',
    description:
      'Eggs from free-roaming village hens fed on natural grains and greens. Rich golden yolks and thick shells packed in molded pulp cartons.',
    nutritionalTip: 'Complete amino acid profile and high choline for brain health.',
  },

  // 5. Rice, Grains & Staples
  {
    id: 'fc-15',
    title: 'Araliya Premium Keeri Samba Rice',
    sinhalaName: 'කීරි සම්බා සහල්',
    category: 'STAPLES',
    categoryLabel: 'Rice & Staples',
    farm: 'Polonnaruwa Valley Mills',
    district: 'Polonnaruwa',
    priceLkr: 1450,
    originalPriceLkr: 1600,
    unit: '5 kg Sealed Bag',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Dry Cargo Safe',
    stockKg: 5000,
    rating: 4.9,
    reviews: 420,
    discountBadge: 'Save LKR 150',
    isOrganic: false,
    harvestTime: 'Polonnaruwa Maha Harvest',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    description:
      'Small, delicate pearls of aromatic Keeri Samba rice. Boils to light, non-sticky fluffiness with a distinct fragrance.',
    nutritionalTip: 'Low glycaemic index compared to polished long-grain rice.',
  },
  {
    id: 'fc-16',
    title: 'Organic Suwandel Heritage Ceylon Rice',
    sinhalaName: 'සුවඳැල් පාරම්පරික සහල්',
    category: 'STAPLES',
    categoryLabel: 'Rice & Staples',
    farm: 'Maha Oya Heritage Organic Lands',
    district: 'Ampara',
    priceLkr: 520,
    originalPriceLkr: null,
    unit: '1 kg Vacuum Pack',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Vacuum Sealed Pack',
    stockKg: 650,
    rating: 5.0,
    reviews: 148,
    discountBadge: 'Heritage Organic',
    isOrganic: true,
    harvestTime: 'Traditional Indigenous Strain',
    image:
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80',
    description:
      'Ancient indigenous rice variety famed for its floral aroma (Suwanda) and milk-like flavor. Cultivated using traditional non-chemical composting.',
    nutritionalTip: 'Renowned in Hela Wedakama for hormonal harmony and skin radiance.',
  },
  {
    id: 'fc-17',
    title: 'Pure Ceylon Alba Cinnamon Sticks',
    sinhalaName: 'සැබෑ කුරුඳු (Alba Grade)',
    category: 'SPICES',
    categoryLabel: 'Spices & Herbs',
    farm: 'Galle Coastal Spice Plantations',
    district: 'Galle',
    priceLkr: 680,
    originalPriceLkr: 750,
    unit: '100 g Sealed Tube',
    step: 1,
    minQty: 1,
    isColdChain: false,
    tempRequirement: 'Sealed Dry Goods',
    stockKg: 420,
    rating: 5.0,
    reviews: 180,
    discountBadge: 'True Ceylon',
    isOrganic: true,
    harvestTime: 'Fresh Quill Harvest',
    image:
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=500&q=80',
    description:
      'Top-tier Alba pencil-thin Ceylon cinnamon quills. Sweet, subtle aroma with ultra-low coumarin content, safe for daily culinary use.',
    nutritionalTip: 'Potent polyphenol antioxidant that naturally regulates blood sugar levels.',
  },
];

export default function OnlineFoodCityMarket({
  onPlaceOrder,
  onTrackOrder,
  onOpenPod,
  showToast,
  currentUser,
}) {
  // Department filter
  const [selectedDept, setSelectedDept] = useState('ALL');
  // Feature filters
  const [coldChainOnly, setColdChainOnly] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // Sorting
  const [sortBy, setSortBy] = useState('FEATURED');

  // Customer Shopping Basket State: { [productId]: quantity }
  const [cart, setCart] = useState({
    'fc-01': 2, // 2kg carrots default demo
    'fc-12': 1, // 1 clay pot curd default demo
  });

  // Animated added notification on card
  const [justAddedId, setJustAddedId] = useState(null);

  // Trolley Slide-over Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick View Product Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Delivery Checkout Details inside Cart
  const [deliveryDistrict, setDeliveryDistrict] = useState('Colombo');
  const [deliveryAddress, setDeliveryAddress] = useState('No 42, Galle Road, Kollupitiya, Colombo 03');
  const [deliveryPhone, setDeliveryPhone] = useState('+94 77 123 4567');
  const [deliverySlot, setDeliverySlot] = useState('EXPRESS_3H'); // EXPRESS_3H | MORNING | EVENING
  const [deliveryNotes, setDeliveryNotes] = useState('Please handle cold-chain curd with care.');

  // Promo Code
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'FOODCITY15', discountPct: 15 }

  // Order Confirmed State Modal
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Calculate cart counts
  const cartItemIds = Object.keys(cart).filter((id) => cart[id] > 0);
  const totalCartCount = cartItemIds.reduce((sum, id) => sum + cart[id], 0);

  const cartItemsList = cartItemIds.map((id) => {
    const prod = FOOD_CITY_PRODUCTS.find((p) => p.id === id);
    const qty = cart[id];
    return {
      ...prod,
      qty,
      subtotalLkr: (prod?.priceLkr || 0) * qty,
    };
  });

  const cartSubtotalLkr = cartItemsList.reduce((acc, item) => acc + item.subtotalLkr, 0);

  // Logistics & Delivery Fee Calculation
  const isColdChainPresent = cartItemsList.some((item) => item.isColdChain);
  const baseLogisticsFee = isColdChainPresent ? 350 : 250;
  const deliveryFeeLkr =
    appliedCoupon?.code === 'FREEDISPATCH' || cartSubtotalLkr > 3500 ? 0 : baseLogisticsFee;
  const ecoCrateDepositLkr = cartItemIds.length > 0 ? 150 : 0; // Refundable upon empty crate return

  // Discount
  const discountLkr = appliedCoupon ? Math.round(cartSubtotalLkr * (appliedCoupon.discountPct / 100)) : 0;
  const finalTotalLkr = Math.max(0, cartSubtotalLkr + deliveryFeeLkr + ecoCrateDepositLkr - discountLkr);

  // Add / Increment Item
  const handleAddToCart = (product, delta = 1) => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [product.id]: next };
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);

    if (showToast && delta > 0) {
      showToast(`Added ${product.title} to your Food City Trolley!`, 'info');
    }
  };

  // Remove completely
  const handleRemoveItem = (productId) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'FOODCITY15') {
      setAppliedCoupon({ code: 'FOODCITY15', discountPct: 15 });
      if (showToast) showToast('Coupon FOODCITY15 applied: 15% discount deducted!');
    } else if (clean === 'FREEDISPATCH') {
      setAppliedCoupon({ code: 'FREEDISPATCH', discountPct: 0 });
      if (showToast) showToast('Coupon FREEDISPATCH applied: Cold-chain delivery is FREE!');
    } else {
      if (showToast) showToast('Invalid promo code. Try "FOODCITY15" or "FREEDISPATCH"', 'error');
    }
  };

  // Handle Order Placement -> Links to Module 02
  const handleConfirmOrder = () => {
    if (cartItemsList.length === 0) return;

    const newOrderId = `ORD-${Math.floor(9000 + Math.random() * 1000)}`;
    const newShipmentId = `SHP-${Math.floor(710 + Math.random() * 90)}`;
    const otpCode = String(Math.floor(1000 + Math.random() * 9000));
    const itemsDescription = cartItemsList.map((i) => `${i.title} (${i.qty}x)`).join(', ');
    const totalWeightEstKg = cartItemsList.reduce((acc, i) => acc + i.qty * 1.5, 0);

    const orderPayload = {
      orderId: newOrderId,
      produce: `${cartItemsList[0].title} & ${cartItemsList.length - 1} other grocery items`,
      quantityKg: Math.round(totalWeightEstKg),
      cratesCount: Math.ceil(cartItemsList.length * 1.2),
      pickupLocation: {
        farm: cartItemsList[0].farm,
        district: cartItemsList[0].district,
      },
      dropoffLocation: {
        destination: deliveryAddress,
        district: deliveryDistrict,
      },
      temperatureReq: isColdChainPresent ? '4°C Strict Cold Chain' : 'Insulated Ambient',
      buyerName: currentUser?.name || 'Customer Supermarket Order',
      notes: `${itemsDescription}. ${deliveryNotes}`,
      autoMatchDriver: true,
      otpCode,
    };

    if (onPlaceOrder) {
      onPlaceOrder(orderPayload);
    }

    setConfirmedOrder({
      orderId: newOrderId,
      shipmentId: newShipmentId,
      otpCode,
      items: cartItemsList,
      totalLkr: finalTotalLkr,
      deliveryDistrict,
      deliveryAddress,
      deliverySlot,
      assignedDriver: 'Ruwan Fernando (Isuzu Refrigerated Truck)',
      driverPhone: '+94 77 412 8890',
      eta: deliverySlot === 'EXPRESS_3H' ? 'Within 2.5 Hours' : 'Today 11:30 AM',
    });

    // Clear cart and close drawer
    setCart({});
    setIsCartOpen(false);
  };

  // Filter and sort products
  const filteredProducts = FOOD_CITY_PRODUCTS.filter((prod) => {
    // Dept filter
    if (selectedDept !== 'ALL' && prod.category !== selectedDept) {
      return false;
    }
    // Features
    if (coldChainOnly && !prod.isColdChain) return false;
    if (organicOnly && !prod.isOrganic) return false;
    if (dealsOnly && !prod.discountBadge && !prod.originalPriceLkr) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = prod.title.toLowerCase().includes(q);
      const matchSinhala = prod.sinhalaName.toLowerCase().includes(q);
      const matchFarm = prod.farm.toLowerCase().includes(q);
      const matchDist = prod.district.toLowerCase().includes(q);
      if (!matchName && !matchSinhala && !matchFarm && !matchDist) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'PRICE_ASC') return a.priceLkr - b.priceLkr;
    if (sortBy === 'PRICE_DESC') return b.priceLkr - a.priceLkr;
    if (sortBy === 'RATING') return b.rating - a.rating;
    return 0; // FEATURED
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. FOOD CITY STOREFRONT HERO BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
          borderRadius: 'var(--radius-lg)',
          color: '#ffffff',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(6px)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} color="#a7f3d0" />
            <span>AgriBridge Digital Food City • Online Agro Supermarket</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}
          >
            Fresh Island Produce & Grocery Direct from Sri Lankan Farms
          </h1>

          <p
            style={{
              fontSize: '0.98rem',
              color: '#d1fae5',
              lineHeight: 1.5,
              maxWidth: '680px',
              marginBottom: '20px',
            }}
          >
            Choose your daily vegetables, island fruits, highland dairy, and Ceylon staples with
            guaranteed cold-chain temperature control and secret 4-digit OTP verified delivery.
          </p>

          {/* Value Badges Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <ThermometerSnowflake size={14} color="#6ee7b7" /> 4°C Monitored Reefer Transport
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={14} color="#6ee7b7" /> Secret 4-Digit OTP Handover
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <Clock size={14} color="#6ee7b7" /> Express Dispatch within 3 Hours
            </span>
          </div>
        </div>

        {/* Floating Quick Trolley Trigger Top-Right */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            right: '32px',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              background: '#ffffff',
              color: '#064e3b',
              border: 'none',
              padding: '12px 20px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.15s ease',
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={20} color="#059669" />
              {totalCartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    right: '-9px',
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                  }}
                >
                  {totalCartCount}
                </span>
              )}
            </div>
            <span>Food City Trolley</span>
            <span style={{ background: '#ecfdf5', padding: '3px 8px', borderRadius: 'var(--radius-full)', color: '#059669', fontSize: '0.82rem' }}>
              LKR {cartSubtotalLkr.toLocaleString()}
            </span>
          </button>
          <span style={{ fontSize: '0.74rem', color: '#a7f3d0' }}>
            Click to review items & dispatch
          </span>
        </div>
      </div>

      {/* 2. SUPERMARKET SEARCH, DEPARTMENTS & FILTERS CONTROLS */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'var(--bg-surface)',
        }}
      >
        {/* Search & Sort Row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Live Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search vegetables, fruits, rice, dairy, Sinhala names, or farms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '44px', height: '44px', fontSize: '0.9rem' }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-control"
              style={{ width: '180px', height: '42px', fontSize: '0.84rem' }}
            >
              <option value="FEATURED">🌟 Featured & Recommended</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="RATING">⭐ Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Department / Aisle Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'ALL', label: 'All Departments', icon: '🛒', count: FOOD_CITY_PRODUCTS.length },
            { id: 'HIGHLAND', label: 'Highland Veg (නුවරඑළිය)', icon: '🥕', count: 4 },
            { id: 'LOWLAND', label: 'Lowland & Country Veg', icon: '🍅', count: 4 },
            { id: 'FRUITS', label: 'Island Fruits (පළතුරු)', icon: '🍌', count: 3 },
            { id: 'DAIRY', label: 'Dairy & Curd (මීකිරි)', icon: '🥛', count: 3 },
            { id: 'STAPLES', label: 'Rice & Grains (සහල්)', icon: '🌾', count: 2 },
            { id: 'SPICES', label: 'Spices & Herbs', icon: '🌿', count: 1 },
          ].map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDept(dept.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border:
                  selectedDept === dept.id
                    ? '1px solid var(--primary)'
                    : '1px solid var(--border-subtle)',
                background: selectedDept === dept.id ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                color: selectedDept === dept.id ? 'var(--primary-text)' : 'var(--text-secondary)',
                fontWeight: selectedDept === dept.id ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{dept.icon}</span>
              <span>{dept.label}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  background: selectedDept === dept.id ? 'var(--primary)' : 'var(--border-strong)',
                  color: '#ffffff',
                }}
              >
                {dept.count}
              </span>
            </button>
          ))}
        </div>

        {/* Feature Filter Toggle Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginRight: '4px' }}>
            Quick Filters:
          </span>

          <button
            type="button"
            onClick={() => setColdChainOnly(!coldChainOnly)}
            style={{
              padding: '4px 11px',
              borderRadius: 'var(--radius-full)',
              border: coldChainOnly ? '1px solid #0284c7' : '1px solid var(--border-subtle)',
              background: coldChainOnly ? '#e0f2fe' : 'var(--bg-subtle)',
              color: coldChainOnly ? '#0369a1' : 'var(--text-secondary)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <ThermometerSnowflake size={13} color={coldChainOnly ? '#0284c7' : 'currentColor'} />
            <span>Cold-Chain Chilled (4°C)</span>
          </button>

          <button
            type="button"
            onClick={() => setOrganicOnly(!organicOnly)}
            style={{
              padding: '4px 11px',
              borderRadius: 'var(--radius-full)',
              border: organicOnly ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: organicOnly ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
              color: organicOnly ? 'var(--primary-text)' : 'var(--text-secondary)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>🌿 Organic Certified</span>
          </button>

          <button
            type="button"
            onClick={() => setDealsOnly(!dealsOnly)}
            style={{
              padding: '4px 11px',
              borderRadius: 'var(--radius-full)',
              border: dealsOnly ? '1px solid #ea580c' : '1px solid var(--border-subtle)',
              background: dealsOnly ? '#ffedd5' : 'var(--bg-subtle)',
              color: dealsOnly ? '#c2410c' : 'var(--text-secondary)',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Tag size={13} color={dealsOnly ? '#ea580c' : 'currentColor'} />
            <span>Special Harvest Deals %</span>
          </button>

          {(coldChainOnly || organicOnly || dealsOnly || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setColdChainOnly(false);
                setOrganicOnly(false);
                setDealsOnly(false);
                setSearchQuery('');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: 'auto',
              }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* 3. PRODUCT CATALOG GRID (FOOD CITY DIGITAL SHELVES) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
              {selectedDept === 'ALL'
                ? 'All Farm Produce & Food City Staples'
                : `${FOOD_CITY_PRODUCTS.find((p) => p.category === selectedDept)?.categoryLabel || selectedDept}`}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing {filteredProducts.length} items available for direct refrigerated delivery
            </span>
          </div>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Prices in Sri Lankan Rupees (LKR)
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            className="card"
            style={{
              padding: '48px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={24} color="var(--text-muted)" />
            </div>
            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>No products match your search or filter</h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
              Try clearing filters or search for another item like "Carrot", "Curd", "Rice", or "Mango".
            </p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSelectedDept('ALL');
                setColdChainOnly(false);
                setOrganicOnly(false);
                setDealsOnly(false);
                setSearchQuery('');
              }}
            >
              View Full Food City Catalog
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredProducts.map((prod) => {
              const currentInCart = cart[prod.id] || 0;
              const isJustAdded = justAddedId === prod.id;

              return (
                <div
                  key={prod.id}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0',
                    overflow: 'hidden',
                    border: currentInCart > 0 ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {/* Product Image & Badges Container */}
                  <div style={{ position: 'relative', height: '175px', overflow: 'hidden', background: '#f1f5f9' }}>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />

                    {/* Quick View Button Overlay */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(prod)}
                      title="Quick view product details"
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <Eye size={13} /> Quick View
                    </button>

                    {/* Discount or Deal Badge */}
                    {prod.discountBadge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: '#ea580c',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                        }}
                      >
                        {prod.discountBadge}
                      </span>
                    )}

                    {/* Cold Chain Tag Bottom Left */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: prod.isColdChain ? 'rgba(3, 105, 161, 0.85)' : 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {prod.isColdChain ? (
                        <>
                          <ThermometerSnowflake size={11} color="#38bdf8" /> 4°C Cold Chain
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={11} color="#4ade80" /> Ambient Insulated
                        </>
                      )}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div
                    style={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: '8px',
                    }}
                  >
                    {/* Title & Sinhala Name */}
                    <div>
                      <h4 style={{ fontSize: '1.02rem', margin: 0, lineHeight: 1.3 }}>
                        {prod.title}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {prod.sinhalaName}
                      </div>
                    </div>

                    {/* Farm Location */}
                    <div
                      style={{
                        fontSize: '0.76rem',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <MapPin size={12} color="var(--primary)" />
                      <span>
                        {prod.farm} • <strong>{prod.district}</strong>
                      </span>
                    </div>

                    {/* Harvest Freshness & Rating Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                        {prod.harvestTime}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={12} fill="#eab308" color="#eab308" />
                        <strong>{prod.rating}</strong> ({prod.reviews})
                      </span>
                    </div>

                    {/* Price Block */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '6px',
                        marginTop: '4px',
                      }}
                    >
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
                        LKR {prod.priceLkr.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        / {prod.unit}
                      </span>
                      {prod.originalPriceLkr && (
                        <span
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            textDecoration: 'line-through',
                            marginLeft: '4px',
                          }}
                        >
                          LKR {prod.originalPriceLkr}
                        </span>
                      )}
                    </div>

                    {/* Interactive Customer Action Bar */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      {currentInCart > 0 ? (
                        /* Stepper controls when item is already in trolley */
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            background: 'var(--primary-subtle)',
                            border: '1px solid var(--primary-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '4px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleAddToCart(prod, -1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-sm)',
                              border: 'none',
                              background: 'var(--bg-surface)',
                              color: 'var(--primary)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                          >
                            <Minus size={15} />
                          </button>

                          <div style={{ textAlign: 'center' }}>
                            <strong style={{ fontSize: '0.92rem', color: 'var(--primary-text)' }}>
                              {currentInCart} {prod.unit.includes('kg') ? 'kg' : 'units'}
                            </strong>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              in your trolley
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(prod, 1)}
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-sm)',
                              border: 'none',
                              background: 'var(--primary)',
                              color: '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      ) : (
                        /* Standard Add to Trolley Button */
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(prod, 1)}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            fontSize: '0.86rem',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to Trolley</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. FLOATING CHECKOUT NOTIFICATION PILL (Shows when customer has items) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'var(--text-primary)',
            color: 'var(--text-inverse)',
            padding: '12px 24px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 800,
              }}
            >
              {totalCartCount}
            </div>
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                LKR {cartSubtotalLkr.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginLeft: '6px' }}>
                ({totalCartCount} Food City items)
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setIsCartOpen(true)}
            style={{ borderRadius: 'var(--radius-full)', padding: '7px 16px', fontSize: '0.82rem' }}
          >
            Review Trolley & Dispatch <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* 5. INTERACTIVE FOOD CITY TROLLEY SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div
          className="modal-overlay"
          style={{ justifyContent: 'flex-end', padding: 0 }}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              height: '100vh',
              background: 'var(--bg-surface)',
              borderLeft: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Trolley Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-subtle)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>My Food City Basket</h3>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {totalCartCount} item{totalCartCount !== 1 ? 's' : ''} ready for cold-chain transport
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Trolley Content Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {cartItemsList.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <ShoppingCart size={48} color="var(--text-muted)" />
                  <h4>Your Food City Trolley is Empty</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Add fresh highland vegetables, island fruits, or curd to schedule a refrigerated delivery.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsCartOpen(false)}>
                    Browse Fresh Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Selected Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Selected Produce & Groceries
                    </div>

                    {cartItemsList.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          background: 'var(--bg-subtle)',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                          }}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h5 style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </h5>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            LKR {item.priceLkr} / {item.unit} • {item.district}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
                            Subtotal: LKR {item.subtotalLkr.toLocaleString()}
                          </div>
                        </div>

                        {/* Stepper */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item, -1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              background: 'var(--bg-surface)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item, 1)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              background: 'var(--bg-surface)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Plus size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove item"
                            style={{
                              marginLeft: '6px',
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Delivery Details Section */}
                  <div
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
                      Refrigerated Delivery Destination
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="input-group" style={{ margin: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.74rem' }}>
                          Delivery District
                        </label>
                        <select
                          className="input-control"
                          value={deliveryDistrict}
                          onChange={(e) => setDeliveryDistrict(e.target.value)}
                          style={{ height: '38px', fontSize: '0.82rem' }}
                        >
                          {['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Kalutara', 'Kurunegala', 'Matara'].map((d) => (
                            <option key={d} value={d}>
                              {d} Province
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="input-group" style={{ margin: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.74rem' }}>
                          Recipient Contact
                        </label>
                        <input
                          type="text"
                          className="input-control"
                          value={deliveryPhone}
                          onChange={(e) => setDeliveryPhone(e.target.value)}
                          style={{ height: '38px', fontSize: '0.82rem' }}
                        />
                      </div>
                    </div>

                    <div className="input-group" style={{ margin: 0 }}>
                      <label className="input-label" style={{ fontSize: '0.74rem' }}>
                        Delivery Address / Outlet
                      </label>
                      <input
                        type="text"
                        className="input-control"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        style={{ height: '38px', fontSize: '0.82rem' }}
                      />
                    </div>

                    {/* Delivery Slot Selection */}
                    <div>
                      <label className="input-label" style={{ fontSize: '0.74rem', marginBottom: '6px', display: 'block' }}>
                        Preferred Time Slot
                      </label>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { id: 'EXPRESS_3H', label: '⚡ Express (3h)', sub: 'Active Reefer' },
                          { id: 'MORNING', label: '🌅 Morning (8-12)', sub: 'Dawn Harvest' },
                          { id: 'EVENING', label: '🌇 Evening (4-8)', sub: 'Post-Market' },
                        ].map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setDeliverySlot(slot.id)}
                            style={{
                              flex: 1,
                              padding: '8px 4px',
                              borderRadius: 'var(--radius-sm)',
                              border:
                                deliverySlot === slot.id
                                  ? '1px solid var(--primary)'
                                  : '1px solid var(--border-subtle)',
                              background:
                                deliverySlot === slot.id ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                              color:
                                deliverySlot === slot.id ? 'var(--primary-text)' : 'var(--text-secondary)',
                              fontSize: '0.74rem',
                              fontWeight: deliverySlot === slot.id ? 700 : 500,
                              cursor: 'pointer',
                              textAlign: 'center',
                            }}
                          >
                            <div>{slot.label}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{slot.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Promo Coupon Box */}
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="Promo Code (try FOODCITY15 or FREEDISPATCH)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{ height: '38px', fontSize: '0.82rem', flex: 1 }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0 14px' }}>
                      Apply
                    </button>
                  </form>

                  {appliedCoupon && (
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary-subtle)',
                        border: '1px solid var(--primary-border)',
                        color: 'var(--primary-text)',
                        fontSize: '0.78rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>
                        ✓ Code <strong>{appliedCoupon.code}</strong> applied!
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Pricing Breakdown Card */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Items Subtotal:</span>
                      <span>LKR {cartSubtotalLkr.toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Refrigerated Logistics & Delivery:
                        {isColdChainPresent && (
                          <ThermometerSnowflake size={12} color="var(--primary)" />
                        )}
                      </span>
                      <span>
                        {deliveryFeeLkr === 0 ? (
                          <strong style={{ color: 'var(--primary)' }}>FREE</strong>
                        ) : (
                          `LKR ${deliveryFeeLkr}`
                        )}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>
                        Reusable Eco-Crate Deposit (Refundable):
                      </span>
                      <span>LKR {ecoCrateDepositLkr}</span>
                    </div>

                    {discountLkr > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ea580c' }}>
                        <span>Promo Discount ({appliedCoupon?.discountPct}%):</span>
                        <span>- LKR {discountLkr.toLocaleString()}</span>
                      </div>
                    )}

                    <div
                      style={{
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                      }}
                    >
                      <span>Total Payable:</span>
                      <span style={{ color: 'var(--primary)' }}>
                        LKR {finalTotalLkr.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trolley Footer Checkout Action */}
            {cartItemsList.length > 0 && (
              <div
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid var(--border-subtle)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmOrder}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Truck size={18} />
                  <span>Confirm Food City Order & Schedule Dispatch</span>
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Generates an official AgriBridge consignment code & secret 4-digit customer OTP
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. INTERACTIVE PRODUCT QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-delivered">AgriBridge Certified</span>
                <strong style={{ fontSize: '1.05rem' }}>{quickViewProduct.title}</strong>
              </div>
              <button
                type="button"
                className="btn btn-subtle btn-sm"
                onClick={() => setQuickViewProduct(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{quickViewProduct.title}</h3>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
                    LKR {quickViewProduct.priceLkr.toLocaleString()}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {' '}
                      / {quickViewProduct.unit}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {quickViewProduct.sinhalaName} • <strong>{quickViewProduct.categoryLabel}</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {quickViewProduct.description}
              </p>

              {/* Grid Metadata */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: 'var(--bg-subtle)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Origin Farm Hub
                  </span>
                  <strong>{quickViewProduct.farm}</strong>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {quickViewProduct.district} Province
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Harvest Timestamp
                  </span>
                  <strong>{quickViewProduct.harvestTime}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Transit Storage Req.
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: 700 }}>
                    <ThermometerSnowflake size={14} />
                    <span>{quickViewProduct.tempRequirement}</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    Customer Rating
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="#eab308" color="#eab308" />
                    <strong>{quickViewProduct.rating} / 5.0</strong>
                    <span style={{ color: 'var(--text-muted)' }}>({quickViewProduct.reviews} orders)</span>
                  </div>
                </div>
              </div>

              {/* Nutritional tip */}
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-subtle)',
                  border: '1px solid var(--primary-border)',
                  fontSize: '0.8rem',
                  color: 'var(--primary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Info size={16} />
                <span>{quickViewProduct.nutritionalTip}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setQuickViewProduct(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleAddToCart(quickViewProduct, 1);
                  setQuickViewProduct(null);
                  setIsCartOpen(true);
                }}
              >
                <ShoppingCart size={15} /> Add & Open Trolley
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ORDER PLACED CELEBRATION MODAL (DIRECT MODULE 02 DISPATCH LINK) */}
      {confirmedOrder && (
        <div className="modal-overlay" onClick={() => setConfirmedOrder(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: '580px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '28px 24px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.25)',
                }}
              >
                <CheckCircle size={32} />
              </div>

              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>
                Food City Order Placed & Consignment Dispatched!
              </h2>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: 0 }}>
                Your produce order has been created and seamlessly queued into AgriBridge’s cold-chain logistics fleet.
              </p>
            </div>

            <div className="modal-body" style={{ padding: '0 24px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Receipt Summary Card */}
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Consignment Code
                    </span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {confirmedOrder.shipmentId}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Order Reference
                    </span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                      {confirmedOrder.orderId}
                    </div>
                  </div>
                </div>

                {/* Secret OTP Box */}
                <div
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>
                      Secret Customer Delivery OTP Code
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#3b82f6' }}>
                      Give this 4-digit code to the transporter only after inspecting produce crates!
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      color: '#1d4ed8',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {confirmedOrder.otpCode}
                  </div>
                </div>

                {/* Assigned Transporter details */}
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <div>
                    <strong>Assigned Transporter:</strong> {confirmedOrder.assignedDriver}
                  </div>
                  <div>
                    <strong>Destination:</strong> {confirmedOrder.deliveryAddress} ({confirmedOrder.deliveryDistrict})
                  </div>
                  <div>
                    <strong>Estimated Arrival:</strong> {confirmedOrder.eta}
                  </div>
                  <div style={{ marginTop: '4px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Total Billed: LKR {confirmedOrder.totalLkr.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmedOrder(null)}
              >
                Continue Shopping
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  if (onTrackOrder) onTrackOrder(confirmedOrder.shipmentId);
                  setConfirmedOrder(null);
                }}
              >
                <Truck size={16} /> Track On GPS Map
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (onOpenPod) onOpenPod(confirmedOrder.shipmentId);
                  setConfirmedOrder(null);
                }}
              >
                <ShieldCheck size={16} /> View POD Terminal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
