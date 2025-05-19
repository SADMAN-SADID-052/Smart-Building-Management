import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";
import About from "../Components/About";
import Coupon from "../Components/Coupon";
import Facilities from "../Components/Facilities";
import Googlemap from "../GoogleMap/GoogleMap";
import { Helmet } from "react-helmet-async";

// import Map from '../Components/Map';
const HomeLayout = () => {
  return (
    <div className="bg-white">
      <header>
        <Navbar></Navbar>
        <section>
          <Banner></Banner>
        </section>
        <section>
          <About></About>
        </section>

        <section>
          <Facilities></Facilities>
        </section>

        <section>
          <Coupon></Coupon>
        </section>

        <section>
          <Googlemap></Googlemap>
        </section>
      </header>
      <div className="max-w-6xl mx-auto">
        <main></main>
      </div>
      <Footer></Footer>

      <Helmet>
        <title>Home | Building Management</title>
      </Helmet>
    </div>
  );
};

export default HomeLayout;
