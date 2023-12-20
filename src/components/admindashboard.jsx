import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from  '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function AdminDashboard() {
  const [data, setData] = React.useState([]);

  function CustomNoRowsOverlay() {
    return (
  <Box sx={{paddingLeft:'45%',paddingTop:'10%'}}>No Rows</Box>
   );
  }
  
  React.useEffect(() => {
    // Fetch data for users of types Developer and User from the backend API
//     axios
//       .get('http://13.201.53.69/dashboard')
//       .then((response) => {
//         setData(response.data);
//         console.log("data is: " + JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//         alert('Failed to fetch data from the server.');
//       });
//   }, []);


    axios
      .get('http://13.201.53.69/dashb/dashboard')
      .then((response) => {
        const modifiedData = response.data.map(user => {
          user.UserType = user.hasOwnProperty('UserType') ? user.UserType : 'User'; // Assuming UserType is coming from the backend
          return user;
        });
        setData(modifiedData);
        console.log("data is: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch data from the server.');
      });
  }, []);



  const handleDeleteUser = (id) => {
    // Delete user by ID
    axios
      .delete(`http://13.201.53.69/dashb/dashboard/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((row) => row._id !== id));
        alert('User deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to delete the user.');
      });
  };

  const columns = [
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'UserType', headerName: 'User Type', width: 150 }, 
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <IconButton tooltip="delete">
          <DeleteIcon color="secondary" onClick={() => handleDeleteUser(params.row._id)} />
        </IconButton>
      ),
    },
  ];

  const getRowId = (row) => row._id;

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label='Search'
              autoFocus
              color="secondary"
              InputLabelProps={{
                style: {
                  color: "#fc3",
                  outlineColor: "#fc3",
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
            {/* <TextField
              label='Username'
              color="secondary"
              InputLabelProps={{
                style: {
                  color: "#fc3",
                  outlineColor: "#fc3",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                }
              }}
              onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
            />
            <TextField
              label='Email'
              color="secondary"
              InputLabelProps={{
                style: {
                  color: "#fc3",
                  outlineColor: "#fc3",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                }
              }}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
            />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleAddUser}
              sx={{ fontSize: "0.8rem", color: "#121212", bgcolor: "#fc3" }}
            >
              Add User
            </Button> */}
          </Grid>
        </Grid>
      </Stack>
      <div style={{ height: 400, width: '100%', paddingTop: "2.5% " }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          getRowId={getRowId}
          sx={{
            borderColor: "#121212",
            color: "white",
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

export default AdminDashboard;
 