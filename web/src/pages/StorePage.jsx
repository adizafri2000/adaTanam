import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import storeService from '../services/store';  // Assumed to be the service for store-related API calls
import produceService from '../services/produce';  // Assumed to be the service for produce-related API calls
import CircularProgress from '@mui/material/CircularProgress';

const StorePage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStoreAndProduce = async () => {
            try {
                if (!user) {
                    navigate('/login');
                    return;
                }

                console.log('store page debug, user: ',user)

                if (user.type === 'Farmer') {
                    var response = await storeService.getByFarmer(user.id);
                    console.log('API debug: ', response)
                    const store = response.data;
                    setStore(store);
                    console.log('store page debug, store: ',store)

                    response = await produceService.getByStore(store.id);
                    console.log('API debug: ', response)
                    const produceList = response.data
                    setProduceList(produceList);
                    console.log('store page debug, produce: ',produce)
                }
            } catch (error) {
                console.error("Error fetching store or produce:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStoreAndProduce();
    }, [user]);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!user || user.type !== 'Farmer') {
        return <p>Access Denied. Only Farmers can access this page.</p>;
    }

    return (
        <div>
            <h2>{user.name}'s Store</h2>
            <h3>{store?.name}</h3>
            <ul>
                {produceList.map(produce => (
                    <li key={produce.id}>
                        <h4>{produce.name}</h4>
                        <p>Type: {produce.type}</p>
                        <p>Stock: {produce.stock} {produce.sellingUnit}</p>
                        <p>Unit Price: ${produce.unitPrice}</p>
                        <p>Status: {produce.status}</p>
                        {produce.description && <p>Description: {produce.description}</p>}
                        {produce.image && <img src={produce.image} alt={produce.name} />}
                        <p>Added on: {new Date(produce.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(produce.updatedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StorePage;
