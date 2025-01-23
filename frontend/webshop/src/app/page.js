import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.landingImageContainer}>
            <Image
              src="/images/Landing.jpg"
              alt="Landing Image"
              layout="fill"
              objectFit="cover"
              className={styles.landingImage}
            />
            <div className={styles.landingText}>
              <h2>Recreating living for a modern world. Vivendo.</h2>
            </div>
          </div>
          <Link className={styles.cta} href="/pages/shop">
            View Our Collection
          </Link>
        </section>
      </main>
    </div>
  );
}


