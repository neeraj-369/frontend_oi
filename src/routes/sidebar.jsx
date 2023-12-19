import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./sidebar.css";
import { Height } from "@mui/icons-material";
import logo from "./icon.jpg";
export default function SideLayout() {
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    alert("Logged out successfully");
  };
  const navbarStyle = {
    backgroundColor: "#121212" , // Background color
    color: "white", 
    // height: "100%", // Height of navbar
    // position: "fixed",
    // display: "block"// Text color
    // fontsize: "50px"
  };
  const renderLinksBasedOnUserType = () => {
    switch (userType) {
      case "0": // User
        return (
          <>
            <li>
              <Link to={"/apps"}>Available Games</Link>
            </li>
            <li>
              <Link onClick={handleLogout} to={"/login"}>
                Logout
              </Link>
            </li>
          </>
        );

      case "1": // Developer
        return (
          <>
            <li>
              <Link to={"/apps"}>Applications</Link>
            </li>
            <li>
              <Link to={"/appversions"}>Versions</Link>
            </li>
            <li>
              <Link to={"/version"}>Instances</Link>
            </li>
            <li>
              <Link onClick={handleLogout} to={"/login"}>
                Logout
              </Link>
            </li>
          </>
        );

      case "2": // Admin
        return (
            <>
            <li>
              <Link to={"/dashb"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/apps"}>Applications</Link>
            </li>
            <li>
              <Link to={"/appversions"}>Versions</Link>
            </li>
            <li>
              <Link to={"/version"}>Instances</Link>
            </li>
            <li>
              <Link to={"/reset"}>Reset</Link>
            </li>
            <li>
              <Link onClick={handleLogout} to={"/login"}>
                Logout
              </Link>
            </li>
          </>
        );

      default:
        return null; // Handle other cases as needed
    }
  };

  return (
    <>
      <div style={navbarStyle} id="sidebar">
        <div id="OneImmlogo" backgroundColor="#121212"> 
          <img src={logo} alt="One Immersive" width="100px" backgroundColor="#121212"/>
        </div>
        <h1>Scalable XR Pixel Streaming</h1>
        <nav>
          <ul style={navbarStyle}>
            {renderLinksBasedOnUserType()}
            {/* Additional links for other user types can be added here */}
          </ul>
        </nav>
      </div>
      <div id="details">
        <Outlet />
      </div>
    </>
  );
}
