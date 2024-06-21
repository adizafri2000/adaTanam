import React, { useContext } from 'react';
import CreateProduceForm from '../components/CreateProduceForm.jsx';
import UserContext from '../contexts/UserContext.jsx';

const CreateProducePage = () => {
    const { user } = useContext(UserContext);

    return (
        <CreateProduceForm />
    );
};

export default CreateProducePage;