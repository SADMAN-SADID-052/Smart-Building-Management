import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomeLayout from './Layouts/HomeLayout.jsx'
import Apartment from './Pages/Apartment.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import AuthLayout from './Layouts/AuthLayout.jsx'
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { googleMapAPIKey } from './GoogleMap/map-api-key.js';
import PrivateRoute from './Routes/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },

  {
    path:"auth",
    element:<AuthLayout></AuthLayout>,
    children:[
  
      {
        path:"/auth/login",
        element:<Login></Login>,
      },
      {
        path:"/auth/signup",
        element: <SignUp></SignUp>,
      }
      
    ]
  },

  {

    path:"/apartment",
    element:(<PrivateRoute>
      <Apartment></Apartment>
    </PrivateRoute>)
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>

<RouterProvider router={router} />

<ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>

<APIProvider apiKey={googleMapAPIKey}></APIProvider>
</AuthProvider>





  
  </StrictMode>,
)
