import React, { useContext, useEffect, useState } from 'react';
import orderService from '../services/order';
import { useConsumerCheck } from "../hooks/useConsumerCheck.jsx";
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import {Container, Typography, Card, CardContent, Grid, Divider} from '@mui/material';

const OrderHistoryPage = () => {
  const { user, loading } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useConsumerCheck();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await orderService.getByAccount(user.id);
        console.log('OrderHistoryPage fetchOrders response: ', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('OrderHistoryPage fetchOrders error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!loading) {
      fetchOrders();
    }
  }, [user, loading]);

  if (isLoading) {
    return <CircularProgress />
  }

  return (
      <>
        <h2>
          Order History Page
        </h2>
        {orders.length === 0 ? (
            <Typography variant="h6" align="center" gutterBottom>
              You have not made any orders
            </Typography>
        ) : (
            orders.map((orderDetail) => (
                <Card key={orderDetail.order.id} sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">
                      Order ID: {orderDetail.order.id}
                    </Typography>
                    <Typography variant="body1">
                      Order Timestamp: {new Date(orderDetail.order.orderTimestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Pickup Date: {new Date(orderDetail.order.pickup).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Status: {orderDetail.order.status}
                    </Typography>
                    <Divider sx={{margin: '5px'}}/>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      Payment Details
                    </Typography>
                    <Typography variant="body1">
                      Total Price: RM{orderDetail.payment.totalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      Payment Method: {orderDetail.payment.method==='online' ?  'Online Transfer' : 'Cash'}
                    </Typography>
                    <Divider sx={{margin: '5px'}}/>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      Order Items
                    </Typography>
                    {orderDetail.orderItems.map((item, index) => (
                        <Grid container spacing={2} key={index}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Produce Name: {item.produceName}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="body1">
                              Unit Price: RM{item.produceUnitPrice.toFixed(2)} per {item.produceSellingUnit}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography variant="body1">
                              Quantity: {item.cartItemQuantity}
                            </Typography>
                          </Grid>
                        </Grid>
                    ))}
                  </CardContent>
                </Card>
            ))
        )}
      </>
  );
};

export default OrderHistoryPage;
