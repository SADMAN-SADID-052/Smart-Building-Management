import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Apartment = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // Mock user data (Replace with real authentication logic)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchApartments();
  }, [page, minRent, maxRent]);

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://building-management-server-nu.vercel.app/apartment`,
        {
          params: { page, minRent, maxRent },
        }
      );
      setApartments(response.data.apartments);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
    setLoading(false);
  };

  const handleAgreement = async (apartment) => {
    if (!user) {
      alert("Please log in to apply for an apartment.");
      return;
    }

    const agreementData = {
      userName: user.displayName,
      userEmail: user.email,
      floor: apartment.floor,
      block: apartment.block,
      apartmentNo: apartment.apartment_no,
      rent: apartment.rent,
    };

    try {
      const response = await axios.post(
        "https://building-management-server-nu.vercel.app/agreement",
        agreementData
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Agreement Submitted!",
          text: "Your agreement request has been successfully submitted.",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Already Applied",
          text: "You have already applied for apartment.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Failed to submit agreement. Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="max-w-6xl mx-auto">
        <main className="p-4">
          <h2 className="text-3xl font-bold text-center my-6 mt-24">
            Available Apartments
          </h2>

          {/* Rent Search Filters */}
          <div className="flex justify-center gap-4 mb-6">
            <input
              type="number"
              placeholder="Min Rent"
              className="  p-2 rounded"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Rent"
              className=" p-2 rounded"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
          </div>

          {loading && <p className="text-center">Loading apartments...</p>}

          {/* Apartment List */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {apartments.map((apartment) => (
           <div key={apartment._id} className="
           
           border p-6 rounded-md shadow-lg bg-white  transition duration-300 relative hover:bg-blue-200 hover:border-b-4 hover:border-b-[#FFB200]">
           <img
             src={apartment.image}
             alt="Apartment"
             className="w-full h-48 object-cover rounded-lg mb-4"
           />
           <p className="absolute top-46 right-2 text-white font-semibold text-xl  p-2 rounded-lg">
         <span className="bg-[#FFB200] rounded-md p-1">${apartment.rent}</span>
           </p>
           <h3 className="text-2xl font-bold text-gray-800">
             Floor: {apartment.floor}, Block: {apartment.block}
           </h3>
           <p className="text-gray-600">Apartment No: <span className="font-medium">{apartment.apartment_no}</span></p>
           <p className={`font-bold text-lg ${apartment.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
             Status: {apartment.status}
           </p>
           
           {/* Agreement Button */}
           <button
             onClick={() => handleAgreement(apartment)}
             className="mt-4 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
           >
             AGREEMENT
           </button>
         </div>
         
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-sky-300 px-4 py-2 rounded disabled:opacity-50 text-black font-bold"
            >
              Prev
            </button>
            <span>
              {" "}
              Page {page} of {totalPages}{" "}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-sky-300 px-4 py-2 rounded disabled:opacity-50 font-bold"
            >
              Next
            </button>
          </div>
          <Helmet>
            <title>Apartment | SmartHaven</title>
            <meta
              name="description"
              content="View and update your profile details in the Apartment Management System."
            />
          </Helmet>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Apartment;
