import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logonobg.png';
import { InputBase, Menu, MenuItem, Typography, Badge, Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext.jsx";
import { styled, useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import cartService from "../services/cart.jsx";

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
  { name: 'Orders', route: '/orders', for: 'Consumer' },
  { name: 'Store Orders', route: '/store/orders', for: 'Farmer' },
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
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (user && user.type === 'Consumer' && user.cart) {
        try {
          const response = await cartService.getCartItems(user.cart);
          setCartItemCount(response.data.length); // Assuming response.data is an array
        } catch (error) {
          console.log('Error fetching cart items:', error);
        }
      }
    };
    fetchCartItemCount();
  }, [user]);

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

  const formatCartItemCount = () => {
    if (cartItemCount > 9) {
      return '9+';
    } else {
      return cartItemCount;
    }
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
              if (!user && link.for !== 'Farmer') {
                return (
                    <NavLink key={index} to={link.route} style={{ color: 'white', textDecoration: 'none', marginRight: theme.spacing(2) }}>
                      {link.name}
                    </NavLink>
                );
              } else if (user && user.type === 'Consumer' && link.for !== 'Farmer') {
                return (
                    <NavLink key={index} to={link.route} style={{ color: 'white', textDecoration: 'none', marginRight: theme.spacing(2) }}>
                      {link.name}
                    </NavLink>
                );
              } else if (user && user.type === 'Farmer' && link.for !== 'Consumer') {
                return (
                    <NavLink key={index} to={link.route} style={{ color: 'white', textDecoration: 'none', marginRight: theme.spacing(2) }}>
                      {link.name}
                    </NavLink>
                );
              }
              return null;
            })}
            {(!user || user.type !== 'Farmer') && (
                <Badge
                    badgeContent={formatCartItemCount()}
                    color="secondary"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    sx={{ marginRight: theme.spacing(1), marginTop: theme.spacing(0.5) }}
                >
                  <ShoppingCartIcon onClick={handleCartClick} style={{ cursor: 'pointer', color: 'white' }} />
                </Badge>
            )}
            <div onClick={handleMenuOpen} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: theme.spacing(1) }}>
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
