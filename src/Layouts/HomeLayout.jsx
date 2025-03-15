import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import About from "../Components/About";
import Coupon from "../Components/Coupon";
import Googlemap from "../GoogleMap/GoogleMap";
import { Helmet } from "react-helmet-async";

// import Map from '../Components/Map';
const HomeLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
        <Banner></Banner>
        <section>
          <About></About>
        </section>

        <section>
            <Coupon></Coupon>
          </section>

          <section>
            <Googlemap></Googlemap>
          </section>
      </header>
      <div className="max-w-6xl mx-auto">
        <main>
      
         
        </main>
      </div>
      <Footer></Footer>

      <Helmet>
        <title>Home | Building Management</title>
      </Helmet>
    </div>
  );
};

export default HomeLayout;
