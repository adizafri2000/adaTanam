import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';

const ConfirmationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showResendForm, setShowResendForm] = useState(false);
    const [email, setEmail] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const confirmAccount = async (token) => {
            try {
                setIsLoading(true);
                await authService.confirmAccount(token);
                toast.success('Account confirmed! You can now log in.');
                setSuccess(true);
                navigate('/login');
            } catch (error) {
                console.error('Failed to confirm account:', error);
                toast.error('Failed to confirm account: ', error);
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        };
        confirmAccount(token);
    }, [token, navigate]);

    const handleResendEmail = () => {
        setShowResendForm(true);
    };

    const handleSendConfirmationEmail = async () => {
        try {
            setIsLoading(true);
            const data = { email };
            await authService.resendConfirmationEmail(data);
            toast.success('Confirmation email sent, please check your email.');
            setShowResendForm(false);
            navigate('/login');
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            toast.error('Failed to send confirmation email.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setShowResendForm(false);
        setEmail('');
    };

    if (isLoading) return <CircularProgress />;

    if (!success) return (
        <Box
            component="form"
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
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" component="h2" align='center'>
                Confirmation Failed
            </Typography>
            <Typography variant="body1" align='center'>
                Failed to confirm account. Please try again.
            </Typography>
            {!showResendForm ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResendEmail}
                    sx={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                    }}
                >
                    Resend Confirmation Email
                </Button>
            ) : (
                <>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendConfirmationEmail}
                        fullWidth
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Send Confirmation Email'}
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        fullWidth
                        sx={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                        }}
                    >
                        Cancel
                    </Button>
                </>
            )}
        </Box>
    );

    return null;
};

export default ConfirmationPage;
