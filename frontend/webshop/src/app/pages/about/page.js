import styles from "../../page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>About Us</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>About LowTech</h2>
          <p>LowTech is dedicated to providing top-notch technology solutions that are both innovative and reliable.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 LowTech GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}