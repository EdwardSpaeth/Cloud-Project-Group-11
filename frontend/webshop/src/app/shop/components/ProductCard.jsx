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
    // List view layout
    return (
      <div className="flex w-full max-w-4xl h-48 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <img
          src={imageUrl}
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
          <div className="flex items-center">
            <button
              onClick={() => addToCart(product)}
              className="bg-[#f6e6e3] hover:bg-[#f6e6e3] text-gray-800 px-4 py-2 rounded-full"
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

  // Grid view layout
  return (
    <div className="flex flex-col w-full max-w-xs h-96 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <img
        src={imageUrl}
        alt={product.name}
        className="object-cover w-full h-48"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-sm text-gray-700 flex-grow">
          {truncate(product.description, 100)}
        </p>
        <div className="mt-1 flex items-center">
          <p className="text-sm text-gray-600">
            {product.currency}{product.price}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="ml-auto bg-[#f6e6e3] hover:bg-[#f6e6e3] text-gray-800 p-2 rounded-full"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;