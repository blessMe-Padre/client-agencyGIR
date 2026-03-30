import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';

const url = 'http://89.111.152.254:1337/api/auth/local/register';
// zarodiny@yande.ru

export async function registerUserService(userData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        return { response, data }; // возвращаем и response, и data
    } catch (error) {
        console.error("Registration Service Error:", error);
        throw error; // пробрасываем ошибку дальше
    }
}

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState();
    const [sending, isSending] = useState(false);

    const onSubmit = async (formData) => {
        isSending(true);

        try {
            const { response, data } = await registerUserService(formData);
            if (response.ok) {
                setIsSuccess(true);
                setError(undefined);
                reset();
            } else {
                setError(data?.error?.message || 'Что-то пошло не так');
                console.error('Статус ошибки:', response.status, data);
            }
        } catch (err) {
            setError('Ошибка запроса, попробуйте позже');
            console.error('Fetch error:', err);
        } finally {
            isSending(false);
        }
    };


    return (
        <div className={styles.page_wrapper}>
            <div className="container">
                <div>
                    <h1 className={styles.title}>Регистрация</h1>
                    <div className={styles.form_wrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.form_item}>
                                <label htmlFor="username">Имя</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Введите имя"
                                    className={`${errors.name ? styles.error : ''}`}
                                    {...register('username', { required: { value: true, message: 'Введите имя' } })}
                                    error={errors.name}
                                />
                                <div className={styles.input_text_error}>{errors['name'] && errors['name'].message}</div>
                            </div>
                            <div className={styles.form_item}>
                                <label htmlFor="password">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Введите email"
                                    className={`${errors.email ? styles.error : ''}`}
                                    {...register('email', { required: { value: true, message: 'Введите email' } })}
                                    error={errors.name}
                                />
                                <div className={styles.input_text_error}>{errors['email'] && errors['email'].message}</div>
                            </div>

                            <div className={styles.form_item}>
                                <label htmlFor="password">Пароль</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Введите пароль'
                                    className={`${errors.password ? styles.error : ''}`}
                                    {...register('password', { required: { value: true, message: 'Введите пароль' } })}
                                    error={errors.name}
                                />
                                <div className={styles.input_text_error}>{errors['password'] && errors['password'].message}</div>
                            </div>
                            <button className={styles.form_button}>
                                Войти
                                {!sending &&
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }

                                {sending &&
                                    <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
                                }

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;