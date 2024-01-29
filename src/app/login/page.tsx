'use client';

import styles from './styles.module.css';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/useAuth';
import { useEffect, useState } from 'react';

export default function Login() {
    const { login, authToken } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (authToken) {
            router.push('/profile');
        }
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        };

        const loginStatus = await login(formData);

        if (loginStatus == 200) {
            router.push('/profile');
        } else if (loginStatus == 401) {
            // unauthorized
            setError('Incorrect username or password');
        } else {
            setError('Sorry, something went wrong.');
        }
    };

    const shouldDisableSubmit =
        usernameInput.length === 0 || passwordInput.length === 0;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Welcome</h1>
                <p className={styles.description}>
                    Please login below to continue
                </p>
                <form className={styles.form} onSubmit={onSubmit}>
                    {error && (
                        <div className={styles.errorMessage}>{error}</div>
                    )}
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        className={
                            styles.formInput +
                            (error ? ` ${styles.borderError}` : '')
                        }
                        onChange={(e) => {
                            setError(null);
                            setUsernameInput(e.target.value);
                        }}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={
                            styles.formInput +
                            (error ? ` ${styles.borderError}` : '')
                        }
                        onChange={(e) => {
                            setError(null);
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <button
                        className={styles.formSubmit}
                        type="submit"
                        disabled={shouldDisableSubmit}
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}
