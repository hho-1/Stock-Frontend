import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import KpiCards from '../components/KpiCards'
import Charts from '../components/Charts'
import useStockCall from '../hooks/useStockCall'

const Home = () => {

  const { getStockData} = useStockCall();
    
    useEffect(() => {
        // getFirms();
        getStockData("sales");
        getStockData("purchases");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
      <Typography variant='h4' color='error' align='center' mc={3}>Dashboard</Typography>
      <KpiCards/>
      <Charts/>
    </div>
  )
}

export default Home