import React, {useContext, useState} from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import auth from '../services/auth';
// import loginService from '../services/accounts/login'
import UserContext from "../contexts/UserContext.jsx";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            console.log('accessing API')
            const response = await auth.login({
                email,
                password,
            });
            console.log('response: ', response)
            if (response.status !== 200) {
                throw new Error(response);
            }
            const user = {
                email,
                name: response.data.accountName,
                id: response.data.accountId,
                token: response.data.token
            }
            console.log('logged in user: ', user);
            login(user.email, user.name, user.id, user.token)
            navigate('/')
        } catch (error) {
            console.log(error)
            alert(error);
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
                sx={{
                    backgroundColor: theme.palette.primary.main, // primary color for button
                    color: '#FFFFFF', // white color for button text
                    padding: '10px 20px', // Adjust padding to make the button design decent
                    borderRadius: '10px', // Adjust border radius for a softer look
                }}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;