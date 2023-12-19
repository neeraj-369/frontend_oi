import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';
import {Box} from  '@mui/material';
function CustomNoRowsOverlay() {
  return (
<Box sx={{paddingLeft:'45%',paddingTop:'10%'}}>No Rows</Box>
 );
}


const NameLink = (params) => {
    const name = params.value;
    return <Link to={`/version/name/${name}`}>{name}</Link>;
  };
  
const columns = [
  // Other columns...
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    renderCell: (params) => (
    <Link to={`/version/name/${params.value}`} style={{ textDecoration: 'none' }}>
    <Button variant="contained" color= "secondary" 
    sx={{ fontSize:"0.8rem",color:"#121212",bgcolor:"#fc3"}}>
    {/* style={{ color: 'white', backgroundColor: '#3992ff' }}> */}
      {params.value}
    </Button>
    </Link>

    ),
  },
];


export default function VerDataTable() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('http:///13.201.53.69/test')
      .then((response) => {
        const modifiedData = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch data from the server.');
      });
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
                <TextField 
                autoFocus
                label='Search' color="secondary"
                InputLabelProps={{
                style: {
                color:"#fc3",
                outlineColor:"#fc3",
                },
                }}
                InputProps={{
                style: {
                  color: "white",
                }
                }}
                />
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Stack>
      <div style={{ height: 400, width: '100%',paddingTop:"2.5% " }}>
        <DataGrid rows={data} columns={columns} pageSize={5} sx={{
              borderColor:"#121212",
              color:"white",
              '&.MuiDataGrid-cell:hover': {
                color: 'secondary.main',
              },
              '.MuiTablePagination-toolbar': {
                backgroundColor: '#1A1C1F',
                width: '950px',
                color: 'white',
                height: '35px',
              },
              
            }}
            slots={{ noRowsOverlay: CustomNoRowsOverlay }}/>
      </div>
    </>
  );
}

