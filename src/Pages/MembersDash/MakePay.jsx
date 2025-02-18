import React, { useContext, useEffect, useState } from 'react';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

const MakePay = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const [agreements, setAgreements] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (user?.email) {
            fetchAgreements(user.email);
        }
    }, [user?.email]); 

    const fetchAgreements = async () => {
        try {
            const response = await axiosSecure.get(`/agreement?email=${user.email}`);
            setAgreements(response.data);
        } catch (error) {
            console.error("Error fetching agreements:", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center my-6">My Agreements</h2>

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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MakePay;
