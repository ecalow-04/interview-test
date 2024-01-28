'use client';

import styles from './styles.module.css';
import { useAuth } from '../../utils/useAuth';
import { useEffect, useState } from "react";

interface Profile {
    username: string;
    name: string;
    email: string;
}

export default function Profile() {
    const { isLoggedIn, authToken, logout } = useAuth();
    const [profileLoading, setProfileLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        if (isLoggedIn && !profile && !profileLoading) {
            setProfileLoading(true);
            requestProfile();
        }
    });

    const requestProfile = async () => {
        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        // logout as profile associated to token not found
        if (response.status !== 200) {
            logout();
            return;
        };

        const data = await response.json();

        setProfile(data);
    }

    return (
        <main className={styles.main}>
            {profile && (
                <div className={styles.container}>
                    <h1 className={styles.h1}>Name: { profile.name }</h1>
                    <h1 className={styles.h1}>Email: { profile.email }</h1>
                    <button className={styles.logoutButton} onClick={logout}>Logout</button>
                </div>
            )}
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
