'use client';

import styles from './styles.module.css';
import { useAuth } from '../../utils/useAuth';
import { useEffect, useState } from 'react';

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
    }, [isLoggedIn]);

    const requestProfile = async () => {
        const response = await fetch('/api/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        // logout as profile associated to token not found
        if (response.status !== 200) {
            logout();
            return;
        }

        const data = await response.json();

        setProfile(data);
    };

    return (
        <main className={styles.main}>
            {profile && (
                <div className={styles.container}>
                    <h1 className={styles.h1}>Name: {profile.name}</h1>
                    <h1 className={styles.h1}>Email: {profile.email}</h1>
                    <button className={styles.logoutButton} onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
        </main>
    );
}
