'use client';
import SingleProductCard from './SingleProductCard';

export default function ProductCard({ product, viewType }) {
  return <SingleProductCard product={product} viewType={viewType} />;
}