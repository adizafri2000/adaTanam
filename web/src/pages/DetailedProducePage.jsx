import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailedProduceCard from '../components/DetailedProduceCard.jsx';
import produceService from '../services/produce';
import CircularProgress from '@mui/material/CircularProgress';

const DetailedProducePage = () => {
  const [produce, setProduce] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProduceDetails = async (id) => {
      try{
        setIsLoading(true);
        console.log(`Detailed produce page, fetching produce with id: ${id}`)
        const response = await produceService.getById(id);
        console.log(response)
        setProduce(response.data);
      } catch (error) {
        console.error('Failed to fetch produce details:', error);
        return <p>Produce not found</p>
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduceDetails(id);
  }, [])

  if(isLoading)
    return <CircularProgress />
  
  return (
    <>
      <h2>Viewing produce</h2>
      <DetailedProduceCard produce={produce} />
    </>
  )
}

export default DetailedProducePage;