import {useUserCheck} from '../hooks/useUserCheck';

const OrderHistoryPage = () => {
  useUserCheck();
  
  return <h2>Order History Page</h2>
}

export default OrderHistoryPage;