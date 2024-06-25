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
            </CardContent>
        </Card>
    );
};

export default ProduceCard;