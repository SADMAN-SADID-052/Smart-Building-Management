import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AllAgreements = () => {
  const axiosSecure = useAxiosSecure();
  const [agreements, setAgreements] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAgreements();
  }, []);

  // Fetch all agreements and users
  const fetchAllAgreements = async () => {
    try {
      const [agreementsResponse, usersResponse] = await Promise.all([
        axiosSecure.get("/agreement"),
        axiosSecure.get("/allUsers"),
      ]);

      setUsers(usersResponse.data);

      const adminEmails = new Set(
        usersResponse.data
          .filter((user) => user.role === "admin")
          .map((user) => user.email)
      );

      const filteredAgreements = agreementsResponse.data.filter(
        (agreement) => !adminEmails.has(agreement.userEmail)
      );

      setAgreements(filteredAgreements);
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = (email) => {
    const user = users.find((user) => user.email === email);
    return user ? user.role : "Not Assigned";
  };

  //  accept
  const handleAccept = async (agreement) => {
    try {
      const response = await axiosSecure.patch(`/agreement/${agreement._id}`, {
        action: "accept",
      });

      Swal.fire(
        "Success!",
        "Agreement accepted and stored successfully.",
        "success"
      );
      fetchAllAgreements();
    } catch (error) {
      Swal.fire("Error!", "Failed to accept agreement.", "error");
      console.error("Error updating agreement:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axiosSecure.patch(`/agreement/${id}`, {
        action: "reject",
      });

      if (response.status === 200) {
        Swal.fire("Rejected!", "Agreement has been rejected.", "info");
        fetchAllAgreements(); // Refresh data after update
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to reject agreement.", "error");
      console.error("Error rejecting agreement:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-3xl font-bold  text-blue-400 flex items-center justify-center gap-4 mb-10">
        <p>Agreement Request</p>
        <img
          className="w-12"
          src="https://cdn-icons-png.freepik.com/256/3079/3079968.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
          alt="Agreement Request"
        />
      </div>
      {loading && (
        <p className="text-center text-xl text-gray-500 animate-pulse">
          Loading agreements...
        </p>
      )}
      {agreements.length === 0 && !loading ? (
        <p className="text-center text-xl text-gray-600">
          No agreements found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agreements.map((agreement) => (
            <div
              key={agreement._id}
              className=" shadow-2xl  p-6 transition-all duration-300 hover:shadow-3xl hover:scale-[1.03] overflow-hidden"
            >
              {/* Gradient Border */}
              <div className=""></div>

              <div className="flex flex-col items-center">
                <img
                  className="w-18"
                  src="https://cdn-icons-png.freepik.com/256/16327/16327810.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                  alt=""
                />
                <p className="text-lg text-gray-800">
                  {agreement.userName || "N/A"}
                </p>
                <p className="text-lg text-gray-800 mt-4">
                  <span className="bg-pink-200 px-3 py-1 rounded-xl">
                    {" "}
                    {agreement.userEmail || "N/A"}
                  </span>
                </p>
              </div>
              <h3 className="text-2xl font-extrabold mb-3 text-gray-900">
                Apartment No: {agreement.apartmentNo}
              </h3>

              <p className="text-lg text-gray-800">
                <strong>Floor:</strong> {agreement.floor || "N/A"}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Block:</strong> {agreement.block || "N/A"}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Rent:</strong> ${agreement.rent || "N/A"}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Request date:</strong>{" "}
                {agreement.createdAt
                  ? new Date(agreement.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <p
                className={`text-xl font-bold mt-3 ${
                  agreement.status === "pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Status: {agreement.status || "Pending"}
              </p>
              <p className="text-lg text-gray-800">
                <strong>Role:</strong> {getUserRole(agreement.userEmail)}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleAccept(agreement)}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(agreement._id)}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Helmet>
        <title>Admin-AgreementReq | SmartHaven</title>
      </Helmet>
    </div>
  );
};

export default AllAgreements;
