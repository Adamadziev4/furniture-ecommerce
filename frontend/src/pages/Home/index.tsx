import React from "react";

import styles from "./Home.module.css";

export const Home: React.FC = () => {
  return (
    <main>
      <div className={styles.container}>
        <section className={styles.cosiness}>
          <img src="/img/home.jpg" alt="comfort" width="500px" />
          <div className={styles.cosinessDesc}>
            <h1 className={styles.cosinessTitle}>We create comfort</h1>
            <ul>
              <li>
                Отличное качество, из-за чего вы будете чувствовать себя
                комфортно
              </li>
              <li>Быстрая доставка, доставим в течении часа</li>
              <li>Оптимальные цены, ниже рыночных</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};
