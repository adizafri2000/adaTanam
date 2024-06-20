import React, { useContext } from 'react';
import CreateProduceForm from '../components/CreateProduceForm.jsx';
import produceService from '../services/produce';
import UserContext from '../contexts/UserContext.jsx';

const CreateProducePage = () => {
    const { user } = useContext(UserContext);

    const handleCreateProduce = async (produceData) => {
        try {
            const response = await produceService.create(user.token, produceData);
            console.log('Produce created:', response.data);
            // TODO: Redirect to the store page or show a success message
        } catch (error) {
            console.error('Error creating produce:', error);
            // TODO: Show an error message
        }
    };

    return (
        <CreateProduceForm store={user.store} onSubmit={handleCreateProduce} />
    );
};

export default CreateProducePage;