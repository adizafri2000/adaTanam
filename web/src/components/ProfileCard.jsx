import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import UserContext from '../contexts/UserContext.jsx';
import accountService from '../services/account.jsx';

const ImageContainer = styled('div')({
    width: 150,
    height: 150,
    border: '1px solid gray',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
});

const ProfileCard = ({ user }) => {
    const { user: currentUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [bankNumber, setBankNumber] = useState(user.bankNumber);
    const [bankName, setBankName] = useState(user.bankName);
    const [type, setType] = useState(user.type);
    const [isActive, setIsActive] = useState(user.isActive);
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
        }
    };

    const handleUpdate = async () => {
        try {
            await accountService.update(currentUser.id, { name, email, phone, bankNumber, bankName, type, isActive }, currentUser.accessToken, imageFile);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update user details:', error);
        }
    };

    const FirstRow = () => (
        <Grid item xs={12} sx={{ border: '2px solid green', width: '100%' }}>
            <Box display="flex" alignItems="center" sx={{ height: '100%', width: '100%' }}>
                <ImageContainer>
                    {user.image ? (
                        <img src={user.image} alt="User" style={{ width: '100%', height: 'auto' }} />
                    ) : (
                        <Typography variant="body1">No Image</Typography>
                    )}
                </ImageContainer>
                {isEditing ? (
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <Typography variant="h5" component="div" sx={{ fontStyle: user.name ? 'normal' : 'italic', color: user.name ? 'inherit' : 'gray' }}>
                        {user.name || 'Incomplete'}
                    </Typography>
                )}
            </Box>
        </Grid>
    );

    const SecondRow = () => (
            <Grid item xs={12} sx={{ border: '2px solid blue', width: '100%', paddingBottom: '20px' }}>
            {isEditing ? (
                <>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        label="Bank Number"
                        variant="outlined"
                        value={bankNumber}
                        onChange={(e) => setBankNumber(e.target.value)}
                    />
                    <TextField
                        label="Bank Name"
                        variant="outlined"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                    />
                    <TextField
                        label="Type"
                        variant="outlined"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <TextField
                        label="Is Active"
                        variant="outlined"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </>
            ) : (
                <>
                    <Typography variant="body2" color="text.secondary">
                        Email: {user.email || 'Incomplete'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Phone: {user.phone || 'Incomplete'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bank Number: {user.bankNumber || 'Incomplete'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bank Name: {user.bankName || 'Incomplete'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Type: {user.type || 'Incomplete'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Is Active: {user.isActive !== null ? user.isActive.toString() : 'Incomplete'}
                    </Typography>
                </>
            )}
        </Grid>
    );

    const ThirdRow = () => (
        <Grid item xs={12} sx={{ border: '2px solid red', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: '20px' }}>
            {isEditing ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        sx={{ marginTop: '20px' }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsEditing(false)}
                        sx={{ marginTop: '20px', marginLeft: '10px' }}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                    sx={{ marginTop: '20px' }}
                >
                    Edit
                </Button>
            )}
        </Grid>
    );

    return (
        <Card sx={{ maxWidth: '90%', margin: '0 auto', boxShadow: 'none', border: '1px solid #ddd' }}>
            <CardContent>
                <Grid container spacing={2} direction="column" sx={{ width: '100%' }}>
                    <FirstRow />
                    <SecondRow />
                    <ThirdRow />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
