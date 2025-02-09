"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../context/cart-context"; 
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");
  const [hasCleared, setHasCleared] = useState(false);

  useEffect(() => {
    if (sessionId && !hasCleared) {
      clearCart();
      setHasCleared(true);
    }
  }, [sessionId, clearCart, hasCleared]);

  const handleContinueShopping = () => {
    router.push('/shop');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="rounded-full h-24 w-24 bg-green-100 mx-auto flex items-center justify-center">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank you for your order!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your payment was successful. We'll send you an email with your order details.
        </p>
        <div className="mt-5">
          <button
            onClick={handleContinueShopping}
            className="inline-block text-sm font-medium text-[#f6e6e3] bg-black hover:bg-gray-800 rounded-md px-4 py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}