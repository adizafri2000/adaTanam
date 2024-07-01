import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Divider
} from '@mui/material';
import cartService from "../services/cart.jsx";
import { useConsumerCheck } from "../hooks/useConsumerCheck.jsx";
import { toast } from "react-toastify";
import storeService from "../services/store.jsx";
import accountService from "../services/account.jsx";
import orderService from "../services/order.jsx";
import paymentService from "../services/payment.jsx";

const StoreInformation = ({ storeList, farmerList }) => (
    <Box mt={3}>
        <Typography variant="h6">Store Information</Typography>
        {storeList.length > 0 ? (
            <List>
                {storeList.map((store, index) => (
                    <div key={index}>
                        <ListItem>
                            <ListItemText primary={`Store Name: ${store.name}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText secondary={`Farmer Phone Number: ${farmerList[index].phone}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText secondary={`Location: ${store.latitude}, ${store.longitude}`} />
                        </ListItem>
                        {index !== storeList.length - 1 && <Divider variant="middle" />}
                    </div>
                ))}
            </List>
        ) : (
            <>
                <Typography variant="body1">Store Name: Loading...</Typography>
                <Typography variant="body1">Farmer Phone Number: Loading...</Typography>
                <Typography variant="body1">Location: Loading...</Typography>
            </>
        )}
    </Box>
);

const PaymentPage = () => {
    const { user, loading } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [farmerList, setFarmerList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pickupDateTime, setPickupDateTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [processingOrder, setProcessingOrder] = useState(false); // State to manage processing order
    const navigate = useNavigate();
    useConsumerCheck();

    useEffect(() => {
        const fetchCartItems = async () => {
            let results;
            try {
                const response = await cartService.getCartItems(user.cart);
                setCartItems(response.data);
                results = response.data;
            } catch (error) {
                console.log("Error fetching cart items:", error);
            }
            return results;
        };

        const getDistinctStoreIds = (cartItems) => {
            const storeIds = cartItems.reduce((ids, item) => {
                if (!ids.includes(item.storeId)) {
                    ids.push(item.storeId);
                }
                return ids;
            }, []);

            return storeIds;
        };

        const getRelevantStoreDetails = async (cartitems) => {
            const storeIds = getDistinctStoreIds(cartitems);
            return await Promise.all(
                storeIds.map(async (storeId) => {
                    const response = await storeService.getById(storeId);
                    return response.data;
                })
            );
        };

        const setStoreDetails = async (cartitems) => {
            const details = await getRelevantStoreDetails(cartitems);
            setStoreList(details);
            return details;
        };

        const fetchFarmerDetails = async (stores) => {
            return await Promise.all(
                stores.map(async (store) => {
                    const response = await accountService.getById(store.farmer);
                    return response.data;
                })
            );
        };

        const setFarmerDetails = async (stores) => {
            const details = await fetchFarmerDetails(stores);
            setFarmerList(details);
            return details;
        };

        const fetchAllDetails = async () => {
            setIsLoading(true);
            const cartItemList = await fetchCartItems();
            const storeDetailsList = await setStoreDetails(cartItemList);
            const farmerDetailsList = await setFarmerDetails(storeDetailsList);
            setIsLoading(false);
        };

        if (!loading) {
            fetchAllDetails();
        }
    }, [loading, user]);

    const handleConfirmPayment = async () => {
        if (!pickupDateTime || !paymentMethod) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            setProcessingOrder(true); // Show processing order dialog

            // Iterate over each store to create individual order records
            for (const store of storeList) {
                // Prepare order data
                const orderData = {
                    account: user.id,
                    store: store.id,
                    cart: user.cart,
                    orderTimestamp: new Date().toISOString(),
                    pickup: new Date(pickupDateTime).toISOString(),
                    isCompleted: false,
                    completedTimestamp: null,
                    status: "Pending"
                };

                const orderResponse = await orderService.create(user.accessToken, orderData);
                const orderResult = orderResponse.data;
                const orderId = orderResult.id;

                // Prepare payment data
                const paymentData = {
                    orderId: orderId,
                    totalPrice: cartItems.reduce((total, item) => {
                        if (item.storeId === store.id) {
                            return total + (item.produceUnitPrice * item.cartItemQuantity);
                        }
                        return total;
                    }, 0),
                    paymentTimestamp: new Date().toISOString(),
                    method: paymentMethod
                };

                const paymentResponse = await paymentService.create(user.accessToken, paymentData);

                // Update cart to set isActive to false
                const cartUpdateData = {
                    isActive: false,
                    account: user.id
                };

                await cartService.update(user.accessToken, user.cart, cartUpdateData);
            }

            toast.success('Payment confirmed!');
            navigate('/'); // Navigate to confirmation page

            setConfirmDialogOpen(false); // Close confirmation dialog after successful payment
        } catch (error) {
            console.error('Error confirming payment:', error);
            toast.error('Failed to confirm payment. Please try again later.');
        } finally {
            setProcessingOrder(false); // Hide processing order dialog after processing
        }
    };

    if (isLoading || loading) return <CircularProgress />;

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Payment Page
            </Typography>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item, index) => (
                            <TableRow key={item.produceId}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    {item.produceName}
                                </TableCell>
                                <TableCell align="right">
                                    {item.produceUnitPrice} per {item.produceSellingUnit}
                                </TableCell>
                                <TableCell>
                                    {item.storeName}
                                </TableCell>
                                <TableCell align="right">{item.cartItemQuantity}</TableCell>
                                <TableCell align="right">
                                    {(item.produceUnitPrice * item.cartItemQuantity).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} />
                            <TableCell align="right"><strong>Total</strong></TableCell>
                            <TableCell align="right"><strong>{cartItems.reduce((total, item) => total + (item.produceUnitPrice * item.cartItemQuantity), 0).toFixed(2)}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Store location, farmer's name, phone no */}
            {storeList.length > 0 && <StoreInformation storeList={storeList} farmerList={farmerList} />}

            {/* Input for pickup date and time */}
            <Box mt={3}>
                <TextField
                    id="pickup-datetime"
                    label="Pickup Date and Time"
                    type="datetime-local"
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </Box>

            {/* Input for payment method */}
            <Box mt={3}>
                <FormControl fullWidth>
                    <InputLabel id="payment-method-label">Payment Method</InputLabel>
                    <Select
                        labelId="payment-method-label"
                        id="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="online">Online Transfer</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Button to confirm payment */}
            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmDialogOpen(true)}
                    disabled={!pickupDateTime || !paymentMethod}
                >
                    Confirm Payment
                </Button>
            </Box>

            {/* Processing Order Dialog */}
            <Dialog
                open={processingOrder}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="processing-order-dialog-title"
                aria-describedby="processing-order-dialog-description"
            >
                <DialogTitle id="processing-order-dialog-title">Processing Order...</DialogTitle>
                <DialogContent>
                    <DialogContentText id="processing-order-dialog-description">
                        Please wait while we process your order.
                    </DialogContentText>
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Payment</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to confirm the payment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmPayment} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PaymentPage;
