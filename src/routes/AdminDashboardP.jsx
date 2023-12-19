import * as React from 'react';
import { Outlet } from 'react-router-dom';





function AdminDashboardP() {
    const userType = localStorage.getItem('userType'); 
    const renderUserTypeSpecificUI = () => {
        if (userType === '2') {
            return (
                <div id="Application">
                    <h1>Dashboard</h1>
                    <div id="app-details" style={{paddingTop:"5px"}}><Outlet /></div>
                </div>
            );
        }
    };
    return (
        
        <>{renderUserTypeSpecificUI()}</>
    )
}

export default AdminDashboardP;