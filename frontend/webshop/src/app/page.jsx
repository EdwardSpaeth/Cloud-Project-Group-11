"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
      {/* Background Image */}
      <Image
        src="/images/Landing.jpg"
        alt="Landing Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-2xl px-4">
          <h1 className="text-4xl font-extrabold mb-4">Recreating Living for a Modern World</h1>
          <p className="text-lg mb-6">
            Discover our exclusive collection of modern furniture designed to elevate your living space with elegance and functionality.
          </p>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <Link href="/pages/shop" className="inline-block border-2 border-white text-white py-3 px-6 rounded-lg transition hover:bg-white hover:text-black">
            View Our Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
}