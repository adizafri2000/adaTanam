import React, { useState, useEffect } from 'react';
import axios from "axios";

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from local storage
    useEffect(() => {
        console.log('beginning useEffect for userContext')
        const fetchUserData = async () => {
            console.log('fetching user from local storage')
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log('logged in user found in local storage: ', storedUser)
            }
            setLoading(false);
        }
        fetchUserData();
    }, []);



    const login = (email, name, type, id, accessToken, refreshToken) => {
        const user = { email, name, type, id, accessToken, refreshToken };
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
            console.log('Token refreshed successfully');
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated, refreshToken, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;