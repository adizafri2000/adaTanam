import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logonobg.png';
import {InputBase, Menu, MenuItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Avatar from "@mui/material/Avatar";
import {useState} from "react";

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
        <Toolbar>
          <NavLink to="/" end>
            <img src={logo} alt="logo" style={{marginRight: 'auto', width: '100px', height: '100px'}}/>
          </NavLink>
          {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>*/}
          {/*  My App*/}
          {/*</Typography>*/}
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
          <NavLink to="/login" style={{color: 'white', textDecoration: 'none', marginLeft: '10px'}}>
            Login
          </NavLink>
          <NavLink to="/signup" style={{color: 'white', textDecoration: 'none', marginLeft: '10px'}}>
            Signup
          </NavLink>
          <NavLink to="/churo" style={{color: 'white', textDecoration: 'none', marginLeft: '10px'}}>
            Not Found
          </NavLink>
          <Avatar onClick={handleMenuOpen} style={{ cursor: 'pointer', marginLeft: '10px' }} />
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
)};

export default Navbar;
