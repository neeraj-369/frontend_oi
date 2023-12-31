import * as React from 'react';
import { Outlet } from 'react-router-dom';





function Applications() {
    const userType = localStorage.getItem('userType'); 
    const renderUserTypeSpecificUI = () => {
        if (userType === '0') {
            return (
                <div id="Application">
                    <h1>Games</h1>
                    <div id="app-details" style={{paddingTop:"5px"}}><Outlet /></div>
                </div>
            );
        }else
        {
            return (
                <div id="Application">
                    <h1>Applications</h1>
                    <div id="app-details" style={{paddingTop:"5px"}}><Outlet /></div>
                </div>
            );
    
        }
    
    };
    return (
        
        <>{renderUserTypeSpecificUI()}</>
    )
}

export default Applications;