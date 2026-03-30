import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';

// const url = 'http://89.111.152.254:1337/api/auth/local/';
const url = 'http://89.111.152.254:1337/api/auth/local/';
// Иван
// zarodiny@yandex.ru
// 123456789

export async function loginUserService(userData) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    return { response, data };
}


const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    //const [isSuccess, setIsSuccess] = useState(false); если response.ok
    const [error, setError] = useState();
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (formData) => {
        setIsSending(true);
        setError(null);

        try {
            const { response, data } = await loginUserService(formData);

            if (response.ok) {
                localStorage.setItem('tokendgvSDfghsdghdrhgzdfrh', data.jwt);
                navigate('/');

            } else {
                setError('Ошибка входа: неверный логин/пароль');
            }
        } catch (error) {
            setError('Ошибка запроса, попробуйте позже');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={styles.page_wrapper}>
            <div className="container">
                <div>
                    <h1 className={styles.title}>Вход</h1>
                    <div className={styles.form_wrapper}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.form_item}>
                                <label htmlFor="identifier">Email</label>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    placeholder="Введите email"
                                    className={`${errors.email ? styles.error : ''}`}
                                    {...register('identifier', { required: { value: true, message: 'Введите email' } })}
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
                                {!isSending &&
                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.05507 1.43907L17.1536 1.43888M17.1536 1.43888L17.1536 14.3511M17.1536 1.43888L1.93782 16.6546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }

                                {isSending &&
                                    <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><radialGradient id="a9" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#000000"></stop><stop offset=".3" stopColor="#000000" stopOpacity=".9"></stop><stop offset=".6" stopColor="#000000" stopOpacity=".6"></stop><stop offset=".8" stopColor="#000000" stopOpacity=".3"></stop><stop offset="1" stopColor="#000000" stopOpacity="0"></stop></radialGradient><circle transformOrigin="center" fill="none" stroke="url(#a9)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#000000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
                                }
                            </button>
                            {error && <div className={styles.error_message}>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;