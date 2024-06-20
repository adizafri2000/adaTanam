import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProduceCard = ({ produce }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={produce.image}
                alt={produce.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {produce.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {produce.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Stock: {produce.stock} {produce.sellingUnit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Unit Price: ${produce.unitPrice}
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
                    Added on: {new Date(produce.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(produce.updatedAt).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProduceCard;