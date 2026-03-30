import styles from './style.module.scss';
export default function AddMoreBtn({ onHandleClick, title}) {
  return (
    <button onClick={onHandleClick} className={styles.btn}>
      <img src='/add.svg' alt='' />
      <p className={styles.btn_text}>{title}</p>
    </button>
  );
}

