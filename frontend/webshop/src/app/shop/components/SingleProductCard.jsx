'use client';
import React from 'react';
import { useCart } from '../../../app/context/cart-context';
import { FiShoppingCart } from 'react-icons/fi';

export default function SingleProductCard({ product, sasToken }) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <img
            src={`${product.pictureUrl}?${sasToken}`}
            alt={product.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-gray-900">
            {product.currency} {product.price}
          </p>
          <div className="prose prose-sm text-gray-600">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Brand</h3>
              <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Materials</h3>
              <p className="mt-1 text-sm text-gray-500">{product.materials.join(', ')}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Colors</h3>
              <div className="mt-2 flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Stock</h3>
              <p className="mt-1 text-sm text-gray-500">{product.stock} units available</p>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#f6e6e3] hover:bg-[#e6d6d3] text-gray-800 px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
