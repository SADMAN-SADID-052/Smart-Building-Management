import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const links = <>
    
  <li>
    
    <NavLink className="flex items-center btn btn-outline" to="/">
  
     <img className='w-5' src="https://img.icons8.com/?size=96&id=80347&format=png" alt="" />
     <p className='text-sm font-bold'>Home</p>
  
  </NavLink>
  
  </li>
  <li><NavLink
  className="flex items-center btn btn-outline ml-2"
  to="/apartment">

  <img className='w-5' src="https://cdn-icons-png.freepik.com/256/2484/2484096.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
  <p className='text-sm font-bold'>Apartment</p>
  
  
  </NavLink></li>
    
    </>
    return (
        <div className=''>

<div className="navbar shadow-sm fixed z-30  opacity-80 max-w-6xl  rounded-tl-3xl rounded-br-3xl"
 style={{ backgroundImage: "url('https://img.freepik.com/free-vector/watercolor-blue-sky-clouds-background_23-2147504592.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')", backgroundSize: 'cover', backgroundPosition: 'center' }}

>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {
        links
       }
      </ul>
    </div>
    <div className='flex items-center'>
        <img className='w-20' src="https://cdn-icons-png.freepik.com/256/7472/7472791.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
    <a className="btn btn-ghost text-2xl font-bold">SmartBMS</a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {

    links
   }
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/auth/login">
        <img className='w-20' src="https://cdn-icons-png.freepik.com/256/10254/10254322.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
    </Link>
  </div>
</div>
            
        </div>
    );
};

export default Navbar;