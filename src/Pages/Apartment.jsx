import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

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
      const response = await axios.get(`http://localhost:5000/apartment`, {
        params: { page, minRent, maxRent },
      });
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
        const response = await axios.post('http://localhost:5000/agreement', agreementData);
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
        }

        else {
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
      <div className="max-w-6xl mx-auto">
        <header>
          <Navbar />
        </header>

        <main className="p-4">
          <h2 className="text-3xl font-bold text-center my-6">
            Available Apartments
          </h2>

          {/* Rent Search Filters */}
          <div className="flex justify-center gap-4 mb-6">
            <input
              type="number"
              placeholder="Min Rent"
              className="border-2 border-amber-500 p-2 rounded"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Rent"
              className="border p-2 rounded"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
            <button
              onClick={fetchApartments}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Loading State */}
          {loading && <p className="text-center">Loading apartments...</p>}

          {/* Apartment List */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {apartments.map((apartment) => (
              <div key={apartment._id} className="border p-4 rounded shadow">
                <img
                  src={apartment.image}
                  alt="Apartment"
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold">
                  Floor: {apartment.floor}, Block: {apartment.block}
                </h3>
                <p>Apartment No: {apartment.apartment_no}</p>
                <p>Rent: ${apartment.rent}</p>
                <p className="font-bold text-green-600">{apartment.status}</p>
                {/* Agreement Button */}

                <button
                  onClick={() => handleAgreement(apartment._id)}
                  className="mt-4 bg-[#E8E8E8] text-blue-400 font-semibold px-4 py-2 rounded-2xl border-b-2 border-blue-400 w-full"
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
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Apartment;
