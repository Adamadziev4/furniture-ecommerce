import React from "react";

import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contacts}>
          <p className={styles.description}>
            Furniture e-commerce is a premium Templates theme with advanced
            admin module. It's extremely customizable, easy to use and fully
            responsive and retina ready.
          </p>
          <p className={styles.location}>
            <strong>Add:</strong> 1234 Heaven Stress, Beverly Hill, Melbourne,
            USA.
          </p>
          <p className={styles.email}>
            <strong>Email:</strong> Contact@gmail.com
          </p>
          <p className={styles.phone}>
            <strong>Phone number:</strong> +7 (800) 8000 80 80
          </p>
        </div>
        <div className={styles.information}>
          <h3>Information</h3>
          <ul className={styles.informationList}>
            <li>About Us</li>
            <li>Career</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>
        <div className={styles.service}>
          <h3>Customer Service</h3>
          <ul className={styles.serviceList}>
            <li>Shipping Policy</li>
            <li>Help & Contact Us</li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
