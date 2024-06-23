import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export const useFarmerCheck = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useFarmerCheck custom hook in use')
        if (!loading && (!user || user.type !== 'Farmer' || !user.store)) {
            console.log('User is not a farmer or does not have a store, redirecting to profile')
            navigate('/profile');
        }
        console.log('sucessful useFarmerCheck exec')
    }, [loading, user, navigate]);
};