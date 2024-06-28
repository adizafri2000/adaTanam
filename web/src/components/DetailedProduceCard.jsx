import React, { useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, TextField, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DetailedProduceCard = ({ produce }) => {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');

    const handleIncrement = () => {
        if (quantity < produce.stock) {
            setQuantity(prevQuantity => validateQuantity(prevQuantity + 1));
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => validateQuantity(prevQuantity - 1));
        }
    };

    const handleChange = (e) => {
        const value = parseFloat(e.target.value);
        setQuantity(validateQuantity(value));
    };

    const validateQuantity = (value) => {
        if (isNaN(value) || value < 1) {
            setError('Quantity must be at least 1');
            return quantity;
        } else if (value > produce.stock) {
            setError(`Quantity cannot exceed ${produce.stock}`);
            return quantity;
        } else {
            setError('');
            return value;
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${produce.name} to cart.`);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={produce.image ? produce.image : 'https://via.placeholder.com/300'}
                alt={produce.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {produce.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {produce.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Stock: {produce.stock} {produce.sellingUnit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Unit Price: RM{parseFloat(produce.unitPrice).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Status: {produce.status}
                </Typography>
                {produce.description && (
                    <Typography variant="body2" color="text.secondary">
                        Description: {produce.description}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    Created At: {new Date(produce.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Updated At: {new Date(produce.updatedAt).toLocaleString()}
                </Typography>
                <Grid container spacing={1} alignItems="center" style={{ marginTop: '10px' }}>
                    <Grid item>
                        <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={handleChange}
                            error={!!error}
                            helperText={error}
                            inputProps={{ min: 1, max: produce.stock, style: { textAlign: 'center' } }}
                            style={{ width: '60px' }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{produce.sellingUnit}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleIncrement} disabled={quantity >= produce.stock}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    style={{ marginTop: '10px' }}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default DetailedProduceCard;
