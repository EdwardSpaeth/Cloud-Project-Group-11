'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../../context/cart-context';

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter();
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://lowtechbackendcontainer.nicemeadow-ec141575.germanywestcentral.azurecontainerapps.io//products/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white flex items-center justify-center">
                <div className="text-gray-500">Product not found</div>
            </div>
        );
    }

    const imageUrl = `/images/${product.pictureUrl}`;
    const currentCartQuantity = cartItems?.find(item => item.id === product.id)?.quantity || 0;
    const isOutOfStock = product.stock === 0;
    const reachedStockLimit = currentCartQuantity >= product.stock;
    const isDisabled = isOutOfStock || reachedStockLimit;

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white">
            {/* Navigation with Back Icon */}
            <nav className="px-4 py-3 flex items-center">
                <button
                    onClick={() => router.back()}
                    className="mr-4 p-2 rounded hover:bg-gray-100"
                >
                    <FiArrowLeft className="h-6 w-6 text-gray-700" />
                </button>
            </nav>

            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="aspect-square rounded-md bg-gray-100 shadow-sm" />
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Details Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col space-y-6"
                        >
                            <div className="border-b pb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-4xl font-light text-gray-900 mb-2">{product.name}</h1>
                                        <p className="text-2xl text-gray-900 font-medium">
                                            {product.currency} {product.price}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-full hover:bg-gray-100">
                                            <FiHeart className="h-6 w-6" />
                                        </button>
                                        <button className="p-2 rounded-full hover:bg-gray-100">
                                            <FiShare2 className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-sm max-w-none">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Category:</span>
                                        <span className="text-sm text-gray-900">{product.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Brand:</span>
                                        <span className="text-sm text-gray-900">{product.brand}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Materials:</span>
                                        <span className="text-sm text-gray-900">{product.materials.join(', ')}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">SKU:</span>
                                        <span className="text-sm text-gray-900">{product.id}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-medium text-gray-900">Available Colors</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-500">
                                        Stock: {product.stock} units available
                                    </span>
                                    {currentCartQuantity > 0 && (
                                        <span className="text-sm text-gray-500">
                                            In cart: {currentCartQuantity}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => !isDisabled && addToCart(product)}
                                    disabled={isDisabled}
                                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-md text-base font-medium transition-colors ${isDisabled
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-[#CB4B2E]/90 hover:bg-[#CB4B2E] text-white shadow-sm'
                                        }`}
                                >
                                    <FiShoppingCart className="h-5 w-5" />
                                    <span>
                                        {isOutOfStock
                                            ? 'Out of Stock'
                                            : reachedStockLimit
                                                ? 'Stock Limit Reached'
                                                : 'Add to Cart'}
                                    </span>
                                </button>
                            </div>

                            {/* Shipping Information */}
                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping & Returns</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Free shipping on orders over €500</li>
                                    <li>• Standard delivery: 3-5 business days</li>
                                    <li>• 30-day return policy</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}