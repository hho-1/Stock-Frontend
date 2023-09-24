import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { btnStyle } from "../../styles/globalStyle";
import useStockCall from "../../hooks/useStockCall";



/* const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
]; */

export default function ProductTable() {
    const {products} = useSelector(state=>state.stock)
    const {deleteStockData} = useStockCall()

    const columns = [
      { 
        field: "id", 
        headerName: "ID", 
        minWidth: 40,
        maxWidth: 70,
        align:"center", 
        headerAlign: "center",
        flex:1
       },
      {
        field: "category",
        headerName: "Category",
        headerAlign: "center",
        align:"center",
        width:150,
        flex:3
      },
      {
        field: "brand",
        headerName: "Brand",
        width: 150,
        headerAlign: "center",
        align:"center",
        flex:3
      },
      {
        field: "name",
        headerName: "Name",
        width: 110,
        headerAlign: "center",
        align:"center",
        flex:3
      },
      {
        field: "stock",
        headerName: "Stock",
        type: "number",
        width: 110,
        headerAlign: "center",
        align:"center",
        flex:2
      },
      {
        field: "actions",
        headerAlign: "center",
        flex:2,
        align:"center",
        headerName: "Actions",
        // description: "This column has a value getter and is not sortable.",
        sortable: false, //! o sütunda sort işlemlerini kapat
        width: 160,
        renderCell: params => (
          //   console.log(params)
          <DeleteOutlineIcon
            onClick={() => deleteStockData("products", params.id)}
            sx={btnStyle}
          />
        ),
      },
    ];

  return (
    <Box sx={{ width: "100%", marginTop:"1rem"}}>
      <DataGrid
        rows={products}
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