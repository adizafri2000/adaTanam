import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailedProduceCard from '../components/DetailedProduceCard.jsx';
import produceService from '../services/produce';
import storeService from '../services/store';
import CircularProgress from '@mui/material/CircularProgress';
import StorePreviewCard from "../components/StorePreviewCard.jsx";
import { Typography, Divider, Box } from '@mui/material';

const DetailedProducePage = () => {
  const [produce, setProduce] = useState({});
  const [store, setStore] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduceDetails = async (id) => {
      try {
        const response = await produceService.getById(id);
        setProduce(response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch produce details:', error);
        // navigate('/404');
        return <p>Produce not found</p>;
      }
    };

    const fetchStoreDetailsByProduce = async (id) => {
      try {
        const response = await storeService.getById(id);
        setStore(response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch store details:', error);
        return null;
      }
    };

    const fetchPageDetails = async (produceId) => {
      try {
        setIsLoading(true);
        const produceData = await fetchProduceDetails(produceId);
        if (produceData && produceData.store) {
          await fetchStoreDetailsByProduce(produceData.store);
        }
      } catch (error) {
        console.error('Failed to fetch details:', error);
        // Handle error or navigate to error page
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageDetails(id);
  }, [id]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
      <Box>
        <Typography variant="h2">Viewing Produce</Typography>
        <Box mt={2}>
          <DetailedProduceCard produce={produce} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>This produce is sold by</Typography>
          <StorePreviewCard store={store} />
        </Box>
      </Box>
  );
};

export default DetailedProducePage;
