async function registerUser(username, password) {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Failed to register: ${response.statusText}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export { registerUser };
