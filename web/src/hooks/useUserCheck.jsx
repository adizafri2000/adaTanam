import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import {toast} from 'react-toastify';

/**
 * Custom hook to check if user is logged in. Use this to enforce authorization on any component.
 */
export const useUserCheck = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useUserCheck custom hook in use')
        if (!loading && !user) {
            console.log('no user found in global context, redirecting to login')
            toast.info('Login required')
            navigate('/login');
        }
    }, [loading, user, navigate]);
};