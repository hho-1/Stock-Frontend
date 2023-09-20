import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import useStockCall from "../hooks/useStockCall";

export default function BrandCard({id, name, image}) {

  const {deleteStockData} = useStockCall();

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 375, minHeight: 375, display:"flex", flexDirection:'column', justifyContent:'space-between'}}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardMedia
        component='img'                             /* Buraya component img seklinde belirtmezsen bi alkt satirdaki objectfit gibi özellikleri uygulamaz. */
        sx={{ height: 140, objectFit:"contain"}}
        image={image}
        title={name}
      />
      <CardActions
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}>

        <EditIcon sx={{cursor: "pointer", color:"green", "&:hover": {scale:"1.2"}}}/>
        <DeleteOutlineIcon onClick={()=> deleteStockData('brands', id)} sx={{cursor: "pointer", color:"red", "&:hover": {scale:"1.2"}}}/>
      </CardActions>
    </Card>
  );
}