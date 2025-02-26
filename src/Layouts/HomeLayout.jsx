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
      <div className="max-w-6xl mx-auto">
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
            <Googlemap></Googlemap>
          </section>
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
