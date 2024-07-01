import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate for React Router v6
import { toast } from 'react-toastify';
import CircularProgress from "@mui/material/CircularProgress";
import UserContext from "../contexts/UserContext";
import auth from '../services/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const clearInput = () => {
        setEmail('');
        setPassword('');
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await auth.login({
                email,
                password,
            });
            const user = {
                email: email,
                name: response.data.accountName,
                type: response.data.accountType,
                id: response.data.accountId,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                image: response.data.accountImage
            };
            await login(user.email, user.name, user.type, user.id, user.accessToken, user.refreshToken, user.image);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            clearInput();
        } finally {
            setLoading(false);
        }
    };

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
                backgroundColor: '#FFFFFF',
            }}
        >
            <Typography variant="h4" component="h2" align='center'>
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
                disabled={loading}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '10px',
                }}
            >
                {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Button
                component={RouterLink}
                to="/change-password"
                variant="text"
                sx={{
                    textDecoration: 'underline',
                    alignSelf: 'center', // Align text to the middle vertically
                    color: theme.palette.primary.main,
                }}
            >
                Forgot Password?
            </Button>

        </Box>
    );
};

export default LoginForm;
