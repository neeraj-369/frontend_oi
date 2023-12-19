import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';

export default function DashDataTable() {
    const handleResetClick = () => {
        axios.post('http:///13.201.53.69/test/reset') 
            .then(response => {
                console.log('Reset successful:', response.data);
            })
            .catch(error => {
                console.error('Error resetting data:', error);
            });
    };
    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button variant='contained' color = 'secondary' sx={{ fontSize:"1rem",color:"#121212",bgcolor:"#fc3"}} onClick={handleResetClick}>
                Reset
            </Button>
        </div>
    );
}
