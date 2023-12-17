import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';

export default function DashDataTable() {
    const handleResetClick = () => {
        axios.post('http://13.233.26.133/test/reset') 
            .then(response => {
                console.log('Reset successful:', response.data);
            })
            .catch(error => {
                console.error('Error resetting data:', error);
            });
    };
    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button variant="outlined" onClick={handleResetClick}>
                Reset
            </Button>
        </div>
    );
}
