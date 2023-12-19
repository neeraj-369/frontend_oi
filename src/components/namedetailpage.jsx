import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Box} from  '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function CustomNoRowsOverlay() {
  return (
<Box sx={{paddingLeft:'45%',paddingTop:'10%'}}>No Rows</Box>
 );
}


export default function NameDetailPage() {
  const { name } = useParams();
  const [deployments, setDeployments] = useState([]);
  const [appname,setAppname] = useState("");
  const [specd,setSpecd] = useState("");
  useEffect(() => {
    setAppname(name);
    axios.get(`http:///13.201.53.69/version/deployments/${name}`)
      .then((response) => {
        setDeployments(response.data.deployments);
        setAppname(name);
      })
      .catch((error) => {
        console.error('Error at the instances frontend:', error);
        // Handle error if needed
      });
  }, []);

  const handleDeleteClick = (id, deploymentk) => {
    
    setSpecd(deploymentk);
    axios
      .delete(`http:///13.201.53.69/version/deleted/`, {
        data: { deploymentk , appname}
      })
      .then((response) => {
        // Update deployments state by removing the deleted deployment
        axios.get(`http:///13.201.53.69/version/deployments/${name}`)
        .then((response) => {
        setDeployments(response.data.deployments);
      })
      .catch((error) => {
        console.error('Error at the instances frontend:', error);
        // Handle error if needed
      });
  
        alert('Deployment Instance deleted : "' + deploymentk );
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to delete the entry.', error);
      });
  };
  

  const noPointer = {cursor: 'default'};
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'deployment', headerName: 'Deployment', width: 200 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <IconButton tooltip="delete" style={noPointer}>
          <DeleteIcon color = "secondary" onClick={() => handleDeleteClick(params.row._id,params.row.deployment)} style={noPointer} />
        </IconButton>
        // <Button variant="contained" color="secondary" sx={{ fontSize:"0.8rem",color:"#121212",bgcolor:"#fc3"}} onClick={() => handleDeleteClick(params.row._id,params.row.deployment)}>
        //   Delete
        // </Button>
      ),
    },
    // Add more columns as needed
  ];

  const rowss = deployments.map((deployment, index) => ({
    id: index,
    deployment: deployment,
  }));

  return (
    <div id="nameDetail">
      <h1>Application : {name}</h1>
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
        {/* <DataGrid rows = {rowss} columns={columns} pageSize={5} /> */}
        <DataGrid rows={rowss} columns={columns} pageSize={5} sx={{
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
      {/* Additional content related to the name detail page */}
    </div>
  );
}
