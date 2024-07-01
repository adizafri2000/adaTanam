import React, { useContext } from 'react';
import {Box, Divider, Typography} from '@mui/material';
import UserContext from "../contexts/UserContext.jsx";
import TopStoresSection from '../components/TopStoresSection.jsx';
import TopProduceSection from "../components/TopProduceSection.jsx";
import NewArrivalsSection from "../components/NewArrivalsSection.jsx";

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <Box>
            {user && (
                <Typography variant="h6" gutterBottom>
                    Welcome, {user.name}!
                </Typography>
            )}

            <Box mt={4} mb={4}>
                <TopStoresSection />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box mt={4} mb={4}>
                <TopProduceSection />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box mt={4} mb={4}>
                <NewArrivalsSection />
            </Box>
            <Divider sx={{ my: 2 }} />
        </Box>
    );
};

export default HomePage;
