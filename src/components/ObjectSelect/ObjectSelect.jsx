/**
 * TODO: подумать про получение данных из store
 * Запись в активного роута в store
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import objectDataStore from './../../store/ObjectDataStore';
import fetchData from '../../utils/fetchData';

import useDataRequestStore from '../../store/DataRequestStore';

import styles from './style.module.scss';


const domain = 'http://89.104.67.119:1337';
const url = `${domain}/api/objects?populate=*`;

export default function ObjectSelect({ setWorkers }) {
    const [objectList, setObjectList] = useState([]);
    const { data, setDataRequest, clearData } = useDataRequestStore();

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (event) => {
        const id = event.target.value;
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.getAttribute('data-name');
        setWorkers([]);
        clearData();
        navigate(`/object/${id}`);
        objectDataStore.getState().setData(id, name);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchData(url);
                setObjectList(data);
            } catch (error) {
                console.error("Ошибка загрузки Объектов:", error);
            }
        };

        loadData();
    }, []);

    return (
        <select onChange={handleChange} value={id || ''} className={styles.select}>
            <option value="" disabled>
                Выберите объект
            </option>
            {objectList.map((item) => (
                <option key={item.id} value={item.id} data-name={item.Name} className={styles.option}>
                    {item.Name}
                </option>
            ))}
        </select>
    )
}
