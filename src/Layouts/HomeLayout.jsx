import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';

const HomeLayout = () => {
    return (
        <div>

         <div className='max-w-6xl mx-auto'>
         <header>
                <Navbar></Navbar>
                <Banner></Banner>
            </header>
            <main>

            </main>
         </div>
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;