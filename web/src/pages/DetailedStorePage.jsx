import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProduceCard from '../components/ProduceCard.jsx';
import produceService from '../services/produce';
import storeService from '../services/store';
import CircularProgress from '@mui/material/CircularProgress';
import StorePreviewCard from "../components/StorePreviewCard.jsx";
import {Typography, Divider, Box, Grid} from '@mui/material';
import DetailedStoreCard from "../components/DetailedStoreCard.jsx";

const DetailedStorePage = () => {
    const [store, setStore] = useState({});
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduceList = async (storeId) => {
            try {
                const response = await produceService.getByStore(storeId);
                setProduceList(response.data);
            } catch (error) {
                console.error('Failed to fetch produce details:', error);
                // navigate('/404');
            }
        };

        const fetchStoreDetails = async (storeId) => {
            try {
                const response = await storeService.getById(storeId);
                setStore(response.data);
            } catch (error) {
                console.error('Failed to fetch store details:', error);
            }
        };

        const fetchPageDetails = async (storeId) => {
            try {
                setIsLoading(true);
                await fetchStoreDetails(storeId);
                await fetchProduceList(storeId);
            } catch (error) {
                console.error('Failed to fetch details:', error);
                // Handle error or navigate to error page
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageDetails(id);
    }, [id]);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <h2>Viewing Store</h2>
            <Box mt={2}>
                <DetailedStoreCard store={store}/>
            </Box>
            <Divider sx={{ my: 2 }} />
            {produceList.length > 0 && (
                <React.Fragment>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Produce by this store</Typography>
                    <Grid container spacing={6}>
                        {produceList.map(produce => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={produce.id}>
                                <ProduceCard produce={produce} />
                            </Grid>
                        ))}
                    </Grid>
                </React.Fragment>
            )}
            {produceList.length === 0 && (
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>No produce created by this store</Typography>
            )}

        </Box>
    );
};

export default DetailedStorePage;
