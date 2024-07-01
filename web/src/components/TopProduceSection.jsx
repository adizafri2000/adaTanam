import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import produceService from '../services/produce';
import ProduceCard from './ProduceCard.jsx';

const TopProduceSection = () => {
    const [produceList, setProduceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopProduce = async () => {
            try {
                const response = await produceService.getTopProduce();
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
                    <Typography variant="h5">Top Produce</Typography>
                    <Typography variant="subtitle2" gutterBottom>Produce sold with the highest ratings</Typography>
                    <Box display="flex" overflow="auto" sx={{ gap: 2 }}>
                        {produceList.map(produce => (
                            <Box key={produce.id} flex="1 0 auto" maxWidth="20%">
                                <ProduceCard produce={produce} />
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TopProduceSection;
