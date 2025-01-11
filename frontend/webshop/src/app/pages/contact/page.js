import styles from "../../page.module.css";

export default function Contact() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Contact Us</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Get in Touch</h2>
          <p>Email: contact@lowtech.com</p>
          <p>Phone: (123) 456-7890</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 LowTech GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}