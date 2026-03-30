import styles from "./style.module.scss";

export default function BtnSave({ isSending }) {
  return (
    <button className={styles.btn_save}>
      Сохранить
    </button>
  );
}
