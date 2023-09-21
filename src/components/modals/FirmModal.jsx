import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import useStockCall from '../../hooks/useStockCall';
import InputMask from 'react-input-mask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FirmModal({open, handleClose, firmData, setFirmData}) {
  
    /* const [firmData, setFirmData] = React.useState({
        name: "",
        phone: "",            bunlari lifting state up yaparak firms'e tasidik.
        image:"",
        address:""
    }) */

    const {postStockData, putStockData} = useStockCall()

    const handleChange = (e) => {
        setFirmData({...firmData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(firmData.id){
            putStockData("firms", firmData);
        }
        else{
            postStockData("firms", firmData);
        }
        
        handleClose()
        /* setFirmData({
                name: "",
                phone: "",
                image:"",
                address:""
        }) */
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={()=>{
            handleClose()
            /* setFirmData({
                name: "",                bu ve alttaki setFirmData'yi firms'e tasidik, tekrardan kurtulmak icin
                phone: "",
                image:"",
                address:""
        }) */
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>            {/* component form deyince burayi form olarak algiliyor */}
                <TextField
                    label="Firm Name"
                    name="name"
                    id="name"
                    type="text"
                    variant="outlined"
                    value={firmData.name}
                    onChange={handleChange}
                    required
                />
                <InputMask
                    mask="+4\9 99 999 99"
                    maskChar="_"
                    value={firmData.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                    type="tel"
                    required>
                    {inputProps => (
                        <TextField {...inputProps} label="Phone" variant="outlined" />
                    )}
                </InputMask>
                <TextField
                    label="Image"
                    name="image"
                    id="image"
                    type="url"
                    variant="outlined"
                    value={firmData.image}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Address"
                    name="address"
                    id="address"
                    type="text"
                    variant="outlined"
                    value={firmData.address}
                    onChange={handleChange}
                    required
                />
                <Button variant="contained" type="submit">
                    {firmData.id ? "Update" : "Add Firm"}
                </Button>
            </Box>
        </Box>
        
      </Modal>
    </div>
  );
}


//!Buradaki handleOpen ve handleClose fonksiyonlarini parent olan firms'e tasiyoruz. Buna Lifting State Up deniyor.