import styles from './style.module.scss';
import { useEffect } from 'react';
import { MiniForm } from '../../components'
import useDataObjectRequestStore from '../../store/DataObjectRequestStore';
import fetchData from '../../utils/fetchData';

export default function MiniAddPopupContent({ slug, active, setActive }) {

    const { dataObject, setDataObjectRequest, clearDataObject } = useDataObjectRequestStore();

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            setActive(false);
        }
    }

    useEffect(() => {
            if (active) {
                const fetchAndSetData = async () => {
                    try {
                        const data = await fetchData(`http://89.111.152.254:1337/api/objects?filters[slug][$eq]=${slug}&populate[MonthDataObjectTonnaj][populate]=*`);
                        setDataObjectRequest(data);
                    } catch (error) {
                        console.error("Ошибка при получении данных:", error);
                    }
                };
    
                fetchAndSetData();
            } else {
                clearDataObject();
            }
    }, [active, setDataObjectRequest, clearDataObject]);

    
    return (
        <div
            id={slug}
            className={`${styles.popup} ${active ? styles.popupActive : styles.popupNone}`}
            onClick={() => setActive(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
        <div className={styles.popup__body}>
            <div
                className={styles.popup__content}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.popup_close_wrapper}>
                    <button
                        className={styles.popup__close}
                        onClick={() => { setActive(false) }}
                    >
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="18.4463" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(-45 3 18.4463)" fill="#2a3a57" />
                            <rect x="4.21094" y="3" width="21.8033" height="0.726776" rx="0.363388" transform="rotate(45 4.21094 3)" fill="#2a3a57" />
                        </svg>
                    </button>
                </div>

                <MiniForm
                    popupId={slug}
                />
            </div>
        </div>
    </div>
    )
}