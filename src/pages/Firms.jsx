// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
// import axios from "axios";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import Container from "@mui/material/Container"
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import React from "react";

const Firms = () => {
  //? firms verileri bana birden fazla yerde lazım olduğu için fonksiyonu burada değil de her yerden erişebileceğim bir noktada tanımlıyorum. İçerisinde react hookları lazım olduğu için de bu ortak nokta en iyi custom hook olmuş oluyor.
  // const dispatch = useDispatch();
  // const { token } = useSelector(state => state.auth);

  // const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const getFirms = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const url = "firms";
  //     const { data } = await axios(`${BASE_URL}stock/${url}/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     console.log(data);
  //     // dispatch(getSuccess({data, url:"firms"}))
  //     dispatch(getSuccess({ data, url })); // {data:data,url:url}
  //   } catch (error) {
  //     dispatch(fetchFail());
  //   }
  // };

  // const { getFirms } = useStockCall();
  const { getStockData} = useStockCall();
  const {firms} = useSelector(state=> state.stock)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFirmData({
      name: "",
      phone: "",
      image:"",
      address:""
    })
  };


  const [firmData, setFirmData] = React.useState({
    name: "",
    phone: "",
    image:"",
    address:""
})



  useEffect(() => {
    // getFirms();
    getStockData("firms");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl" align='center'>
      <Typography color="error" variant="h4" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>New Firm</Button>
      <FirmModal open={open} handleClose={handleClose} firmData={firmData} setFirmData={setFirmData}/>
      <Grid container alignItems='center' justifyContent='center' spacing={3} mt={3}>
        {firms?.map(firm => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={firm.id}>
            <FirmCard {...firm} handleOpen={handleOpen} setFirmData={setFirmData}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Firms;