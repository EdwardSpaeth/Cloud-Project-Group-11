"use client"

import { CartItem } from "./components/cart-items"
import styles from "./page.module.css"
import { useCart } from "../context/cart-context"

export default function CartPage() {
  const { items } = useCart()
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      <div className={styles.grid}>
        <div className={styles.items}>
          {items.length === 0 ? <p>Your cart is empty</p> : items.map((item) => <CartItem key={item.id} {...item} />)}
        </div>
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <hr className={styles.divider} />
          <div className={styles.summaryRow}>
            <span className={styles.total}>Total</span>
            <span className={styles.total}>${subtotal.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

