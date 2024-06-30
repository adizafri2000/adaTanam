import React, { useState, useContext } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { Card, CardContent, Typography, CardMedia, Button, TextField, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import cartService from '../services/cart';
import {useUserCheck} from "../hooks/useUserCheck.jsx";

const DetailedProduceCard = ({ produce, handlePendingHarvest }) => {
    const { user } = useContext(UserContext);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleIncrement = () => {
        if (quantity < produce.stock) {
            setQuantity(prevQuantity => validateQuantity(prevQuantity + 1));
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => validateQuantity(prevQuantity - 1));
        }
    };

    const handleChange = (e) => {
        const value = parseFloat(e.target.value);
        setQuantity(validateQuantity(value));
    };

    const validateQuantity = (value) => {
        if (isNaN(value) || value < 1) {
            setError('Quantity must be at least 1');
            return quantity;
        } else if (value > produce.stock) {
            setError(`Quantity cannot exceed ${produce.stock}`);
            return quantity;
        } else {
            setError('');
            return value;
        }
    };

    const handleAddToCart = () => {
        useUserCheck()

        if (produce.status && produce.status.toLowerCase() === 'pending harvest') {
            handlePendingHarvest().then((proceed) => {
                if (proceed) {
                    checkProduceFreshnessAndProceed();
                }
            });
        } else {
            checkProduceFreshnessAndProceed();
        }
    };

    const checkProduceFreshnessAndProceed = () => {
        const daysSinceUpdate = (new Date() - new Date(produce.updatedAt)) / (1000 * 60 * 60 * 24);
        if (daysSinceUpdate > 5) {
            setOpenDialog(true);
        } else {
            addToCart();
        }
    };

    const addToCart = () => {
        console.log(`Added ${quantity} of ${produce.name} to cart.`);
    };

    const handleDialogClose = (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            addToCart();
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const daysSinceUpdate = (new Date() - new Date(produce.updatedAt)) / (1000 * 60 * 60 * 24);

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
                    Created At: {formatDate(produce.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Updated At: {formatDate(produce.updatedAt)}
                </Typography>
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
                <Grid container spacing={1} alignItems="center" style={{ marginTop: '10px' }}>
                    <Grid item>
                        <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={handleChange}
                            error={!!error}
                            helperText={error}
                            inputProps={{ min: 1, max: produce.stock, style: { textAlign: 'center' } }}
                            style={{ width: '60px' }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleIncrement} disabled={quantity >= produce.stock}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{produce.sellingUnit}</Typography>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginTop: '10px' }}
                    disabled={produce.status && produce.status.toLowerCase() === 'not available'}
                >
                    Add to Cart
                </Button>
                {daysSinceUpdate > 5 && (
                    <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                        This produce has been in the system for {Math.floor(daysSinceUpdate)} days.
                    </Typography>
                )}
            </CardContent>

            <Dialog
                open={openDialog}
                onClose={() => handleDialogClose(false)}
            >
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Farmer last updated this produce in their store {Math.floor(daysSinceUpdate)} days ago and the remaining produce may not be fresh. Proceed adding to cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="secondary">
                        No
                    </Button>
                    <Button onClick={() => handleDialogClose(true)} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default DetailedProduceCard;
