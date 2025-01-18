import Image from 'next/image'
import styles from './cart-items.module.css'

export function CartItem({ id, name, price, quantity, image }) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={96}
          height={96}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <div className={styles.quantity}>
          <button className={styles.quantityButton}>-</button>
          <span>{quantity}</span>
          <button className={styles.quantityButton}>+</button>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.total}>${(price * quantity).toFixed(2)}</span>
        <button className={styles.removeButton}>×</button>
      </div>
    </div>
  )
}

