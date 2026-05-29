export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  alt: string;
  sellerId: string;
};

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Terracotta Glazed Vase",
    category: "Ceramics",
    price: 48,
    rating: 4.9,
    image: "/products/ceramic-vase.svg",
    alt: "Hand-thrown terracotta glazed vase with organic curves",
    sellerId: "1",
  },
  {
    id: "2",
    name: "Woven Willow Basket",
    category: "Textiles",
    price: 36,
    rating: 4.8,
    image: "/products/woven-basket.svg",
    alt: "Natural woven willow basket with leather handles",
    sellerId: "3",
  },
  {
    id: "3",
    name: "Hand-Stitched Leather Wallet",
    category: "Leather",
    price: 62,
    rating: 5,
    image: "/products/leather-wallet.svg",
    alt: "Brown hand-stitched leather wallet on a cream background",
    sellerId: "2",
  },
  {
    id: "4",
    name: "Olive Wood Serving Bowl",
    category: "Woodwork",
    price: 54,
    rating: 4.7,
    image: "/products/wooden-bowl.svg",
    alt: "Smooth olive wood serving bowl with visible grain",
    sellerId: "3",
  },
  {
    id: "5",
    name: "Sage & Cedar Candle",
    category: "Home",
    price: 28,
    rating: 4.9,
    image: "/products/hand-poured-candle.svg",
    alt: "Hand-poured candle in a glass jar with sage green wax",
    sellerId: "1",
  },
  {
    id: "6",
    name: "Hand-Dyed Linen Scarf",
    category: "Textiles",
    price: 44,
    rating: 4.8,
    image: "/products/textile-scarf.svg",
    alt: "Soft hand-dyed linen scarf in warm beige tones",
    sellerId: "2",
  },
];