import React, {useContext, useState} from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import auth from '../services/auth';
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const clearInput = () => {
        setEmail('')
        setPassword('')
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log('accessing API')
            const response = await auth.login({
                email,
                password,
            });
            console.log('response: ', response)
            const user = {
                email: email,
                name: response.data.accountName,
                type: response.data.accountType,
                id: response.data.accountId,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                image: response.data.accountImage
            }
            console.log('logged in user: ', user);
            await login(user.email, user.name, user.type, user.id, user.accessToken, user.refreshToken);
            toast.success('Logged in successfully!');  // Add this line
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message);
            clearInput()
        } finally {
            setLoading(false); // Set loading to false when the request is complete
        }
    }

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
                disabled={loading} // Disable the button when loading
                sx={{
                    backgroundColor: theme.palette.primary.main, // primary color for button
                    color: '#FFFFFF', // white color for button text
                    padding: '10px 20px', // Adjust padding to make the button design decent
                    borderRadius: '10px', // Adjust border radius for a softer look
                }}
            >
                {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
        </Box>
    );
};

export default LoginForm;