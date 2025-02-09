import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div>

        <div className='max-w-6xl mx-auto'>

        <header>
            <Navbar></Navbar>
        </header>

        <Outlet></Outlet>
        </div>

       

        <footer>
            <Footer></Footer>
        </footer>
        
    </div>
    );
};

export default AuthLayout;