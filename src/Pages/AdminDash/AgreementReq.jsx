import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const AllAgreements = () => {
    
    const [agreements, setAgreements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllAgreements();
    }, []);

    const fetchAllAgreements = async () => {
        try {
            const response = await axios.get("http://localhost:5000/agreements");
            setAgreements(response.data);
        } catch (error) {
            console.error("Error fetching agreements:", error);
        }
        setLoading(false);
    };

    const handleAction = async (id, action) => {
        try {
            const response = await axios.patch(`http://localhost:5000/agreements/${id}`, { action });

            if (response.status === 200) {
                Swal.fire("Success!", "Agreement updated successfully.", "success");
                fetchAllAgreements(); // Refresh data after update
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to update agreement.", "error");
            console.error("Error updating agreement:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center my-6">All User Agreements</h2>

            {loading && <p className="text-center">Loading agreements...</p>}

            {agreements.length === 0 && !loading ? (
                <p className="text-center">No agreements found.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {agreements.map((agreement) => (
                        <div key={agreement._id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Apartment No: {agreement.apartmentNo}</h3>
                            <p><strong>Username:</strong> {agreement.userName || "N/A"}</p>
                            <p><strong>Email:</strong> {agreement.userEmail || "N/A"}</p>
                            <p><strong>Floor:</strong> {agreement.floor || "N/A"}</p>
                            <p><strong>Block:</strong> {agreement.block || "N/A"}</p>
                            <p><strong>Rent:</strong> ${agreement.rent || "N/A"}</p>
                            <p className={`font-bold ${agreement.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
                                Status: {agreement.status || "Pending"}
                            </p>
                            <p><strong>Role:</strong> {agreement.userRole || "Not assigned"}</p>
                            <div className="mt-4 flex gap-4">
                                <button 
                                    onClick={() => handleAction(agreement._id, "accept")} 
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Accept
                                </button>
                                <button 
                                    onClick={() => handleAction(agreement._id, "reject")} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
