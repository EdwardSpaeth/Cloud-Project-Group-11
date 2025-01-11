import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Welcome to LowTech</h1>
          <div className={styles.imageContainer}>
            <Image
              src="/images/stock1.png"
              alt="Description of picture 1"
              width={150}
              height={150}
              className={styles.image}
            />
            <Image
              src="/images/stock2.png"
              alt="Description of picture 2"
              width={150}
              height={150}
              className={styles.image}
            />
            <Image
              src="/images/stock3.png"
              alt="Description of picture 3"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
          <blockquote className={styles.quote}>
            <p>
              Recreating living for a modern world. Innovative work that
              matters.
              <br /> – Max Mustermann, CMO of LowTech
            </p>
          </blockquote>
          <Link className={styles.cta} href="/contact">
            Get in Touch
          </Link>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 LowTech GmbH. All rights reserved.</p>
      </footer>
    </div>
  );
}
