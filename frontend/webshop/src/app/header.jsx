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
  const { cartItems, itemCount } = useCart();

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/Lowtech_Logo.png" alt="vivendo" width={150} height={35} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <Link href="/shop" className="hover:text-gray-900">Products</Link>
          <Link href="/services" className="hover:text-gray-900">Services</Link>
          <Link href="/contact" className="hover:text-gray-900">Contact</Link>

          {/* Shopping Cart */}
          <Link href="/cart" className="relative hover:text-gray-900">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 left-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 rounded text-gray-800 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
        />
      )}

      {/* Mobile Navigation */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 z-50 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-2 text-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-16 flex flex-col space-y-4 px-4">
          <Link href="/" className="block py-2 hover:text-gray-900" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/shop" className="block py-2 hover:text-gray-900" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/services" className="block py-2 hover:text-gray-900" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/contact" className="block py-2 hover:text-gray-900" onClick={() => setIsOpen(false)}>Contact</Link>

          {/* Mobile Shopping Cart - FIXED POSITIONING */}
          <Link href="/cart" className="relative block py-2 hover:text-gray-900" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-0 left-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Floating Cart Button on Mobile */}
      {itemCount > 0 && (
        <Link href="/cart" className="md:hidden fixed bottom-4 right-4 flex items-center justify-center z-50">
          <div className="relative">
            <div className="bg-[#f6e6e3] hover:bg-[#f6e6e3] text-gray-800 p-3 rounded-full shadow-lg">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <span className="absolute -top-0 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          </div>
        </Link>
      )}
    </header>
  );
}
