"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { FaShoppingCart } from "react-icons/fa"
import { useCart } from "../../context/cart-context"

function ProductCard({ product, viewType = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    await addToCart(product)
    setIsAdding(false)
  }

  if (viewType === 'list') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link href={`/product/${product.id}`} className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="relative w-full sm:w-48 h-48">
              <Image
                src={imageError ? "/images/placeholder.webp" : product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <h2 className="text-xl font-medium">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
          <span className="text-2xl font-light text-center sm:text-left">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full sm:w-auto px-6 py-2 bg-black text-white rounded-full 
              ${isAdding ? 'opacity-75' : 'hover:bg-gray-800'} 
              transition-all duration-200`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <Link href={`/product/${product.id}`}>
        <motion.div
          className="group relative bg-white rounded-lg overflow-hidden cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative aspect-square">
            <Image
              src={imageError ? "/images/placeholder.webp" : product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          </div>
      
          <div className="p-4 space-y-2">
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-lg font-light">${product.price.toFixed(2)}</span>
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`p-2 rounded-full bg-black text-white shadow-md
                  ${isAdding ? 'opacity-75' : 'hover:bg-gray-800'} 
                  transition-colors`}
              >
                <FaShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default ProductCard