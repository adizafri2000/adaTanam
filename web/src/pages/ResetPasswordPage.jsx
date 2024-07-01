import React, {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/auth';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidOpen, setIsValidOpen] = useState(true)
    const [formErrors, setFormErrors] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if(!token) {
            toast.error('Invalid confirmation link.');
            setIsValidOpen(false)
            return;
        }
    }, []);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validateForm(event.target.name, event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        validateForm('confirmPassword', event.target.value);
    };

    const validateForm = (fieldName, value) => {
        const errors = { ...formErrors };

        switch (fieldName) {
            case 'password':
                if (!value) {
                    errors.password = 'Password is required';
                } else {
                    delete errors.password;
                }
                break;
            case 'confirmPassword':
                if (!value) {
                    errors.confirmPassword = 'Confirm Password is required';
                } else if (value !== password) {
                    errors.confirmPassword = 'Passwords do not match';
                } else {
                    delete errors.confirmPassword;
                }
                break;
            default:
                break;
        }

        setFormErrors(errors);
        setFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formValid) return;

        try {
            setIsLoading(true);
            console.log('token: ', token)
            await authService.resetPassword(token, {newPassword: password});
            toast.success('Password reset successfully');
            navigate('/login'); // Redirect to login page after successful password reset
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return !isValidOpen ? <p>Invalid URL</p> :  (
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '100px', padding: '20px' }}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!formValid || isLoading}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ResetPasswordPage;
