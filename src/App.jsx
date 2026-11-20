import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Factory,
  Scissors,
  CheckCircle2,
  Package,
  Truck,
  User,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Sparkles,
  Upload,
  Palette,
  Type,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Plus,
  Minus,
  Trash2,
  Check,
  Layers,
  Clock,
  RefreshCw,
  CreditCard,
  SlidersHorizontal,
  Camera,
  RotateCw,
  Sun,
  Maximize2,
  Wand2,
  Eye,
  Compass
} from 'lucide-react';

// --- ELEGANT EDITORIAL PALETTE & CONSTANTS ---

const COLOR_SWATCHES = [
  { name: 'Alabaster', hex: '#F3F0EA', border: '#D6CFC4', isLight: true },
  { name: 'Warm Sand', hex: '#DDD6CA', border: '#C5BCB0', isLight: true },
  { name: 'Espresso', hex: '#1E1C1A', border: '#1E1C1A', isLight: false },
  { name: 'Charcoal', hex: '#383634', border: '#383634', isLight: false },
  { name: 'Muted Cognac', hex: '#8C5843', border: '#8C5843', isLight: false },
  { name: 'Sage Slate', hex: '#5C665E', border: '#5C665E', isLight: false }
];

const PRINT_PLACEMENTS = ['Front Center', 'Left Chest', 'Back Graphic'];

const AI_STYLE_PRESETS = [
  {
    id: 'line-art',
    label: 'Minimalist Line Art',
    suffix: 'fine-line minimalist editorial ink drawing on clean neutral background, high contrast, gallery aesthetic'
  },
  {
    id: 'vintage-etching',
    label: 'Vintage Etching',
    suffix: 'classic 19th-century botanical copperplate engraving illustration, refined monochrome detail'
  },
  {
    id: 'bauhaus',
    label: 'Abstract Bauhaus',
    suffix: 'refined modernist Bauhaus geometric composition in warm terracotta, charcoal, and sand tones'
  },
  {
    id: 'botanical-ink',
    label: 'Botanical Ink',
    suffix: 'delicate Japanese sumi-e botanical ink wash illustration, serene minimalist composition'
  },
  {
    id: 'streetwear-crest',
    label: 'Heritage Crest',
    suffix: 'minimal luxury fashion atelier emblem crest, crisp vector-grade typography and fine linework'
  }
];

const QUICK_PROMPT_CHIPS = [
  'Minimalist architectural archway in warm charcoal line art',
  'Delicate wild olive branch botanical ink illustration',
  'Abstract modernist sun and horizon geometric emblem',
  'Vintage astronomical compass engraving with fine stars'
];

const BRAND_POSITIONING =
  "VIBEMode is India's premier made-to-order streetwear atelier bridging Tiruppur textile craftsmanship with on-demand digital customisation—empowering young creators, campuses, and communities to wear bespoke, heavyweight luxury hoodies without fast-fashion waste.";

const CUSTOMER_PROMISES = [
  {
    code: '01',
    title: '48-Hour Metro Dispatch',
    detail: 'Customised in Noida and dispatched within 48 hrs across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune & Chennai.'
  },
  {
    code: '02',
    title: 'Free 7-Day Size & Print Exchange',
    detail: 'Complimentary 7-day reverse pickup for sizing adjustments or verified print & manufacturing defects.'
  },
  {
    code: '03',
    title: 'Zero-Waste Postponement',
    detail: 'Every 380–460 GSM combed cotton fleece garment is printed post-order—eliminating deadstock.'
  }
];

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Classic Custom Pullover',
    category: 'Classic & Fleece',
    price: 999,
    tag: 'Signature Fit',
    gsm: '380 GSM Combed Cotton',
    description:
      'Tailored everyday silhouette crafted from pre-shrunk 380 GSM combed cotton fleece—designed for crisp chest monograms, subtle quotes, and fine-line artwork.',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p2',
    name: 'Oversized Graphic Hoodie',
    category: 'Oversized & Street',
    price: 1299,
    tag: 'Atelier Drop',
    gsm: '440 GSM Heavy Fleece',
    description:
      'Relaxed drop-shoulder drape cut from structured 440 GSM heavyweight fleece. Offers an expansive front and back canvas for AI-generated art and high-definition prints.',
    image:
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p3',
    name: 'Personalised Fleece Hoodie',
    category: 'Classic & Fleece',
    price: 1199,
    tag: 'Brushed Interior',
    gsm: '400 GSM Brushed Fleece',
    description:
      'Double-lined hood and velvety brushed interior built for effortless warmth. Finished with zero-fade pigment printing for custom dates, initials, and personal photographs.',
    image:
      'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p4',
    name: 'Heavyweight College & Group Hoodies',
    category: 'Campus & Group',
    price: 899,
    pricePrefix: 'Starting ',
    tag: 'Cohort & Studio',
    gsm: '460 GSM Varsity Terry',
    description:
      'Crafted for university cohorts, design studios, and cultural collectives. Supports individual names or numbers per garment with tiered campus pricing.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p5',
    name: 'Acid-Wash Vintage Street Hoodie',
    category: 'Oversized & Street',
    price: 1499,
    tag: 'Mineral Washed',
    gsm: '450 GSM Enzyme Fleece',
    description:
      'Individually mineral-washed for a lived-in charcoal patina with reinforced double-needle seams—ideal for distressed typography and archival AI illustrations.',
    image:
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p6',
    name: 'Minimalist Embroidered Monogram Hoodie',
    category: 'Classic & Fleece',
    price: 1399,
    tag: 'Satin Stitch',
    gsm: '420 GSM Loopknit Cotton',
    description:
      'Refined tonal chest embroidery paired with a structured double-layer hood. Crafted for understated initials, studio crests, and timeless minimalist silhouettes.',
    image:
      'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p7',
    name: 'Cropped Boxy Atelier Hoodie',
    category: 'Oversized & Street',
    price: 1149,
    tag: 'Contemporary Cut',
    gsm: '400 GSM Combed Fleece',
    description:
      'Modern slightly cropped waist length with wide architectural sleeves and raw-edge ribbed hem. Tailored for clean centre graphics and layered street styling.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'p8',
    name: 'Heavyweight Zip-Up Studio Hoodie',
    category: 'Campus & Group',
    price: 1549,
    tag: 'YKK Brass Zip',
    gsm: '460 GSM Super-Heavy Fleece',
    description:
      'Full-zip layering staple featuring antique brushed metal hardware, split kangaroo pockets, and dual-sided left-chest plus full-back custom print zones.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

const TEAM = [
  {
    name: 'Ashna Wilson',
    initials: 'AW',
    role: 'Co-Founder & Creative Director',
    bio: 'Leads textile curation, relaxed streetwear silhouettes, and archival print calibration across every VIBEMode edition.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Tushar Gaur',
    initials: 'TG',
    role: 'Co-Founder & Operations Lead',
    bio: 'Architects our Tiruppur-to-Noida postponement supply chain, enabling bespoke single-piece production within 48 hours.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Apoorva Kulkarni',
    initials: 'AK',
    role: 'Co-Founder & Brand Strategy',
    bio: 'Guides VIBEMode’s youth community, university partnerships, and understated editorial identity across India.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    name: 'Devika Vaidya',
    initials: 'DV',
    role: 'Co-Founder & Experience Design',
    bio: 'Oversees digital customisation tools, VR fitting fidelity, quality assurance, and attentive customer care.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }
];

const SUPPLY_CHAIN_STEPS = [
  {
    step: '01',
    icon: Factory,
    title: 'Blank Hoodie Suppliers',
    location: 'Tiruppur / Ludhiana',
    tag: 'Bulk Procurement',
    summary:
      'We procure bio-washed, pre-shrunk 380–450 GSM cotton fleece blanks in bulk directly from vetted knitwear mills in Tiruppur and Ludhiana.',
    metric: '100% Combed Ring-Spun Cotton'
  },
  {
    step: '02',
    icon: Scissors,
    title: 'Central Customisation Hub',
    location: 'Noida',
    tag: 'Postponement Model',
    summary:
      'Through operational postponement, garments remain unprinted until your exact order is placed—eliminating deadstock and enabling bespoke creation.',
    metric: '24–36 Hr Bespoke Production'
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Quality Inspection',
    location: 'Noida QC Atelier',
    tag: '12-Point Audit',
    summary:
      'Each piece undergoes thermal print curing, stitch tension verification, and artwork placement inspection prior to release.',
    metric: '99.4% First-Pass Accuracy'
  },
  {
    step: '04',
    icon: Package,
    title: 'Packaging',
    location: 'Noida Dispatch',
    tag: 'Archival Presentation',
    summary:
      'Folded in breathable tissue with garment care notes inside moisture-resistant recyclable mailers designed to protect print integrity.',
    metric: 'Plastic-Minimised Packaging'
  },
  {
    step: '05',
    icon: Truck,
    title: 'Courier Partners',
    location: 'Delhivery',
    tag: 'Centralised Distribution',
    summary:
      'Integrated logistics with Delhivery provide reliable air and surface transit from our central Noida hub to 18,500+ pin codes nationwide.',
    metric: '2–5 Day Pan-India Transit'
  },
  {
    step: '06',
    icon: User,
    title: 'Customers',
    location: 'Your Doorstep',
    tag: 'Wearable Identity',
    summary:
      'Delivered directly to you with milestone tracking, flexible Cash on Delivery, and responsive post-purchase support.',
    metric: '4.9 ★ Verified Experience'
  }
];

const POLICIES = [
  {
    id: 'shipping',
    icon: Truck,
    badge: '48-Hr Metro Dispatch',
    title: 'Shipping & Estimated Delivery',
    content:
      'Every VIBEMode hoodie is customised to order at our Noida hub within 48 hours of confirmation. Following dispatch via Delhivery, metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, and Chennai) receive delivery within 2–4 business days, and Rest of India within 4–7 business days. Complimentary express shipping applies to all orders above ₹1,499.'
  },
  {
    id: 'tracking',
    icon: MapPin,
    badge: 'Real-Time Milestones',
    title: 'Order Tracking',
    content:
      'Follow your garment from "Blank Allocated" and "Custom Printing" in Noida to "Out for Delivery". Once handed over to Delhivery, a live tracking link is shared automatically via SMS, WhatsApp, and Email.'
  },
  {
    id: 'returns',
    icon: ShieldCheck,
    badge: '7-Day Protection',
    title: '7-Day Return & Free Exchange Window',
    content:
      'We offer a Free 7-Day Size & Print Exchange on eligible items and full 7-day protection against manufacturing defects, sizing variance from our chart, print errors, or transit damage. Because bespoke AI-generated or custom-named prints are crafted exclusively for you, change-of-mind returns do not apply once printed—however, we gladly replace any defective or mis-sized order free of charge.'
  },
  {
    id: 'exchange',
    icon: RefreshCw,
    badge: 'Complimentary Pickup',
    title: 'Exchange Procedure',
    content:
      'Initiate a free exchange within 7 days of delivery by writing to support@vibemode.in with your Order ID and photographs. Complimentary reverse pickup is arranged within 48 hours for unused, unwashed garments with original tags intact.'
  },
  {
    id: 'refunds',
    icon: CreditCard,
    badge: '5–7 Business Days',
    title: 'Refund Process',
    content:
      'Upon passing quality verification at our Noida hub, refunds are initiated within 24 hours. Prepaid transactions return to your original UPI, Card, or NetBanking source within 5–7 business days, or can be issued immediately as 100% VIBEMode Store Credit.'
  },
  {
    id: 'cod',
    icon: Clock,
    badge: 'Up to ₹5,000 • Waived > ₹1,499',
    title: 'Cash on Delivery (COD) Rules',
    content:
      'Cash on Delivery is supported across India for orders up to ₹5,000 following a quick OTP confirmation via SMS/WhatsApp. A nominal ₹49 COD handling fee applies on orders below ₹1,499 and is automatically waived on all orders of ₹1,499 or more.'
  }
];

// --- CUSTOM BRAND EMBLEM LOGO ---
const VibeModeLogoMark = ({ inverted = false }) => (
  <svg
    viewBox="0 0 40 40"
    className="w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
    aria-hidden="true"
  >
    <circle
      cx="20"
      cy="20"
      r="18.5"
      fill={inverted ? '#1A1918' : '#EFECE6'}
      stroke={inverted ? '#8C5843' : '#1A1918'}
      strokeWidth="1.25"
    />
    <circle
      cx="20"
      cy="20"
      r="14.5"
      fill="none"
      stroke="#8C5843"
      strokeWidth="0.75"
      strokeDasharray="2 2"
    />
    <path
      d="M13.5 13.5 L20 27.5 L26.5 13.5"
      fill="none"
      stroke={inverted ? '#F9F8F6' : '#1A1918'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="12" r="1.5" fill="#8C5843" />
  </svg>
);

// --- HELPER: ARTISANAL PROCEDURAL FALLBACK SVG GENERATOR FOR AI STUDIO ---
function buildFallbackEditorialGraphic(promptText, styleId) {
  const cleanLabel = (promptText || 'ATELIER EDITION').slice(0, 28).toUpperCase();
  const accent =
    styleId === 'bauhaus'
      ? '#8C5843'
      : styleId === 'botanical-ink'
      ? '#5C665E'
      : '#1A1918';

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <rect width="400" height="400" rx="24" fill="#F9F8F6" fill-opacity="0.92"/>
    <rect x="18" y="18" width="364" height="364" rx="18" fill="none" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.45"/>
    <circle cx="200" cy="175" r="92" fill="none" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="200" cy="175" r="68" fill="none" stroke="#8C5843" stroke-width="1" stroke-dasharray="4 4"/>
    <path d="M135 235 Q200 110 265 235" fill="none" stroke="${accent}" stroke-width="2"/>
    <line x1="115" y1="235" x2="285" y2="235" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="200" cy="142" r="14" fill="#8C5843" fill-opacity="0.85"/>
    <text x="200" y="295" text-anchor="middle" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="#1A1918">${cleanLabel}</text>
    <text x="200" y="320" text-anchor="middle" font-family="sans-serif" font-size="9" letter-spacing="4" fill="#5C665E">VIBEMODE AI ATELIER</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// --- HELPER: VECTOR HOODIE SILHOUETTE FOR STUDIO & VR ---
const HoodieGarmentSvg = ({ colorHex, isLight, viewAngle = 'Front', isOversized = true }) => {
  const strokeColor = isLight ? 'rgba(26,25,24,0.22)' : 'rgba(255,255,255,0.22)';
  const shadowColor = isLight ? 'rgba(26,25,24,0.08)' : 'rgba(0,0,0,0.35)';
  const shoulderScale = isOversized ? 1.05 : 0.96;

  return (
    <svg
      viewBox="0 0 420 460"
      className="w-full h-full drop-shadow-xl transition-all duration-300"
      style={{ transform: `scaleX(${shoulderScale})` }}
    >
      <defs>
        <linearGradient id="fabricShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isLight ? '0.25' : '0.12'} />
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity={isLight ? '0.12' : '0.32'} />
        </linearGradient>
      </defs>

      {/* Sleeves */}
      <path
        d="M112 96 L42 238 L66 368 L104 368 L118 232 Z"
        fill={colorHex}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M308 96 L378 238 L354 368 L316 368 L302 232 Z"
        fill={colorHex}
        stroke={strokeColor}
        strokeWidth="1.5"
      />

      {/* Ribbed Cuffs */}
      <rect x="65" y="362" width="40" height="22" rx="4" fill={colorHex} stroke={strokeColor} strokeWidth="1.5" />
      <rect x="315" y="362" width="40" height="22" rx="4" fill={colorHex} stroke={strokeColor} strokeWidth="1.5" />

      {/* Main Torso */}
      <path
        d="M112 92 Q210 112 308 92 L318 395 Q210 406 102 395 Z"
        fill={colorHex}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      {/* Fabric Lighting Overlay */}
      <path
        d="M112 92 Q210 112 308 92 L318 395 Q210 406 102 395 Z"
        fill="url(#fabricShade)"
      />

      {/* Ribbed Waist Hem */}
      <path
        d="M103 386 Q210 397 317 386 L315 412 Q210 422 105 412 Z"
        fill={colorHex}
        stroke={strokeColor}
        strokeWidth="1.5"
      />

      {/* Hood (Front vs Back View) */}
      {viewAngle === 'Back Print' ? (
        <path
          d="M144 96 Q142 28 210 24 Q278 28 276 96 Q210 118 144 96 Z"
          fill={colorHex}
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      ) : (
        <>
          <path
            d="M146 95 Q148 34 210 32 Q272 34 274 95 Q210 128 146 95 Z"
            fill={colorHex}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          {/* Inner Hood Shadow */}
          <path
            d="M162 94 Q210 124 258 94 Q210 76 162 94 Z"
            fill={shadowColor}
          />
          {/* Drawstrings */}
          <line x1="192" y1="110" x2="190" y2="165" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="228" y1="110" x2="230" y2="165" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Kangaroo Pocket */}
          <path
            d="M144 295 L276 295 L290 378 L130 378 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.4"
          />
        </>
      )}
    </svg>
  );
};

// --- SHOP PRODUCT CARD COMPONENT ---

const ProductCard = ({ product, onOpenAiStudio, onOpenVrTryOn, onQuickAdd }) => {
  const [quickSize, setQuickSize] = useState('L');
  const [quickColor, setQuickColor] = useState(COLOR_SWATCHES[0]);
  const [quickText, setQuickText] = useState('');
  const [quickFile, setQuickFile] = useState('');

  const handleDirectAdd = () => {
    onQuickAdd({
      cartId: `${product.id}-${quickSize}-${quickColor.name}-${quickText}-${quickFile}`,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: quickSize,
      selectedColor: quickColor.name,
      colorHex: quickColor.hex,
      customText: quickText.trim(),
      placement: 'Front Center',
      uploadedFileName: quickFile,
      customSummary:
        [quickText.trim() ? `“${quickText.trim()}”` : null, quickFile ? `Artwork: ${quickFile}` : null]
          .filter(Boolean)
          .join(' • ') || 'Minimalist Unprinted Base',
      quantity: 1
    });
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-[4/4] overflow-hidden bg-[#EFECE6]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
        />
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1 rounded-full bg-[#F9F8F6]/95 backdrop-blur-sm border border-[#E5E0D8] text-[11px] font-medium tracking-wide text-[#1A1918]">
            {product.tag}
          </span>
        </div>

        {/* Subtle Studio & VR Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onOpenAiStudio(product, quickColor, quickSize, quickText)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1A1918]/90 hover:bg-[#8C5843] text-[#F9F8F6] text-[11px] font-medium backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Studio
          </button>
          <button
            type="button"
            onClick={() => onOpenVrTryOn(product, quickColor, quickSize, quickText)}
            className="py-2 px-3 rounded-xl bg-[#F9F8F6]/95 hover:bg-white text-[#1A1918] border border-[#E5E0D8] text-[11px] font-medium backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#8C5843]" /> VR Try-On
          </button>
        </div>
      </div>

      {/* Details & Inline Customisation */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-medium text-[#1A1918] leading-snug">
            {product.name}
          </h3>
          <span className="text-base font-semibold text-[#1A1918] whitespace-nowrap">
            {product.pricePrefix || ''}₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-[#8C5843] font-medium mb-2.5">
          {product.gsm}
        </p>

        <p className="text-xs text-[#5C5852] leading-relaxed mb-4">{product.description}</p>

        <div className="mt-auto space-y-3 pt-3.5 border-t border-[#EFECE6]">
          {/* Swatches */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#6E6A63]">
              Shade: <strong className="font-medium text-[#1A1918]">{quickColor.name}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              {COLOR_SWATCHES.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  title={swatch.name}
                  onClick={() => setQuickColor(swatch)}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    quickColor.name === swatch.name
                      ? 'scale-125 ring-1 ring-offset-2 ring-[#1A1918]'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: swatch.hex, borderColor: swatch.border }}
                />
              ))}
            </div>
          </div>

          {/* Size & Upload */}
          <div className="grid grid-cols-2 gap-2">
            <select
              value={quickSize}
              onChange={(e) => setQuickSize(e.target.value)}
              aria-label="Select Size"
              className="bg-[#F9F8F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1918] focus:outline-none focus:border-[#1A1918] cursor-pointer"
            >
              {product.sizes.map((sz) => (
                <option key={sz} value={sz}>
                  Size: {sz}
                </option>
              ))}
            </select>

            <label className="flex items-center justify-center gap-1.5 bg-[#EFECE6] hover:bg-[#E5E0D8] text-[#1A1918] rounded-xl px-2.5 py-2 text-xs font-medium cursor-pointer transition-colors truncate">
              <Upload className="w-3.5 h-3.5 text-[#8C5843] shrink-0" />
              <span className="truncate">{quickFile ? quickFile : 'Upload Art'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setQuickFile(e.target.files?.[0]?.name || '')}
                className="hidden"
              />
            </label>
          </div>

          {/* Custom Monogram / Quote */}
          <input
            type="text"
            maxLength={32}
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            placeholder="Custom monogram, name or quote..."
            className="w-full bg-[#F9F8F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs text-[#1A1918] placeholder:text-[#969087] focus:outline-none focus:border-[#8C5843]"
          />

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleDirectAdd}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  // Multi-page navigation state
  const [activePage, setActivePage] = useState('home');
  const [shopFilter, setShopFilter] = useState('All 8 SKUs');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shared Studio & VR Garment State (seamless handoff between Shop -> AI Studio -> VR Try-On -> Cart)
  const [studioProduct, setStudioProduct] = useState(PRODUCTS[1]); // Default Oversized Graphic Hoodie
  const [studioColor, setStudioColor] = useState(COLOR_SWATCHES[0]); // Alabaster
  const [studioSize, setStudioSize] = useState('L');
  const [studioPlacement, setStudioPlacement] = useState('Front Center');
  const [studioText, setStudioText] = useState('ATELIER 01');
  const [studioFontStyle, setStudioFontStyle] = useState('serif'); // 'serif' | 'sans' | 'mono'
  const [studioTextColor, setStudioTextColor] = useState('#1A1918');

  // AI Design Studio State
  const [aiPrompt, setAiPrompt] = useState(
    'Minimalist architectural archway in warm charcoal line art'
  );
  const [aiStylePreset, setAiStylePreset] = useState(AI_STYLE_PRESETS[0]);
  const [generatedArtUrl, setGeneratedArtUrl] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiStatusNote, setAiStatusNote] = useState('');

  // VR Try-On Studio State
  const [vrMode, setVrMode] = useState('studio'); // 'studio' (360° Lookbook) | 'camera' (Live AR Mirror)
  const [vrAngle, setVrAngle] = useState('Front'); // 'Front' | '45° Left' | 'Back Print' | '45° Right'
  const [vrLighting, setVrLighting] = useState('Daylight Loft'); // 'Daylight Loft' | 'Warm Golden Hour' | 'Gallery Spot'
  const [vrWearerHeight, setVrWearerHeight] = useState("5'9\" (175 cm)");
  const [vrOverlayScale, setVrOverlayScale] = useState(1);
  const [vrOverlayPos, setVrOverlayPos] = useState({ x: 0, y: 15 });
  const [isDraggingOverlay, setIsDraggingOverlay] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Shopping Bag & Checkout Modal State
  const [cart, setCart] = useState([
    {
      cartId: 'initial-p2-L-Alabaster',
      id: 'p2',
      name: 'Oversized Graphic Hoodie',
      price: 1299,
      image:
        'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
      selectedSize: 'L',
      selectedColor: 'Alabaster',
      colorHex: '#F3F0EA',
      customSummary: '“ATELIER 01” • Front Center',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Accordions & Supply Chain Interactive State
  const [openPolicyId, setOpenPolicyId] = useState('shipping');
  const [selectedSupplyStep, setSelectedSupplyStep] = useState(0);

  // Adjust contrasting default text color when swatch changes
  useEffect(() => {
    setStudioTextColor(studioColor.isLight ? '#1A1918' : '#F9F8F6');
  }, [studioColor]);

  // Clean up webcam stream when leaving VR Try-On or switching back to 360° Studio mode
  useEffect(() => {
    if (activePage !== 'vr-tryon' || vrMode !== 'camera') {
      stopCameraStream();
    }
  }, [activePage, vrMode]);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCameraStream = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API unavailable in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      setCameraActive(false);
      setCameraError(
        'Camera permission was declined or unavailable. Showing Interactive Studio Model Mirror instead.'
      );
    }
  };

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  // --- GEMINI AI IMAGE GENERATION HANDLER ---
  const handleGenerateAiDesign = async () => {
    if (!aiPrompt.trim()) {
      showToast('Please enter a design prompt first.');
      return;
    }

    setIsGeneratingAi(true);
    setAiStatusNote('Composing bespoke artwork with Gemini Atelier AI...');

    const fullPrompt = `T-shirt and hoodie apparel graphic print illustration: ${aiPrompt.trim()}. Style: ${aiStylePreset.suffix}. Isolated clean square composition centered on solid off-white #F9F8F6 background, no mockup clothing, no hands, editorial fashion print ready.`;

    try {
      const apiKey = ''; // Runtime-injected in Canvas environment
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: fullPrompt }],
          parameters: { sampleCount: 1, aspectRatio: '1:1' }
        })
      });

      if (!response.ok) {
        throw new Error('Fallback to local editorial studio generator');
      }

      const data = await response.json();
      const base64Image = data?.predictions?.[0]?.bytesBase64Encoded;

      if (base64Image) {
        setGeneratedArtUrl(`data:image/png;base64,${base64Image}`);
        setAiStatusNote('Generated with Gemini AI • Ready on your hoodie');
        showToast('Custom AI artwork applied to your hoodie!');
      } else {
        throw new Error('No image bytes returned');
      }
    } catch (error) {
      // Graceful fallback curated editorial SVG artwork so preview always succeeds cleanly
      const fallbackUrl = buildFallbackEditorialGraphic(aiPrompt, aiStylePreset.id);
      setGeneratedArtUrl(fallbackUrl);
      setAiStatusNote('Atelier Vector Edition generated • Ready to preview or try in VR');
      showToast('Bespoke design rendered onto your hoodie!');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // --- CART OPERATIONS ---
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === item.cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === item.cartId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    showToast(`Added “${item.name}” to your bag`);
    setIsCartOpen(true);
  };

  const handleAddStudioGarmentToCart = () => {
    const summaryParts = [
      generatedArtUrl ? `AI Art (${aiStylePreset.label})` : null,
      studioText.trim() ? `“${studioText.trim()}”` : null,
      studioPlacement
    ].filter(Boolean);

    handleAddToCart({
      cartId: `studio-${studioProduct.id}-${studioSize}-${studioColor.name}-${studioText}-${Boolean(
        generatedArtUrl
      )}-${studioPlacement}`,
      id: studioProduct.id,
      name: studioProduct.name,
      price: studioProduct.price,
      image: studioProduct.image,
      customThumbnail: generatedArtUrl || '',
      selectedSize: studioSize,
      selectedColor: studioColor.name,
      colorHex: studioColor.hex,
      customSummary: summaryParts.join(' • '),
      quantity: 1
    });
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = cartSubtotal >= 1499 || cartSubtotal === 0 ? 0 : 79;
  const codFee = paymentMethod === 'COD' && cartSubtotal < 1499 ? 49 : 0;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'ai-studio', label: 'AI Design Studio' },
    { id: 'vr-tryon', label: 'VR Try-On' },
    { id: 'about', label: 'About' },
    { id: 'supply-chain', label: 'Supply Chain' },
    { id: 'policies', label: 'Policies' }
  ];

  const filteredProducts =
    shopFilter === 'All 8 SKUs'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === shopFilter);

  // VR Studio lighting style map
  const lightingClasses = {
    'Daylight Loft': 'bg-gradient-to-b from-[#F4F1EA] via-[#EAE5DC] to-[#DFD9CE]',
    'Warm Golden Hour': 'bg-gradient-to-br from-[#F2E5D5] via-[#E5D1B8] to-[#D4BEA3]',
    'Gallery Spot': 'bg-gradient-to-b from-[#2B2927] via-[#1F1E1C] to-[#161514] text-[#F9F8F6]'
  };

  const angleTransform = {
    Front: 'perspective(900px) rotateY(0deg)',
    '45° Left': 'perspective(900px) rotateY(24deg)',
    'Back Print': 'perspective(900px) rotateY(0deg)',
    '45° Right': 'perspective(900px) rotateY(-24deg)'
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#1A1918] font-sans antialiased selection:bg-[#DDD6CA] selection:text-[#1A1918]">
      {/* Subtle Editorial Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#1A1918] text-[#F9F8F6] text-xs font-medium tracking-wide shadow-xl border border-[#383634]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C5843]" />
          {toastMessage}
        </div>
      )}

      {/* --- CLEAN MINIMAL STICKY HEADER (NO ANNOUNCEMENT STRIP) --- */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/92 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Custom Emblem & Wordmark */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <VibeModeLogoMark />
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-tight text-[#1A1918] leading-none">
                  VIBE<span className="italic font-normal text-[#8C5843]">Mode</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#5C5852] mt-1">
                  Bespoke Atelier
                </span>
              </div>
            </button>

            {/* Desktop Multi-Page Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((tab) => {
                const isActive = activePage === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => navigateTo(tab.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#1A1918] text-[#F9F8F6]'
                        : 'text-[#5C5852] hover:text-[#1A1918] hover:bg-[#EFECE6]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions: Bag & Mobile Menu */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A1918] bg-transparent hover:bg-[#1A1918] hover:text-[#F9F8F6] text-[#1A1918] text-xs font-medium tracking-wide transition-colors"
                aria-label="Open shopping bag"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag</span>
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#8C5843] text-[#F9F8F6] text-[10px] font-semibold">
                  {cartCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full border border-[#E5E0D8] bg-white text-[#1A1918]"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#F9F8F6] border-t border-[#E5E0D8] px-4 py-5 space-y-1.5">
            {navItems.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigateTo(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1A1918] text-[#F9F8F6]'
                      : 'text-[#1A1918] hover:bg-[#EFECE6]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* --- MULTI-PAGE ROUTER --- */}
      <main className="flex-1">
        {/* =========================================================
            1. HOME PAGE
           ========================================================= */}
        {activePage === 'home' && (
          <div className="space-y-24 pb-24">
            {/* Editorial Luxury Hero */}
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Editorial Copy */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F9F8F6] border border-[#DDD6CA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C5843]" />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#1A1918] font-medium">
                        Made-to-Order Indian D2C Atelier
                      </span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-6xl lg:text-[62px] font-normal tracking-tight text-[#1A1918] leading-[1.06]">
                      Your Canvas, Woven in Luxury.
                    </h1>

                    {/* Positioning Statement & Brand Story */}
                    <div className="space-y-3.5 max-w-xl pt-1">
                      <p className="text-sm sm:text-base text-[#2C2A28] leading-relaxed">
                        {BRAND_POSITIONING}
                      </p>
                      <p className="text-xs sm:text-sm text-[#5C5852] leading-relaxed border-l-2 border-[#8C5843] pl-4">
                        <strong className="font-semibold text-[#1A1918]">Our Mission:</strong> Make self-expression wearable through quality, comfort and personalisation—featuring names, photographs, quotes, and AI-crafted graphics.
                      </p>
                    </div>

                    {/* Dual Refined CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => navigateTo('shop')}
                        className="px-7 py-3.5 rounded-full bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2.5"
                      >
                        Explore 8-SKU Collection <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateTo('ai-studio')}
                        className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F9F8F6] text-[#1A1918] border border-[#E5E0D8] hover:border-[#1A1918] text-xs uppercase tracking-widest font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#8C5843]" /> Launch AI Studio
                      </button>
                    </div>
                  </div>

                  {/* Editorial Lookbook Image */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-3xl overflow-hidden border border-[#E5E0D8] bg-[#EFECE6] aspect-[4/4.5] shadow-2xl group">
                      <img
                        src="https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1100&q=80"
                        alt="Model in blank premium atelier hoodie"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      
                      {/* Realistic Print Overlay (Clean & High-End) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-12 pl-2">
                        <div style={{ transform: 'perspective(400px) rotateX(2deg) scale(0.95)' }} className="text-center flex flex-col items-center">
                          <p className="font-mono text-5xl sm:text-6xl lg:text-[64px] font-bold tracking-[0.1em] text-[#F9F8F6] mix-blend-overlay opacity-95 blur-[0.5px] leading-tight mb-3">
                            ERROR<br/>404
                          </p>
                          <p className="font-sans text-sm sm:text-base font-medium tracking-wide text-[#F9F8F6] mix-blend-overlay opacity-90 blur-[0.3px]">
                            Blank until you order it
                          </p>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1918]/80 via-[#1A1918]/10 to-transparent opacity-90" />

                      <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#F9F8F6]/95 backdrop-blur-md border border-[#E5E0D8] flex items-center justify-between gap-4 shadow-xl transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-[#8C5843] font-bold">
                            Premium Blank Canvas
                          </p>
                          <p className="font-serif text-lg text-[#1A1918] mt-0.5">
                            Customise with AI or Personal Art
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigateTo('vr-tryon')}
                          className="px-5 py-2.5 rounded-full bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs font-semibold whitespace-nowrap transition-colors shadow-md"
                        >
                          Try in VR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Clear Customer Promise Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-[#E5E0D8] p-7 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-7 border-b border-[#EFECE6]">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C5843] font-medium">
                      The VIBEMode Standard
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918] mt-1">
                      Our Customer Promise
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('policies')}
                    className="text-xs font-medium text-[#5C665E] hover:text-[#1A1918] underline underline-offset-4 self-start sm:self-auto"
                  >
                    Read Full Policy Details →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CUSTOMER_PROMISES.map((promise) => (
                    <div
                      key={promise.code}
                      className="p-5 rounded-2xl bg-[#F9F8F6] border border-[#EFECE6] space-y-2"
                    >
                      <span className="text-[11px] font-mono text-[#8C5843] font-semibold">
                        PROMISE {promise.code}
                      </span>
                      <h3 className="font-serif text-xl text-[#1A1918]">{promise.title}</h3>
                      <p className="text-xs text-[#5C5852] leading-relaxed">{promise.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Experience Pillars (AI Studio, VR Fitting Room, Curated Fits) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Wand2,
                    eyebrow: '01 • Generative Atelier',
                    title: 'AI Design Studio',
                    desc: 'Describe an architectural motif, botanical etching, or poetic quote—our Gemini AI studio renders print-ready artwork onto your hoodie in seconds.',
                    cta: 'Open AI Studio',
                    target: 'ai-studio'
                  },
                  {
                    icon: Eye,
                    eyebrow: '02 • Spatial Fitting',
                    title: 'VR Try-On Experience',
                    desc: 'Preview drape, sizing proportions, and print placement in a 360° studio environment or via your live AR camera mirror before ordering.',
                    cta: 'Enter Fitting Room',
                    target: 'vr-tryon'
                  },
                  {
                    icon: Layers,
                    eyebrow: '03 • Tiruppur to Noida',
                    title: 'Curated Heavyweight Fits',
                    desc: 'Pre-shrunk 380–450 GSM combed cotton fleece customised post-order at our Noida hub and dispatched across India within 48 hours.',
                    cta: 'Browse Silhouettes',
                    target: 'shop'
                  }
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="p-8 rounded-2xl bg-white border border-[#E5E0D8] flex flex-col justify-between hover:border-[#8C5843]/60 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-[#8C5843] font-medium">
                          {feature.eyebrow}
                        </span>
                        <feature.icon className="w-4 h-4 text-[#5C665E]" />
                      </div>
                      <h2 className="font-serif text-2xl text-[#1A1918]">{feature.title}</h2>
                      <p className="text-xs sm:text-sm text-[#5C5852] leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTo(feature.target)}
                      className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1918] hover:text-[#8C5843] transition-colors"
                    >
                      {feature.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Drop Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5E0D8]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                    Hero Category • 8 Curated SKUs
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918]">
                    Signature Hoodie Silhouettes
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1A1918] hover:text-[#8C5843] transition-colors"
                >
                  View All 8 Hoodies <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[4/4.3] bg-[#EFECE6] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-[10px] uppercase tracking-widest text-[#8C5843] mb-1">
                        {item.gsm}
                      </p>
                      <h3 className="font-serif text-lg text-[#1A1918] mb-1.5">{item.name}</h3>
                      <p className="text-xs text-[#5C5852] line-clamp-2 mb-4">{item.description}</p>
                      <div className="mt-auto pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#1A1918]">
                          {item.pricePrefix || ''}₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setStudioProduct(item);
                            navigateTo('ai-studio');
                          }}
                          className="text-xs font-medium text-[#8C5843] hover:text-[#1A1918] underline underline-offset-4 transition-colors"
                        >
                          Customise →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            2. SHOP PAGE
           ========================================================= */}
        {activePage === 'shop' && (
          <div className="pb-24">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                      Hero Category • 8 Bespoke SKUs
                    </p>
                    <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
                      Personalised Luxury Hoodies
                    </h1>
                    <p className="text-sm text-[#5C5852] mt-3 max-w-xl leading-relaxed">
                      Every hoodie is crafted from pre-shrunk 380–460 GSM combed cotton fleece, dispatched within 48 hours in metro cities, and backed by our Free 7-Day Size & Print Exchange.
                    </p>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-2">
                    {['All 8 SKUs', 'Oversized & Street', 'Classic & Fleece', 'Campus & Group'].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setShopFilter(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors ${
                            shopFilter === cat
                              ? 'bg-[#1A1918] text-[#F9F8F6]'
                              : 'bg-[#F9F8F6] text-[#5C5852] border border-[#E5E0D8] hover:border-[#1A1918]'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenAiStudio={(prod, col, sz, txt) => {
                      setStudioProduct(prod);
                      setStudioColor(col);
                      setStudioSize(sz);
                      if (txt) setStudioText(txt);
                      navigateTo('ai-studio');
                    }}
                    onOpenVrTryOn={(prod, col, sz, txt) => {
                      setStudioProduct(prod);
                      setStudioColor(col);
                      setStudioSize(sz);
                      if (txt) setStudioText(txt);
                      navigateTo('vr-tryon');
                    }}
                    onQuickAdd={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            3. AI DESIGN STUDIO PAGE (POWERED BY GEMINI API)
           ========================================================= */}
        {activePage === 'ai-studio' && (
          <div className="pb-24">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                    Generative Bespoke Atelier
                  </p>
                  <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
                    AI Design Studio
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('vr-tryon')}
                  className="self-start md:self-auto px-5 py-2.5 rounded-full bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview This Design in VR
                </button>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT/CENTER: LIVE INTERACTIVE HOODIE CANVAS */}
                <div className="lg:col-span-7 bg-[#EFECE6] rounded-3xl border border-[#E5E0D8] p-6 sm:p-10 flex flex-col items-center justify-between min-h-[580px] relative">
                  {/* Top Canvas Bar */}
                  <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DDD6CA]">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: studioColor.hex }}
                      />
                      <span className="text-xs font-medium text-[#1A1918]">
                        {studioProduct.name} • {studioColor.name} ({studioSize})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#F9F8F6] p-1 rounded-full border border-[#E5E0D8]">
                      {PRINT_PLACEMENTS.map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setStudioPlacement(pos)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                            studioPlacement === pos
                              ? 'bg-[#1A1918] text-[#F9F8F6]'
                              : 'text-[#5C5852] hover:text-[#1A1918]'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hoodie Vector Mockup + Live Blended AI Artwork & Typography */}
                  <div className="relative w-full max-w-[400px] aspect-[420/460] my-6 flex items-center justify-center">
                    <HoodieGarmentSvg
                      colorHex={studioColor.hex}
                      isLight={studioColor.isLight}
                      viewAngle={studioPlacement === 'Back Graphic' ? 'Back Print' : 'Front'}
                      isOversized={studioProduct.category === 'Oversized'}
                    />

                    {/* Dynamic Print Placement Zone */}
                    <div
                      className={`absolute transition-all duration-300 flex flex-col items-center justify-center text-center pointer-events-none ${
                        studioPlacement === 'Left Chest'
                          ? 'top-[33%] left-[53%] w-[21%]'
                          : studioPlacement === 'Back Graphic'
                          ? 'top-[32%] left-1/2 -translate-x-1/2 w-[38%]'
                          : 'top-[33%] left-1/2 -translate-x-1/2 w-[34%]'
                      }`}
                    >
                      {generatedArtUrl && (
                        <div className="w-full aspect-square rounded-lg overflow-hidden shadow-xs mb-1.5">
                          <img
                            src={generatedArtUrl}
                            alt="AI Generated Hoodie Design"
                            className={`w-full h-full object-contain ${
                              studioColor.isLight ? 'mix-blend-multiply' : 'opacity-95'
                            }`}
                          />
                        </div>
                      )}

                      {studioText.trim() && (
                        <p
                          style={{ color: studioTextColor }}
                          className={`leading-tight break-words max-w-full ${
                            studioPlacement === 'Left Chest' ? 'text-[10px]' : 'text-sm sm:text-base'
                          } ${
                            studioFontStyle === 'serif'
                              ? 'font-serif tracking-wide'
                              : studioFontStyle === 'mono'
                              ? 'font-mono uppercase tracking-widest text-xs'
                              : 'font-sans font-semibold tracking-wider uppercase'
                          }`}
                        >
                          {studioText}
                        </p>
                      )}

                      {!generatedArtUrl && !studioText.trim() && (
                        <div
                          className={`p-3 rounded-xl border border-dashed text-[10px] ${
                            studioColor.isLight
                              ? 'border-[#1A1918]/30 text-[#5C5852]'
                              : 'border-white/30 text-white/70'
                          }`}
                        >
                          {studioPlacement} Canvas
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Canvas Status */}
                  <div className="w-full flex items-center justify-between text-[11px] text-[#5C5852] pt-3 border-t border-[#DDD6CA]">
                    <span>{aiStatusNote || '300 DPI DTG Thermal Print Ready'}</span>
                    <span className="font-medium text-[#1A1918]">
                      ₹{studioProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* RIGHT: GEMINI AI & GARMENT CONTROLS */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Card 1: Gemini AI Artwork Generator */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-widest text-[#8C5843] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> 1. Generate Artwork with AI
                      </label>
                      {generatedArtUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setGeneratedArtUrl('');
                            setAiStatusNote('');
                          }}
                          className="text-[11px] text-[#5C5852] hover:text-[#1A1918] underline"
                        >
                          Clear Art
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={3}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Describe your hoodie artwork (e.g., Botanical fern etching with vintage serif monogram)..."
                      className="w-full p-3.5 rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] text-xs sm:text-sm text-[#1A1918] placeholder:text-[#969087] focus:outline-none focus:border-[#8C5843] resize-none"
                    />

                    {/* Style Presets */}
                    <div>
                      <p className="text-[11px] text-[#6E6A63] mb-2">Aesthetic Direction:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {AI_STYLE_PRESETS.map((style) => (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setAiStylePreset(style)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
                              aiStylePreset.id === style.id
                                ? 'bg-[#1A1918] text-[#F9F8F6]'
                                : 'bg-[#F9F8F6] text-[#5C5852] border border-[#E5E0D8] hover:border-[#1A1918]'
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Inspiration Chips */}
                    <div>
                      <p className="text-[11px] text-[#6E6A63] mb-1.5">Prompt Inspiration:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_PROMPT_CHIPS.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setAiPrompt(chip)}
                            className="text-left px-2.5 py-1 rounded-lg bg-[#EFECE6]/70 hover:bg-[#EFECE6] text-[11px] text-[#383634] transition-colors"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isGeneratingAi}
                      onClick={handleGenerateAiDesign}
                      className="w-full py-3.5 px-5 rounded-xl bg-[#8C5843] hover:bg-[#734634] disabled:opacity-60 text-[#F9F8F6] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Wand2 className="w-4 h-4" />
                      {isGeneratingAi ? 'Generating Artwork...' : 'Generate Design with AI'}
                    </button>
                  </div>

                  {/* Card 2: Custom Typography Overlay */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-3.5">
                    <label className="block text-xs uppercase tracking-widest text-[#8C5843] font-semibold">
                      2. Custom Typography / Monogram
                    </label>
                    <input
                      type="text"
                      maxLength={32}
                      value={studioText}
                      onChange={(e) => setStudioText(e.target.value)}
                      placeholder="Add name, year, or poetic line..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] text-xs text-[#1A1918] focus:outline-none focus:border-[#8C5843]"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1.5">
                        {[
                          { id: 'serif', label: 'Editorial Serif' },
                          { id: 'sans', label: 'Modern Sans' },
                          { id: 'mono', label: 'Archival Mono' }
                        ].map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setStudioFontStyle(f.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border ${
                              studioFontStyle === f.id
                                ? 'border-[#1A1918] bg-[#1A1918] text-[#F9F8F6]'
                                : 'border-[#E5E0D8] bg-[#F9F8F6] text-[#5C5852]'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {['#1A1918', '#8C5843', '#5C665E', '#F9F8F6'].map((ink) => (
                          <button
                            key={ink}
                            type="button"
                            onClick={() => setStudioTextColor(ink)}
                            className={`w-5 h-5 rounded-full border border-black/25 ${
                              studioTextColor === ink ? 'ring-2 ring-offset-1 ring-[#8C5843]' : ''
                            }`}
                            style={{ backgroundColor: ink }}
                            title="Ink Shade"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Silhouette, Shade & Size */}
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-4">
                    <label className="block text-xs uppercase tracking-widest text-[#8C5843] font-semibold">
                      3. Silhouette, Shade & Size
                    </label>

                    <select
                      value={studioProduct.id}
                      onChange={(e) => {
                        const found = PRODUCTS.find((p) => p.id === e.target.value);
                        if (found) setStudioProduct(found);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] text-xs font-medium text-[#1A1918]"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.pricePrefix || ''}₹{p.price}
                        </option>
                      ))}
                    </select>

                    {/* Color Swatches */}
                    <div className="flex flex-wrap gap-2">
                      {COLOR_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.name}
                          type="button"
                          onClick={() => setStudioColor(swatch)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                            studioColor.name === swatch.name
                              ? 'border-[#1A1918] bg-[#1A1918] text-[#F9F8F6]'
                              : 'border-[#E5E0D8] bg-[#F9F8F6] text-[#1A1918]'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/20"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          {swatch.name}
                        </button>
                      ))}
                    </div>

                    {/* Sizes */}
                    <div className="grid grid-cols-6 gap-1.5">
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setStudioSize(sz)}
                          className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                            studioSize === sz
                              ? 'bg-[#1A1918] text-[#F9F8F6]'
                              : 'bg-[#F9F8F6] text-[#1A1918] border border-[#E5E0D8]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddStudioGarmentToCart}
                      className="w-full py-4 px-6 rounded-xl bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add Custom Hoodie to Bag — ₹
                      {studioProduct.price.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            4. VR TRY-ON STUDIO PAGE
           ========================================================= */}
        {activePage === 'vr-tryon' && (
          <div className="pb-24">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                    Spatial Fitting Room
                  </p>
                  <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
                    VR Try-On Studio
                  </h1>
                </div>

                {/* Mode Switcher: 360° Studio Lookbook vs Live AR Camera Mirror */}
                <div className="inline-flex p-1 rounded-full bg-[#F9F8F6] border border-[#E5E0D8]">
                  <button
                    type="button"
                    onClick={() => setVrMode('studio')}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      vrMode === 'studio'
                        ? 'bg-[#1A1918] text-[#F9F8F6]'
                        : 'text-[#5C5852] hover:text-[#1A1918]'
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" /> 360° Studio Simulator
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVrMode('camera');
                      startCameraStream();
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      vrMode === 'camera'
                        ? 'bg-[#1A1918] text-[#F9F8F6]'
                        : 'text-[#5C5852] hover:text-[#1A1918]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" /> Live AR Camera Mirror
                  </button>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: VIRTUAL FITTING VIEWPORT */}
                <div className="lg:col-span-8">
                  <div
                    className={`relative rounded-3xl border border-[#E5E0D8] overflow-hidden min-h-[560px] flex flex-col justify-between p-6 transition-all duration-500 ${
                      vrMode === 'studio' ? lightingClasses[vrLighting] : 'bg-[#1A1918]'
                    }`}
                  >
                    {/* Top Spatial HUD */}
                    <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#F9F8F6]/90 text-[#1A1918] backdrop-blur-md text-[11px] font-medium border border-[#E5E0D8]">
                        {vrMode === 'camera'
                          ? 'AR Mirror • Drag or Scale Hoodie Overlay'
                          : `360° Spatial View • ${vrAngle} • ${vrLighting}`}
                      </span>

                      {vrMode === 'studio' && (
                        <div className="flex items-center gap-1.5 bg-[#F9F8F6]/90 backdrop-blur-md p-1 rounded-full border border-[#E5E0D8]">
                          {['Front', '45° Left', 'Back Print', '45° Right'].map((angle) => (
                            <button
                              key={angle}
                              type="button"
                              onClick={() => setVrAngle(angle)}
                              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                                vrAngle === angle
                                  ? 'bg-[#1A1918] text-[#F9F8F6]'
                                  : 'text-[#5C5852] hover:text-[#1A1918]'
                              }`}
                            >
                              {angle}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Center Viewport Stage */}
                    {vrMode === 'camera' ? (
                      <div
                        className="relative flex-1 my-4 rounded-2xl overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
                        onMouseMove={(e) => {
                          if (!isDraggingOverlay) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left - rect.width / 2;
                          const y = e.clientY - rect.top - rect.height / 2;
                          setVrOverlayPos({ x, y });
                        }}
                        onMouseUp={() => setIsDraggingOverlay(false)}
                        onMouseLeave={() => setIsDraggingOverlay(false)}
                      >
                        {/* Live Webcam Feed or Graceful Model Fallback */}
                        {cameraActive ? (
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Studio Model Simulation"
                            className="absolute inset-0 w-full h-full object-cover opacity-85"
                          />
                        )}

                        {cameraError && (
                          <div className="absolute top-3 left-3 right-3 z-20 px-4 py-2 rounded-xl bg-[#F9F8F6]/95 text-[#1A1918] text-xs text-center border border-[#E5E0D8]">
                            {cameraError}
                          </div>
                        )}

                        {/* Draggable, Scalable Virtual Hoodie Overlay */}
                        <div
                          onMouseDown={() => setIsDraggingOverlay(true)}
                          style={{
                            transform: `translate(${vrOverlayPos.x}px, ${vrOverlayPos.y}px) scale(${vrOverlayScale})`
                          }}
                          className="relative z-10 w-[290px] sm:w-[330px] aspect-[420/460] transition-transform duration-75"
                        >
                          <HoodieGarmentSvg
                            colorHex={studioColor.hex}
                            isLight={studioColor.isLight}
                            viewAngle="Front"
                            isOversized={studioProduct.category === 'Oversized'}
                          />
                          {/* Custom Art & Text Overlaid on Garment */}
                          <div className="absolute top-[33%] left-1/2 -translate-x-1/2 w-[34%] flex flex-col items-center text-center pointer-events-none">
                            {generatedArtUrl && (
                              <img
                                src={generatedArtUrl}
                                alt="Custom Art"
                                className="w-full aspect-square object-contain rounded mb-1"
                              />
                            )}
                            {studioText.trim() && (
                              <p
                                style={{ color: studioTextColor }}
                                className="font-serif text-xs sm:text-sm tracking-wide leading-tight"
                              >
                                {studioText}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 360° Studio Lookbook & Drape Simulator */
                      <div className="relative flex-1 my-4 flex flex-col items-center justify-center">
                        {/* Subtle Architectural Pedestal Grid */}
                        <div
                          style={{ transform: angleTransform[vrAngle] }}
                          className="relative w-[300px] sm:w-[360px] aspect-[420/460] transition-transform duration-500 flex items-center justify-center"
                        >
                          <HoodieGarmentSvg
                            colorHex={studioColor.hex}
                            isLight={studioColor.isLight}
                            viewAngle={vrAngle === 'Back Print' ? 'Back Print' : 'Front'}
                            isOversized={studioProduct.category === 'Oversized'}
                          />

                          {/* Render Custom Print on Front or Back Angle */}
                          {(vrAngle === 'Front' ||
                            vrAngle === 'Back Print' ||
                            vrAngle === '45° Left' ||
                            vrAngle === '45° Right') && (
                            <div className="absolute top-[33%] left-1/2 -translate-x-1/2 w-[34%] flex flex-col items-center text-center pointer-events-none">
                              {generatedArtUrl && (
                                <img
                                  src={generatedArtUrl}
                                  alt="AI Art Preview"
                                  className={`w-full aspect-square object-contain rounded mb-1.5 ${
                                    studioColor.isLight ? 'mix-blend-multiply' : ''
                                  }`}
                                />
                              )}
                              {studioText.trim() && (
                                <p
                                  style={{ color: studioTextColor }}
                                  className="font-serif text-sm tracking-wide leading-tight"
                                >
                                  {studioText}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Floor Shadow Ellipse */}
                        <div className="w-56 h-4 rounded-full bg-black/15 blur-md mt-2" />
                      </div>
                    )}

                    {/* Bottom Viewport Controls */}
                    <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/10">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F9F8F6]/90 text-[#1A1918]">
                        Proportions: {vrWearerHeight} • Wearing Size {studioSize} (
                        {studioProduct.category === 'Oversized' ? 'Relaxed Drop' : 'Tailored Fit'})
                      </span>

                      {vrMode === 'camera' && (
                        <div className="flex items-center gap-2 bg-[#F9F8F6]/95 px-3 py-1.5 rounded-full text-xs text-[#1A1918]">
                          <Maximize2 className="w-3.5 h-3.5 text-[#8C5843]" />
                          <span>Scale</span>
                          <input
                            type="range"
                            min="0.75"
                            max="1.35"
                            step="0.05"
                            value={vrOverlayScale}
                            onChange={(e) => setVrOverlayScale(parseFloat(e.target.value))}
                            className="w-24 accent-[#8C5843]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT: FITTING ROOM CONTROLS */}
                <div className="lg:col-span-4 space-y-5">
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#8C5843] font-semibold">
                        Fitting Calibration
                      </p>
                      <h2 className="font-serif text-2xl text-[#1A1918] mt-1">
                        {studioProduct.name}
                      </h2>
                    </div>

                    {/* Studio Environment Lighting */}
                    {vrMode === 'studio' && (
                      <div>
                        <label className="block text-xs font-medium text-[#5C5852] mb-2 flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-[#8C5843]" /> Studio Ambient Lighting
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Daylight Loft', 'Warm Golden Hour', 'Gallery Spot'].map((light) => (
                            <button
                              key={light}
                              type="button"
                              onClick={() => setVrLighting(light)}
                              className={`py-2 px-2 rounded-xl text-[11px] font-medium border transition-colors ${
                                vrLighting === light
                                  ? 'bg-[#1A1918] text-[#F9F8F6] border-[#1A1918]'
                                  : 'bg-[#F9F8F6] text-[#5C5852] border-[#E5E0D8]'
                              }`}
                            >
                              {light.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Wearer Height & Fit Reference */}
                    <div>
                      <label className="block text-xs font-medium text-[#5C5852] mb-2">
                        Wearer Height Reference
                      </label>
                      <select
                        value={vrWearerHeight}
                        onChange={(e) => setVrWearerHeight(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] text-xs font-medium text-[#1A1918]"
                      >
                        <option value={'5\'4" (162 cm)'}>5&apos;4&quot; (162 cm) — Cropped / Relaxed Drape</option>
                        <option value={'5\'9" (175 cm)'}>5&apos;9&quot; (175 cm) — Balanced Streetwear Drape</option>
                        <option value={'6\'1" (185 cm)'}>6&apos;1&quot; (185 cm) — Classic Torso Length</option>
                      </select>
                    </div>

                    {/* Shade Switcher */}
                    <div>
                      <label className="block text-xs font-medium text-[#5C5852] mb-2">
                        Garment Shade: <strong className="text-[#1A1918]">{studioColor.name}</strong>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {COLOR_SWATCHES.map((swatch) => (
                          <button
                            key={swatch.name}
                            type="button"
                            onClick={() => setStudioColor(swatch)}
                            className={`w-7 h-7 rounded-full border transition-transform ${
                              studioColor.name === swatch.name
                                ? 'scale-115 ring-2 ring-offset-2 ring-[#1A1918]'
                                : ''
                            }`}
                            style={{ backgroundColor: swatch.hex, borderColor: swatch.border }}
                            title={swatch.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size Switcher */}
                    <div>
                      <label className="block text-xs font-medium text-[#5C5852] mb-2">
                        Fit Size
                      </label>
                      <div className="grid grid-cols-6 gap-1.5">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setStudioSize(sz)}
                            className={`py-2 rounded-lg text-xs font-medium ${
                              studioSize === sz
                                ? 'bg-[#1A1918] text-[#F9F8F6]'
                                : 'bg-[#F9F8F6] text-[#1A1918] border border-[#E5E0D8]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleAddStudioGarmentToCart}
                        className="w-full py-3.5 px-5 rounded-xl bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add Fitted Hoodie to Bag — ₹
                        {studioProduct.price.toLocaleString('en-IN')}
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateTo('ai-studio')}
                        className="w-full py-3 px-5 rounded-xl border border-[#E5E0D8] hover:border-[#1A1918] text-[#1A1918] text-xs font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#8C5843]" /> Edit Artwork in AI Studio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            5. ABOUT PAGE
           ========================================================= */}
        {activePage === 'about' && (
          <div className="pb-24 space-y-20">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium">
                      About VIBEMode
                    </p>
                    <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918] leading-tight">
                      Individuality Woven into Heavyweight Cotton.
                    </h1>
                    <p className="text-base text-[#2C2A28] leading-relaxed">
                      {BRAND_POSITIONING}
                    </p>
                    <p className="text-sm text-[#5C5852] leading-relaxed">
                      Inspired by modern agile D2C personalisation leaders, VIBEMode eliminates pre-printed inventory guesswork. By pairing export-grade 380–460 GSM Indian fleece from Tiruppur &amp; Ludhiana with post-order customisation in Noida, generative AI design tools, and spatial VR try-on, we turn every customer into the creative director of their own wardrobe.
                    </p>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    {[
                      { metric: '380–460', label: 'GSM Combed Fleece' },
                      { metric: '48 Hrs', label: 'Noida Custom Dispatch' },
                      { metric: '8 SKUs', label: 'Hero Hoodie Collection' },
                      { metric: '7 Days', label: 'Free Size & Print Exchange' }
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-6 rounded-2xl bg-[#F9F8F6] border border-[#E5E0D8]"
                      >
                        <p className="font-serif text-2xl sm:text-3xl text-[#1A1918]">
                          {stat.metric}
                        </p>
                        <p className="text-xs text-[#5C5852] mt-1.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Identity & Positioning Architecture Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-[#E5E0D8] p-8 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 flex flex-col items-start space-y-4 border-b lg:border-b-0 lg:border-r border-[#EFECE6] pb-6 lg:pb-0 lg:pr-8">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C5843] font-medium">
                      Brand Identity
                    </span>
                    <div className="flex items-center gap-3.5">
                      <div className="scale-125 origin-left">
                        <VibeModeLogoMark />
                      </div>
                      <div className="pl-2">
                        <p className="font-serif text-3xl text-[#1A1918]">
                          VIBE<span className="italic text-[#8C5843]">Mode</span>
                        </p>
                        <p className="text-xs text-[#5C5852]">
                          “Your Hoodie. Your Design. Your Identity.”
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-[11px] uppercase tracking-widest text-[#8C5843] font-semibold">
                        Positioning Statement
                      </p>
                      <p className="text-xs sm:text-sm text-[#2C2A28] leading-relaxed">
                        {BRAND_POSITIONING}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] uppercase tracking-widest text-[#5C665E] font-semibold">
                        Core Customer Promise
                      </p>
                      <ul className="text-xs sm:text-sm text-[#2C2A28] space-y-1.5">
                        <li>• Delivered in 2–4 days in metro cities (48-hr dispatch)</li>
                        <li>• Free 7-day size &amp; print exchange guarantee</li>
                        <li>• COD available up to ₹5,000 (fee waived ≥ ₹1,499)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Founding Team Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                  Leadership
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918]">
                  Founding Team
                </h2>
                <p className="text-sm text-[#5C5852] mt-2">
                  Four co-founders uniting textile craftsmanship, agile Indian supply chains, and customer-centric technology.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {TEAM.map((member) => (
                  <div
                    key={member.name}
                    className="bg-white rounded-2xl p-7 border border-[#E5E0D8] flex flex-col justify-between"
                  >
                    <div>
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-full object-cover border border-[#DDD6CA] mb-5"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#EFECE6] border border-[#DDD6CA] text-[#1A1918] flex items-center justify-center font-serif text-xl mb-5">
                          {member.initials}
                        </div>
                      )}
                      <h3 className="font-serif text-xl text-[#1A1918]">{member.name}</h3>
                      <p className="text-[11px] uppercase tracking-widest text-[#8C5843] font-medium mt-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-[#5C5852] leading-relaxed mt-4">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            6. SUPPLY CHAIN PAGE
           ========================================================= */}
        {activePage === 'supply-chain' && (
          <div className="pb-24 space-y-16">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                    Operations & Fulfilment
                  </p>
                  <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
                    Supply Chain Model
                  </h1>
                  <p className="text-base text-[#2C2A28] mt-4 leading-relaxed">
                    Built on a <strong className="font-semibold">responsive supply chain, bulk procurement, postponement (customisation post-order), and centralised distribution</strong>—delivering bespoke garments without inventory waste.
                  </p>
                </div>
              </div>
            </section>

            {/* Horizontal Flow Diagram */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
                  <h2 className="font-serif text-2xl text-[#1A1918]">
                    End-to-End Postponement Flow
                  </h2>
                  <span className="text-xs text-[#8C5843]">
                    Select any node below to inspect operational metrics
                  </span>
                </div>

                {/* 6-Stage Horizontal Flow with Arrows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
                  {SUPPLY_CHAIN_STEPS.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isSelected = selectedSupplyStep === idx;
                    return (
                      <div key={item.step} className="relative flex flex-col">
                        <button
                          type="button"
                          onClick={() => setSelectedSupplyStep(idx)}
                          className={`flex-1 flex flex-col items-center text-center p-5 rounded-2xl border transition-all ${
                            isSelected
                              ? 'border-[#1A1918] bg-[#EFECE6]'
                              : 'border-[#E5E0D8] bg-[#F9F8F6] hover:border-[#8C5843]'
                          }`}
                        >
                          <span className="text-[10px] tracking-widest uppercase text-[#8C5843] font-medium mb-3">
                            Step {item.step}
                          </span>
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border ${
                              isSelected
                                ? 'bg-[#1A1918] text-[#F9F8F6] border-[#1A1918]'
                                : 'bg-white text-[#1A1918] border-[#E5E0D8]'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="font-serif text-sm font-medium text-[#1A1918] leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-[11px] text-[#5C5852] mt-1">({item.location})</p>
                        </button>

                        {idx < SUPPLY_CHAIN_STEPS.length - 1 && (
                          <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#F9F8F6] border border-[#DDD6CA] text-[#1A1918] items-center justify-center">
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Selected Stage Detail Panel */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#1A1918] text-[#F9F8F6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-[11px] uppercase tracking-widest text-[#DDD6CA]">
                  Stage {SUPPLY_CHAIN_STEPS[selectedSupplyStep].step} •{' '}
                  {SUPPLY_CHAIN_STEPS[selectedSupplyStep].tag} ({SUPPLY_CHAIN_STEPS[selectedSupplyStep].location})
                </p>
                <h3 className="font-serif text-2xl">
                  {SUPPLY_CHAIN_STEPS[selectedSupplyStep].title}
                </h3>
                <p className="text-sm text-[#DDD6CA]/90 leading-relaxed">
                  {SUPPLY_CHAIN_STEPS[selectedSupplyStep].summary}
                </p>
              </div>
              <div className="px-5 py-4 rounded-xl bg-white/5 border border-white/15 shrink-0">
                <p className="text-[10px] uppercase tracking-widest text-[#DDD6CA]">
                  Key Standard
                </p>
                <p className="font-serif text-lg text-[#F9F8F6] mt-0.5">
                  {SUPPLY_CHAIN_STEPS[selectedSupplyStep].metric}
                </p>
              </div>
            </div>

            {/* Four Core Supply Chain Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                {
                  title: 'Responsive Supply Chain',
                  desc: 'Real-time order routing from checkout directly to Noida print queues within minutes.'
                },
                {
                  title: 'Bulk Procurement',
                  desc: 'High-volume sourcing of unbranded 380–460 GSM fleece blanks from Tiruppur & Ludhiana mills.'
                },
                {
                  title: 'Postponement Model',
                  desc: 'Customisation occurs strictly post-order, preventing unsold graphic inventory.'
                },
                {
                  title: 'Centralised Distribution',
                  desc: 'Single-hub quality control and Delhivery line-haul dispatch across 18,500+ pin codes.'
                }
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-[#F9F8F6] border border-[#E5E0D8] space-y-1.5"
                >
                  <h4 className="font-serif text-base text-[#1A1918]">{pillar.title}</h4>
                  <p className="text-xs text-[#5C5852] leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )}

        {/* =========================================================
            7. POLICIES PAGE (SHIPPING, RETURNS, COD)
           ========================================================= */}
        {activePage === 'policies' && (
          <div className="pb-24 space-y-14">
            <section className="bg-[#EFECE6] border-b border-[#E5E0D8] py-14">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C5843] font-medium mb-2">
                  Client Care & Transparency
                </p>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
                  Shipping, Returns & Exchange Policy
                </h1>
                <p className="text-sm text-[#5C5852] mt-3 max-w-xl mx-auto">
                  Consistent, transparent commitments across every order: 48-hour custom dispatch, 2–4 day metro delivery, Free 7-day size &amp; print exchange, and COD up to ₹5,000.
                </p>

                {/* Quick Policy At-a-Glance Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left">
                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#DDD6CA]">
                    <p className="text-[10px] uppercase tracking-widest text-[#8C5843] font-semibold">
                      Delivery Speed
                    </p>
                    <p className="font-serif text-lg text-[#1A1918] mt-1">
                      48-Hr Dispatch • 2–4 Days Metro
                    </p>
                    <p className="text-[11px] text-[#5C5852] mt-0.5">
                      4–7 days pan-India via Delhivery
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#DDD6CA]">
                    <p className="text-[10px] uppercase tracking-widest text-[#5C665E] font-semibold">
                      Returns & Exchange
                    </p>
                    <p className="font-serif text-lg text-[#1A1918] mt-1">
                      Free 7-Day Exchange
                    </p>
                    <p className="text-[11px] text-[#5C5852] mt-0.5">
                      Complimentary pickup for size/defect
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#DDD6CA]">
                    <p className="text-[10px] uppercase tracking-widest text-[#8C5843] font-semibold">
                      Cash on Delivery
                    </p>
                    <p className="font-serif text-lg text-[#1A1918] mt-1">
                      Up to ₹5,000 Order Value
                    </p>
                    <p className="text-[11px] text-[#5C5852] mt-0.5">
                      ₹49 fee waived on orders ≥ ₹1,499
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl border border-[#E5E0D8] divide-y divide-[#EFECE6] overflow-hidden">
                {POLICIES.map((policy) => {
                  const IconComponent = policy.icon;
                  const isOpen = openPolicyId === policy.id;
                  return (
                    <div key={policy.id}>
                      <button
                        type="button"
                        onClick={() => setOpenPolicyId(isOpen ? '' : policy.id)}
                        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#F9F8F6] transition-colors focus:outline-none"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                              isOpen
                                ? 'bg-[#1A1918] text-[#F9F8F6] border-[#1A1918]'
                                : 'bg-[#EFECE6] text-[#1A1918] border-[#E5E0D8]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg text-[#1A1918]">{policy.title}</h3>
                            <span className="text-[11px] uppercase tracking-wider text-[#8C5843] font-medium">
                              {policy.badge}
                            </span>
                          </div>
                        </div>
                        <div className="text-[#5C5852]">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 pl-[4.75rem]">
                          <p className="text-sm text-[#5C5852] leading-relaxed">{policy.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* --- SLIDE-OUT CART DRAWER --- */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1918]/45 backdrop-blur-xs transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#F9F8F6] shadow-2xl border-l border-[#E5E0D8] transform transition-transform duration-300 ease-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8] bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#8C5843]" />
            <h2 className="font-serif text-xl text-[#1A1918]">Your Bag ({cartCount})</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full border border-[#E5E0D8] text-[#5C5852] hover:text-[#1A1918]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#8C5843]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#1A1918]">Your bag is empty</p>
                <p className="text-xs text-[#5C5852] mt-1">
                  Explore our collection or create bespoke artwork in the AI Studio.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#1A1918] text-[#F9F8F6] text-xs uppercase tracking-widest font-medium"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E5E0D8]"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-[#EFECE6] shrink-0">
                    <img
                      src={item.customThumbnail || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full border border-black/25"
                      style={{ backgroundColor: item.colorHex || '#1A1918' }}
                      title={item.selectedColor}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base text-[#1A1918] truncate">{item.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-[#969087] hover:text-[#1A1918]"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#5C5852] mt-0.5">
                      {item.selectedColor} • Size {item.selectedSize}
                    </p>
                    <p className="text-[11px] text-[#8C5843] mt-1 truncate">{item.customSummary}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E5E0D8] rounded-full bg-[#F9F8F6]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartId, -1)}
                          className="p-1.5 text-[#5C5852] hover:text-[#1A1918]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartId, 1)}
                          className="p-1.5 text-[#5C5852] hover:text-[#1A1918]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[#1A1918]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E5E0D8] bg-white space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C5852]">
                <span>Subtotal</span>
                <span className="font-medium text-[#1A1918]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#5C5852]">
                <span>Delhivery Shipping</span>
                <span className="font-medium text-[#5C665E]">
                  {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1A1918] pt-2 border-t border-[#EFECE6]">
                <span>Total</span>
                <span>₹{(cartSubtotal + shippingFee).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setOrderConfirmed(false);
                setIsCartOpen(false);
                setIsCheckoutModalOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* --- CHECKOUT MODAL (UPI, CARD, COD) --- */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1918]/55 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#F9F8F6] rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
              <h3 className="font-serif text-2xl text-[#1A1918]">Atelier Checkout</h3>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="p-2 rounded-full border border-[#E5E0D8] bg-white text-[#5C5852]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {orderConfirmed ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EFECE6] border border-[#DDD6CA] text-[#1A1918] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#1A1918]">
                  Order Queued at Noida Hub
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5852] max-w-sm mx-auto leading-relaxed">
                  Thank you{customerName ? `, ${customerName}` : ''}. Your bespoke hoodie is scheduled for custom printing and Delhivery dispatch within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    navigateTo('home');
                  }}
                  className="mt-2 px-6 py-3 rounded-full bg-[#1A1918] text-[#F9F8F6] text-xs uppercase tracking-widest font-medium"
                >
                  Return Home
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOrderConfirmed(true);
                  setCart([]);
                }}
                className="space-y-4 pt-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5C5852] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-xs text-[#1A1918]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#5C5852] mb-1">
                      City & Pin Code
                    </label>
                    <input
                      type="text"
                      required
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Bengaluru 560038"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E0D8] text-xs text-[#1A1918]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5C5852] mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'UPI', label: 'UPI (Zero Fee)' },
                      { id: 'Card', label: 'Card' },
                      {
                        id: 'COD',
                        label: cartSubtotal >= 1499 ? 'COD (Free)' : 'COD (+₹49)'
                      }
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        disabled={pm.id === 'COD' && cartSubtotal > 5000}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors disabled:opacity-40 ${
                          paymentMethod === pm.id
                            ? 'bg-[#1A1918] text-[#F9F8F6] border-[#1A1918]'
                            : 'bg-white text-[#1A1918] border-[#E5E0D8]'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                  {cartSubtotal > 5000 && (
                    <p className="text-[11px] text-[#8C5843] mt-1">
                      COD is available on orders up to ₹5,000.
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#EFECE6] space-y-1 text-xs">
                  <div className="flex justify-between text-[#5C5852]">
                    <span>Items ({cartCount})</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#5C5852]">
                    <span>Shipping & Handling</span>
                    <span>₹{(shippingFee + codFee).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#1A1918] pt-1.5 border-t border-[#DDD6CA]">
                    <span>Amount Payable</span>
                    <span>₹{(cartSubtotal + shippingFee + codFee).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1A1918] hover:bg-[#8C5843] text-[#F9F8F6] text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  Confirm Custom Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- EDITORIAL FOOTER --- */}
      <footer className="bg-[#1A1918] text-[#DDD6CA] pt-16 pb-10 border-t border-[#2E2C2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2E2C2A]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <VibeModeLogoMark inverted />
                <span className="font-serif text-2xl text-[#F9F8F6]">
                  VIBE<span className="italic text-[#8C5843]">Mode</span>
                </span>
              </div>
              <p className="text-xs text-[#969087] leading-relaxed">
                Your Hoodie. Your Design. Your Identity. Made-to-order 380–460 GSM luxury fleece crafted in India with 48-hour metro dispatch.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full border border-[#383634] hover:border-[#8C5843] flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full border border-[#383634] hover:border-[#8C5843] flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full border border-[#383634] hover:border-[#8C5843] flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#F9F8F6] font-semibold mb-4">
                Pages
              </h4>
              <ul className="space-y-2.5 text-xs text-[#969087]">
                {navItems.map((nav) => (
                  <li key={nav.id}>
                    <button
                      type="button"
                      onClick={() => navigateTo(nav.id)}
                      className="hover:text-[#F9F8F6] transition-colors"
                    >
                      {nav.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#F9F8F6] font-semibold mb-4">
                Atelier Tools
              </h4>
              <ul className="space-y-2.5 text-xs text-[#969087]">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('ai-studio')}
                    className="hover:text-[#F9F8F6] transition-colors"
                  >
                    Gemini AI Design Studio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('vr-tryon')}
                    className="hover:text-[#F9F8F6] transition-colors"
                  >
                    360° & AR Virtual Try-On
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setShopFilter('College & Group');
                      navigateTo('shop');
                    }}
                    className="hover:text-[#F9F8F6] transition-colors"
                  >
                    College & Group Customisation
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-[#F9F8F6] font-semibold mb-4">
                Customisation Hub
              </h4>
              <ul className="space-y-3 text-xs text-[#969087]">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8C5843] shrink-0 mt-0.5" />
                  <span>Sector 63, Noida, Uttar Pradesh 201301</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C5843] shrink-0" />
                  <span>support@vibemode.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C5843] shrink-0" />
                  <span>+91 98110 48200</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6A63]">
            <p>© {new Date().getFullYear()} VIBEMode Apparel Pvt. Ltd. All rights reserved.</p>
            <p>Tiruppur & Ludhiana Fleece • Noida Customisation • Delhivery Logistics</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
