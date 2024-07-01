import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
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
    ListItemText
} from '@mui/material';
import cartService from "../services/cart.jsx";
import {useConsumerCheck} from "../hooks/useConsumerCheck.jsx";
import {toast} from "react-toastify";
import storeService from "../services/store.jsx";
import accountService from "../services/account.jsx";

const StoreInformation = ({ storeList }) => (
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
                            <ListItemText secondary={`Farmer Phone Number: ${store.phone}`} />
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
    const navigate = useNavigate();
    useConsumerCheck();

    useEffect(() => {
        const fetchCartItems = async () => {
            // setIsLoading(true);
            let results;
            try {
                const response = await cartService.getCartItems(user.cart);
                setCartItems(response.data);
                results = response.data
            } catch (error) {
                console.log("Error fetching cart items:", error);
            } finally {
                return results;
            }
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
            console.log('all distinct store IDs: ', storeIds)
            return await Promise.all(
                storeIds.map(async (storeId) => {
                    const response = await storeService.getById(storeId);
                    return response.data;
                })
            );
        };

        const setStoreDetails = async (cartitems) => {
            const details = await getRelevantStoreDetails(cartitems);
            console.log('all disticnt stores: ', details)
            setStoreList(details);
            return details;
        }
        const fetchFarmerDetails = async (stores) => {
            return await Promise.all(
                stores.map(async (store) => {
                    const response = await accountService.getById(store.farmer);
                    return response.data;
                })
            );
        }

        const setFarmerDetails = async (stores) => {
            const details = await fetchFarmerDetails(stores);
            console.log('all distinct farmers: ', details)
            setFarmerList(details);
            return details;
        }

        const fetchAllDetails = async () => {
            setIsLoading(true)
            const cartItemList = await fetchCartItems();
            const storeDetailsList = await setStoreDetails(cartItemList);
            const farmerDetailsList = await setFarmerDetails(storeDetailsList);
            setIsLoading(false)
        }

        if (!loading) {
            fetchAllDetails();
        }
    }, [loading, user]);

    const handleConfirmPayment = () => {
        // Placeholder function for confirming payment
        // Implement your payment confirmation logic here
        toast.success('Payment confirmed!');
        navigate('/confirmation'); // Assuming '/confirmation' is the path for the confirmation page
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
            {StoreInformation({ storeList })}
            {/*<Box mt={3}>*/}
            {/*    <Typography variant="h6">Store Information</Typography>*/}
            {/*    {storeList.map((store, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <Typography variant="body1">Store's Name: {store.name}</Typography>*/}
            {/*            <Typography variant="body1">Farmer Phone Number: {farmerList[index].phone}</Typography>*/}
            {/*            <Typography variant="body1">Location: {`${store.latitude}, ${store.longitude}`}</Typography>*/}
            {/*            {index !== storeList.length - 1 && <Divider />} /!* Add a divider between items *!/*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*    {storeList.length === 0 && (*/}
            {/*        <>*/}
            {/*            <Typography variant="body1">Store's Name: Loading...</Typography>*/}
            {/*            <Typography variant="body1">Farmer Phone Number: Loading...</Typography>*/}
            {/*            <Typography variant="body1">Location: Loading...</Typography>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</Box>*/}




            {/* Input for pickup date and time */}
            <Box mt={3}>
                <TextField
                    id="pickup-datetime"
                    label="Pickup Date and Time"
                    type="datetime-local"
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
            </Box>

            {/* Input for payment method */}
            <Box mt={3}>
                <TextField
                    id="payment-method"
                    label="Payment Method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    fullWidth
                />
            </Box>

            {/* Button to confirm payment */}
            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setConfirmDialogOpen(true)}
                >
                    Confirm Payment
                </Button>
            </Box>

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
