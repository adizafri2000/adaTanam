import {useUserCheck} from '../hooks/useUserCheck';

const UpdatePasswordPage = () => {
  useUserCheck();
  
  return <h2>Update Password Page</h2>
}

export default UpdatePasswordPage;