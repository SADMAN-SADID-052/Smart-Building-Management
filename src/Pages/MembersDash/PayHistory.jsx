import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const PayHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user?.email) return; 

            try {
                const response = await axiosSecure.get(`/payments/${user.email}`);
                setPayments(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching payment history");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user?.email, axiosSecure]); // Add dependencies

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : payments.length === 0 ? (
                <p>No payment records found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Apartment</th>
                            <th className="border border-gray-300 p-2">Floor</th>
                            <th className="border border-gray-300 p-2">Block</th>
                            <th className="border border-gray-300 p-2">Original Rent</th>
                            <th className="border border-gray-300 p-2">Discount</th>
                            <th className="border border-gray-300 p-2">Final Paid</th>
                            <th className="border border-gray-300 p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index} className="text-center">
                                   <td className="border border-gray-300 p-2">{payment.userEmail}</td>
                                <td className="border border-gray-300 p-2">{payment.apartmentNo}</td>
                                <td className="border border-gray-300 p-2">{payment.floor}</td>
                                <td className="border border-gray-300 p-2">{payment.block}</td>
                                <td className="border border-gray-300 p-2">${payment.originalRent}</td>
                                <td className="border border-gray-300 p-2">${payment.discountApplied}</td>
                                <td className="border border-gray-300 p-2">${payment.finalRentPaid}</td>
                                <td className="border border-gray-300 p-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PayHistory;
