// My intention was to write a few tests as extra, but i found i didn't have the time once i setup the testing suite.
// Below you can find one test along with tests i plan to create when i get the time.

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from '../src/app/login/page';

// Mock useRouter:
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null,
            push: () => null
        };
    }
}));

describe('Login page', () => {
    // Test for if Login form renders
    it('Renders login form', () => {
        render(<Login />);

        const username = screen.getByLabelText(/username/i);
        const password = screen.getByLabelText(/password/i);
        const submit = screen.getByRole('button');

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });

    // Test for clicking 'login' without entering username, password or both

    // Test for login with correct credentials

    // Test for login with incorrect credentials
});
