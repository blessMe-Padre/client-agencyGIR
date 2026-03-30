import styles from './style.module.scss';
import { useState } from 'react';
import { MiniAddPopupContent } from '../../components';

export default function ComponentTonnaj({ slugObject }) {

    const [activeTonnajPopup, setActiveTonnajPopup] = useState(false);

    const handleClick = () => {
        setActiveTonnajPopup(true)
    }

    return (
        <>
            <div>
                <button onClick={handleClick} style={{ cursor: 'pointer'}}>
                    Тоннаж
                </button>

                <MiniAddPopupContent active={activeTonnajPopup} setActive={setActiveTonnajPopup} slug={slugObject} />
            </div>
        </>
    )
}