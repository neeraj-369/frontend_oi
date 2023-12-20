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

// import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles } from "@mui/styles";
import axios from 'axios';
import "./login.css";
import jwt_decode from 'jwt-decode'

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     width: '90%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     paddingBottom: 0,
//     marginTop: 0,
//     fontWeight: 500
//   },
//   input: {
//     color: 'white'
//   }
// }));


export default function SignIn() {
  // const classes = useStyles();
  const [userType, setUserType] = useState(0); 
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      let apiEndpoint;
      if (userType === 0) {
        apiEndpoint = "http://13.201.53.69/authorization/userlogin";
      } else if (userType === 1) {
        apiEndpoint = "http://13.201.53.69/authorization/developerlogin";
      } else if (userType === 2) {
        apiEndpoint = "http://13.201.53.69/authorization/adminlogin";
      }
      try {
        const response = await axios.post(apiEndpoint, {
          username,
          password,
        });
        if (response.data.success) {

        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userType", userType);

        alert("Login successful!");
// add here
        if(userType === 0)
        {
            window.location.href = "/apps";
        }
        else if(userType === 1)
        {
            window.location.href = "/apps";
        }
        else if(userType === 2)
        {
            window.location.href = "/apps";
        }

        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while processing your request.");
      }
    };

    // const isTokenExpired = (token) => {
    //     const decodedToken = jwt_decode(token);
    //     const currentTime = Date.now() / 1000;
    //     return decodedToken.exp < currentTime;
    //   };

    //   const logout = () => {
    //     localStorage.removeItem("token");
    //     alert.apply("Session expired. Please login again.");
    //   };
    const yellowBorderColor = {
      // borderColor: 'yellow',
    };

  return (
    // <Box sx={{display:"flex",flexWrap:"wrap"}}>
    // <Box sx={{flex:1}}></Box>
    <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', height: '100vh', backgroundColor:"black"}}>
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
    <Container component="main" maxWidth="xs" fontSize="0.8rem" >
      <Box
        sx={{  
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#121212",
          // borderColor: "white",
          // borderStyle: "outset",
          paddingTop: "5%",
          paddingBottom: "5%",
          // paddingLeft: "5%",
          // paddingRight: "5%",
          margin: "5%",
          fontSize:"0.2rem",
        }}
      >
        <Typography sx={{fontWeight :"200", paddingBottom:"5%", fontSize:"425" }} component="h4" variant="h4" color="white" >
          {/* 425 font */}
          Login
        </Typography>
        <Box sx={{paddingBottom:"5%", maxWidth:'80%',fontSize:'1px',maxHeight:'50px'}}>
          <Button
            className={userType == 0 ? 'outlinedloginbutton' : 'outlinedloginbutton2'}
            variant= {(userType ===0) ? 'outlined' : 'outlined'}
            sx={{  border: "0px" , marginRight: "0px" ,borderRadius: "0px",color:'black',bgcolor:userType === 0 ? '#fc3' : '#121212',}}
            onClick={() => handleUserTypeChange(0)} // User
            color="secondary"
          >
            User
          </Button>
          <Button
            className={userType == 1 ? 'outlinedloginbutton' : 'outlinedloginbutton2'}
            variant= {(userType ===1) ? 'outlined' : 'outlined'}
            sx={{  border: "0px" , marginRight: "0px" ,borderRadius: "0px",color:"black",bgcolor:userType === 1 ? '#fc3' : '#121212', }}
            onClick={() => handleUserTypeChange(1)} // Developer
            color="secondary"
          >
            Developer
          </Button>
          <Button
            className={userType == 2 ? 'outlinedloginbutton' : 'outlinedloginbutton2'}
            variant= {(userType ===2) ? 'outlined' : 'outlined'}
            sx={{  border: "0px" , marginRight: "0px" ,borderRadius: "0px",color:"black",bgcolor:userType === 2 ? '#fc3' : '#121212',}}
            onClick={() => handleUserTypeChange(2)} // Admin
            color="secondary"
          >
            Admin
          </Button>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,pl:"12.5%",pr:"12.5%",paddingBottom:"5%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            // autoComplete = "new-password"
            name="username"
            color="secondary"
            InputLabelProps={{
              style: {
                color:"white" ,
                outlineColor:"white",
                // cssFocused: "#fc3 !important",
                },
            }}
            InputProps={{
              style: {
                color: "white",
                }
            }}
            // autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // type="password"
            autoComplete = "new-password"
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
            id="password"
            // autoComplete="current-password"
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
            // paddingTop="10%"
            // marginTop="5%"
            sx={{ mt: 3, mb: 2 ,fontWeight :"500", fontSize:"1.2rem",color:"#121212",bgcolor:"#fc3"}}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/register" variant="body2" color={"#fff"}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* </div> */}
    </Container>
    </div>
    </div>
  );
}