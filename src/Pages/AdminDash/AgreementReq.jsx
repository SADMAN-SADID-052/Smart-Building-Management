import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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

      setUsers(usersResponse.data); // Store users data

      // Create a set of admin emails
      const adminEmails = new Set(
        usersResponse.data
          .filter((user) => user.role === "admin")
          .map((user) => user.email)
      );

      // Filter agreements to exclude those linked to admin users
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

  // Get the role of a user based on email
  const getUserRole = (email) => {
    const user = users.find((user) => user.email === email);
    return user ? user.role : "Not Assigned";
  };

  // Handle accept/reject actions
  const handleAction = async (id, action, email) => {
    try {
      const response = await axiosSecure.patch(`/agreement/${id}`, { action });

      if (response.status === 200) {
        // If accepted, update the user's role
        // if (action === "accept") {
        //   await axiosSecure.patch(`/updateUserRole`, {
        //     email,
        //     role: "member",
        //   });
        // }

        Swal.fire("Success!", "Agreement updated successfully.", "success");
        fetchAllAgreements(); // Refresh data after update
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update agreement.", "error");
      console.error("Error updating agreement:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-5xl font-extrabold text-center my-10 text-gray-900">
        All User Agreements
      </h2>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agreements.map((agreement) => (
            <div
              key={agreement._id}
              className="bg-gradient-to-r from-blue-300 to-sky-900 text-white shadow-xl rounded-2xl p-6 border border-gray-300 transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-3">
                Apartment No: {agreement.apartmentNo}
              </h3>
              <p className="text-lg">
                <strong>Username:</strong> {agreement.userName || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {agreement.userEmail || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Floor:</strong> {agreement.floor || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Block:</strong> {agreement.block || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Rent:</strong> ${agreement.rent || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Agreement request date:</strong>{" "}
                {agreement.createdAt
                  ? new Date(agreement.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p
                className={`text-xl font-bold ${
                  agreement.status === "pending"
                    ? "text-yellow-300"
                    : "text-green-300"
                }`}
              >
                Status: {agreement.status || "Pending"}
              </p>
              <p className="text-lg">
                <strong>Role:</strong> {getUserRole(agreement.userEmail)}
              </p>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() =>
                    handleAction(agreement._id, "accept", agreement.userEmail)
                  }
                  className="btn btn-success text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleAction(agreement._id, "reject", agreement.userEmail)
                  }
                  className="btn btn-error text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAgreements;
