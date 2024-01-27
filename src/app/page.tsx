'use client';

import { FormEvent } from 'react'

export default function Home() {
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            "username": event.currentTarget.username.value,
            "password": event.currentTarget.password.value
        }

        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        console.log(data, 'this is data');
    };

    return (
        <main>
            <div id="login-container">
                <h1 className="heading">Welcome</h1>
                <p className="description">Please login below to continue</p>
                <form id="login-form" onSubmit={onSubmit}>
                    <input id="username" name="username" type="text" placeholder="Username" />
                    <input id="password" name="password" type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}
