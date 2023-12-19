import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import {Box} from  '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function CustomNoRowsOverlay() {
  return (
<Box sx={{paddingLeft:'45%',paddingTop:'10%'}}>No Rows</Box>
 );
}


export default function AppDataTableR() {
  const [data, setData] = React.useState([]);
  const userType = localStorage.getItem('userType'); // Get the userType from localStorage

  React.useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('http:///13.201.53.69/test')
      .then((response) => {
        setData(response.data); // Set the response data to the state directly
        console.log("data is :" + response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch data from the server.');
      });
  }, []);

  // Custom click handler for the delete button
  const handleDeleteClick = (id, name) => {
    axios
      .delete(`http:///13.201.53.69/test/${id}`, {
        params: { name: name }
      })
      .then((response) => {
        setData((prevData) => prevData.filter((row) => row._id !== id));
        alert('Application named : "' + name + '" and all its versions are deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to delete the entry.');
      });
  };
  const noPointer = {cursor: 'default'};
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    { field: 'versionname', headerName: 'Active Version', width: 150 },
    {
      field: 'link',
      headerName: 'Streaming Link',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="containted"
          color="secondary"
          onClick={() => {
            const link = params.row.link;
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(link, '_blank');
            } else {
              window.open(`http://${link}`, '_blank'); // Add "http://" prefix if missing
            }
          }}
          sx={{ fontSize: '0.8rem', color: '#121212', bgcolor: '#fc3', ":hover": { backgroundColor: "#fc3" } }}
        >
          Play Game
        </Button>
      ),
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <IconButton tooltip="delete" style={noPointer}>
          <DeleteIcon color = "secondary" onClick={() => handleDeleteClick(params.row._id, params.row.name)} style={noPointer} />
        </IconButton>
        // <DeleteIcon color="secondary" onClick={() => handleDeleteClick(params.row._id, params.row.name)}/>
        // <Button variant="contained" color='secondary' onClick={() => handleDeleteClick(params.row._id, params.row.name)}
        // sx={{ fontSize: '0.8rem', color: '#121212', bgcolor: '#fc3', ":hover": { backgroundColor: "#fc3" } }}
        // >
        //   Delete
        // </Button>
      ),
    },
  ];

  const getRowId = (row) => row._id;
  const imageLinks = [
    'https://wallpapers.com/images/featured/pubg-hd-a8lzrpdzi7ffija2.jpg', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojHPN1U_JWTYZXJ2Rbqz5abwYX7Sw6LWbzQ&usqp=CAU',
    'data:image/jpeg;base64,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'

  ];
  const handleCardClick = (link) => {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank');
    } else {
      window.open(`http://${link}`, '_blank'); // Add "http://" prefix if missing
    }
  };
  const renderUserTypeSpecificUI = () => {
    if (userType === '0') {
      return (
        <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid item key={item._id} xs={12} sm={6} md={4} lg={2} >
          <Card
            onClick={() => handleCardClick(item.link)}
            style={{ cursor: 'pointer' ,backgroundColor:"#121212"}}
            // sx={{width:"500px", height:"250px"}}
          >
            <img
              src={imageLinks[index] || 'https://via.placeholder.com/150x200'} // Replace with actual image URL
              alt={item.name}
              objectFit="contain"
              style={{ width: '100%', height: '150px', backgroundColor:"#1A1C1F" }}
            />
            <CardContent sx={{backgroundColor:"#121212",alignItems:"center"}}>
              <Typography sx={{color:"white", backgroundColor:"#121212", }} variant="h6">{item.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
      );
    } else if (userType === '1') {
      return (
        <>
          <Stack direction="row" spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={8} sx={{height:'50%'}}>
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
                <Link to="/apps/create">
                  <Button variant='contained'color='secondary' sx={{ fontSize:"0.8rem",color:"#121212",bgcolor:"#fc3"}} >Create Application</Button>
                </Link>
              </Grid>
            </Grid>
          </Stack>
          <div style={{ height: 400, width: '100%',paddingTop:"2.5% " }}>
            <DataGrid rows={data} columns={columns} pageSize={5} getRowId={getRowId} sx={{
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
    } else if (userType === '2') {
      return (
        <>
          <Stack direction="row" spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={8} sx={{height:'50%'}}>
                <TextField 
                autoFocus
                // height="50%"
                // maxheight="50%"
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
                }}/>
              </Grid>
              <Grid item xs={4}>
                <Link to="/apps/create">
                  <Button variant='contained' color = 'secondary' sx={{ fontSize:"0.8rem",color:"#121212",bgcolor:"#fc3"}}>Create Application</Button>
                </Link>
              </Grid>
            </Grid>
          </Stack>
          <div style={{ height: 400, width: '100%' ,paddingTop:"2.5% "}}>
            <DataGrid rows={data} columns={columns} pageSize={5} getRowId={getRowId} sx={{
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
  };

  return(
  <>{renderUserTypeSpecificUI()}</>
  );

  
}
