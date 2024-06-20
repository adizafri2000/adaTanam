import { useState } from "react";
import { TextField, Button, Box, Typography, useTheme, MenuItem } from '@mui/material';

const CreateProduceForm = ({ store }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [stock, setStock] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [sellingUnit, setSellingUnit] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const theme = useTheme();

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
            image,
            store
        };

        console.log('Produce data:', data);
        // TODO: Call the API to create the produce
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
            />
            <TextField
                label="Type"
                variant="outlined"
                value={type}
                required={true}
                onChange={({ target }) => setType(target.value)}
            />
            <TextField
                label="Stock"
                variant="outlined"
                type="number"
                value={stock}
                required={true}
                onChange={({ target }) => setStock(target.value)}
            />
            <TextField
                label="Unit Price"
                variant="outlined"
                type="number"
                value={unitPrice}
                required={true}
                onChange={({ target }) => setUnitPrice(target.value)}
            />
            <TextField
                label="Selling Unit"
                variant="outlined"
                value={sellingUnit}
                required={true}
                onChange={({ target }) => setSellingUnit(target.value)}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                required={true}
                onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
                label="Status"
                variant="outlined"
                value={status}
                required={true}
                onChange={({ target }) => setStatus(target.value)}
            />
            <TextField
                label="Image URL"
                variant="outlined"
                value={image}
                required={true}
                onChange={({ target }) => setImage(target.value)}
            />
            <Button
                variant="contained"
                type="submit"
                sx={{
                    backgroundColor: theme.palette.primary.main,
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