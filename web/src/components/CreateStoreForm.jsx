import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import storeService from "../services/store.jsx";
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

const CreateStoreForm = ({ userDetails }) => {
    const { user, loading, updateUserDetails } = useContext(UserContext);
    const [name, setName] = useState('');
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [bankName, setBankName] = useState(userDetails.bankName || ''); // Set initial value
    const [bankNumber, setBankNumber] = useState(userDetails.bankNumber || ''); // Set initial value
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme(); // Add this line

    const navigate = useNavigate()

    useEffect(() => {
        console.log('rendering CreateStoreForm, user details: ', userDetails)
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            longitude,
            latitude,
            bankName,
            bankNumber,
            farmer: user.id
        };

        console.log('about to create store with data: ', data)

        try {
            setIsLoading(true) // Set isLoading to true when the form is being submitted
            const response = await storeService.create(user.accessToken, data);
            console.log('response from creating new store: ', response)
            await updateUserDetails(user);
            toast.success('Store successfully created!');
            navigate('/store'); // Redirect to the store page
        } catch (error) {
            toast.error('Error creating store.');
            console.error('Error creating store:', error);
        } finally {
            setIsLoading(false); // Set isLoading back to false when the request is done
        }
    };

    const handleCancel = () => {
        navigate('/store'); // Navigate back to the store page
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '600px',  // maximum width of the form
                width: '100%',  // form takes up 100% of the parent container's width
                margin: '0 auto',
                gap: '20px',
                marginTop: '100px',
                padding: '20px',
                backgroundColor: '#FFFFFF',
            }}
        >
            <Typography variant="h4" component="h2" align='center'>
                Create New Store
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                required={true}
                onChange={({ target }) => setName(target.value)}
                fullWidth
            />
            <TextField
                label="Longitude"
                variant="outlined"
                type="number"
                value={longitude}
                required={true}
                onChange={({ target }) => setLongitude(target.value)}
                fullWidth
            />
            <TextField
                label="Latitude"
                variant="outlined"
                type="number"
                value={latitude}
                required={true}
                onChange={({ target }) => setLatitude(target.value)}
                fullWidth
            />
            <TextField
                label="Bank Name"
                variant="outlined"
                value={bankName}
                required={true}
                onChange={({ target }) => setBankName(target.value)}
                fullWidth
            />
            <TextField
                label="Bank Number"
                variant="outlined"
                value={bankNumber}
                required={true}
                onChange={({ target }) => setBankNumber(target.value)}
                fullWidth
            />
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    type="submit"*/}
            {/*    sx={{*/}
            {/*        marginTop: '20px',*/}
            {/*        backgroundColor: theme.palette.primary.main, // Use primary color from theme*/}
            {/*        color: '#FFFFFF',*/}
            {/*        padding: '10px 20px',*/}
            {/*        borderRadius: '10px',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Create*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    onClick={handleCancel} // Add this line*/}
            {/*    sx={{*/}
            {/*        marginTop: '20px',*/}
            {/*        backgroundColor: theme.palette.secondary.main, // Use secondary color from theme*/}
            {/*        color: '#FFFFFF',*/}
            {/*        padding: '10px 20px',*/}
            {/*        borderRadius: '10px',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Cancel*/}
            {/*</Button>*/}
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    {isLoading ? (
                        <CircularProgress /> // Render a loading indicator when isLoading is true
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                marginTop: '20px',
                                backgroundColor: theme.palette.primary.main, // Use primary color from theme
                                color: '#FFFFFF',
                                padding: '10px 20px',
                                borderRadius: '10px',
                            }}
                        >
                            Create
                        </Button>
                    )}
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleCancel} // Add this line
                        sx={{
                            marginTop: '20px',
                            backgroundColor: theme.palette.secondary.main, // Use secondary color from theme
                            color: '#FFFFFF',
                            padding: '10px 20px',
                            borderRadius: '10px',
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateStoreForm;