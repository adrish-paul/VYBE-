/**
 * VYBE Event Discovery Platform - Events Data Module
 * Curated demonstration events with realistic details, high-res photography, and metadata.
 */

export const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: 'sparkles' },
  { id: 'music', label: 'Music', icon: 'music' },
  { id: 'technology', label: 'Technology', icon: 'cpu' },
  { id: 'workshops', label: 'Workshops', icon: 'hammer' },
  { id: 'sports', label: 'Sports', icon: 'activity' },
  { id: 'art', label: 'Art & Culture', icon: 'palette' },
  { id: 'education', label: 'Education', icon: 'book-open' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'coffee' }
];

export const CITIES = [
  { id: 'all', label: 'All Cities' },
  { id: 'Bengaluru', label: 'Bengaluru' },
  { id: 'Mumbai', label: 'Mumbai' },
  { id: 'Delhi NCR', label: 'Delhi NCR' },
  { id: 'Goa', label: 'Goa' },
  { id: 'Kolkata', label: 'Kolkata' },
  { id: 'Jaipur', label: 'Jaipur' },
  { id: 'Hyderabad', label: 'Hyderabad' },
  { id: 'Udupi', label: 'Udupi' }
];

export const EVENTS_DATA = [
  {
    id: 'vybe-ev-01',
    title: 'Neon Horizon: Ambient & Modular Synth Showcase',
    category: 'music',
    categoryLabel: 'Music',
    isFeatured: true,
    isHeroFeatured: true,
    badge: 'Curator’s Pick',
    date: '2026-11-14',
    dateFormatted: 'Sat, Nov 14, 2026',
    time: '7:30 PM – 11:30 PM',
    venue: 'Warehouse 44, Indiranagar Arts Quarter',
    city: 'Bengaluru',
    price: '₹899',
    priceNumeric: 899,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'A multi-sensory live performance of modular synth soundscapes, kinetic beam projections, and audio-reactive visuals.',
    fullDescription: 'Step into an auditory architecture of glowing patch cables and sub-bass resonance. Neon Horizon brings together four pioneering analog synthesists and digital projection artists for an uninterrupted four-hour journey through ambient dub, melodic techno, and kinetic audio-reactive light installations.',
    highlights: [
      'Live quadraphonic sound system tuned for spatial immersion',
      'Exclusive modular synth hands-on jam lounge during intermission',
      'Curated botanical mocktail and kombucha tasting bar',
      'Limited-edition silkscreen event poster included with entry'
    ],
    organizer: {
      name: 'SubtleWave Sound Lab',
      role: 'Sonic Arts Collective',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 220,
    registeredCount: 188,
    accentColor: '#D946EF'
  },
  {
    id: 'vybe-ev-02',
    title: 'NextForm: Generative AI & Spatial UI Symposium',
    category: 'technology',
    categoryLabel: 'Technology',
    isFeatured: true,
    badge: 'Selling Fast',
    date: '2026-11-18',
    dateFormatted: 'Wed, Nov 18, 2026',
    time: '10:00 AM – 5:30 PM',
    venue: 'The Lattice Pavilion, Cyber City',
    city: 'Delhi NCR',
    price: '₹1,499',
    priceNumeric: 1499,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Keynotes, lightning teardowns, and design laboratories exploring spatial computing, agentic workflows, and creative tooling.',
    fullDescription: 'NextForm brings 350 designers, creative technologists, and engineers together to decode how artificial intelligence is rewriting interface paradigms. Experience live design critique sessions, open-source agent tooling showcases, and visionary spatial computing prototypes.',
    highlights: [
      'Keynotes from founders of leading generative interface tools',
      'Interactive design breakout rooms with real-time collaborative sandbox',
      'Curated hardware testing station (Spatial goggles & haptic controllers)',
      'Complimentary gourmet espresso bar & networking brunch'
    ],
    organizer: {
      name: 'DesignCraft Collective',
      role: 'Global Design Institute',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 350,
    registeredCount: 312,
    accentColor: '#8B5CF6'
  },
  {
    id: 'vybe-ev-13',
    title: 'Prism & Pulse: Industrial Techno & Laser Architecture',
    category: 'music',
    categoryLabel: 'Music',
    isFeatured: true,
    badge: 'Headliner',
    date: '2026-11-20',
    dateFormatted: 'Fri, Nov 20, 2026',
    time: '10:00 PM – 4:00 AM',
    venue: 'The Boiler House, Lower Parel Industrial Estate',
    city: 'Mumbai',
    price: '₹1,499',
    priceNumeric: 1499,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Subterranean industrial techno synchronized with 360-degree kinetic laser trusses inside a decommissioned mill.',
    fullDescription: 'Curated inside a 1940s decommissioned textile mill with 40-foot ceilings, Prism & Pulse pairs four underground techno producers with Europe’s leading kinetic laser design studio for an architectural light-and-sound cathedral.',
    highlights: [
      'Function-One Vero sound system precision tuned to the room',
      'Full-perimeter kinetic moving laser matrix',
      'Restricted zero-flash photography policy for pure presence',
      'Late night electrolyte and hydration lounge'
    ],
    organizer: {
      name: 'Subversive Soundworks',
      role: 'Electronic Music Vanguard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 550,
    registeredCount: 492,
    accentColor: '#E11D48'
  },
  {
    id: 'vybe-ev-03',
    title: 'Kinfolk Ceramics: Wheel Throwing & Clay Alchemy',
    category: 'workshops',
    categoryLabel: 'Workshops',
    isFeatured: true,
    badge: 'Only 6 Spots Left',
    date: '2026-11-21',
    dateFormatted: 'Sat, Nov 21, 2026',
    time: '2:00 PM – 6:00 PM',
    venue: 'Terra Earth Studio, Bandra West',
    city: 'Mumbai',
    price: '₹2,100',
    priceNumeric: 2100,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Tactile afternoon mastering centering, shaping, and raku-inspired firing techniques with studio pottery masters.',
    fullDescription: 'Unplug your devices and reconnect with grounding, earth-driven craft. In this comprehensive four-hour masterclass, master ceramicist Nandita Sen guides participants through clay conditioning, wheel throwing fundamentals, cylinder pull, and custom texturing.',
    highlights: [
      'All premium terracotta and stoneware materials provided',
      'Take home two kiln-fired, custom-glazed pieces shipped post-cure',
      'Intimate cohort capped at 16 creators for 1-on-1 feedback',
      'Artisanal herbal teas and organic bites included'
    ],
    organizer: {
      name: 'Terra Earth Guild',
      role: 'Craft Studio',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 16,
    registeredCount: 10,
    accentColor: '#F97316'
  },
  {
    id: 'vybe-ev-04',
    title: 'Midnight Run Club: Neon City Circuit (10K / 5K)',
    category: 'sports',
    categoryLabel: 'Sports',
    isFeatured: false,
    badge: 'Free Entry',
    date: '2026-11-22',
    dateFormatted: 'Sun, Nov 22, 2026',
    time: '9:30 PM – 12:00 AM',
    venue: 'Cubbon Park Central Promenade',
    city: 'Bengaluru',
    price: 'Free',
    priceNumeric: 0,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Strap on glow armbands and hit illuminated heritage streets with music pacers and rooftop hydration hubs.',
    fullDescription: 'Trade competitive strain for pure nocturnal energy. The Midnight Run Club invites runners, joggers, and brisk walkers through Bangalore’s lush leafy avenues under ambient street lamps, guided by live mobile sound crews dropping uplifting deep house tempo.',
    highlights: [
      'Complimentary LED armbands and safety reflective bibs',
      'Dynamic pace groups from leisurely 7:30/km to brisk 4:45/km',
      'Electrolyte hydration stations powered by raw cold-pressed juices',
      'Post-run rooftop stretch & vinyl chillout session'
    ],
    organizer: {
      name: 'Pace & Pulse Run Crew',
      role: 'Urban Athletic Community',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 500,
    registeredCount: 432,
    accentColor: '#EF4444'
  },
  {
    id: 'vybe-ev-05',
    title: 'Chromatica: Modern Art & Optical Illusions Gallery',
    category: 'art',
    categoryLabel: 'Art & Culture',
    isFeatured: false,
    badge: 'Popular',
    date: '2026-11-27',
    dateFormatted: 'Fri, Nov 27, 2026',
    time: '11:00 AM – 9:00 PM',
    venue: 'Kala Ghoda Art House',
    city: 'Mumbai',
    price: '₹350',
    priceNumeric: 350,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Immerse yourself in infinite mirror rooms, kinetic color gradients, and perspective-bending spatial sculptures.',
    fullDescription: 'Chromatica reimagines contemporary installation art into a playful, reflective sanctuary. Featuring 12 international visual artists, the exhibition guides visitors through labyrinthine infinity chambers, responsive color fields, and giant soft clay-like kinetic sculptures.',
    highlights: [
      '14 walk-in spatial installations designed for high photographic expression',
      'Artist walkthrough and Q&A hosted at 4:00 PM',
      'Interactive tactile texture wall accessible to all visitors',
      'Includes entry to the private rooftop sculpture garden'
    ],
    organizer: {
      name: 'Aperture Foundation',
      role: 'Contemporary Arts Curators',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 400,
    registeredCount: 318,
    accentColor: '#EC4899'
  },
  {
    id: 'vybe-ev-06',
    title: 'The Specialty Coffee Odyssey: Cupping & Brewing',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    isFeatured: false,
    badge: 'Weekend Special',
    date: '2026-11-28',
    dateFormatted: 'Sat, Nov 28, 2026',
    time: '10:30 AM – 1:30 PM',
    venue: 'Aura Roastery & Tasting Room, Koramangala',
    city: 'Bengaluru',
    price: '₹750',
    priceNumeric: 750,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Discover single-origin varietals, calibrate sensory flavor wheels, and master manual brew bar gear with Q-Graders.',
    fullDescription: 'Elevate your daily ritual into a science of nuanced terroir. Led by certified Q-graders, this workshop breaks down altitude, fermentation methods, grind distribution, water chemistry, and extraction curves across Chemex, Aeropress, and V60 pour-overs.',
    highlights: [
      'Blind cupping of 6 rare single-estate microlots from Coorg & Chikmagalur',
      'Hands-on dial-in practice with professional temperature-controlled kettles',
      'Complimentary 250g bag of roasted beans personalized to your palate',
      'Comprehensive brewing cheat-sheet and TDS measurement charts'
    ],
    organizer: {
      name: 'Aura Specialty Coffee Co.',
      role: 'Artisan Roasters',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 24,
    registeredCount: 20,
    accentColor: '#D97706'
  },
  {
    id: 'vybe-ev-14',
    title: 'The Darkroom Alchemist: Cyanotype & Silver Gelatin',
    category: 'workshops',
    categoryLabel: 'Workshops',
    isFeatured: false,
    badge: 'Few Spots Left',
    date: '2026-11-29',
    dateFormatted: 'Sun, Nov 29, 2026',
    time: '11:00 AM – 4:30 PM',
    venue: 'The Halide Studio, Mehrauli Heritage Quarter',
    city: 'Delhi NCR',
    price: '₹1,850',
    priceNumeric: 1850,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Mix ferric cyanides, expose botanical glass plates, and hand-develop silver prints under amber safe-light.',
    fullDescription: 'Step back into the tactile, meditative magic of pre-digital photographic science. Explore chemical emulsion chemistry, contact printing large-format negative sheets, water bath tone calibration, and archival fiber print washing.',
    highlights: [
      'Hands-on access to vintage Besseler optical enlargers',
      'All chemistry, handmade cotton watercolor paper & safe gear included',
      'Create and take home 4 archival framed cyanotypes + silver prints',
      'Complimentary artisan lunch and filter brew'
    ],
    organizer: {
      name: 'Silver & Salt Guild',
      role: 'Analog Photo Preservationist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 14,
    registeredCount: 11,
    accentColor: '#EA580C'
  },
  {
    id: 'vybe-ev-15',
    title: 'Dawn Tide: Ocean Kayaking & Bioluminescence Paddle',
    category: 'sports',
    categoryLabel: 'Sports',
    isFeatured: false,
    badge: 'Adventure Pick',
    date: '2026-12-04',
    dateFormatted: 'Fri, Dec 04, 2026',
    time: '4:45 AM – 8:30 AM',
    venue: 'Delta Point Bay, Malpe Coastal Reserve',
    city: 'Udupi',
    price: '₹1,600',
    priceNumeric: 1600,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Paddle into glowing nocturnal phosphorescent waters before catching the golden sunrise over mangrove estuaries.',
    fullDescription: 'Launch tandem touring kayaks into tranquil backwaters during the new moon. Each paddle stroke activates millions of bioluminescent dinoflagellates that illuminate the water in electric blue trails, concluding with an open-fire breakfast on an uninhabited sandbar.',
    highlights: [
      'Top-tier Wilderness Systems kayaks and certified safety marshals',
      'Witness peak seasonal marine dinoflagellate glowing trails',
      'Beachside campfire sourdough and tender coconut breakfast',
      'All waterproof dry bags and GoPro mounts provided'
    ],
    organizer: {
      name: 'Saltwater Nomads',
      role: 'Coastal Expedition Guild',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 20,
    registeredCount: 16,
    accentColor: '#0284C7'
  },
  {
    id: 'vybe-ev-07',
    title: 'Autonomous Builders: Open-Source Hackathon 2026',
    category: 'technology',
    categoryLabel: 'Technology',
    isFeatured: false,
    badge: '₹5L Prize Pool',
    date: '2026-12-05',
    dateFormatted: 'Sat, Dec 05, 2026',
    time: '9:00 AM – 9:00 PM (36H Sprint)',
    venue: 'Velocity Tech Park, Whitefield',
    city: 'Bengaluru',
    price: 'Free',
    priceNumeric: 0,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Build next-gen autonomous agents, local-first web protocols, and zero-latency human-computer interfaces.',
    fullDescription: 'A 36-hour sprint for visionary developers, hackers, and UI innovators. Teams will collaborate with state-of-the-art open models and hardware accelerators with direct mentorship from principal engineers and startup founders.',
    highlights: [
      '₹500,000 in equity-free bounties across 4 tracks',
      'Unlimited high-speed fibre, computing credits & cloud instances',
      'On-site sleeping pods, midnight taco trucks, and energy bar',
      'Direct fast-track interviews with top engineering studios'
    ],
    organizer: {
      name: 'Kernel Protocol Guild',
      role: 'Open Source Consortium',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 300,
    registeredCount: 265,
    accentColor: '#9333EA'
  },
  {
    id: 'vybe-ev-08',
    title: 'Sundown Sessions: Organic Deep House on the Bay',
    category: 'music',
    categoryLabel: 'Music',
    isFeatured: false,
    badge: 'Sunset Special',
    date: '2026-12-06',
    dateFormatted: 'Sun, Dec 06, 2026',
    time: '4:30 PM – 10:30 PM',
    venue: 'Aura Pier Pavilion, Miramar Beach',
    city: 'Goa',
    price: '₹1,299',
    priceNumeric: 1299,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Golden hour melodies, live acoustic sax interludes, and barefoot oceanfront rhythm under palm canopies.',
    fullDescription: 'As the sun dips beneath the Arabian Sea, celebrate the close of the week with warm tribal rhythms, lush melodic synths, and live instrumental accompaniment. A celebration of natural elements, music, and community.',
    highlights: [
      'Four-hour progressive set by international and resident selectors',
      'Handcrafted sustainable wood stage with zero single-use plastics',
      'Artisanal woodfired sourdough pizzas and coastal tapas',
      'Chillout hammocks and beachfront fire-circle seating'
    ],
    organizer: {
      name: 'Tides & Resonance',
      role: 'Music & Cultural Curators',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 450,
    registeredCount: 380,
    accentColor: '#F43F5E'
  },
  {
    id: 'vybe-ev-16',
    title: 'Subterranean Cinema: 35mm Indie Retrospective',
    category: 'art',
    categoryLabel: 'Art & Culture',
    isFeatured: false,
    badge: 'Free Entry',
    date: '2026-12-11',
    dateFormatted: 'Fri, Dec 11, 2026',
    time: '6:30 PM – 11:00 PM',
    venue: 'The Vault Basement, Park Street Arcade',
    city: 'Kolkata',
    price: 'Free',
    priceNumeric: 0,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Rare 35mm celluloid projections of avant-garde cinema paired with live ambient score improvisation and rare vinyl archives.',
    fullDescription: 'An intimate subterranean gathering for film purists and analog lovers. Experience restored 35mm prints projected via authentic vintage carbon arc machines, followed by open critical discourse on cinema semiotics and a vinyl selector spinning rare jazz and modal records.',
    highlights: [
      'Authentic 35mm projection on matte linen screen with warm optical flicker',
      'Live modular synth score accompanying a restored silent masterwork',
      'Complimentary heritage tea service and roasted peanut cones',
      'Extensive library of rare cinema journals available for browsing'
    ],
    organizer: {
      name: 'Celluloid Sanctuary',
      role: 'Independent Film Archive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 60,
    registeredCount: 52,
    accentColor: '#BE123C'
  },
  {
    id: 'vybe-ev-09',
    title: 'Typographic Posters: Screenprinting Masterclass',
    category: 'education',
    categoryLabel: 'Education',
    isFeatured: false,
    badge: 'Materials Included',
    date: '2026-12-12',
    dateFormatted: 'Sat, Dec 12, 2026',
    time: '1:00 PM – 5:30 PM',
    venue: 'The Press House, Hauz Khas Village',
    city: 'Delhi NCR',
    price: '₹1,650',
    priceNumeric: 1650,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Learn color trapping, emulsion exposure, squeegee pressure, and pull an edition of 5 dual-color posters.',
    fullDescription: 'Explore the gritty, physical soul of print production. From converting vector typography to photographic positives, coating mesh with photo emulsion, exposure under UV, to mixing custom water-based neon inks, you will pull your own limited edition portfolio.',
    highlights: [
      'Learn complete screen reclamation, exposure and registration tricks',
      'Print on premium 300gsm acid-free Italian cotton rag paper',
      'Leave with your own set of five signed prints + screen stencil',
      'Curated typography reference library available for consultation'
    ],
    organizer: {
      name: 'TypeCraft Studio',
      role: 'Print & Graphic Workshop',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 18,
    registeredCount: 14,
    accentColor: '#6366F1'
  },
  {
    id: 'vybe-ev-17',
    title: 'Zero Knowledge & Cryptographic Sovereignty Retreat',
    category: 'technology',
    categoryLabel: 'Technology',
    isFeatured: false,
    badge: 'Advanced Tech',
    date: '2026-12-12',
    dateFormatted: 'Sat, Dec 12, 2026',
    time: '9:30 AM – 6:00 PM',
    venue: 'The Glasshouse at Forest Campus, Sarjapur',
    city: 'Bengaluru',
    price: '₹1,200',
    priceNumeric: 1200,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Deep dive into zk-SNARKs, verifiable compute circuits, and post-quantum privacy protocols with mathematical researchers.',
    fullDescription: 'A distraction-free, zero-hype technical summit. Move past marketing jargon and implement real Circom and Halo2 circuits alongside cryptographers and distributed systems architects. Features hands-on compiler labs and live audit teardowns.',
    highlights: [
      'Circuit optimization masterclasses with lead protocol engineers',
      'Air-gapped hardware signing and cryptographic key ceremony workshop',
      'Chef-curated organic garden lunch and specialty pourover bar',
      'Limited cohort size to ensure deep architectural code reviews'
    ],
    organizer: {
      name: 'Proof Systems Research',
      role: 'Applied Cryptography Collective',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 80,
    registeredCount: 68,
    accentColor: '#A855F7'
  },
  {
    id: 'vybe-ev-10',
    title: 'Urban Flora: Terrarium Ecology & Moss Art',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    isFeatured: false,
    badge: 'Beginner Friendly',
    date: '2026-12-13',
    dateFormatted: 'Sun, Dec 13, 2026',
    time: '3:00 PM – 6:00 PM',
    venue: 'Greenhouse Collective, Jubilee Hills',
    city: 'Hyderabad',
    price: '₹1,200',
    priceNumeric: 1200,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Engineer a self-sustaining miniature bio-dome with activated carbon, pillow moss, ferns, and volcanic rock.',
    fullDescription: 'Bring a living microcosm into your urban apartment. Understand soil stratigraphy, micro-fauna balancing, humidity cycles, and botanical pruning while arranging architectural glass vessels into lush desktop ecosystems.',
    highlights: [
      'Handblown geometric glass teardrop vessel included',
      'Rare imported cushion moss, fittonia cultivars & dwarf ferns',
      'Comprehensive plant maintenance calendar & moisture dropper',
      'Relaxed botanical tea service with live acoustic harpist'
    ],
    organizer: {
      name: 'Wildwood Botanica',
      role: 'Urban Horticultural Studio',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 25,
    registeredCount: 22,
    accentColor: '#06B6D4'
  },
  {
    id: 'vybe-ev-18',
    title: 'Forage & Flame: Wild Forest Gastronomy & Woodfire',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle',
    isFeatured: false,
    badge: 'Chef’s Table',
    date: '2026-12-18',
    dateFormatted: 'Fri, Dec 18, 2026',
    time: '1:00 PM – 7:30 PM',
    venue: 'Wildwood Shola Estate, Coorg Foothills',
    city: 'Bengaluru',
    price: '₹2,750',
    priceNumeric: 2750,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Guided morning wild mushroom foraging followed by an 8-course woodfire feast paired with indigenous botanical spirits.',
    fullDescription: 'Connect directly to the untamed bounty of the Western Ghats canopy. Guided by tribal naturalists and culinary pioneers, participants discover edible forest herbs, wild figs, and wood ear mushrooms before gathering around a massive outdoor cast-iron hearth for an unhurried multi-course feast.',
    highlights: [
      'Guided 2-hour gentle forage through protected private rainforest shola',
      '8-course hearth-cooked menu cooked over slow coffee-wood embers',
      'Artisanal wild-ferment mead and botanical cordial pairings',
      'Take-home basket of fresh hand-foraged spices and recipe zine'
    ],
    organizer: {
      name: 'Root & Embers Table',
      role: 'Culinary Expedition Studio',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 22,
    registeredCount: 18,
    accentColor: '#84CC16'
  },
  {
    id: 'vybe-ev-11',
    title: 'Gravity & Flow: Sunset Bouldering & Movement Jam',
    category: 'sports',
    categoryLabel: 'Sports',
    isFeatured: false,
    badge: 'All Levels',
    date: '2026-12-19',
    dateFormatted: 'Sat, Dec 19, 2026',
    time: '5:00 PM – 9:00 PM',
    venue: 'Monolith Bouldering Gym & Open Deck',
    city: 'Bengaluru',
    price: '₹600',
    priceNumeric: 600,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Solve creative rock problems, learn dynamic heel hooks, and flow with mobility coaches under neon lights.',
    fullDescription: 'Bouldering is physical puzzle-solving. Whether you are trying your first V1 or projecting a dynamic V7 dyno, our certified route setters and mobility coaches provide spot-on tips, shoe demos, and injury prevention conditioning.',
    highlights: [
      'Complimentary climbing shoe rental and chalk bag provided',
      'Over 60 newly reset problem routes across slab, overhang, and cave',
      'Dynamic mobility and wrist rehab station led by sports therapists',
      'High-energy hip-hop DJ set during the open community jam'
    ],
    organizer: {
      name: 'Monolith Climbers Hub',
      role: 'Climbing & Athletic Guild',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 120,
    registeredCount: 96,
    accentColor: '#10B981'
  },
  {
    id: 'vybe-ev-12',
    title: 'Foundations of Thought: Philosophy & Open Debate Salon',
    category: 'education',
    categoryLabel: 'Education',
    isFeatured: false,
    badge: 'Free Entry',
    date: '2026-12-20',
    dateFormatted: 'Sun, Dec 20, 2026',
    time: '4:00 PM – 7:30 PM',
    venue: 'The Attic Library & Reading Salon',
    city: 'Mumbai',
    price: 'Free',
    priceNumeric: 0,
    isFree: true,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'A civilized, passionate moderated discourse on digital consciousness, existential ethics, and future society.',
    fullDescription: 'In an era of rapid noise and algorithmic echo chambers, slow, rigorous dialectic inquiry is rare. The Attic Salon gathers curious thinkers from science, literature, and art for guided debate in an intimate book-lined sanctuary.',
    highlights: [
      'Pre-circulated reading primer (optional 10-minute read beforehand)',
      'Oxford-style constructive rounds with timed participatory arguments',
      'Strict civility and respectful intellectual disagreement charter',
      'Cozy fireplace seating, single-estate Darjeeling tea, and shortbread'
    ],
    organizer: {
      name: 'Dialectic Circle',
      role: 'Intellectual & Literary Society',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 45,
    registeredCount: 42,
    accentColor: '#E11D62'
  },
  {
    id: 'vybe-ev-19',
    title: 'Sacred Geometry: Architectural Projection Mapping',
    category: 'art',
    categoryLabel: 'Art & Culture',
    isFeatured: false,
    badge: 'Spectacular',
    date: '2026-12-26',
    dateFormatted: 'Sat, Dec 26, 2026',
    time: '7:00 PM – 10:30 PM',
    venue: 'Nahargarh Stepwell Courtyard, Aravalli Ridge',
    city: 'Jaipur',
    price: '₹850',
    priceNumeric: 850,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Monumental 40,000-lumen 3D architectural projection mapping across ancient stone stepwells with live santoor accompaniment.',
    fullDescription: 'The ancient geometric symmetries of Rajasthan meet cutting-edge procedural point cloud projection. Thousands of stone steps become a cascading canvas of luminous mathematical patterns, celestial star maps, and acoustic resonance under the desert night sky.',
    highlights: [
      'Over 40,000 lumens of synchronized high-definition laser projectors',
      'Live acoustic santoor and ambient modular sub-bass drone performers',
      'Rooftop viewing pavilions with handcrafted spiced kahwa and royal snacks',
      'Access to private after-hours heritage courtyard photography walk'
    ],
    organizer: {
      name: 'Lumen Heritage Guild',
      role: 'Visual & Spatial Arts Council',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 400,
    registeredCount: 345,
    accentColor: '#F59E0B'
  },
  {
    id: 'vybe-ev-20',
    title: 'Acoustic Sanctum: Candlelight Cello & Sitar Solos',
    category: 'music',
    categoryLabel: 'Music',
    isFeatured: false,
    badge: 'Intimate Setting',
    date: '2026-12-27',
    dateFormatted: 'Sun, Dec 27, 2026',
    time: '8:00 PM – 10:45 PM',
    venue: 'Casa da Silva Courtyard, Fontainhas Latin Quarter',
    city: 'Goa',
    price: '₹999',
    priceNumeric: 999,
    isFree: false,
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&auto=format&fit=crop&q=75',
    imageThumb: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=480&auto=format&fit=crop&q=70',
    shortDescription: 'Bask in 1,200 beeswax candles as classical soloists weave Hindustani ragas with European baroque cello suites.',
    fullDescription: 'Zero microphones, zero artificial amplification—only the purest acoustic vibration resonating within 18th-century stone archways. An extraordinary dialog between ancient Indian classical sitar and western cello sonatas, lit entirely by thousands of flickering natural candles.',
    highlights: [
      'Pure natural acoustic reverberation inside a restored 280-year-old heritage chapel',
      '1,200 hand-poured fragrant beeswax candles creating an ethereal glow',
      'Complimentary Portuguese almond cakes and spiced mulled wine',
      'Post-performance private candlelit courtyard salon with the maestros'
    ],
    organizer: {
      name: 'Chamber & Candle',
      role: 'Acoustic Heritage Arts',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      verified: true
    },
    capacity: 85,
    registeredCount: 78,
    accentColor: '#D97706'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    name: 'Aarav Mehta',
    handle: '@aarav.design',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop',
    event: 'NextForm Symposium',
    quote: 'VYBE made me realize how tired I was of predictable weekend plans. NextForm wasn’t just a conference—it was a community of minds I now collaborate with weekly.'
  },
  {
    id: 't-2',
    name: 'Diya Krishnan',
    handle: '@diya_visuals',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
    event: 'Neon Horizon Synth Showcase',
    quote: 'The vibe was utterly surreal. No chaotic ticket booths or clunky apps—just instant confirmation and one of the finest ambient audio experiences I have ever witnessed.'
  },
  {
    id: 't-3',
    name: 'Rohan Sen',
    handle: '@rohan.run',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    event: 'Midnight Run Club',
    quote: 'I used to run alone with earbuds. Showing up to the Neon Circuit with 400 people under the city trees completely reset my energy for the entire month.'
  },
  {
    id: 't-4',
    name: 'Tara Al-Sayed',
    handle: '@tara_claycraft',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    event: 'Kinfolk Ceramics Workshop',
    quote: 'From booking in 10 seconds to receiving our fired pots, everything felt like a high-end concierge experience. Truly editorial-level curation.'
  },
  {
    id: 't-5',
    name: 'Kabir Varma',
    handle: '@kabir_audio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    event: 'Sundown Sessions Goa',
    quote: 'The crowd quality at VYBE events is unmatched. No obnoxious crowds—just genuine enthusiasts who actually show up for the craft and the connection.'
  }
];

export function getEventById(id) {
  return EVENTS_DATA.find(e => e.id === id);
}

export function filterEvents({ 
  category = 'all', 
  city = 'all', 
  query = '', 
  sort = 'upcoming', 
  freeOnly = false,
  savedOnly = false,
  savedIds = []
}) {
  let list = [...EVENTS_DATA];

  if (category && category !== 'all') {
    list = list.filter(e => e.category === category);
  }

  if (city && city !== 'all') {
    list = list.filter(e => e.city.toLowerCase() === city.toLowerCase());
  }

  if (savedOnly) {
    const savedSet = new Set(savedIds);
    list = list.filter(e => savedSet.has(e.id));
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    list = list.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.shortDescription.toLowerCase().includes(q) ||
      e.categoryLabel.toLowerCase().includes(q) ||
      e.organizer.name.toLowerCase().includes(q)
    );
  }

  if (freeOnly) {
    list = list.filter(e => e.isFree);
  }

  if (sort === 'date' || sort === 'upcoming') {
    list.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === 'alphabetical') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'price-low') {
    list.sort((a, b) => a.priceNumeric - b.priceNumeric);
  } else if (sort === 'price-high') {
    list.sort((a, b) => b.priceNumeric - a.priceNumeric);
  }

  return list;
}
