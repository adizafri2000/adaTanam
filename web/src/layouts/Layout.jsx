import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { Box } from '@mui/material';

const Layout = () => {

    const first = () => {
        return(
            <>
                <Navbar />
                <Box
                    sx={{
                        margin: '50px',
                    }}
                >
                    <Outlet />
                </Box>
            </>
        )
    }

    const second = () => {
        return (
            <>
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </>
        )
    }

    return (
        <div>
            {first()}
        </div>
    );
};

export default Layout;