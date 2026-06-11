'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#sellers", label: "Sellers" },
  { href: "#features", label: "About" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Handcrafted Haven
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className={styles.searchInput}
              aria-label="Search products"
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Submit search"
            >
              🔍
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
