import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchService from '../services/search';
import CircularProgress from "@mui/material/CircularProgress";
import StorePreviewCard from "../components/StorePreviewCard";
import ProduceCard from "../components/ProduceCard.jsx";
import { Divider, Grid, Typography, Box } from "@mui/material";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [produceList, setProduceList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const query = useQuery();
    const searchQuery = query.get('query');

    useEffect(() => {
        const fetchData = async (searchQuery) => {
            try {
                setIsLoading(true);
                const response = await searchService.search(searchQuery);
                setProduceList(response.data.produce);
                setStoreList(response.data.store);
            } catch (error) {
                console.log('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (searchQuery) {
            fetchData(searchQuery);
        }
    }, [searchQuery]);

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <h2>Search Results Page</h2>
            {searchQuery && <Typography variant="subtitle1">Searching for: {searchQuery}</Typography>}
            <Divider />

            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Produce Results</Typography>
                {produceList.length === 0 ? (
                    <Typography variant="body1">No produce found</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {produceList.map(produce => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={produce.id}>
                                <ProduceCard produce={produce} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <Divider style={{ margin: '20px 0' }} />

            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Store Results</Typography>
                {storeList.length === 0 ? (
                    <Typography variant="body1">No stores found</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {storeList.map(store => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={store.id}>
                                <StorePreviewCard store={store} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </div>
    );
};

export default SearchResultsPage;
