import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';

export default function ModalNotification({ active = false, text }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (active) {
        const timer = setInterval(() => {
            setProgress((prev) => {
            if (prev >= 100) {
                // clearInterval(timer);
                return 100;
            }
            return prev + 1;
            });
        }, 30);

        
        return () => {
            clearInterval(timer);
        };
        }
    }, [active]);

    return (
        <motion.div
            className={`${styles.modalNotificationWrapper} ${active ? styles.active : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
            opacity: active ? 1 : 0,
            x: active ? 0 : 1000
            }}
            transition={{ duration: 0.3 }}
        >
        <div className={styles.modalContent}>
                {text}
            <motion.div
            className={styles.progressBar}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
            />
        </div>
        </motion.div>
    );
}