import React, { useEffect, useState } from 'react';
import storeService from '../services/store';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import StorePreviewCard from "../components/StorePreviewCard.jsx";

const StoreListPage = () => {
    const navigate = useNavigate();
    const [storeList, setStoreList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setIsLoading(true)
                const storeResponse = await storeService.getAll();
                const storeListData = storeResponse.data;
                setStoreList(storeListData);
            } catch (error) {
                console.error("Error fetching stores:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStores();
    }, [navigate]);

    if (isLoading) {
        return <CircularProgress />;
    }
    return (
        <>
            <h2>Store List</h2>
            <p>{storeList.length} stores found</p>
            <Grid container spacing={6}>
                {storeList.map(store => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={store.id}>
                        <StorePreviewCard store={store} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default StoreListPage;