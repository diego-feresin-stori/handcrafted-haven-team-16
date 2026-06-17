export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  alt: string;
};

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Terracotta Vases",
    category: "Ceramics",
    price: 1648,
    rating: 4.9,
    image: "/products/terracota-vases.jpg",
    alt: "Hand-thrown terracotta glazed vase with organic curves",
  },
  {
    id: "2",
    name: "Vintage Peruvian Wool Rug",
    category: "Textiles",
    price: 2036,
    rating: 4.8,
    image: "/products/wool-rug.jpg",
    alt: "Vintage Peruvian wool rug with intricate patterns",
  },
  {
    id: "3",
    name: "Leather Journal Cover",
    category: "Leather",
    price: 329,
    rating: 5,
    image: "/products/leather-journal.jpg",
    alt: "Brown hand-stitched leather journal cover on a cream background",
  },
  {
    id: "4",
    name: "Olive Wood Serving Bowl",
    category: "Woodwork",
    price: 68.80,
    rating: 4.7,
    image: "/products/olive-wood.png",
    alt: "Smooth olive wood serving bowl with visible grain",
  },
  {
    id: "5",
    name: "Sage & Cedar Candle",
    category: "Home",
    price: 28,
    rating: 4.9,
    image: "/products/hand-poured-candle.jpg",
    alt: "Hand-poured candle in a glass jar with sage green wax",
  },
  {
    id: "6",
    name: "Hand-Dyed Linen Scarf",
    category: "Textiles",
    price: 110,
    rating: 4.8,
    image: "/products/textile-scarf.jpg",
    alt: "Soft hand-dyed linen scarf in warm beige tones",
  },
];
