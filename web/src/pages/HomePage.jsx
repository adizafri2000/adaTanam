import React, {useState} from 'react';
import produceService from '../services/produce';
import {Button} from '@mui/material';
import CircularIndeterminate from '../components/CircularIndeterminate';

const HomePage = () => {
    const [produceList, setProduceList] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsButtonClicked(true);
        setIsLoading(true);
        const result = await produceService.getAll();
        setProduceList(result);
        setIsLoading(false);
    };

    return (
        <>
            <div>Home Page (this is edited on dev after PR to main and should not appear yet on prod)</div>
            <Button variant='contained' color='secondary' size='small' onClick={handleClick}>Load Produce</Button>
            {isLoading ? <CircularIndeterminate/> : isButtonClicked && produceList.map(produce => <div key={produce.id}>{produce.name}</div>)}
        </>
    );
};

export default HomePage;