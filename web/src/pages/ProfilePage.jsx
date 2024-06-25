import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMainCard from '../components/ProfileMainCard.jsx';
import accountService from '../services/account.jsx';
import UserContext from '../contexts/UserContext'; // Import UserContext
import CircularProgress from "@mui/material/CircularProgress";
import {toast} from "react-toastify";
import {useUserCheck} from '../hooks/useUserCheck';

const ProfilePage = () => {
    const navigate = useNavigate(); // Get the navigate function
    const { user: currentUser, loading: userContextLoading } = useContext(UserContext); // Use UserContext
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useUserCheck();

    useEffect(() => {
        console.log('profile page, useEffect in run')
        const fetchUserDetails = async () => {
            setIsLoading(true);
            try {
                if(!currentUser) throw new Error('User not logged in');
                const response = await accountService.getById(currentUser.id);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                toast.info('Login first to view your profile')
                navigate('/login');

            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser) {
            fetchUserDetails();
        }
    }, [currentUser]);

    // If the user is not logged in, navigate to the login page
    if (userContextLoading || isLoading) {
        return <CircularProgress />;
    } else{
        console.log('profile page, user supposedly fetched from context: ', user)
        console.log('profile page, currentUser supposedly fetched from context: ', currentUser)
    }

    console.log('ProfilePage, rendering return')
    return (
        <div>
            <h1>Profile Page</h1>
            {user && <ProfileMainCard user={user} userFromContext={currentUser} />}
        </div>
    );
};

export default ProfilePage;