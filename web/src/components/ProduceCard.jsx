import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const ProduceCard = ({ produce }) => {
    return (
        <NavLink to={`/produce/${produce.id}`} style={{ textDecoration: 'none' }}>
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
                    {(produce.ratingScore !== 0) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Rating: {parseFloat(produce.ratingScore).toFixed(2)} ({produce.ratingCount} reviews)
                            </Typography>
                            <Rating
                                name={`rating-${produce.id}`}
                                value={parseFloat(produce.ratingScore)}
                                precision={0.1}
                                readOnly
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    )}
                    {!(produce.ratingScore !== 0) && (
                        <Typography variant="body2" color="text.secondary">
                            Rating: {produce.ratingScore}/5.00 ({produce.ratingCount} reviews)
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </NavLink>
    );
};

export default ProduceCard;
