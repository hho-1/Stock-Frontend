import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import Container from "@mui/material/Container";
import { Button,Typography } from "@mui/material";
import ProductModal from "../components/modals/ProductModal";
import ProductTable from "../components/tables/ProductTable";


const Products = () => {
  
  const { /* getStockData, */ getProPurcSalesCatBrand } = useStockCall();
  //*Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",
      category_id: "",
      brand_id: "",
    });
  };
  const [info, setInfo] = useState({
    name: "",
    category_id:'',
    brand_id:''
  });

  useEffect(() => {
    /* getStockData("products");
    getStockData("categories");
    getStockData("brands"); */
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //Promise kullanacagimiz icin üsttekiler yerine alttaki yeni fonksiyonumu kullaniyorum. Bu sekilde asenkron veri gelisi daha senkronize oluyor ve hizlaniyor.
    getProPurcSalesCatBrand()
  }, []);

  return (
    <Container maxWidth="xl" align='center'>
      <Typography color="error" variant="h4" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>
      <ProductModal open={open} handleClose={handleClose} info={info} setInfo={setInfo} />
      <ProductTable/>
      
    </Container>
  );
};

export default Products;

//* Lifting State Up