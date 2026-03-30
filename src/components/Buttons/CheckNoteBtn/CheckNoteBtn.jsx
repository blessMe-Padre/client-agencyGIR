import styles from './style.module.scss';

export default function CheckNoteBtn({ handleClick }) {

    return (
        <button
            
            onClick={handleClick}
            className={styles.btn}>
            <p>
                Примечание
            </p>
        </button>
    )
}