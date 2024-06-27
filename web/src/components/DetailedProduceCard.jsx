import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const DetailedProduceCard = ({ produce }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={produce.image ? produce.image : 'https://via.placeholder.com/300'}
                alt={produce.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {produce.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {produce.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Stock: {produce.stock} {produce.sellingUnit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Unit Price: RM{parseFloat(produce.unitPrice).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {produce.status}
                </Typography>
                {produce.description && (
                    <Typography variant="body2" color="text.secondary">
                        Description: {produce.description}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    Created At: {new Date(produce.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Updated At: {new Date(produce.updatedAt).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DetailedProduceCard;
