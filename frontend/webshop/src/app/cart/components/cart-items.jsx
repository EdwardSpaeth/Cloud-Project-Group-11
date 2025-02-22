"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "../../context/cart-context"

export function CartItem({ id, name, price, quantity, imageUrl }) {
  const { updateQuantity, removeFromCart } = useCart()
  const priceNum = typeof price === "number" ? price : parseFloat(price)
  const imagePath = imageUrl ? `/images/${imageUrl}` : '/images/placeholder.webp'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-24 sm:w-24 h-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imagePath}
          alt={name || 'Product image'}
          width={96}
          height={96}
          style={{ objectFit: "cover" }}
          className="hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error(`Failed to load image:`, imagePath)
          }}
        />
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <button
            onClick={() => removeFromCart(id)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm font-medium text-gray-600">€{priceNum.toFixed(2)} each</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm font-medium"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm font-medium"
          >
            +
          </button>
          <span className="ml-auto font-semibold text-lg text-gray-900">
            €{(priceNum * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div >
  )
}