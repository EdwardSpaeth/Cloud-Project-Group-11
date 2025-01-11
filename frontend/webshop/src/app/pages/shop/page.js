import styles from "../../page.module.css";

export default function Shop() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Shop</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Our Products</h2>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 LowTech GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}