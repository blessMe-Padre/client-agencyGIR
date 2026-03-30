import styles from './style.module.scss';
import { useParams } from 'react-router-dom';
import useDataRequestStore from './../../../store/DataRequestStore';

export default function DeleteButton({ setActive }) {
    const { data } = useDataRequestStore();
    const userId = data[0]?.documentId;
    const { slug } = useParams();
    let url;

    switch (slug) {
        case 'object_6': {
            url = `http://89.111.152.254:1337/api/techicas/${userId}`;
        }
            break;
        case 'object_5': {
            url = `http://89.111.152.254:1337/api/drobilkas/${userId}`;
        }
            break;

        default: {
            url = `http://89.111.152.254:1337/api/people/${userId}`;
        }
            break;
    }

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
                window.location.reload();
            }

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    return (
        <button className={styles.btn_delete} onClick={deleteHandle}>
            Удалить запись
        </button>
    )
}