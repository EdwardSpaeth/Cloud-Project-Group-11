'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';


import productsData from '../products.json'; // This will be replaced with an API call

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData); // Simulating an API call
  }, []);

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

