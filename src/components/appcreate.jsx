import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField } from '@mui/material';

import axios from 'axios';

import DropFileInput from './Drop-box/DropFileInput';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function AppCreate() {
    const [nameValue, setNameValue] = useState("");
    const [registryValue, setRegistryValue] = useState("");
    const onChangeName = (event) => setNameValue(event.target.value);
    const onChangeRegistry = (event) => setRegistryValue(event.target.value);

    const CreateAppfun = (event) => {
        event.preventDefault();
        console.log("Name: " + nameValue);
        console.log("Registry: " + registryValue);
        const newApp = {
            name: nameValue,
            registry: registryValue,
        }
        axios.post('http://13.233.26.133/test/create', newApp)
            .then((response) => {
                console.log(response);
                alert('Created New Application named : ' + response.data.message);
                
                // const history = useHistory();
                // Navigate to the "/applications" page
                // history.push('/applications');
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    alert('Failed to Create Application: ' + error.response.data.error);
                } else {
                    alert('Failed to Create Application: Something went wrong.');
                }
            });
    }

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <>
            <CssBaseline />
            <Container id="AppCreateContainer">
                <Box id="AppCreateTextInput">
                    <Grid>
                        <p style={{ width: "50px" }}>Name:</p>
                        <TextField variant='outlined' value={nameValue} onChange={onChangeName} style={{ paddingTop: "5px", paddingLeft: '10px', }} />
                    </Grid>
                    <Grid>
                        <p>Registry:</p>
                        <TextField variant='outlined' value={registryValue} onChange={onChangeRegistry} style={{ paddingTop: "5px", paddingBottom: "5px", paddingLeft: '10px', }} />
                    </Grid>
                    <Button variant='contained' onClick={CreateAppfun} >
                        Submit
                    </Button>
                </Box>
                <h2 style={{display: "flex", justifyContent: "center"}}></h2>
                <Box id="AppCreateDropBox">
                    <DropFileInput onFileChange={(files) => onFileChange(files)} />
                    <Button variant='contained' onClick={CreateAppfun} >
                        Submit
                    </Button>
                </Box>
        </Container >

        </>
    );
}