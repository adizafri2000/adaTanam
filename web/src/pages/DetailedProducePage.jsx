import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailedProduceCard from '../components/DetailedProduceCard.jsx';
import produceService from '../services/produce';
import storeService from '../services/store';
import CircularProgress from '@mui/material/CircularProgress';
import StorePreviewCard from "../components/StorePreviewCard.jsx";

const DetailedProducePage = () => {
  const [produce, setProduce] = useState({})
  const [store, setStore] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProduceDetails = async (id) => {
        const response = await produceService.getById(id);
        console.log(response)
        setProduce(response.data);
        return response.data
    }
    const fetchStoreDetailsByProduce = async (id) => {
      const response =  await storeService.getById(id);
      setStore(response.data);
      console.log('store of produce with id-', id, ': ', response.data)
      return response.data;
    }
    const fetchPageDetails = async (produceId) => {
      try {
        setIsLoading(true);
        const produce = await fetchProduceDetails(produceId)
        await fetchStoreDetailsByProduce(produce.store)
      } catch (error) {
        console.error('Failed to fetch produce details:', error);
        // navigate('/404');
        return <p>Produce not found</p>
      } finally {
        setIsLoading(false)
      }
    }
    fetchPageDetails(id);
  }, [])

  if(isLoading)
    return <CircularProgress />
  
  return (
    <>
      <h2>Viewing produce</h2>
      <DetailedProduceCard produce={produce} />
      <StorePreviewCard store={store} />
    </>
  )
}

export default DetailedProducePage;