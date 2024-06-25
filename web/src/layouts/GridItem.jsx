import { Grid } from '@mui/material';
import { styled } from '@mui/system';

const GridItem = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'auto',
    // background: 'brown',
}));

export default GridItem;