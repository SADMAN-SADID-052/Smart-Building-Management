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
// import DashBoard from './Layouts/DashBoard.jsx';

import DashBoardLayout from './Layouts/DashBoardLayout.jsx';

import Announcements from './Pages/UserDashboard/Announcements.jsx';
import AllMembers from './Pages/UserDashboard/AllMembers.jsx';
import AgreementReq from './Pages/AdminDash/AgreementReq.jsx';
import Profile from './Pages/CommonDash/Profile.jsx';
import MakePay from './Pages/MembersDash/MakePay.jsx';
import ManageCoupons from './Pages/AdminDash/ManageCoupons.jsx';



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

  {

    path:'/dashboard',
    element:(<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>),
    children:[
      {
        

        path:'myProfile',
        element:(<PrivateRoute>

          <Profile></Profile>
        </PrivateRoute>)

      },

      {

        path:'announcements',
        element:<Announcements></Announcements>
      }

      ,{

        path:'manage',
        element:<AllMembers></AllMembers>
      },
      {
        path:'manageCoupon',
        element:(<PrivateRoute>

          <ManageCoupons></ManageCoupons>
        </PrivateRoute>)
      },

      {
        path:'agreementReq',
        element:<AgreementReq></AgreementReq>
      },
      {
        path:'makePay',
        element:(<PrivateRoute>

          <MakePay></MakePay>
        </PrivateRoute>)
      }

      
    ]


  }


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
