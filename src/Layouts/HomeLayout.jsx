import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';
import About from '../Components/About';
import Coupon from '../Components/Coupon';
// import Map from '../Components/Map';
const HomeLayout = () => {
    return (
        <div>

         <div className='max-w-6xl mx-auto'>
         <header>
                <Navbar></Navbar>
                <Banner></Banner>
            </header>
            <main>

                <section>
                    <About></About>
                </section>

                <section>
                    <Coupon></Coupon>
                </section>
                <section>
                    {/* <Map></Map> */}
                </section>

            </main>
         </div>
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;