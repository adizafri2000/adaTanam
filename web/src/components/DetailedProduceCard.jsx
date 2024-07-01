import React, { useState, useContext } from 'react';
import UserContext from "../contexts/UserContext.jsx";
import { Card, CardContent, Typography, CardMedia, Button, TextField, IconButton, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartService from "../services/cart";
import accountService from "../services/account";
import CircularProgress from "@mui/material/CircularProgress";

const DetailedProduceCard = ({ produce }) => {
    const { user, updateUserDetails } = useContext(UserContext);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [outOfStock, setOutOfStock] = useState(false)
    const navigate = useNavigate();

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

    const handleAddToCart = async () => {
        let flag = true;
        if (!user) {
            toast.info('Login required');
            navigate('/login');
            flag = false;
        }
        if (flag) {
            if (daysSinceUpdate > 5) {
                setOpenDialog(true); // Prompt for confirmation if produce is older than 5 days
            } else if (produce.status && produce.status.toLowerCase() === 'pending for harvest') {
                setOpenDialog(true); // Prompt for confirmation if produce status is 'pending for harvest'
            } else {
                await addToCart();
            }
        }
    };

    const handlePendingHarvestConfirmation = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = async (confirm) => {
        setOpenDialog(false);
        if (confirm) {
            await addToCart();
        }
    };

    const fetchAccountActiveCart = async () => {
        let cartId = -1;
        try {
            let response = await accountService.getAccountActiveCart(user.id);
            console.log('checking if user has an active cart: ', response);
            if (response.data) {
                cartId = response.data.id;
            }
        } catch (error) {
            console.log('account has no active carts: ', error);
        }
        return cartId;
    };

    const produceAlreadyInCart = async (cartId) => {
        // check if produce already exists in cart for update instead of create
        let result = false;
        try {
            let response = await cartService.getCartItem(cartId, produce.id);
            console.log('checking if produce already in cart:', response);
            if (response.status !== 404) {
                result = true;
            }
        } catch (error) {
            console.log('no cart containing produce exists yet');
        }
        return result;
    };

    const addToCart = async () => {
        setIsLoading(true);
        let cartId;
        // check if user has an active cart
        try {
            cartId = await fetchAccountActiveCart();
            let response;
            if (cartId < 0) {
                response = await cartService.createCart(user.accessToken, { isActive: true, account: user.id });
                console.log('created new active cart for user: ', response);
                if (response.data) {
                    cartId = response.data.id;
                }
            }

            const data = {
                cart: cartId,
                produce: produce.id,
                quantity: quantity,
                rating: 0,
                review: ""
            };

            const flag = await produceAlreadyInCart(cartId);
            if (flag) {
                response = await cartService.updateCartItem(user.accessToken, cartId, produce.id, data);
                console.log('updated cart item: ', response);
            } else {
                response = await cartService.addCartItem(user.accessToken, data);
                console.log('created new cart_item: ', response);
            }
            toast.success('Successfully updated cart!');
            updateUserDetails({ ...user, cart: cartId });
        } catch (error) {
            console.log('error in addToCart: ', error);
            toast.error('Failed to add produce to cart');
        } finally {
            setIsLoading(false);
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
                {(!user || user.type !== 'Farmer') && (
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
                )}
                {(!user || user.type !== 'Farmer') && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                        style={{ marginTop: '10px' }}
                        disabled={(produce.status && produce.status.toLowerCase() === 'out of stock') || isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Add to Cart'}
                    </Button>
                )}
                {produce.status === 'out of stock' && (
                    <p style={{ color: 'red', marginLeft: '5px' }}> (Produce is out of stock)</p>
                )}
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
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {daysSinceUpdate > 5 &&
                            `This produce has been in the system for ${Math.floor(daysSinceUpdate)} days.`
                        }
                        {produce.status && produce.status.toLowerCase() === 'pending harvest' &&
                            `This produce is marked as 'Pending Harvest'. While the farmer may had predicted the 
                            produce total upon harvest, there may still be risks such as produce becoming bad and 
                            unfit for sale.`
                        }
                        Proceed to add to cart anyway?
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
