import React from 'react';
import Navbar from './Navbar.jsx';
import { Outlet } from 'react-router-dom';
import NavbarNew from './NavbarNew.jsx';

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <NavbarNew />
      <Outlet />
    </div>
  );
};

export default Layout;