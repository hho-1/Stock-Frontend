import React, { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall';

const Brands = () => {

  const { getStockData} = useStockCall();

  useEffect(() => {
    // getFirms();
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>Brands</div>
  )
}

export default Brands