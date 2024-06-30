import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import {useUserCheck} from "./useUserCheck.jsx";

/**
 * Custom hook to check if user is a Farmer. Use this to authorize component access to only farmer users.
 */
export const useFarmerCheck = () => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useFarmerCheck custom hook in use')
        if (!loading && (!user || user.type !== 'Farmer' || !user.store)) {
            useUserCheck();
        } else if (user.type !== 'Farmer') {
            console.log('User is not a farmer')
        } else if(!user.store){
            console.log('User is not a farmer or does not have a store, redirecting to profile')
            navigate('/profile');
        }
        console.log('successful useFarmerCheck exec')
    }, [loading, user, navigate]);
};