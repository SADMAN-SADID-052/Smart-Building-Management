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


import AllMembers from './Pages/UserDashboard/AllMembers.jsx';
import AgreementReq from './Pages/AdminDash/AgreementReq.jsx';
import Profile from './Pages/CommonDash/Profile.jsx';
import MakePay from './Pages/MembersDash/MakePay.jsx';
import ManageCoupons from './Pages/AdminDash/ManageCoupons.jsx';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Announcements from './Pages/CommonDash/Announcements.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import MemberRoute from './Routes/MemberRoute.jsx';
import PayHistory from './Pages/MembersDash/PayHistory.jsx';
import MakeAnnounce from './Pages/AdminDash/MakeAnnounce.jsx';
import ManageMembers from './Pages/AdminDash/ManageMembers.jsx';


const queryClient = new QueryClient()




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
        element:(<PrivateRoute>
          <Announcements></Announcements>
        </PrivateRoute>)
      },
     

    

      ,{

        path:'manage',
        element:<AllMembers></AllMembers>
      },
      {
        path:'manageCoupon',
        element:(<PrivateRoute>

          <AdminRoute>
          <ManageCoupons></ManageCoupons>
          </AdminRoute>
        </PrivateRoute>)
      },

      {
        path:'agreementReq',
        element:(<PrivateRoute>

          <AdminRoute>
          <AgreementReq></AgreementReq>
          </AdminRoute>
        </PrivateRoute>)
      },
      {

        path:'makeAnnounce',
        element:(<PrivateRoute>

          <AdminRoute>
          <MakeAnnounce></MakeAnnounce>
          </AdminRoute>
        </PrivateRoute>)

      },


      {

        path:'manageMembers',
        element:(<PrivateRoute>

          <AdminRoute>
          <ManageMembers></ManageMembers>
          </AdminRoute>
        </PrivateRoute>)

      },


      {
        path:'makePay',
        element:(<PrivateRoute>

         <MemberRoute>
         <MakePay></MakePay>
         </MemberRoute>
        </PrivateRoute>)
      },

      {
        path:'payHistory',
        element:(<PrivateRoute>

         <MemberRoute>
         <PayHistory></PayHistory>
         </MemberRoute>
        </PrivateRoute>)
      }


      
    ]


  }


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>


<QueryClientProvider client={queryClient}>
<RouterProvider router={router} />
    </QueryClientProvider>




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
