import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import storeService from "../services/store.jsx";
import produceService from "../services/produce.jsx";

const CreateProduceForm = () => {
    const { user, loading: userContextLoading } = useContext(UserContext);
    const [store, setStore] = useState();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [stock, setStock] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [sellingUnit, setSellingUnit] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStoreFromContext = async () => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                if (user.store) {
                    setStore(user.store);
                } else {
                    console.log('User does not have a store')
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error fetching store or produce:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (!userContextLoading) {
            fetchStoreFromContext();
        }
    }, [userContextLoading, user, navigate])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setFileError('Invalid file type. Please select an image file.');
            } else if (file.size > 10 * 1024 * 1024) { // file size limit 10MB
                setFileError('File size should not exceed 10MB');
            } else {
                setFileError('');
                setImageFile(file);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name,
            type,
            stock,
            unitPrice,
            sellingUnit,
            description,
            status,
            image: imageFile,
            store
        };

        console.log('Produce data:', data);
        // TODO: Call the API to create the produce
    };

    if (userContextLoading || isLoading) {
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
                Create New Produce
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                required={true}
                onChange={({ target }) => setName(target.value)}
                fullWidth
            />
            <FormControl fullWidth variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                    label="Type"
                    value={type}
                    required={true}
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value="Vegetables">Vegetables</MenuItem>
                    <MenuItem value="Fruits">Fruits</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Stock"
                variant="outlined"
                type="number"
                value={stock}
                required={true}
                onChange={({ target }) => setStock(target.value)}
                fullWidth
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        label="Unit Price (RM)"
                        variant="outlined"
                        type="number"
                        value={unitPrice}
                        required={true}
                        onChange={({ target }) => setUnitPrice(target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Selling Unit</InputLabel>
                        <Select
                            label="Selling Unit"
                            value={sellingUnit}
                            required={true}
                            onChange={({ target }) => setSellingUnit(target.value)}
                        >
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="piece">piece</MenuItem>
                            <MenuItem value="bag">bag</MenuItem>
                            <MenuItem value="box">box</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                required={true}
                onChange={({ target }) => setDescription(target.value)}
                fullWidth
            />
            <TextField
                label="Status"
                variant="outlined"
                value={status}
                required={true}
                onChange={({ target }) => setStatus(target.value)}
                fullWidth
            />
            <label htmlFor="image-upload">Upload Produce Image:</label>
            <TextField
                id="image-upload"
                type="file"
                variant="outlined"
                accept="image/*"
                onChange={handleFileChange}
                fullWidth
            />
            {fileError && <p>{fileError}</p>}
            <Button
                variant="contained"
                type="submit"
                sx={{
                    marginTop: '20px',
                    backgroundColor: '#3f51b5',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '10px',
                }}
            >
                Create
            </Button>
        </Box>
    );
};

export default CreateProduceForm;