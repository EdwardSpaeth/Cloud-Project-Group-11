"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../../context/cart-context"

export function CartItem({ id, name, price, quantity, imageUrl }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)} each</p>
        
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="font-medium">${(price * quantity).toFixed(2)}</span>
        <button
          onClick={() => removeFromCart(id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}