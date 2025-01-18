"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <Image
                className={styles.logo}
                src="/images/Lowtech_Logo.png"
                alt="LowTech logo"
                width={180}
                height={38}
                priority
              />
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
              <Link href="/pages/shop" className={`${styles.link} ${pathname === '/pages/shop' ? styles.active : ''}`}>Products</Link>
              <Link href="/pages/about" className={`${styles.link} ${pathname === '/pages/about' ? styles.active : ''}`}>About</Link>
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
        <main>{children}</main>
        <footer className="bg-gray-100 mt-8">
          <div className="container mx-auto px-4 py-8">
            <p>&copy; {currentYear} LowTech GmbH. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}