"use client";

import { useState } from 'react';
import styles from "./contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      subject: !formData.subject.trim(),
      message: !formData.message.trim()
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(field => field === true)) {
      const queryString = new URLSearchParams(formData).toString();
      window.location.href = `/pages/contact?${queryString}`;
    }
  
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
          <header>
            <center>
              <h2>Get In Touch</h2>
            </center>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              We’d love to hear from you. Please fill out all fields, and we’ll get back to you soon!
            </p>
          </header>
          <div className={styles.formContainer}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Name{errors.name && <span className={styles.required}> *</span>}
                </label>
                <input
                  className={errors.name ? styles.errorInput : ''}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email{errors.email && <span className={styles.required}> *</span>}
                </label>
                <input
                  className={errors.email ? styles.errorInput : ''}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">
                  Subject{errors.subject && <span className={styles.required}> *</span>}
                </label>
                <input
                  className={errors.subject ? styles.errorInput : ''}
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">
                  Message{errors.message && <span className={styles.required}> *</span>}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  className={errors.message ? styles.errorInput : ''}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}