"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

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
                    Payment Successful
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Thank you for your purchase! Your payment has been processed successfully.
                </p>
                <div className="mt-5 space-y-3">
                    <Link
                        href="/orders"
                        className="block text-sm font-medium text-black bg-[#f6e6e3] hover:bg-[#f6e6e3]/90 rounded-md px-4 py-2"
                    >
                        View Order Details
                    </Link>
                    <Link
                        href="/shop"
                        className="block text-sm font-medium text-[#f6e6e3] bg-black hover:bg-gray-800 rounded-md px-4 py-2"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}