import React, { useEffect, useState } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        couponCode: "",
        discountPercentage: "",
        description: ""
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    // Fetch coupons from the database
    const fetchCoupons = async () => {
        try {
            const response = await axiosSecure.get("/coupons"); // Adjust API URL as needed
            setCoupons(response.data);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    // Handle input change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit new coupon
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post("/coupons", formData); // Adjust API URL
            if (response.status === 201) {
                Swal.fire("Success!", "Coupon added successfully.", "success");
                fetchCoupons(); // Refresh the list
                setModalOpen(false); // Close modal
                setFormData({ couponCode: "", discountPercentage: "", description: "" });
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to add coupon.", "error");
            console.error("Error adding coupon:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center my-6">Manage Coupons</h2>

            {/* Add Coupon Button */}
            <button
                onClick={() => setModalOpen(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Coupon
            </button>

            {/* Coupons Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Coupon Code</th>
                            <th className="border p-2">Discount %</th>
                            <th className="border p-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon._id} className="text-center">
                                <td className="border p-2">{coupon.couponCode}</td>
                                <td className="border p-2">{coupon.discountPercentage}%</td>
                                <td className="border p-2">{coupon.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Coupon</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">Coupon Code:</label>
                            <input
                                type="text"
                                name="couponCode"
                                value={formData.couponCode}
                                onChange={handleChange}
                                required
                                className="w-full border p-2 mb-3"
                            />

                            <label className="block mb-2">Discount Percentage:</label>
                            <input
                                type="number"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                                required
                                className="w-full border p-2 mb-3"
                            />

                            <label className="block mb-2">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full border p-2 mb-3"
                            />

                            <div className="flex justify-between mt-4">
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
