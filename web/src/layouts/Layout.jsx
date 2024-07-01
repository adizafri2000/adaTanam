import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { Box } from '@mui/material';
import Footer from "./Footer.jsx";

const Layout = () => {

    return (
        <div>
            <Navbar />
            <Box sx={{ margin: '50px ', minHeight: 'calc(100vh - 150px)'}}>
                <Outlet />
            </Box>
            <Footer />
        </div>
    );
};

export default Layout;