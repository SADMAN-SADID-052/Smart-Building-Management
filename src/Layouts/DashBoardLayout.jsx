// import { Outdent } from 'lucide-react';
import React from "react";
import { NavLink, Outlet } from "react-router";
// import Myprofile from '../Pages/UserDashboard/MyProfile';

const DashBoardLayout = () => {
  // TODO: get isAdmin value from the database
  const isAdmin = true;
  return (
    <div className="flex max-w-6xl mx-auto">
      <div className="w-64 min-h-full bg-blue-300">
        <ul className="menu p-4">
          {isAdmin ? ( 
        <>
          
            
              <li>
                <NavLink to="/dashboard/adminProfile">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage">Manage Members</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAnnounce">
                  Make Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/agreementReq">
                 
                  Agreement Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons">Manage Coupons</NavLink>
              </li>
            
          
        
        
        
        </>)
        
        : (
            <>
              <li>
                <NavLink to="/">home</NavLink>
              </li>
              <li>
                <NavLink to="/">abc</NavLink>
              </li>
            </>
          )
          
          }

          {/* Shared nav links  */}

          <div className="divider"></div>
        </ul>
      </div>

      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayout;
