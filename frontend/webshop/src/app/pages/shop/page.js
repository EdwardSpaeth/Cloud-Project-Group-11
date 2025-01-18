import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import styles from './shop.module.css';

export default function ShopPage() {
  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>Our Furniture Collection</h1>
      <div className={styles.shopContent}>
        <ProductFilters />
        <div className={styles.mainContent}>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

