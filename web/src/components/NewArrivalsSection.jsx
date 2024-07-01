import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import produceService from '../services/produce';
import ProduceCard from './ProduceCard.jsx';

const NewArrivalsSection = () => {
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopProduce = async () => {
            try {
                const response = await produceService.getLatestCreatedProduce();
                setProduceList(response.data);
            } catch (error) {
                console.error('Failed to fetch top produce:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopProduce();
    }, []);

    return (
        <Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h5">Latest Produce</Typography>
                    <Typography variant="subtitle2" gutterBottom>New produce by the farmers</Typography>
                    <Box display="flex" overflow="auto" sx={{ gap: 2 }}>
                        {produceList.length > 0 && produceList.map(produce => (
                            <Box key={produce.id} flex="1 0 auto" maxWidth="20%">
                                <ProduceCard produce={produce} />
                            </Box>
                        ))}
                        {produceList.length === 0 && <Typography variant="subtitle2" gutterBottom>No newly created produce in 5 days time</Typography>}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default NewArrivalsSection;
