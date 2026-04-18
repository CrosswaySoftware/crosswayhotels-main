/** Paths under `public/` for static images and documents. */

export const layout = {
  logoHeader: "/images/layout/logo.png",
  logoFooter: "/images/layout/logo.png",
} as const;

export const home = {
  heroBg: "/images/home/hero.jpg",
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
  /** Distinct shots per property for the homepage hotels showcase */
  hotelsShowcase: {
    days: "/images/home/feature-banquet.jpeg",
    palomar: "/images/home/discover.jpg",
    lifotel: "/images/home/stay-family.jpeg",
    royel: "/images/home/feature-rooms.jpeg",
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
} as const;

export const news = {
  htcAward: "/images/news/htc-award.jpeg",
  promisingChain: "/images/news/promising-chain.jpeg",
  beachResort: "/images/news/beach-resort.jpg",
  rideBar: "/images/news/ride-bar.jpg",
} as const;
