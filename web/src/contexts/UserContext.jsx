import React, { useState, useEffect } from 'react';
import axios from "axios";
import storeService from '../services/store.jsx';
import cartService from '../services/cart.jsx';
// import { setRefreshToken as setRefreshTokenInApi } from '../services/api.jsx';
import {jwtDecode} from 'jwt-decode';
const host = import.meta.env.VITE_API_URL

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {

    // TODO create method specifically for updating the user in the state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getExtraUserDetails = async (user) => {
        const result = {}
        try {
            if (user.type === 'Farmer') {
                console.log('farmer user detected')
                const response = await storeService.getByFarmer(user.id);
                result.store = response.data.id ? response.data.id : null;
            } else {
                console.log('non-farmer user detected')
                const response = await cartService.getByAccount(user.id);
                result.cart = response.data.id ? response.data.id : null;
            }
        } catch (error) {
            console.log('getExtraUserDetails encountered error: ', error)
            if (error.status === '404') {
                console.log('User does not have a store or cart')
                if (user.type === 'Farmer') {
                    result.store = null;
                } else {
                    result.cart = null;
                }
            }
        }console.log('returning result: ', result)
        return result;
    };

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return true; // If error occurs during decoding, consider the token as expired
        }
    };

    useEffect(() => {
        console.log('User Context, useEffect');
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log('parsed user from local storage: ', parsedUser)

                if (isTokenExpired(parsedUser.accessToken)) {
                    console.log('Token is expired');
                    try {
                        await refreshAccessToken();
                        console.log('Token refreshed successfully');
                    } catch (error) {
                        console.error('Failed to refresh token', error);
                        setUser(null);
                        localStorage.removeItem('user');
                        // window.location.href = '/login';
                    }
                } else {
                    console.log('Token is valid');
                }
            }
            setLoading(false);
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        console.log('triggering re-render on user update')
    }, [user])

    const login = async (email, name, type, id, accessToken, refreshToken, image) => {
        const userDetails = {email, name, type, id, accessToken, refreshToken, image};
        const extraDetails = await getExtraUserDetails(userDetails);
        console.log('extraDetails: ', extraDetails)
        const fullDetails = { ...userDetails, ...extraDetails }; // Merge userDetails and extraDetails
        setUser(fullDetails);
        console.log('setting user to context after login: ', fullDetails);
        localStorage.setItem('user', JSON.stringify(fullDetails));
    };

    const updateUserDetails = async (updatedUser) => {
        console.log('user context will update user details with: ', updatedUser)
        const updatedUserDetails = { ...user, ...updatedUser };
        console.log('basic user update: ', updatedUserDetails)
        const extraDetails = await getExtraUserDetails(updatedUserDetails);
        const fullDetails = { ...updatedUserDetails, ...extraDetails };
        console.log('updating user in global context to: ', fullDetails);
        setUser(fullDetails)
        localStorage.setItem('user', JSON.stringify(fullDetails));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const refreshAccessToken = async () => {
        try {
            console.log('User Context, refreshing token: ', { accessToken: user.accessToken, refreshToken: user.refreshToken})
            const response = await axios.post(`${host}/auth/refresh`, {
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            });

            const { accessToken, refreshToken } = response.data;

            const updatedUser = { ...user, accessToken, refreshToken };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log('Token refreshed successfully');
            return response.data;
        } catch (error) {
            console.error('Failed to refresh token', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isAuthenticated, refreshAccessToken, loading, getExtraUserDetails, updateUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;