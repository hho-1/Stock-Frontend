import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit"
import useStockCall from "../../hooks/useStockCall";



export default function PurchaseTable({handleOpen, setInfo, firm_id, product_id, brand_id, quantity, price}) {
    const {purchases} = useSelector(state => state.stock)
    const {deleteStockData} = useStockCall()

    //const {product_id, brand_id, quantity, price} = info

    const columns = [
      { 
        field: "createds", 
        headerName: "Date", 
        width: 150,
        align:"center", 
        headerAlign: "center",
        flex:2
       },
      {
        field: "firm",
        headerName: "Firm",
        width: 150,
        headerAlign: "center",
        align:"center",
        flex:2
      },
      {
        field: "brand",
        headerName: "Brand",
        width: 150,
        headerAlign: "center",
        align:"center",
        flex:2
      },
      {
        field: "product",
        headerName: "Product",
        headerAlign: "center",
        align:"center",
        width:150,
        flex:3
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 110,
        type: "number",
        headerAlign: "center",
        align:"center",
        flex:1
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 110,
        headerAlign: "center",
        align:"center",
        flex:2
      },
      {
        field: "price_total",
        headerName: "Total",
        type: "number",
        width: 110,
        headerAlign: "center",
        align:"center",
        flex:2
      },
      {
        field: "actions",
        headerAlign: "center",
        flex:3,
        align:"center",
        headerName: "Actions",
        // description: "This column has a value getter and is not sortable.",
        sortable: false, //! o sütunda sort işlemlerini kapat
        width: 160,
        renderCell: params => (
          //   console.log(params)
          <div>
                
                <EditIcon onClick = {()=>{
                    handleOpen()
                    setInfo({
                      firm_id: firm_id,
                      product_id: product_id,
                      brand_id: brand_id,
                      quantity: quantity,
                      price: price
                  })
                }}
                sx={{cursor: "pointer", color:"green", "&:hover": {scale:"1.2"}}}
                />
                <DeleteOutlineIcon
                    onClick={() => deleteStockData("purchases", params.id)}
                    sx={{cursor: "pointer", color:"red", "&:hover": {scale:"1.2"}}} 
                />
          </div>
        ),
      },
    ];

  return (
    <Box sx={{ width: "100%", marginTop:"1rem"}}>
      <DataGrid
        rows={purchases}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={                                   // Bu slots kismi datanin üstündeki columns,filters, density iceren satirin gelmesi icin
            {toolbar: GridToolbar}
        }
        autoHeight
        pageSizeOptions={[5,10,15,25,50]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}