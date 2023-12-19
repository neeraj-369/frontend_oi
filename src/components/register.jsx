import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';

export default function SignUp() {
    const [userType, setUserType] = useState(0);
    const handleUserTypeChange = (type) => {
      setUserType(type);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email =  data.get("email");
    const username = data.get("username");
    const password = data.get("password"); 
    if (email.length === 0 || username.length === 0 || password.length === 0) {
      alert("All fields are required !")
      return
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    if(password !== data.get("confirmpassword")){
        alert("Password and Confirm Password must be same")
        return
        }

    let apiEndpoint;
    if (userType === 0) {
      apiEndpoint = "http:///13.201.53.69/authorization/userregister";
    } else if (userType === 1) {
      apiEndpoint = "http:///13.201.53.69/authorization/developerregister";
    } else if (userType === 2) {
      apiEndpoint = "http:///13.201.53.69/authorization/adminregister";
    }
    try {
        const response = await axios.post(apiEndpoint, {
          email,
          username,
          password,
        });
        if (response.data.success) {
          alert("Registration successful!"); 
          window.location.href = "/login";
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while processing your request.");
      }

  };

  return (
    <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', height: '100vh' ,backgroundColor:"black" }}>
    <div
      style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        float:'right',
        background:'#121212',
        minWidth: '310px'
      }}
    >
      <img src="src\assets\icon.jpg" alt="Logo" />
    </div>
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '310px'
      }}
    >
      {/* sx={{display:"flex",flexWrap:"wrap",alignContent :'center', justifyContent:'center'} */}
    <Container component="main" maxWidth="sm" >
      <Box
        sx={{  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#121212",
          // borderColor: "white",
          // borderStyle: "outset",
          paddingTop: "10%",
          paddingBottom: "10%",
          paddingLeft: "5%",
          paddingRight: "5%",
          margin: "2.5%",
        }}
      >
        <Typography sx={{mb : '5%',fontWeight :"200",fontSize : "45px" }} component="h4" variant="h3"color="white">
          Register
        </Typography>
        <Box>
          <Button
            className={userType == 0 ? 'outlinedloginbutton' : 'outlinedloginbutton2'}
            variant= {(userType ===0) ? 'contained' : 'outlined'}
            sx={{  border: "0px" , marginRight: "0px" ,borderRadius: "0px",color:'black',bgcolor:userType === 0 ? '#fc3' : '#121212',}}
            onClick={() => handleUserTypeChange(0)} // User
            color="secondary"
          >
            User
          </Button>
          <Button
            className={userType == 1 ? 'outlinedloginbutton' : 'outlinedloginbutton2'}
            variant= {(userType ===1) ? 'outlined' : 'outlined'}
            sx={{  border: "0px" , marginRight: "0px" ,borderRadius: "0px",color:'black',bgcolor:userType === 1 ? '#fc3' : '#121212',}}
            onClick={() => handleUserTypeChange(1)} // Developer
            color="secondary"
          >
            Developer
          </Button>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1,pl:"12.5%",pr:"12.5%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            color="secondary"
            InputLabelProps={{
              style: {
                color:"white",
                outlineColor:"white",

                },
            }}
            InputProps={{
              style: {
                color: "white",
                }
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            color="secondary"
            InputLabelProps={{
              style: {
                color:"white",
                outlineColor:"white",

                },
            }}
            InputProps={{
              style: {
                color: "white",
                }
            }}
            name="username"
            // autoComplete="username"
            // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            color="secondary"
            InputLabelProps={{
              style: {
                color:"white",
                outlineColor:"white",

                },
            }}
            InputProps={{
              style: {
                color: "white",
                }
            }}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            color="secondary"
            InputLabelProps={{
              style: {
                color:"white",
                outlineColor:"white",

                },
            }}
            InputProps={{
              style: {
                color: "white",
                }
            }}
            label="Confirm Password"
            type="password"
            id="confirmpassword"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 ,fontWeight :"500", fontSize:"1.2rem",color:"#121212",bgcolor:"#fc3"}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2" color={"#fff"}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
    </div>
  );
}