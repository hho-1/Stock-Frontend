import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import Container from "@mui/material/Container";
import { Button,Typography } from "@mui/material";
import SalesTable from "../components/tables/SalesTable";
import SalesModal from "../components/modals/SalesModal";


const Sales = () => {
  
  const { getProPurcSalesCatBrand } = useStockCall();
  //*Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      brand_id: "",
      product_id: "",
      quantity: "",
      price: "",
    });
  };
  const [info, setInfo] = useState({
      brand_id: "",
      product_id: "",
      quantity: "",
      price: "",
  });

  useEffect(() => {
    /* getStockData("products");
    getStockData("categories");
    getStockData("brands"); */
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //getStockData("sales")
    getProPurcSalesCatBrand()
  }, []);

  return (
    <Container maxWidth="xl" align='center'>
      <Typography color="error" variant="h4" mb={3}>
        Sales
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Sale
      </Button>
      <SalesModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />
      <SalesTable handleOpen={handleOpen} info={info} setInfo={setInfo}/>
      
      
    </Container>
  );
};

export default Sales;

//* Lifting State Up