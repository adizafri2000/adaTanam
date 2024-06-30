import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import logo from '../assets/logonobg.png';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f0f0f0',
                textAlign: 'center',
                padding: '20px',
                marginTop: '50px', // Adjust as needed
                width: '100%', // Full width
                // position: 'absolute', // Fixed position at the bottom of the viewport
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Typography variant="body2" color="textSecondary" gutterBottom>
                TPT3101 Final Year Project
            </Typography>
            <Typography variant="body2" color="textSecondary">
                E-Market for Small Scale Farmers (2609)
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                Best viewed on wide screens (1920px resolution or larger)
            </Typography>
        </Box>
    );
};

export default Footer;
