"use client"

import { CartItem } from "./components/cart-items"
import { useCart } from "../context/cart-context"

export default function CartPage() {
  const { items } = useCart()
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto p-4">
      {items.length === 0 ? (
        <div className="justify-center min-h-screen">
          <p className="text-center text-gray-500 text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Your Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cart Items Section */}
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            
            {/* Order Summary Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>
              <hr className="border-gray-300 mb-4" />
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full border-2 border-black text-black bg-transparent py-3 rounded-lg hover:bg-black hover:text-white transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}