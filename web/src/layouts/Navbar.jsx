import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/logonobg.png';
import ButtonGroup from '@mui/material/ButtonGroup';

// Your Navbar component
const Navbar = () => (
  <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
    <Toolbar>
      <RouterLink to="/">
        <img src={logo} alt="logo" style={{ marginRight: 'auto', width: '100px', height: '100px' }} />
      </RouterLink>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: 'white' }}>
        My App
      </Typography>
      <ButtonGroup variant="text" color="inherit" style={{ color: 'white' }}>
        <Button component={RouterLink} to="/">Home</Button>
        <Button component={RouterLink} to="/login">Login</Button>
        <Button component={RouterLink} to="/signup">Signup</Button>
      </ButtonGroup>
    </Toolbar>
  </AppBar>
);

export default Navbar;