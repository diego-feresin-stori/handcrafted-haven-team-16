import { Open_Sans, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});
