"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import styles from "./ProductCard.module.css"
import { useCart } from "../../context/cart-context"

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()

  return (
    <div className={styles.productcard}>
      <div className={styles.imagecontainer}>
        <Image
          src={imageError ? "/images/placeholder.webp" : product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          objectFit="cover"
          onError={() => setImageError(true)}
        />
      </div>
      <Link href={`/product/${product.id}`} className={styles.productcontent}>
        <div className={styles.producttitleWrapper}>
          <h2 className={styles.producttitle}>{product.name}</h2>
          <FaShoppingCart
            className={styles.cartIcon}
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
          />
        </div>
        <p className={styles.productprice}>${product.price.toFixed(2)}</p>
      </Link>
    </div>
  )
}

export default ProductCard
