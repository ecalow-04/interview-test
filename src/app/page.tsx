'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/useAuth';
import { useEffect, useState } from "react";

export default function Home() {
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
            "username": event.currentTarget.username.value,
            "password": event.currentTarget.password.value
        };

        const loginStatus = await login(formData);

        if (loginStatus == 200) {
            router.push('/profile')
        } else if (loginStatus == 401) {
            // unauthorized
            setError('Incorrect username or password');
        } else if (loginStatus == 400) {
            // bad request
        }
    };

    const shouldDisableSubmit = usernameInput.length === 0 || passwordInput.length === 0;

    return (
        <main>
            <div id="login-container">
                <h1 className="heading">Welcome</h1>
                <p className="description">Please login below to continue</p>
                <form id="login-form" onSubmit={onSubmit}>
                    {error && (
                        <div className="error-message">{ error }</div>
                    )}
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        className={error ? 'border-error' : ''}
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
                        className={error ? 'border-error' : ''}
                        onChange={(e) => {
                            setError(null);
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <button type="submit" disabled={shouldDisableSubmit}>Login</button>
                </form>
            </div>
        </main>
    );
}
