/** Paths under `public/` for static images and documents. */

export const layout = {
  /** White PNG wordmark (`376×84`) — hero + solid bar + footer parity */
  logoHeader: "/images/logowhite.png",
  logoHeaderSolid: "/images/logowhite.png",
  logoFooter: "/images/logowhite.png",
} as const;

export const home = {
  heroBg: "/images/home/hero.jpg",
  /** Full-bleed homepage hero — 5 slides (slides 6–10 removed); includes `public/images/banner/`. Order matches `Home.heroV2.slides`. */
  heroSlides: [
    "/images/home/hero.jpg",
    "/images/banner/banner-1.jpg",
    "/images/banner/banner-2.jpg",
    "/images/banner/banner-3.jpg",
    "/images/home/feature-rooms.jpeg",
  ] as const,
  discover: "/images/home/discover.jpg",
  perfectStay: {
    family: "/images/home/stay-family.jpeg",
    business: "/images/home/stay-business.jpeg",
    food: "/images/home/stay-food.jpeg",
    wellness: "/images/home/stay-wellness.jpeg",
  },
  featureRows: {
    rooms: "/images/home/feature-rooms.jpeg",
    dining: "/images/home/feature-dining.jpeg",
    banquet: "/images/home/feature-banquet.jpeg",
    spa: "/images/home/feature-spa.jpeg",
  },
  /** Distinct shots per property — files under `public/images/Our Hotels/` (spaces URL-encoded for Next/Image). */
  hotelsShowcase: {
    days: "/images/Our%20Hotels/Crossway%20Days%20Hotel.jpg",
    palomar: "/images/Our%20Hotels/The%20Palomar%20by%20Crossway.jpg",
    lifotel: "/images/Our%20Hotels/Lifotel%20KK%20inn.jpg",
    royel: "/images/Our%20Hotels/Revostay%20Royel%20by%20Crossway.jpg",
    petitpalais: "/images/Our%20Hotels/Petit%20Palais%20by%20Crossway.jpg",
  },
  brands: {
    crossway: {
      front: "/images/home/brand-crossway-front.jpg",
      back: "/images/home/brand-crossway-back.jpg",
    },
    lifotel: {
      front: "/images/home/brand-lifotel-front.jpg",
      back: "/images/home/brand-lifotel-back.jpg",
    },
    revostay: {
      front: "/images/home/brand-revostay-front.jpg",
      back: "/images/home/brand-revostay-back.jpg",
    },
  },
} as const;

export const pages = {
  about: {
    hero: "/images/pages/about/hero.jpg",
    family: "/images/pages/about/family.jpg",
    service: "/images/pages/about/service.jpg",
  },
  brochure: {
    promoBg: "/images/pages/brochure/promo-bg.jpg",
    hotelsPdf: "/documents/brochure/crossway-hotels.pdf",
    brandsPdf: "/documents/brochure/crossway-brands.pdf",
  },
  team: {
    prakash: "/images/pages/team/prakash.jpeg",
    sulekha: "/images/pages/team/sulekha.jpg",
  },
} as const;

export const brand = {
  crossway: {
    hero: "/images/brand/crossway/hero.jpg",
    logo: "/images/brand/crossway/logo.png",
  },
  lifotel: {
    hero: "/images/brand/lifotel/hero.jpg",
    logo: "/images/brand/lifotel/logo.png",
  },
  lifotelSuites: {
    hero: "/images/brand/lifotel-suites/hero.jpeg",
    logo: "/images/brand/lifotel-suites/logo.png",
  },
  revostay: {
    hero: "/images/home/brand-revostay-front.jpg",
    logo: "/images/home/brand-revostay-front.jpg",
  },
} as const;

export const news = {
  htcAward: "/images/news/htc-award.jpeg",
  promisingChain: "/images/news/promising-chain.jpeg",
  beachResort: "/images/news/beach-resort.jpg",
  rideBar: "/images/news/ride-bar.jpg",
} as const;

/** Venue-specific stills from palomar-next — corporate dining page (Capella + Spotted Deer). */
export const palomar = {
  capella: "/images/palomar/capella.webp",
  spottedDeer: "/images/palomar/spotted-deer.webp",
} as const;

/** Crossway Days Hotel OMR — from crosswaysdays-hotels-nextjs. */
export const daysHotel = {
  nutcracker: "/images/days/nutcracker.jpg",
  svanna: "/images/days/svanna.jpg",
} as const;

/** Petit Palais by Crossway, Puducherry — from petitpalais-next. */
export const petitPalais = {
  feastHouse: "/images/petitpalais/feast-house.jpg",
  gardenCafe: "/images/petitpalais/garden-cafe.jpg",
} as const;
