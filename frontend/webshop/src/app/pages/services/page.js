import styles from "../../page.module.css";

export default function Services() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Our Services</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Services We Offer</h2>
          <ul>
            <li>Consulting</li>
            <li>Development</li>
            <li>Support</li>
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 LowTech GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}