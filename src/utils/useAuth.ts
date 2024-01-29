import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginDetails {
    username: string;
    password: string;
}

export const useAuth = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem('token');

        if (token && validateToken(token)) {
            if (!authToken) {
                setAuthToken(token);
                setIsLoggedIn(true);
            }
        } else {
            logout();
        }
    });

    const validateToken = (token: string) => {
        if (token.length == 3) return true;
        return false;
    };

    const login = async (loginDetails: LoginDetails) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(loginDetails)
        });

        if (response.status == 200) {
            const data = await response.json();

            window.localStorage.setItem('token', data.token);
        }

        return response.status;
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setIsLoggedIn(false);
        setAuthToken(null);
        router.push('/login');
    };

    return { isLoggedIn, login, logout, authToken };
};
