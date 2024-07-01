import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import storeService from '../services/store';
import StorePreviewCard from "./StorePreviewCard.jsx";
import ProduceCard from "./ProduceCard.jsx";

const TopStoresSection = () => {
    const [storeList, setStoreList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopStores = async () => {
            try {
                const response = await storeService.getTopStores();
                setStoreList(response.data);
            } catch (error) {
                console.error('Failed to fetch top stores:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopStores();
    }, []);

    return (
        <Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h5" >Top Store</Typography>
                    <Typography variant="subtitle2" gutterBottom>Stores with the highest ratings across produce sold</Typography>
                    <Box display="flex" overflow="auto" sx={{ gap: 2 }}>
                        {storeList.map(store => (
                            <Box key={store.id} flex="1 0 auto" maxWidth="20%">
                                <StorePreviewCard store={store} />
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TopStoresSection;
