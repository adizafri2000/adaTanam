import React, {useContext, useEffect, useState} from 'react';
import orderService from '../services/order';
import {useConsumerCheck} from "../hooks/useConsumerCheck.jsx";
import UserContext from "../contexts/UserContext.jsx";

const OrderHistoryPage = () => {
  const {user, loading} = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useConsumerCheck();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getByAccount(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error('OrderHistoryPage fetchOrders error: ', error);
      }
    };
    if (!loading) {
      fetchOrders();
    }
  }, [user, loading]);
  
  return <h2>Order History Page</h2>
}

export default OrderHistoryPage;