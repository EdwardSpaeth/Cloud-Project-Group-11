
import styles from "./services.module.css";
export default function Services() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
      </header>
      <main className={styles.main}>
      <section className={styles.section}>
          <header> 
            <center>
          <h2>Our Services</h2>
          </center>
          </header>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceItem}>
              <center>
              <h3>Custom Furniture Design</h3>
              </center>
              <p>Our team of skilled designers will work with you to create custom furniture pieces that perfectly fit your space and style.</p>
            </div>
            <div className={styles.serviceItem}>
              <center>
              <h3>Furniture Restoration</h3>
              </center>
              <p>We breathe new life into your old furniture, restoring it to its former glory with expert craftsmanship.</p>
            </div>
            <div className={styles.serviceItem}>
            <center>
              <h3>Interior Design Consultation</h3>
            </center>
              <p>Our interior design experts provide personalized consultations to help you create a cohesive and stylish look for your home or office.</p>
            </div>
            <div className={styles.serviceItem}>
            <center>
              <h3>Delivery and Installation</h3>
            </center>
              <p>We offer convenient delivery and professional installation services to ensure your new furniture is set up perfectly in your space.</p>
            </div>
            <div className={styles.serviceItem}>
            <center>
              <h3>Eco-Friendly Solutions</h3>
            </center>
              <p>We are committed to sustainability and offer eco-friendly furniture options made from recycled and sustainable materials.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
