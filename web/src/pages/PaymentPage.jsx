import {useUserCheck} from '../hooks/useUserCheck';

const PaymentPage = () => {
  useUserCheck();
  
  return <h2>Payment Page</h2>
}

export default PaymentPage;