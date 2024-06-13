import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../assets/logonobg.png';

const NavbarNew = () => (
  <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
    <Toolbar>
      <NavLink to="/" end>
        <img src={logo} alt="logo" style={{ marginRight: 'auto', width: '100px', height: '100px' }} />
      </NavLink>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
        My App
      </Typography>
      <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
        Home
      </NavLink>
      <NavLink to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
        Login
      </NavLink>
      <NavLink to="/signup" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
        Signup
      </NavLink>
      <NavLink to="/churo" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
        Not Found
      </NavLink>
    </Toolbar>
  </AppBar>
);

export default NavbarNew;
