"use client";

import { CartItem } from "./components/cart-items";
import { useCart } from "../context/cart-context";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const { cartItems, cartTotal } = useCart();
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    try {
      // Prepare a compact version of the items for Stripe metadata
      const compactItems = cartItems.map(item => ({
        n: item.name.substring(0, 30), // Limit name length
        q: item.quantity,
        p: item.price.toString()
      }));

      // Prepare the full items data for the backend
      const checkoutData = {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description || '',
          imageUrl: item.imageUrl
        })),
        metadata: {
          items: compactItems // Send compact version for metadata
        },
        email: email
      };

      const stripe = await stripePromise;
      const response = await fetch("https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error(error);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-gray-500 text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <CartItem key={item.id || index} {...item} />
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm sticky top-4">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                {/* Email input */}
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to checkout"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-500">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!email}
                  className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}