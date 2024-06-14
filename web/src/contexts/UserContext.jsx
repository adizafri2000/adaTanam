import React, { useState, useEffect } from 'react';
import axios from "axios";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, name, id, accessToken, refreshToken) => {
        const user = { email, name, id, accessToken, refreshToken };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post('/auth/refresh', {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            });

            const { accessToken, refreshToken } = response.data;

            const updatedUser = { ...user, accessToken, refreshToken };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated, refreshToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;