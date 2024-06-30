import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import cartService from "../services/cart.jsx";
import { useConsumerCheck } from "../hooks/useConsumerCheck.jsx";

const CartPage = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    fetchCartItems();
  }, [user]);

  if (isLoading) return <CircularProgress />;

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
                      <TableCell>Produce Name</TableCell>
                      <TableCell align="right">Unit Price (RM)</TableCell>
                      <TableCell align="right">Selling Unit</TableCell>
                      <TableCell align="right">Store ID</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                        <TableRow key={item.produceName}>
                          <TableCell component="th" scope="row">
                            {item.produceName}
                          </TableCell>
                          <TableCell align="right">{item.produceUnitPrice}</TableCell>
                          <TableCell align="right">{item.produceSellingUnit}</TableCell>
                          <TableCell align="right">{item.produceStore}</TableCell>
                          <TableCell align="right">{item.cartItemQuantity}</TableCell>
                        </TableRow>
                    ))}
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
      </>
  );
};

export default CartPage;
