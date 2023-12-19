import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RouteGuard from './RouteGuard'
import SideLayout from './routes/sidebar';
import Dashboard from './routes/dashboard';
import Applications from './routes/applications';
import Versions from './routes/version';
import ErrorPage from './error-page';
import Billing from './routes/billing';
import Profile from './routes/profile';
import SignIn from './components/login';
import SignUp from './components/register';
import AppDataTableR from './components/apptabler'
import AppDataTable from './components/apptable';
import DashDataTable from './components/dashtable';
import VerDataTable from './components/vertable';
import AdminDashboard from './components/admindashboard';
import AdminDashboardP from './routes/AdminDashboardP';
import AppCreate from './components/appcreate';
import NameDetailPage from './components/namedetailpage';
import ApplicationDetails from './components/appdetails';
import Appversions from './routes/appversions';
import AppVersionT from './components/appversiont';
import VersionCreate from './components/versioncreate';
import { ThemeProvider } from '@mui/material/styles'; 
import { createTheme } from '@mui/material/styles';
// import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     // width: '90%',
//     // marginLeft: 'auto',
//     // marginRight: 'auto',
//     // paddingBottom: 0,
//     // marginTop: 0,
//     // fontWeight: 500
//   },
//   input: {
//     // color: 'white'
//   }
// }));


const theme = createTheme({
  // overrides: {
  //   // MuiButton: {
  //   //   outlined: {
  //   //     border: '2px solid blue',
  //   //     '&:active, &:focus': {
  //   //       border: '2px solid blue',
  //   //     },
  //   //   },
  //   // },
  cssLabel: {
    // color : 'pink'
    color: '#fc3'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      // borderColor: `red !important`,
      borderColor: '#fc3 !important'
    }
  },

  cssFocused: {
    // color:'white !important'
    color: '#fc3 !important'
  },

  notchedOutline: {
    // borderWidth: '1px',
    // borderColor: 'green !important'
    borderColor: '#fc3 !important'
  },
    palette:{
      secondary:{
        main: '#fc3',
        light: '#fc3',
        dark: '#fc3',
        contrastText: '#fc3',
      },
    },
    overrides: {
      MuiButton: {
        raisedSecondary: {
          color: '#fc3',
        },
      },
    }
  // },
});

const router = createBrowserRouter(
  [
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <SignIn />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/register',
        element: <SignUp />
      }
    ]
  },
  {
    element: <SideLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashb',
        element: <RouteGuard><AdminDashboardP /></RouteGuard>,
        children: [
          {
            path: "/dashb",
            element: <AdminDashboard  />
          },
        ]

      },
      {
        path: '/apps',
        element: <RouteGuard><Applications /></RouteGuard>,
        children: [
          {
            path: "/apps",
            element: <AppDataTableR />
          },
          {
            path: "/apps/create",
            element: <AppCreate />
          },
        ]
      },
      // 
      // 
      
      // 
      // 
      {
        path: '/appversions',
        element: <RouteGuard><Appversions/></RouteGuard>,
        children: [
          {
            path:"/appversions",
            element: <AppDataTable />
          },
          {
            path: "/appversions/:applicationId",
            element: <AppVersionT />
          },
          {
            path: "/appversions/create/:applicationname",
            element: <VersionCreate/>
          }
        ]
      },
      {
        path: '/version',
        element: <RouteGuard><Versions /></RouteGuard>,
        children: [
          {
            path: "/version",
            element: <VerDataTable />
          },
          {
            path: "/version/create",
            element: <div>Create Version</div>
          },
          {
            path: '/version/name/:name',
            element: <NameDetailPage/>
          }
        ]
      },
      {
        path: '/reset',
        element: <RouteGuard><Dashboard /></RouteGuard>,
        children: [
          {
            path: "/reset",
            element: <DashDataTable />,
          }
        ]
      },
      {
        path: 'billing',
        element: <RouteGuard><Billing /></RouteGuard>
      },
      {
        path: 'profile',
        element: <RouteGuard><Profile /></RouteGuard>
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <RouterProvider router = {router} />
    </ThemeProvider>
  </>
);

