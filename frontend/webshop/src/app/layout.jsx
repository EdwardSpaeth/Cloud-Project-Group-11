"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "./context/cart-context";
import Header from "./header";
import { usePathname } from "next/navigation";  // Import to get current path

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide Header for all admin-related pages
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full font-sans text-gray-900">
        <CartProvider>
          {!isAdminPage && <Header />} {/* Hide Header on /admin and /admin/login */}
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-4 text-gray-600">
            <p>&copy; {currentYear} LowTech GmbH. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
