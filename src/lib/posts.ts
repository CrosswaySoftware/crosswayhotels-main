import { news } from "@/lib/media";

export type BlogPost = {
  slug: string;
  image: string;
  categories: string[];
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "excellent-hospitality-services",
    image: news.htcAward,
    categories: ["events", "press-releases"],
    tags: ["awards", "event"],
  },
  {
    slug: "crossway-hotels-and-resorts-bags-the-most-promising-hotel-chain-at-the-india-travel-awards-south-2019",
    image: news.promisingChain,
    categories: ["press-releases"],
    tags: [],
  },
  {
    slug: "6314-2",
    image: news.beachResort,
    categories: ["food-for-thought", "press-releases"],
    tags: ["updates"],
  },
  {
    slug: "ride-bar-open-now-at-days-hotel-chennai-omr",
    image: news.rideBar,
    categories: ["press-releases"],
    tags: ["event"],
  },
];

export function postsByCategory(cat: string) {
  return blogPosts.filter((p) => p.categories.includes(cat));
}

export function postsByTag(tag: string) {
  return blogPosts.filter((p) => p.tags.includes(tag));
}
