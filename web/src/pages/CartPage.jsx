import {useUserCheck} from '../hooks/useUserCheck';
import {useConsumerCheck} from "../hooks/useConsumerCheck.jsx";
import cartService from "../services/cart.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../contexts/UserContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";

const CartPage = () => {
  const { user, loading } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useConsumerCheck();

  useEffect(() => {
    console.log('cart page useeffect')
    const initialCartChecking = async () => {
      console.log('user lancau: ', user)
      if (!user.cart){
        console.log('no active cart found for user, creating new one')
        try{
          const data = {
            isActive: true,
            account: user.id
          }
          const response = await cartService.createCart(user.accessToken, data);
          console.log('created new active cart for user: ', response.data)
          updateUserDetails({ ...user, cart: response.data.id });
        } catch (error) {
          console.log('error creating new active cart: ', error)
        }
      } else{
        console.log('user seems to have cart already with id: ', user.cart)
      }
    }
    const fetchCartItems = async () => {
      await initialCartChecking()
      try{
        const response = await cartService.getCartItems(user.cart)
        console.log('response from cartservice.getCartItems: ', response)
        setCartItems(response.data)
      } catch(error){
        console.log('error fetching cart items: ', error)
      } finally {
        console.log('completed fetching cart items')
      }
    }
    setIsLoading(true)
    fetchCartItems()
    setIsLoading(false)
  }, [loading]);

  if (isLoading || loading)
    return <CircularProgress />

  return (
    <>
      <h2>Cart Page</h2>
      {cartItems.map((item) => (
        <div>
          <h3>produce id: {item.produce}</h3>
          <p>quantity: {item.quantity}</p>
        </div>
      ))}
    </>
  )
}

export default CartPage;