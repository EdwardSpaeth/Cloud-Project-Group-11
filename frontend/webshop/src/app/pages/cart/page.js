import { CartItem } from './components/cart-items'
import styles from './page.module.css'

const cartItems = [
  { id: '1', name: 'Modern Sofa', price: 999.99, quantity: 1, image: '/images/modern-sofa.webp' },
  { id: '2', name: 'Coffee Table', price: 199.99, quantity: 2, image: '/images/coffee-table.webp' },
  { id: '3', name: 'Floor Lamp', price: 129.99, quantity: 1, image: '/images/floor-lamp.webp' },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      <div className={styles.grid}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
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
          <button className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}