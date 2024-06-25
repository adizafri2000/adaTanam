import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import accountService from '../services/account.jsx';
import GridItem from '../layouts/GridItem';
import CircularProgress from "@mui/material/CircularProgress";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

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

const ProfileMainCard = ({ user, userFromContext }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [bankNumber, setBankNumber] = useState(currentUser.bankNumber);
    const [bankName, setBankName] = useState(currentUser.bankName);
    const [type, setType] = useState(currentUser.type);
    const [isActive, setIsActive] = useState(currentUser.isActive);
    const [imageFile, setImageFile] = useState(currentUser.image);
    const [formErrors, setFormErrors] = useState({});
    const [fileError, setFileError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            if (file.size > 10 * 1024 * 1024) {
                setImageFile(null);
                setFormErrors((errors) => ({ ...errors, imageFile: 'File size should not exceed 10MB.' }));
                setFileError('File size should not exceed 10MB.');
            } else {
                setImageFile(file);
                setFormErrors((errors) => ({ ...errors, imageFile: null }));
                setFileError('');
            }
        } else {
            setImageFile(null);
            setFormErrors((errors) => ({ ...errors, imageFile: 'Invalid file type. Please select an image file.' }));
            setFileError('Invalid file type. Please select an image file.');
        }
    };

    const handleCancelSubmit = () => {
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
        setBankNumber(currentUser.bankNumber);
        setBankName(currentUser.bankName);
        setType(currentUser.type);
        setIsActive(currentUser.isActive);
        setImageFile(currentUser.image);
        setIsEditing(false);  // Add this line to exit edit mode on cancel
    };

    useEffect(() => {
        console.log('running useEffect to check form validity')
        if (name && email && phone && bankNumber && bankName && type && isActive !== null && (imageFile || currentUser.image) && !fileError) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [name, email, phone, bankNumber, bankName, type, isActive, imageFile, currentUser.image, fileError]);

    useEffect(() => {
        console.log('running useEffect for initial image check')
        if (currentUser.image) {
            setFileError('');
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = {
            name,
            email,
            phone,
            bankNumber,
            bankName,
            type,
            isActive,
            image: imageFile ? '' : currentUser.image,
        };

        try {
            console.log('calling API to update account')
            console.log('data: ', data)
            console.log('image: ', imageFile)
            const response = await accountService.update(currentUser.id, data, userFromContext.accessToken, imageFile);
            const updatedUser = response.data
            setCurrentUser(updatedUser)
            setEmail(updatedUser.email)
            setName(updatedUser.name)
            setBankName(updatedUser.bankName)
            setPhone(updatedUser.phone)
            setBankNumber(updatedUser.bankNumber)
            setImageFile(updatedUser.image)
            console.log('user updated to: ', updatedUser)
            setIsEditing(false);
            toast.success('Account successfully updated')
            navigate('/profile')
        } catch (error) {
            console.error('Failed to update user details:', error);
            toast.error('Account update failed')
        } finally {
            setIsLoading(false);
        }
    };

    const FirstRow = () => (
        <Grid container spacing={2} direction="row" wrap="wrap" sx={{ padding: '10px', width: '100%' }}>
            <GridItem item xs={12} sm={6} md={4}>
                <ImageContainer>
                    {currentUser.image ? (
                        <img src={(currentUser.image)} alt="User" style={{ width: '100%', height: 'auto' }} />
                    ) : (
                        <Typography variant="body1">No Image</Typography>
                    )}
                </ImageContainer>
            </GridItem>
            <GridItem item xs={12} sm={6} md={8}>
                {isEditing ? (
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        required={true}
                        onChange={({ target }) => setName(target.value)}
                    />
                ) : (
                    <Typography variant="h5" component="div" sx={{ fontStyle: user.name ? 'normal' : 'italic', color: user.name ? 'inherit' : 'gray' }}>
                        {currentUser.name || 'Incomplete'}
                    </Typography>
                )}
            </GridItem>
        </Grid>
    );

    const SecondRow = () => (
        <Grid container spacing={2} direction="row" wrap="wrap" sx={{ padding: '5px', width: '100%' }}>
            {isEditing ? (
                <>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Bank Number"
                            variant="outlined"
                            value={bankNumber}
                            onChange={(e) => setBankNumber(e.target.value)}
                            required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Bank Name"
                            variant="outlined"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <TextField
                            label="Is Active"
                            variant="outlined"
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            required={true}
                        />
                        <TextField
                            label="Test"
                            variant="outlined"
                            value={isActive}
                            onChange={(e) => console.log('test: ', e.target.value)}
                            // required={true}
                        />
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Grid container direction="column">
                            <GridItem item xs={12}>
                                <label htmlFor="image-upload">Upload Profile Image: *</label>
                            </GridItem>
                            <GridItem item xs={12}>
                                <span>
                                <TextField
                                    id="image-upload"
                                    type="file"
                                    variant="outlined"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    fullWidth
                                />
                                    {imageFile && <p>Selected file: {imageFile.name}</p>}
                                    {fileError && <p>{fileError}</p>}
                                </span>
                            </GridItem>
                        </Grid>
                    </GridItem>
                </>
            ) : (
                <>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Email: {currentUser.email || 'Incomplete'}
                        </Typography>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {currentUser.phone || 'Incomplete'}
                        </Typography>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Bank Number: {currentUser.bankNumber || 'Incomplete'}
                        </Typography>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Bank Name: {currentUser.bankName || 'Incomplete'}
                        </Typography>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Type: {currentUser.type || 'Incomplete'}
                        </Typography>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={4}>
                        <Typography variant="body2" color="text.secondary">
                            Is Active: {currentUser.isActive !== null ? currentUser.isActive.toString() : 'Incomplete'}
                        </Typography>
                    </GridItem>
                </>
            )}
        </Grid>
    );

    const ThirdRow = () => (
        <Grid container spacing={2}  direction="row" wrap="wrap" sx={{ padding: '10px', width: '100%' }}>
            <GridItem item xs={12}>
                {isEditing ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!formValid}
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancelSubmit}
                            sx={{marginLeft: '10px'}}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}
            </GridItem>
        </Grid>
    );

    if (isLoading)
        return <CircularProgress />;

    console.log('rendering return');
    return (
        <Card sx={{ maxWidth: '100%', margin: '0', boxShadow: 'none', border: '1px solid #ddd', padding: '0' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px', '&:last-child': { paddingBottom: '0' } }}>
                <Grid container component="form" onSubmit={handleSubmit} spacing={0} direction="column" sx={{ margin: '0', padding: '0' }}>
                    <FirstRow />
                    <SecondRow />
                    <ThirdRow />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProfileMainCard;
