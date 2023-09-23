import React, { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import Container from "@mui/material/Container"
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";

const Brands = () => {
  
  const { getStockData} = useStockCall();
  const {brands} = useSelector(state=> state.stock)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setBrandData({
      name: "",
      image:""
    })
  };


  const [brandData, setBrandData] = React.useState({
    name: "",
    image:""
})

  useEffect(() => {
    // getFirms();
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl" align='center'>
      <Typography color="error" variant="h4" mb={3}>
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>New Brand</Button>
      <BrandModal open={open} handleClose={handleClose} brandData={brandData} setBrandData={setBrandData}/>
      <Grid container alignItems='center' justifyContent='center' spacing={3} mt={3}>
        {brands?.map(brand => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={brand.id}>
            <BrandCard {...brand} handleOpen={handleOpen} setBrandData={setBrandData}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Brands;