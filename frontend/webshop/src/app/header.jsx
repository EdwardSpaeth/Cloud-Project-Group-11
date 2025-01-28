"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "./context/cart-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center">
          <Image src="/images/Lowtech_Logo.png" alt="vivendo" width={150} height={35} />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded text-gray-800 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Side Menu */}
        <nav
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "translate-x-full"} 
            md:static md:translate-x-0 md:shadow-none md:flex md:w-auto md:items-center md:space-x-6`}
        >
          <button
            type="button"
            className="md:hidden absolute top-4 right-4 p-2 text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link href="/" className="block py-2 px-4 hover:text-gray-900">
            Home
          </Link>
          <Link href="/shop" className="block py-2 px-4 hover:text-gray-900">
            Products
          </Link>
          <Link href="/services" className="block py-2 px-4 hover:text-gray-900">
            Services
          </Link>
          <Link href="/contact" className="block py-2 px-4 hover:text-gray-900">
            Contact
          </Link>
          <Link href="/cart" className="relative block py-2 px-4 hover:text-gray-900">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}