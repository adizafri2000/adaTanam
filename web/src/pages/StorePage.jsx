import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import storeService from '../services/store';
import produceService from '../services/produce';
import CircularProgress from '@mui/material/CircularProgress';
import ProduceCard from "../components/ProduceCard.jsx";
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import {useUserCheck} from "../hooks/useUserCheck.jsx";

const StorePage = () => {
    const { user, loading: userContextLoading } = useContext(UserContext);
    const navigate = useNavigate();
    const [store, setStore] = useState(null);
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useUserCheck();

    useEffect(() => {
        if (user) {
            const fetchStoreAndProduce = async () => {
                try {
                    if (user.store) {
                        const response = await storeService.getByFarmer(user.id);
                        const storeData = response.data;
                        setStore(storeData);

                        const produceResponse = await produceService.getByStore(storeData.id);
                        const produceListData = produceResponse.data;
                        setProduceList(produceListData);
                    } else {
                        console.log('User does not have a store')
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
            {store ? (
                <>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
                        <Button variant="contained" onClick={() => navigate('/store/create-produce')} sx={{ marginRight: '10px' }}>Add New Produce</Button>
                        <Button variant="contained" onClick={() => navigate('/store/edit-store')}>Edit Store Details</Button>
                    </Box>
                    <Typography variant="h4">{user.name}'s Store</Typography>
                    <h3>{store?.name}</h3>
                    <Grid container spacing={3}>
                        {produceList.map(produce => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={produce.id}>
                                <ProduceCard produce={produce} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <>
                    <Typography variant="h6">No store exists for user</Typography>
                    <Button variant="contained" onClick={() => navigate('/store/create-store')}>Create A Store</Button>
                </>
            )}
        </Container>
    );
};

export default StorePage;