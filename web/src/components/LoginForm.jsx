import React from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import loginService from '../services/accounts/login';

const LoginForm = ({ handleLogin, email, setEmail, password, setPassword }) => {
    const theme = useTheme();

    const loginHandler = () => true;

    return (
        <Box
            component="form"
            onSubmit={loginHandler}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
                gap: '20px',
                marginTop: '100px',
                backgroundColor: '#FFFFFF', // white background
            }}
        >
            <Typography variant="h4" component="h2">
                Log in to adaTanam
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <Button 
                variant="contained" 
                type="submit"
                sx={{
                    backgroundColor: theme.palette.primary.main, // primary color for button
                    color: '#FFFFFF', // white color for button text
                }}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;