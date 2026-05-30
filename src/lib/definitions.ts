export type UserRole = "customer" | "seller" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: string;
};

export type SellerProfile = {
  id: string;
  user_id: string;
  bio: string | null;
  story: string | null;
  image_url: string | null;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  seller_id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type ProductWithDetails = Product & {
  category_name: string;
  seller_name: string;
  avg_rating: number | null;
};
