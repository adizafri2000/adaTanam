import {useState} from "react";
import auth from "../services/auth";
import CircularIndeterminate from "./CircularIndeterminate";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, useTheme, MenuItem } from '@mui/material';

const SignUpForm = ({style}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const theme = useTheme();

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setName('')
        setType('')
    }

    const handleSignUp = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        const data = {
            email,
            password,
            name,
            type,
            isActive: true
        }

        try {
            console.log('Signup data:', data)
            const response = await auth.signup(data);

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.data.message);
            }
            setIsLoading(false)
            window.alert('Signup successful! Navigating to login')
            clearForm()
            navigate("/login")
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            window.alert(error || 'Signup failed. Please try again.')
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSignUp}
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
                Sign up for new account
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                required={true}
                onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={password}
                required={true}
                onChange={({ target }) => setPassword(target.value)}
            />
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                type="text"
                value={name}
                required={true}
                onChange={({ target }) => setName(target.value)}
            />
            <TextField
                label="Type"
                variant="outlined"
                name="type"
                select
                value={type}
                required={true}
                onChange={({ target }) => setType(target.value)}
            >
                <MenuItem value='Consumer'>Consumer</MenuItem>
                <MenuItem value='Farmer'>Farmer</MenuItem>
                <MenuItem value='Admin'>Admin</MenuItem>
            </TextField>
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
                Sign Up
            </Button>
            {isLoading && <CircularIndeterminate/>}
        </Box>
    )
}

export default SignUpForm