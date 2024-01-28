'use client';

import styles from './styles.module.css';
import { useAuth } from '../../utils/useAuth';
import { useEffect, useState } from "react";

interface UserData {
    username: string;
    name: string;
    age: number;
}

export default function Profile() {
    const { authToken, logout } = useAuth();
    const [userData, setUserData] = useState<UserData>()

    // useEffect(() => {
    //     if (!userData) {
    //         fetch('/api/profile', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${authToken}`
    //             }
    //         }).then((res) => {
    //             console.log('this is res', res.json())
    //             setUserData({ username: 'test', name: 'test', age: 20 })
    //         });
    //     }
    // })

    return (
        <main>
            <div>hi</div>
            {/* <div id="login-container">
                <h1 className="heading">Welcome</h1>
                <p className="description">Please login below to continue</p>
                <form id="login-form" onSubmit={onSubmit}>
                    <input id="username" name="username" type="text" placeholder="Username" />
                    <input id="password" name="password" type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div> */}
        </main>
    );
}
