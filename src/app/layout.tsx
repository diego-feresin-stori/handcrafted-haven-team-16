import type { Metadata } from "next";
import { openSans, poppins } from "./fonts";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    template: "%s | Handcrafted Haven",
    default: "Handcrafted Haven",
  },
  description:
    "Connect with unique handcrafted products made by independent artisans. Browse, filter, and explore handmade items from talented makers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className={openSans.className}>
        <AuthProvider>
          <a href="#main-content" className="skipLink">
            Skip to main content
          </a>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
