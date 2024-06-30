import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ConfirmationPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showResendForm, setShowResendForm] = useState(false);
    const [email, setEmail] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

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
                toast.error('Failed to confirm account.');
                setSuccess(false);
            } finally {
                setIsLoading(false);
            }
        }
        confirmAccount(token);
    }, [token, navigate]);

    const handleResendEmail = () => {
        setShowResendForm(true);
    };

    const handleSendConfirmationEmail = async () => {
        try {
            setIsLoading(true);
            // Call your service to send the confirmation email
            await authService.sendConfirmationEmail(email);
            toast.success('Confirmation email sent!');
            setShowResendForm(false);
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            toast.error('Failed to send confirmation email.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setShowResendForm(false);
    };

    if (isLoading) return <CircularProgress />;

    if (!success) return (
        <>
            <h2>Confirmation failed</h2>
            <p>Failed to confirm account. Please try again.</p>
            {!showResendForm ? (
                <Button variant="contained" color="primary" onClick={handleResendEmail}>
                    Resend Confirmation Email
                </Button>
            ) : (
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSendConfirmationEmail}>
                        Send Confirmation Email
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            )}
        </>
    );

    return null;
};

export default ConfirmationPage;
