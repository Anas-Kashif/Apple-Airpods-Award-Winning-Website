export interface StoryBeat {
  id: string;
  startProgress: number;
  endProgress: number;
  alignment: 'center' | 'left' | 'right';
  eyebrow?: string;
  title: string;
  subtitle: string;
  points?: string[];
  ctaText?: string;
  secondaryCtaText?: string;
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPercent: number; // Position X on canvas (0-100)
  yPercent: number; // Position Y on canvas (0-100)
  frameStart: number;
  frameEnd: number;
  iconName: string;
}

export const TOTAL_FRAMES = 240;

export const STORY_BEATS: StoryBeat[] = [
  {
    id: 'hero',
    startProgress: 0,
    endProgress: 0.15,
    alignment: 'left',
    eyebrow: 'THE ULTIMATE LISTENING EXPERIENCE',
    title: 'Apple AirPods Max',
    subtitle: 'High-fidelity audio, industry-leading Active Noise Cancellation, Spatial Audio, and exceptional all-day comfort.',
    ctaText: 'Experience AirPods Max',
  },
  {
    id: 'engineering',
    startProgress: 0.18,
    endProgress: 0.40,
    alignment: 'left',
    eyebrow: 'ACOUSTIC ARCHITECTURE',
    title: 'Precision-engineered for pure sound.',
    subtitle: 'Custom Apple dynamic driver, breathable knit mesh canopy, and acoustically engineered memory foam cushions deliver studio-grade clarity.',
    points: [
      'Apple-designed 40mm dynamic driver',
      'Breathable knit mesh canopy & memory foam cushions',
      'Acoustically engineered dual-neodymium ring magnet motor',
    ],
  },
  {
    id: 'anc',
    startProgress: 0.43,
    endProgress: 0.65,
    alignment: 'right',
    eyebrow: 'COMPUTATIONAL AUDIO & ANC',
    title: 'Industry-leading Active Noise Cancellation.',
    subtitle: 'Dual Apple H1 headphone chips and an 8-microphone array work in unison to eliminate ambient sound in real time.',
    points: [
      'Eight microphones for Active Noise Cancellation',
      'Dual Apple H1 chips (10 audio cores per chip)',
      'Adaptive EQ & Transparency mode',
    ],
  },
  {
    id: 'sound',
    startProgress: 0.68,
    endProgress: 0.85,
    alignment: 'left',
    eyebrow: 'SPATIAL AUDIO ENGINE',
    title: 'Immersive, theater-like sound.',
    subtitle: 'Personalized Spatial Audio with dynamic head tracking places sound all around you for a three-dimensional listening experience.',
    points: [
      'Personalized Spatial Audio with dynamic head tracking',
      'Apple-designed H1 chip computational audio',
      'Ultra-low distortion driver across the audible spectrum',
    ],
  },
];

export const EXPLODED_HOTSPOTS: Hotspot[] = [
  {
    id: 'h1-chip',
    title: 'Dual Apple H1 Chips',
    subtitle: '10 Core Computational Audio',
    description: 'Custom Apple H1 chip in each ear cup leverages 10 audio cores to run real-time Adaptive EQ, Active Noise Cancellation, and Spatial Audio.',
    xPercent: 48,
    yPercent: 36,
    frameStart: 90,
    frameEnd: 160,
    iconName: 'Cpu',
  },
  {
    id: 'driver',
    title: '40mm Dynamic Driver',
    subtitle: 'Dual Neodymium Ring Magnet Motor',
    description: 'Delivers extended frequency range with rich, deep bass, accurate mids, and crisp, clean highs with ultra-low harmonic distortion.',
    xPercent: 32,
    yPercent: 54,
    frameStart: 90,
    frameEnd: 160,
    iconName: 'Disc',
  },
  {
    id: 'mics',
    title: '8-Microphone ANC Array',
    subtitle: 'Beamforming & Wind Suppression',
    description: 'Eight total microphones actively sample and block external noise while beamforming mics isolate your voice during calls.',
    xPercent: 68,
    yPercent: 44,
    frameStart: 90,
    frameEnd: 160,
    iconName: 'Mic',
  },
  {
    id: 'cushion',
    title: 'Acoustic Memory Foam Cushions',
    subtitle: 'Knit Mesh Textile Canopy',
    description: 'Engineered mesh textile and custom memory foam create an optimal acoustic seal for immersive isolation.',
    xPercent: 78,
    yPercent: 62,
    frameStart: 90,
    frameEnd: 160,
    iconName: 'Shield',
  },
];

export const TECH_SPECS = [
  { label: 'Battery Life', value: '20 Hours', sub: 'With ANC & Spatial Audio On' },
  { label: 'Fast Charge', value: '5 Min = 1.5 Hours', sub: 'Lightning / USB-C Fast Charge' },
  { label: 'Driver Unit', value: '40mm Dynamic', sub: 'Apple-Designed Motor' },
  { label: 'Audio Processor', value: 'Dual Apple H1', sub: '10 Audio Cores Per Ear Cup' },
  { label: 'Weight', value: '384.8 g', sub: 'Stainless Steel & Aluminum' },
  { label: 'Connectivity', value: 'Bluetooth 5.0', sub: 'Seamless Apple Device Switching' },
];

export const COLOR_VARIANTS = [
  { id: 'space-gray', name: 'Space Gray', hex: '#2C2C2E', borderHex: '#0071E3', desc: 'Sleek dark anodized aluminum cups with black canopy.' },
  { id: 'silver', name: 'Silver', hex: '#E3E4E6', borderHex: '#2997FF', desc: 'Anodized silver aluminum with white headband canopy.' },
  { id: 'sky-blue', name: 'Sky Blue', hex: '#5B7B94', borderHex: '#2997FF', desc: 'Refined metallic blue finish with matching cushions.' },
  { id: 'pink', name: 'Pink', hex: '#D87D7D', borderHex: '#FF2D55', desc: 'Warm soft pink anodized aluminum finish.' },
  { id: 'green', name: 'Green', hex: '#758476', borderHex: '#34C759', desc: 'Subtle sage green anodized aluminum finish.' },
];
