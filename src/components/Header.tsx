import Link from "next/link";
import styles from "./Header.module.css";
import LogoutButton from "./AuthButton";

const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#sellers", label: "Sellers" },
  { href: "#features", label: "About" },
];

export default function Header() {
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
            <li><LogoutButton/></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
