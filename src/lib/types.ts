export type Category = "single-origin" | "blend" | "espresso";

export type RoastLevel = "Light" | "Light-Medium" | "Medium" | "Medium-Dark" | "Dark";

export type Profile = {
  acidity: 1 | 2 | 3 | 4 | 5;
  sweetness: 1 | 2 | 3 | 4 | 5;
  body: 1 | 2 | 3 | 4 | 5;
};

export type SizeOption = {
  label: string;
  grams: number;
  priceCents: number;
};

export type Review = {
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  badges?: ("Best Seller" | "New" | "Limited Release")[];
  shortDescription: string;
  description: string[];
  origin: {
    country: string;
    region: string;
    producer: string;
    altitude: string;
    variety: string;
    process: string;
    harvestSeason: string;
  };
  roastLevel: RoastLevel;
  flavorNotes: string[];
  profile: Profile;
  brewRecommendations: string[];
  grindOptions: string[];
  sizes: SizeOption[];
  images: string[];
  rating: number;
  reviewCount: number;
  subscriptionDiscountPercent: number;
  reviews: Review[];
};
