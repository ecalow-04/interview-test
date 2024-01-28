'use client';

import { useAuth } from '../utils/useAuth';

export default function Profile() {
    const { authToken, logout } = useAuth();



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
