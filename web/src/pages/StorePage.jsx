import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import storeService from '../services/store';  // Service for store-related API calls
import produceService from '../services/produce';  // Service for produce-related API calls
import CircularProgress from '@mui/material/CircularProgress';

const StorePage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('beginning useEffect')
        const fetchStoreAndProduce = async () => {
            try {
                if (!user) {
                    navigate('/login');
                    console.log('end useEffect no user')
                    return;
                }

                console.log('store page debug, user: ', user);

                if (user.type === 'Farmer') {
                    const response = await storeService.getByFarmer(user.id);
                    console.log('API debug: ', response);
                    const storeData = response.data;
                    setStore(storeData);
                    console.log('store page debug, store: ', storeData);

                    const produceResponse = await produceService.getByStore(storeData.id);
                    console.log('API debug: ', produceResponse);
                    const produceListData = produceResponse.data;
                    setProduceList(produceListData);
                    console.log('store page debug, produce: ', produceListData);
                }
            } catch (error) {
                console.error("Error fetching store or produce:", error);
            } finally {
                setIsLoading(false);
                console.log('end useEffect normal route')
            }
        };

        fetchStoreAndProduce();
    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!user || user.type !== 'Farmer') {
        return <p>Access Denied. Only Farmers can access this page.</p>;
    }

    console.log('reaching return')
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
