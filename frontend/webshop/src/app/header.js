"use client";

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image
            className={styles.logo}
            src="/images/Lowtech_Logo.png"
            alt="Logo"
            width={180}
            height={38}
            priority
          />
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
          <Link href="/pages/shop" className={`${styles.link} ${pathname === '/pages/shop' ? styles.active : ''}`}>Products</Link>
          <Link href="/pages/services" className={`${styles.link} ${pathname === '/pages/services' ? styles.active : ''}`}>Services</Link>
          <Link href="/pages/contact" className={`${styles.link} ${pathname === '/pages/contact' ? styles.active : ''}`}>Contact</Link>
          <Link href="/pages/cart" className={`relative ${styles.link} ${pathname === '/pages/cart' ? styles.active : ''}`}>
            <ShoppingCart className="h-6 w-6" />
            <span className={`${styles.cartBadge} absolute -top-2 -right-2`}>
              3
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}