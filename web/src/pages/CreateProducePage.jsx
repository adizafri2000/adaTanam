import React, { useContext } from 'react';
import CreateProduceForm from '../components/CreateProduceForm.jsx';
import UserContext from '../contexts/UserContext.jsx';
import {useUserCheck} from "../hooks/useUserCheck.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const CreateProducePage = () => {
    const { user, loading } = useContext(UserContext);
    useUserCheck();

    if (loading) {
        return <CircularProgress />;
    }

    if (!user) {
        return null;
    }

    return (
        <CreateProduceForm />
    );
};

export default CreateProducePage;