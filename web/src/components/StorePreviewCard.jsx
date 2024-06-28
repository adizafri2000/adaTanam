import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StorePreviewCard = ({ store }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/stores/${store.id}`);
    };

    return (
        <Card>
            <CardActionArea onClick={handleCardClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {store.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Location: ({store.latitude}, {store.longitude})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bank: {store.bankName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bank Number: {store.bankNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Farmer ID: {store.farmer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Created At: {new Date(store.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Updated At: {new Date(store.updatedAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StorePreviewCard;
