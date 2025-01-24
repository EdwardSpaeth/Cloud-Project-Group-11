import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.hero}>
        <div className={styles.leftSide}>
          <h1 className={styles.slogan}>
            Recreating living for a modern world
          </h1>
          <Link className={styles.cta} href="/pages/shop">
            View Our Collection
          </Link>
        </div>

        
        <div className={styles.rightSide}>
          <Image
            src="/images/Landing.jpg"
            alt="Landing Image"
            fill
            className={styles.landingImage}
          />
        </div>
      </main>
    </div>
  );
}