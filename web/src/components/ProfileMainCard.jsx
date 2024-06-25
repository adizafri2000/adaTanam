import React, {useState, useEffect, useCallback, memo} from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import accountService from '../services/account';
import GridItem from '../layouts/GridItem';
import { toast } from 'react-toastify';
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

const FirstRow = ({ isEditing, imagePreview, name, setName, currentUser }) => (
    <Grid container spacing={2} direction="row" wrap="wrap" sx={{ padding: '10px', width: '100%' }}>
        <GridItem item xs={12} sm={6} md={4}>
            <ImageContainer>
                {imagePreview ? (
                    <img src={imagePreview} alt="User" style={{ width: '100%', height: 'auto' }} />
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
                <Typography variant="h5" component="div" sx={{ fontStyle: currentUser.name ? 'normal' : 'italic', color: currentUser.name ? 'inherit' : 'gray' }}>
                    {currentUser.name || 'Incomplete'}
                </Typography>
            )}
        </GridItem>
    </Grid>
);

const SecondRow = ({ isEditing, email, phone, bankNumber, bankName, type, isActive, handleInputChange, handleFileChange, imageFile, fileError, currentUser }) => (
    <Grid container spacing={2} direction="row" wrap="wrap" sx={{ padding: '5px', width: '100%' }}>
        {isEditing ? (
            <>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => handleInputChange(e, 'phone')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Bank Number"
                        variant="outlined"
                        value={bankNumber}
                        onChange={(e) => handleInputChange(e, 'bankNumber')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Bank Name"
                        variant="outlined"
                        value={bankName}
                        onChange={(e) => handleInputChange(e, 'bankName')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Type"
                        variant="outlined"
                        value={type}
                        onChange={(e) => handleInputChange(e, 'type')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <TextField
                        label="Is Active"
                        variant="outlined"
                        value={isActive}
                        onChange={(e) => handleInputChange(e, 'isActive')}
                        required={true}
                    />
                </GridItem>
                <GridItem item xs={12} sm={6} md={4}>
                    <Grid container direction="column">
                        <GridItem item xs={12}>
                            <label htmlFor="image-upload">Upload Profile Image: *</label>
                        </GridItem>
                        <GridItem item xs={12}>
                            <TextField
                                id="image-upload"
                                type="file"
                                variant="outlined"
                                accept="image/*"
                                onChange={handleFileChange}
                                fullWidth
                            />
                            {imageFile && <p>Selected file: {imageFile.name}</p>}
                            {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
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

const ThirdRow = (({ isEditing, formValid, handleCancelSubmit, setIsEditing, handleSubmit, fileError }) => (
    <Grid container spacing={2} direction="row" wrap="wrap" sx={{ padding: '10px', width: '100%' }}>
        <GridItem item xs={12}>
            {isEditing ? (
                <>
                    <Button
                        id='updateButton'
                        variant="contained"
                        color="primary"
                        // type="submit"
                        onClick={handleSubmit}
                        disabled={!formValid || fileError}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCancelSubmit}
                        sx={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </Button>
                </>
            ) : (
                <Button
                    id='editButton'
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </Button>
            )}
        </GridItem>
    </Grid>
));

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
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(currentUser.image);
    const [formErrors, setFormErrors] = useState({});
    const [fileError, setFileError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ProfileMainCard initial useEffect')
        console.log('currentUser: ', currentUser)
        console.log('formValid: ', formValid)
    }, []);

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                setFileError('Please select an image file');
                setImageFile(null);
                setImagePreview(null);
            } else if (file.size > 10 * 1024 * 1024) { // Check file size (10MB limit)
                setFileError('File size exceeds 10MB limit');
                setImageFile(null);
                setImagePreview(null);
            } else {
                setFileError('');
                setImageFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }, []);


    const handleInputChange = useCallback((event, field) => {
        const value = event.target.value;
        if (field === 'email') setEmail(value);
        if (field === 'phone') setPhone(value);
        if (field === 'bankNumber') setBankNumber(value);
        if (field === 'bankName') setBankName(value);
        if (field === 'type') setType(value);
        if (field === 'isActive') setIsActive(value);
    }, []);

    useEffect(() => {
        console.log('ProfileMainCard, useEffect for form validation in run')
        const validateForm = () => {
            const errors = {};
            if (!name) errors.name = 'Name is required';
            if (!email) errors.email = 'Email is required';
            if (!phone) errors.phone = 'Phone is required';
            if (!bankNumber) errors.bankNumber = 'Bank Number is required';
            if (!bankName) errors.bankName = 'Bank Name is required';
            if (!type) errors.type = 'Type is required';
            if (!isActive) errors.isActive = 'Is Active is required';
            setFormErrors(errors);
            setFormValid(Object.keys(errors).length === 0);
        };
        validateForm();
    }, [name, email, phone, bankNumber, bankName, type, isActive]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('updating user with event: ', event)
        if (!formValid) return;

        const data = {
            ...currentUser,
            name,
            email,
            phone,
            bankNumber,
            bankName,
            type,
            isActive,
            image: imageFile ? '' : currentUser.image
        };

        try {
            setIsLoading(true);
            const token = userFromContext.accessToken; // Assuming you get the token from context
            const response = await accountService.update(currentUser.id, data, token, imageFile);
            if (response.status === 200) {
                toast.success('User updated successfully');
                setCurrentUser(data);
                setIsEditing(false);
                setImageFile(null);
            } else {
                toast.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelSubmit = useCallback(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
        setBankNumber(currentUser.bankNumber);
        setBankName(currentUser.bankName);
        setType(currentUser.type);
        setIsActive(currentUser.isActive);
        setImageFile(null);
        setImagePreview(currentUser.image);
        setIsEditing(false);
    }, [currentUser]);

    if (isLoading) return <CircularProgress />;

    return (
        <Card sx={{ maxWidth: '100%', margin: '0', boxShadow: 'none', border: '1px solid #ddd', padding: '0' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '5px', '&:last-child': { paddingBottom: '0' } }}>
                <Grid container component="form" onSubmit={handleSubmit} spacing={0} direction="column" sx={{ margin: '0', padding: '0' }}>
                    <FirstRow isEditing={isEditing} imagePreview={imagePreview} name={name} setName={setName} currentUser={currentUser} />
                    <SecondRow
                        isEditing={isEditing}
                        email={email}
                        phone={phone}
                        bankNumber={bankNumber}
                        bankName={bankName}
                        type={type}
                        isActive={isActive}
                        handleInputChange={handleInputChange}
                        handleFileChange={handleFileChange}
                        imageFile={imageFile}
                        fileError={fileError}
                        currentUser={currentUser}
                    />
                    <ThirdRow
                        isEditing={isEditing}
                        formValid={formValid}
                        handleCancelSubmit={handleCancelSubmit}
                        setIsEditing={setIsEditing}
                        handleSubmit={handleSubmit}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProfileMainCard;

