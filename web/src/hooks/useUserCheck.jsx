import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export const useUserCheck = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useUserCheck custom hook in use')
        if (!loading && !user) {
            console.log('no user found in global context, redirecting to login')
            navigate('/login');
        }
    }, [loading, user, navigate]);
};