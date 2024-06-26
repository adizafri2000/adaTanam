import { useParams } from 'react-router-dom';

const DetailedProducePage = () => {
  const { id } = useParams();
  return <h2>Detailed Produce Page with id: {id}</h2>
}

export default DetailedProducePage;