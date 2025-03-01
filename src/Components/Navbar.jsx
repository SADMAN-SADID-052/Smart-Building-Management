import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Typewriter } from 'react-simple-typewriter';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // Get user and logout from context
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center btn btn-outline ${
              isActive ? "bg-blue-500 text-white" : ""
            }`
          }
          to="/"
        >
          <img
            className="w-5"
            src="https://img.icons8.com/?size=96&id=80347&format=png"
            alt="Home"
          />
          <p className="text-sm font-bold">Home</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `flex items-center btn btn-outline ml-2 ${
              isActive ? "bg-blue-500 text-white" : ""
            }`
          }
          to="/apartment"
        >
          <img
            className="w-5"
            src="https://cdn-icons-png.freepik.com/256/2484/2484096.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
            alt="Apartment"
          />
          <p className="text-sm font-bold">Apartment</p>
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div
        className="navbar shadow-sm fixed z-30 opacity-80 max-w-6xl rounded-tl-3xl rounded-br-3xl"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/watercolor-blue-sky-clouds-background_23-2147504592.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <img
              className="w-20"
              src="https://cdn-icons-png.freepik.com/256/7472/7472791.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
              alt="Logo"
            />
            <a className="btn btn-ghost text-2xl font-bold">
            <span style={{ color: 'purple', fontWeight: 'bold' }}>
        <Typewriter
          words={['SmartHaven']}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </span>
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <img
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-12 h-12 rounded-full cursor-pointer border-b-blue-500 border-t-blue-500 border-2"
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 p-2">
                  <div className="px-4 py-2 text-sm text-gray-700 font-bold text-center">
                    {user.displayName}
                  </div>
                  <hr />
                  <Link to="/dashboard" className="btn btn-error w-full mt-2 hover:bg-black">
                   <div className="flex gap-1 items-center">
                    <img className="w-5" src="https://cdn-icons-png.freepik.com/256/16596/16596825.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
                    <p className="text-white ">Dashboard</p>
                   </div>
                  </Link>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-black font-bold btn btn-primary mt-2"
                  >
                    <div className="flex items-center gap-1">
                      <img className="w-5" src="https://cdn-icons-png.freepik.com/256/10977/10977462.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
                      <p>Logout</p>
                    </div>
                   
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth/login">
              <img
                className="w-28 rounded-4xl"
                src="https://img.freepik.com/premium-vector/black-red-sign-that-sayslogitechon-it_614034-22766.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                alt="Login"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
