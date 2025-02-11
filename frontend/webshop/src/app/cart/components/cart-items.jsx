"use client";

import { useCart } from "../../context/cart-context";
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export function CartItem({ id, name, price, quantity, pictureUrl, sasToken }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <img
        src={`${pictureUrl}?${sasToken}`}
        alt={name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">€{price}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={() => updateQuantity(id, quantity - 1)}
              className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="px-4 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">€{(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}