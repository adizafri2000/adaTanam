import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import storeService from '../services/store';  // Service for store-related API calls
import produceService from '../services/produce';  // Service for produce-related API calls
import CircularProgress from '@mui/material/CircularProgress';
import ProduceCard from "../components/ProduceCard.jsx";
import { Grid, Container, Button, Box, Typography } from '@mui/material';

const StorePage = () => {
    const { user, loading: userContextLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStoreAndProduce = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                if (user.type === 'Farmer') {
                    const response = await storeService.getByFarmer(user.id);
                    const storeData = response.data;
                    setStore(storeData);

                    const produceResponse = await produceService.getByStore(storeData.id);
                    const produceListData = produceResponse.data;
                    setProduceList(produceListData);
                }
            } catch (error) {
                console.error("Error fetching store or produce:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!userContextLoading) {
            fetchStoreAndProduce();
        }
    }, [userContextLoading, user, navigate]);

    if (userContextLoading || isLoading) {
        return <CircularProgress />;
    }

    if (!user || user.type !== 'Farmer') {
        return <p>Access Denied. Only Farmers can access this page.</p>;
    }

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">{user.name}'s Store</Typography>
                <Button variant="contained" onClick={() => navigate('/create-produce')}>Add New Produce</Button>
            </Box>
            <h3>{store?.name}</h3>
            <Grid container spacing={3}>
                {produceList.map(produce => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={produce.id}>
                        <ProduceCard produce={produce} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default StorePage;