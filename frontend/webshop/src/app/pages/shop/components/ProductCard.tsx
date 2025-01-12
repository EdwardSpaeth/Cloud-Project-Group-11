'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageError ? '/images/placeholder.webp' : product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          objectFit="cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

