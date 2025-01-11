'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct hook for App Router
import styles from './header.module.css';

export default function Header() {
  const pathname = usePathname(); 

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/images/Lowtech_Logo.png"
          alt="LowTech logo"
          width={180}
          height={38}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/pages/about" className={pathname === '/about' ? styles.active : ''}>
          About
        </Link>
        <Link href="/pages/services" className={pathname === '/services' ? styles.active : ''}>
          Services
        </Link>
        <Link href="/pages/shop" className={pathname === '/shop' ? styles.active : ''}>
          Shop
        </Link>
        <Link href="/pages/contact" className={pathname === '/contact' ? styles.active : ''}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
