import React, { useEffect, useState } from 'react';
import produceService from '../services/produce';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Container, Button, Box, Typography } from '@mui/material';
import ProduceCard from '../components/ProduceCard.jsx';

const ProduceListPage = () => {
  const navigate = useNavigate();
  const [produceList, setProduceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
        const fetchStoreAndProduce = async () => {
            try {
              setIsLoading(true)
              const produceResponse = await produceService.getAll();
              const produceListData = produceResponse.data;
              setProduceList(produceListData);
            } catch (error) {
                console.error("Error fetching produce:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStoreAndProduce();
  }, [navigate]);

  if (isLoading) {
      return <CircularProgress />;
  }
  return (
    <>
      <h2>Produce List</h2>
      <p>{produceList.length} produce found</p>
      <Grid container spacing={6}>
          {produceList.map(produce => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={produce.id}>
                  <ProduceCard produce={produce} />
              </Grid>
          ))}
      </Grid>
    </>
  )
}

export default ProduceListPage;