'use client';
import React from 'react';

export default function SingleProductCard({ product, viewType }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>
        {product.currency} {product.price}
      </p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Materials: {product.materials.join(', ')}</p>
      <p>Colors: {product.colors.join(', ')}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}