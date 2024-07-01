import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, CardMedia, Box, Rating, Divider} from '@mui/material';
import accountService from '../services/account';
import CircularProgress from "@mui/material/CircularProgress";

const DetailedStoreCard = ({ store }) => {
    const [farmer, setFarmer] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchFarmerDetails = async (farmerId) => {
            try{
                setIsLoading(true)
                const response = await accountService.getById(store.farmer)
                console.log('fetching farmer details for store: ', farmer)
                setFarmer(response.data)
            } catch (error){
                console.log('error fetching store farmer: ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchFarmerDetails(store.farmer)
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return isLoading? <CircularProgress/> : (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {store.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Location: {store.longitude}, {store.latitude}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bank Name: {store.bankName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bank Number: {store.bankNumber}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {parseFloat(store.ratingScore).toFixed(2)} ({store.ratingCount} reviews)
                    </Typography>
                    <Rating
                        name={`rating-${store.id}`}
                        value={parseFloat(store.ratingScore)}
                        precision={0.1}
                        readOnly
                        sx={{ ml: 1 }}
                    />
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Created At: {formatDate(store.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Updated At: {formatDate(store.updatedAt)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    Farmer: {farmer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mobile No.: {farmer.phone}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DetailedStoreCard;
