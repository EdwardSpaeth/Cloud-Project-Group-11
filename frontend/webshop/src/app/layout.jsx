"use client";

import "./globals.css";
import localFont from "next/font/local";
import { CartProvider } from "./context/cart-context";
import Header from "./header";
import { usePathname } from "next/navigation";

const inter = localFont({
  src: '../../public/fonts/Inter-Regular.woff2',
  display: 'swap',
});

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide Header for all admin-related pages
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`h-full ${inter.className} text-gray-900`}>
        <CartProvider>
          {!isAdminPage && <Header />}
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-4 text-gray-600">
            <p>&copy; {currentYear} LowTech GmbH. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}