import {useUserCheck} from '../hooks/useUserCheck';
import {useConsumerCheck} from "../hooks/useConsumerCheck.jsx";

const CartPage = () => {
  useConsumerCheck();
  
  return <h2>Cart Page</h2>
}

export default CartPage;