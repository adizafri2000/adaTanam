import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StorePreviewCard = ({ store }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/stores/${store.id}`);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Farmer ID: {store.farmer}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Created At: {formatDate(store.createdAt)}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Updated At: {formatDate(store.updatedAt)}*/}
                    {/*</Typography>*/}
                    {(store.ratingScore !== 0) && (
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
                    )}
                    {!(store.ratingScore !== 0) && (
                        <Typography variant="body2" color="text.secondary">
                            Rating: {store.ratingScore}/5.00 ({store.ratingCount} reviews)
                        </Typography>
                    )}
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Store Rating: {store.ratingScore.toFixed(2)}/5.00 ({store.ratingCount} reviews)*/}
                    {/*</Typography>*/}
                    {/*{store.ratingScore !== 0 && (*/}
                    {/*    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>*/}
                    {/*        <Rating*/}
                    {/*            name="store-rating"*/}
                    {/*            value={parseFloat(store.ratingScore)}*/}
                    {/*            precision={0.1}*/}
                    {/*            readOnly*/}
                    {/*            sx={{ ml: 1 }}*/}
                    {/*        />*/}
                    {/*    </Box>*/}
                    {/*)}*/}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default StorePreviewCard;
