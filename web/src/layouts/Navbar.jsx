import {NavLink, useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logonobg.png';
import {InputBase, Menu, MenuItem, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import {useState, useContext} from "react";
import UserContext from "../contexts/UserContext.jsx";

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/")
  };

  return (
      <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
        <Toolbar>
          <NavLink to="/" end>
            <img src={logo} alt="logo" style={{marginRight: 'auto', width: '100px', height: '100px'}}/>
          </NavLink>
          <div style={{flexGrow: 1}}>
            <div style={{position: 'relative', borderRadius: '4px', backgroundColor: '#fff', marginRight: '10px'}}>
              <div style={{
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100px'
              }}>
                <SearchIcon/>
              </div>
              <InputBase
                  placeholder="Search…"
                  inputProps={{'aria-label': 'search'}}
                  style={{paddingLeft: '100px'}}
              />
            </div>
          </div>
          <NavLink to="/" style={{color: 'white', textDecoration: 'none'}}>
            Home
          </NavLink>
          <div onClick={handleMenuOpen} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ marginRight: '10px' }} />
            {user && <Typography variant="body1" style={{ color: 'white' }}>{user.name}</Typography>}
          </div>
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
          >
            {user ? [
              <NavLink to="/profile" style={{color: 'black', textDecoration: 'none'}} key="profile">
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              </NavLink>,
              <MenuItem onClick={handleLogout} key="logout">Logout</MenuItem>
            ] : [
              <NavLink to="/login" style={{color: 'black', textDecoration: 'none'}} key="login">
                <MenuItem onClick={handleMenuClose}>Login</MenuItem>
              </NavLink>,
              <NavLink to="/signup" style={{color: 'black', textDecoration: 'none'}} key="signup">
                <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
              </NavLink>
            ]}
          </Menu>
        </Toolbar>
      </AppBar>
  )};

export default Navbar;