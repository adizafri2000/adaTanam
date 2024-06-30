import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import cartService from '../services/cart';
import {useUserCheck} from "./useUserCheck.jsx";

/**
 * Custom hook to check if user is a Consumer. Use this to authorize component access to consumer users.
 */
export const useConsumerCheck = () => {
    const { user, loading, updateUserDetails } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleNoActiveCart = async () => {
            try {
                const data = {
                    isActive: true,
                    account: user.id
                }
                const response = await cartService.createCart(user.accessToken, data);
                console.log('created new active cart for user: ', response.data)
                updateUserDetails({ ...user, cart: response.data.id });
            } catch (error) {
                console.log('error creating new active cart: ', error)
            }
        }
        const handleUseEffect = async () => {
            if (!loading && (!user)) {
                useUserCheck();
            } else if(user.type !== 'Consumer') {
                console.log('User is not a consumer')
            } else if(!user.cart){
                await handleNoActiveCart()
            }
        }
        handleUseEffect()
        console.log('successful useConsumerCheck exec')
    }, [loading, user, navigate]);
};