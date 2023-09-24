import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import Container from "@mui/material/Container";
import { Button,Typography } from "@mui/material";
import PurchaseModal from "../components/modals/PurchaseModal";
import PurchaseTable from "../components/tables/PurchaseTable";


const Purchases = () => {
  
  const { getProPurcSalesCatBrand } = useStockCall();
  //*Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      firm_id: "",
      brand_id: "",
      product_id: "",
      quantity: "",
      price: "",
    });
  };
  const [info, setInfo] = useState({
    firm_id: "",  
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
        Purchases
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Purchase
      </Button>
      <PurchaseModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />
      <PurchaseTable handleOpen={handleOpen} info={info} setInfo={setInfo}/>
      
      
    </Container>
  );
};

export default Purchases;

//* Lifting State Up