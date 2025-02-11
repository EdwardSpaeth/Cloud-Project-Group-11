'use client';
import React from 'react';
import { useCart } from '../../context/cart-context';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const sasToken = process.env.SAS_TOKEN;

const truncate = (string, maxLength) => {
  if (!string) return '';
  return string.length > maxLength ? string.slice(0, maxLength) + "..." : string;
};

const ProductCard = ({ product, viewType }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleProductClick = (e) => {
    if (e.target.closest('button')) return;
    router.push(`/shop/product/${product.id}`);
  };

  if (viewType === 'list') {
    return (
      <div
        onClick={handleProductClick}
        className="flex w-full max-w-4xl h-48 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      >
        <img
          src={`${product.pictureUrl}?${sasToken}`}
          alt={product.name}
          className="object-cover w-48 h-full"
        />
        <div className="flex flex-col justify-between p-4 w-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="mt-1 text-sm text-gray-700">
              {truncate(product.description, 150)}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-[#f6e6e3] hover:bg-[#e6d6d3] text-gray-800 px-4 py-2 rounded-full transition-colors"
            >
              Add to Cart
            </button>
            <p className="ml-4 text-sm text-gray-600">
              {product.currency}{product.price}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleProductClick}
      className="flex flex-col w-full max-w-xs h-[400px] bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={`${product.pictureUrl}?${sasToken}`}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-sm text-gray-700 line-clamp-3">
            {truncate(product.description, 100)}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-900">
            {product.currency}{product.price}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#f6e6e3] hover:bg-[#e6d6d3] text-gray-800 p-2 rounded-full transition-colors"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;