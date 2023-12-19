import React from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  // const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  // if (!token) {
  //   alert("Please login to continue");
  //   return <Navigate to="/login" />;
  // }
  if(username === null || userType === null){
    alert("Please login to continue");
    return <Navigate to="/login" />;
  }
  return children;
};

export default RouteGuard;
