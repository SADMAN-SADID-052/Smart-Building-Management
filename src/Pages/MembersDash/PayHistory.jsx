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
    }, [user?.email, axiosSecure]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Payment History</h2>

            {loading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : payments.length === 0 ? (
                <p className="text-gray-500 text-center">No payment records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3">Email</th>
                                <th className="p-3">Apartment</th>
                                <th className="p-3">Floor</th>
                                <th className="p-3">Block</th>
                                <th className="p-3">Original Rent</th>
                                <th className="p-3">Discount</th>
                                <th className="p-3">Final Paid</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {payments.map((payment, index) => (
                                <tr key={index} className="text-center hover:bg-gray-100">
                                    <td className="p-3">{payment.userEmail}</td>
                                    <td className="p-3">{payment.apartmentNo}</td>
                                    <td className="p-3">{payment.floor}</td>
                                    <td className="p-3">{payment.block}</td>
                                    <td className="p-3 text-green-600 font-semibold">${payment.originalRent}</td>
                                    <td className="p-3 text-red-500">${payment.discountApplied}</td>
                                    <td className="p-3 text-blue-600 font-bold">${payment.finalRentPaid}</td>
                                    <td className="p-3">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PayHistory;
