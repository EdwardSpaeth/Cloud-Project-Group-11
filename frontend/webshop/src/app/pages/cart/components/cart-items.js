"use client"

import Image from "next/image"
import styles from "./cart-items.module.css"
import { useCart } from "../../context/cart-context"

export function CartItem({ id, name, price, quantity, imageUrl }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <Image src={imageUrl || "/placeholder.svg"} alt={name} width={96} height={96} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <div className={styles.quantity}>
          <button
            className={styles.quantityButton}
            onClick={() => {
              if (quantity > 1) {
                updateQuantity(id, quantity - 1)
              } else {
                removeFromCart(id)
              }
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button className={styles.quantityButton} onClick={() => updateQuantity(id, quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.total}>${(price * quantity).toFixed(2)}</span>
        <button className={styles.removeButton} onClick={() => removeFromCart(id)}>
          ×
        </button>
      </div>
    </div>
  )
}

