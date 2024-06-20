import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';

const StorePage = () => {
    const { user } = useContext(UserContext); // Accessing user context
    const [ item, setItems] = useState([])
    const navigate = useNavigate(); // Get navigate function from react-router-dom

    useEffect(() => {
        console.log('storepage useeffect debug: ', user)
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not logged in
        }
    }, [user]); // useEffect dependency array ensures this runs when user or navigate changes

    if (!user) {
        return <p>Redirecting to login...</p>; // Optionally, show a loading indicator or message
    }

    return (
        <div>
            <h2>{user.name}'s store</h2>
            
        </div>
    );
};

export default StorePage;
