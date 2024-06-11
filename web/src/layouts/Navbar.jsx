import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logonobg.png';

// Your Navbar component
const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <RouterLink to="/">
        <img src={logo} alt="logo" style={{ marginRight: 'auto', width: '100px', height: '100px' }} />
      </RouterLink>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        My App
      </Typography>
      <Button color="inherit" component={RouterLink} to="/">Home</Button>
      <Button color="inherit" component={RouterLink} to="/login">Login</Button>
      <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;