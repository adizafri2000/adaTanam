import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { Box } from '@mui/material';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    margin: '50px',
                }}
            >
                <Outlet />
            </Box>
        </div>
    );
};

export default Layout;