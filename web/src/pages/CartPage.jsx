import {useUserCheck} from '../hooks/useUserCheck';

const CartPage = () => {
  useUserCheck();
  
  return <h2>Cart Page</h2>
}

export default CartPage;