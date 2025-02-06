import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home.jsx'
import HomeLayout from './Layouts/HomeLayout.jsx'
import Apartment from './Pages/Apartment.jsx'
import Login from './Pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },

  {

    path:"/apartment",
    element:<Apartment></Apartment>
  },

  {
    path:"/login",
    element:<Login></Login>


  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

<RouterProvider router={router} />
  
  </StrictMode>,
)
