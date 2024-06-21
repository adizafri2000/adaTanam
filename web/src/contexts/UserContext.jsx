import React, { useState, useEffect } from 'react';
import axios from "axios";
import storeService from '../services/store.jsx';
import cartService from '../services/cart.jsx';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setUserDetails = async (user) => {
        try {
            if (user.type === 'Farmer') {
                const response = await storeService.getByFarmer(user.id);
                setUser(prevUser => ({ ...prevUser, store: response.data.id }));
            } else {
                const response = await cartService.getByAccount(user.id);
                setUser(prevUser => ({ ...prevUser, cart: response.data.id }));
            }
        } catch (error) {
            if (error.status === 404) {
                if (user.type === 'Farmer') {
                    setUser(prevUser => ({ ...prevUser, store: null }));
                } else {
                    setUser(prevUser => ({ ...prevUser, cart: null }));
                }
            }
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUser(user);
                await setUserDetails(user);
            }
            setLoading(false);
        }
        fetchUserData();
    }, []);

    const login = async (email, name, type, id, accessToken, refreshToken) => {
        const user = { email, name, type, id, accessToken, refreshToken };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        await setUserDetails(user);
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