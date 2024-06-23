import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import accountService from '../services/account.jsx';
import UserContext from '../contexts/UserContext.jsx'; // Import UserContext

const ProfileEditForm = () => {
    const { user: currentUser, loading: userContextLoading } = useContext(UserContext); // Use UserContext
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser && !userContextLoading) {
            navigate('/login'); // Redirect non-logged-in users to the login page
        }
    }, [currentUser, userContextLoading]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await accountService.update(currentUser.id, { name, email, phone });
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update user details:', error);
        }
    };

    if (!currentUser || userContextLoading) {
        return null; // Or a loading spinner
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
        </form>
    );
};

export default ProfileEditForm;