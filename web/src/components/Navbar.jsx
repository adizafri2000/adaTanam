import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

// Your Navbar component
const Navbar = () => (
  <nav>
    <Button component={RouterLink} to="/" color="inherit">Home</Button>
    <Button component={RouterLink} to="/login" color="inherit">Login</Button>
    <Button component={RouterLink} to="/signup" color="inherit">Signup</Button>
  </nav>
);

export default Navbar;