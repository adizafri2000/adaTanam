import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import authService from '../services/auth';
import {toast} from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        const data = {email};
        try{
            const response = await authService.forgotPassword(data)
            console.log('response: ', response)
            if (response.status===200) {
                toast.info('An email has been sent to your email address with instructions to reset your password')
            }
        } catch (error){
            console.log('error sending forgot password request: ', error)
            toast.error('Error sending forgot password request')
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                margin: '0 auto',
                gap: '20px',
                marginTop: '100px',
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: `0 0 10px ${theme.palette.grey[200]}`, // Example box shadow
            }}
        >
            <Typography variant="h4" component="h2" align='center'>
                Password Change Request
            </Typography>
            <Typography variant="body1" align='center'>
                Please enter your registered email address
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <Button
                variant="contained"
                type="submit"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    alignSelf: 'center',
                }}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
        </Box>
    );
};

export default ForgotPasswordPage;
