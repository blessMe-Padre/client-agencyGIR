import styles from './style.module.scss';

import useDataRequestStore from './../../../store/DataRequestStore';

export default function DeleteButton({ setActive }) {
    const { data, clearData } = useDataRequestStore();
    const userId = data[0]?.documentId;

    const url = `http://89.104.67.119:1337/api/people/${userId}`;
    // const url = `http://89.104.67.119:1337/api/techicas/${userId}`;

    /**
     * в AddPopupContent добавить еще запрос на получение techicas
     */

    const deleteHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (window.confirm("Вы точно хотите удалить пользователя?")) {
                setActive(false);
                // window.location.reload();
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            // console.log(`Пользователь с ID ${userId} успешно удалён.`);
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <button className={styles.btn_delete} onClick={deleteHandle}>
            Удалить запись
            {/* {!isSending &&
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }

            {isSending &&
                <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
            } */}
        </button>
    )
}