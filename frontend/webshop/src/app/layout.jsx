"use client";

import './globals.css';
import { Inter } from "next/font/google";
import { CartProvider } from "./pages/context/cart-context";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full font-sans text-gray-900">
        <CartProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-4 text-gray-600">
            <p>&copy; {currentYear} LowTech GmbH. All rights reserved.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

