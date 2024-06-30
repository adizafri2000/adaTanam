import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import cartService from "../services/cart.jsx";
import { useConsumerCheck } from "../hooks/useConsumerCheck.jsx";
import { toast } from "react-toastify";

const CartPage = () => {
    const { user, loading, updateUserDetails } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState({});
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const navigate = useNavigate();
    useConsumerCheck();

    useEffect(() => {
        const initialCartChecking = async () => {
            if (!user.cart) {
                try {
                    const data = {
                        isActive: true,
                        account: user.id,
                    };
                    const response = await cartService.createCart(user.accessToken, data);
                    updateUserDetails({ ...user, cart: response.data.id });
                } catch (error) {
                    console.log("Error creating new active cart:", error);
                }
            }
        };

        const fetchCartItems = async () => {
            setIsLoading(true);
            await initialCartChecking();
            try {
                const response = await cartService.getCartItems(user.cart);
                setCartItems(response.data);
            } catch (error) {
                console.log("Error fetching cart items:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!loading) {
            fetchCartItems();
        }
    }, [loading, user, updateUserDetails]);

    const handleRemoveItem = async (produceId) => {
        console.log(`Removing item with id: ${produceId}`);
        setRemoveLoading(prevState => ({
            ...prevState,
            [produceId]: true
        }));
        setConfirmDialogOpen(true);
        setItemToRemove(produceId);
    };

    const confirmRemoveItem = async () => {
        setConfirmDialogOpen(false);
        setRemoveLoading(prevState => ({
            ...prevState,
            [itemToRemove]: true
        }));
        try {
            const response = await cartService.deleteCartItem(user.accessToken, user.cart, itemToRemove);
            console.log('Removing cart item response:', response);
            setCartItems(cartItems.filter(item => item.produceId !== itemToRemove));
            toast.success('Item removed from cart');
        } catch (error) {
            console.log('Error removing cart item:', error);
            toast.error('Error removing cart item');
        } finally {
            setRemoveLoading(prevState => ({
                ...prevState,
                [itemToRemove]: false
            }));
        }
    };

    const cancelRemoveItem = () => {
        setConfirmDialogOpen(false);
        setRemoveLoading(prevState => ({
            ...prevState,
            [itemToRemove]: false
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.produceUnitPrice * item.cartItemQuantity), 0);
    };

    if (isLoading || loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Cart Page
            </Typography>
            {cartItems.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell> {/* Item number column */}
                                    <TableCell>Produce Name</TableCell>
                                    <TableCell align="right">Unit Price (RM)</TableCell>
                                    <TableCell>Store Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total (RM)</TableCell>
                                    <TableCell align="right">Actions</TableCell> {/* Empty cell for the remove button */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item, index) => (
                                    <TableRow key={item.produceId}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/produce/${item.produceId}`}>
                                                {item.produceName}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.produceUnitPrice} per {item.produceSellingUnit}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/store/${item.storeId}`}>
                                                {item.storeName}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="right">{item.cartItemQuantity}</TableCell>
                                        <TableCell align="right">
                                            {(item.produceUnitPrice * item.cartItemQuantity).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                disabled={removeLoading[item.produceId]}
                                                onClick={() => handleRemoveItem(item.produceId)}
                                            >
                                                {removeLoading[item.produceId] ? <CircularProgress size={24} /> : 'Remove'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={4} />
                                    <TableCell align="right"><strong>Total</strong></TableCell>
                                    <TableCell align="right"><strong>{calculateTotal().toFixed(2)}</strong></TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/payment')}>
                            Proceed to Payment
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    Your cart is empty.
                </Typography>
            )}

            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Remove Item</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this item from your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelRemoveItem} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmRemoveItem} color="secondary" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CartPage;
