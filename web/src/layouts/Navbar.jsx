import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logonobg.png';
import { InputBase, Menu, MenuItem, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext.jsx";
import { styled, useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  flexGrow: 1,
  maxWidth: '400px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const navLinks = [
  { name: 'Store', route: '/store', for: 'Farmer' },
  { name: 'Produce List', route: '/produce' },
  { name: 'Orders', route: '/orders' },
  // { name: 'Cart', route: '/cart', for: 'Consumer' },
];

const dropdownLinks = [
  { name: 'Profile', route: '/profile' },
  { name: 'Logout', route: '/logout' },
];

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent the default action
    logout();
    handleMenuClose();
    toast.success('Logged out successfully');
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <NavLink to="/" end>
          <img src={logo} alt="logo" style={{ marginRight: theme.spacing(2), width: '100px', height: '100px' }} />
        </NavLink>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </Search>
        <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
          {navLinks.map((link, index) => {
            if (!user || user.type !== link.for) {
              return (
                <NavLink key={index} to={link.route} style={{ color: 'white', textDecoration: 'none', marginRight: theme.spacing(2) }}>
                  {link.name}
                </NavLink>
              );
            }
            return null;
          })}
          {(!user || user.type !== 'Farmer') && (
            <ShoppingCartIcon onClick={handleCartClick} style={{ cursor: 'pointer', marginRight: theme.spacing(1), color: 'white' }} />
          )}
          <div onClick={handleMenuOpen} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar src={user?.image || undefined} style={{ marginRight: theme.spacing(1) }} />
            {user && <Typography variant="body1" style={{ color: 'white' }}>{user.name}</Typography>}
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {user ? dropdownLinks.map((link, index) => (
            <NavLink to={link.route} style={{ color: 'black', textDecoration: 'none' }} key={index}>
              <MenuItem onClick={link.route === '/logout' ? handleLogout : handleMenuClose}>
                {link.name}
              </MenuItem>
            </NavLink>
          )) : [
            <NavLink to="/login" style={{ color: 'black', textDecoration: 'none' }} key="login">
              <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            </NavLink>,
            <NavLink to="/signup" style={{ color: 'black', textDecoration: 'none' }} key="signup">
              <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
            </NavLink>
          ]}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
