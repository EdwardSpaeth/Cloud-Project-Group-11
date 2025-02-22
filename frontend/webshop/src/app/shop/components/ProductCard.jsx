'use client';
import React from 'react';
import { useCart } from '../../context/cart-context';
import { FiShoppingCart } from 'react-icons/fi';

const sasToken = process.env.SAS_TOKEN;

const truncate = (string, maxLength) => {
  if (!string) return '';
  return string.length > maxLength ? string.slice(0, maxLength) + "..." : string;
};

const ProductCard = ({ product, viewType }) => {
  const { addToCart } = useCart();
  const imageUrl = `/images/${product.pictureUrl}`;

  if (viewType === 'list') {
    return (
      <div className="flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="w-full md:w-48 h-48">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-4 w-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="mt-1 text-sm text-gray-700">
              {truncate(product.description, 150)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <p className="text-sm text-gray-600 font-medium">
              {product.currency}{product.price}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-[#f6e6e3] hover:bg-[#f6e6e3]/80 text-gray-800 px-4 py-2 rounded-full transition-colors"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden h-full">
      <div className="aspect-square w-full relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-sm text-gray-700 line-clamp-2">
          {truncate(product.description, 100)}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">
            {product.currency}{product.price}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-[#f6e6e3] hover:bg-[#f6e6e3]/80 text-gray-800 p-2 rounded-full transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;