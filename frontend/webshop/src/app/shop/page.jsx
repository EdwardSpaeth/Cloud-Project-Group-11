"use client"

import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[40vh] mb-16 overflow-hidden">
          <Image
            src="/images/modern-background-shop.webp"
            alt="Modern furniture collection"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
            <div className="flex flex-col justify-center h-full px-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-light text-white mb-4">Modern Collection</h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <p className="text-gray-200 text-lg max-w-xl">
                  Discover our carefully curated selection of contemporary furniture pieces.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProductFilters />
            </aside>
            <main className="flex-1">
              <ProductList />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}