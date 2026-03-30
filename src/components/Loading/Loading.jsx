import React from 'react';
import styles from './style.module.scss';


export default function Loading() {
  return (
    <section className={styles.main_bg}>
        <div className={`${styles.wrapper} container`}>
          <div className={styles.info_text}>
              Отчеты
          </div>
          <h2 className={styles.title}>Морской порт</h2>
          <div className={styles.loader}>
          </div>
        </div>

        <div className={styles.volna}>
              <img src='/volna.png' alt='' />
        </div>
    </section>
  );
};

