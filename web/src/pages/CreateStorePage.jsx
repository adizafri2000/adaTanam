import React, {useContext, useEffect, useState} from "react";
import UserContext from "../contexts/UserContext.jsx";
import {useUserCheck} from "../hooks/useUserCheck.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import CreateStoreForm from "../components/CreateStoreForm.jsx";
import accountService from "../services/account.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CreateStorePage = () => {
    const { user, loading } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [fullUser, setFullUser] = useState({})
    const navigate = useNavigate();

    useUserCheck();

    useEffect(() => {
        console.log('rendering CreateStorePage, validating user details')
        const validateCompleteUserDetails = async () => {
            const response = await accountService.getById(user.id);
            const userDetails = response.data;
            console.log('retrieved user details: ', userDetails)
            if (userDetails.id && userDetails.email && userDetails.name && userDetails.phone && userDetails.bankNumber && userDetails.bankName && userDetails.image){
                setFullUser(userDetails)
                return true
            }
            toast.info('Complete account details first to create store')
            navigate('/profile')
            return false;
        }

        const fetchData = async () => {
            setIsLoading(true);
            console.log('valid for store creation: ', await validateCompleteUserDetails());
            setIsLoading(false)
        }

        fetchData();
    }, []);

    if (loading || isLoading) {
        return <CircularProgress />;
    }

    if (!user) {
        return null;
    }

    return (
        <CreateStoreForm userDetails={fullUser}/>
    );
}

export default CreateStorePage;