import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    couponCode: "",
    discountPercentage: "",
    description: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Fetch coupons from the database
  const fetchCoupons = async () => {
    try {
      const response = await axiosSecure.get("/coupons"); // Adjust API URL
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
        fetchCoupons(); // Refresh list
        setModalOpen(false); // Close modal
        setFormData({
          couponCode: "",
          discountPercentage: "",
          description: "",
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to add coupon.", "error");
      console.error("Error adding coupon:", error);
    }
  };

  const handleAvailabilityChange = async (couponId, currentStatus) => {
    const newStatus =
      currentStatus === "available" ? "Unavailable" : "available";

    try {
      await axiosSecure.patch(`/coupons/${couponId}`, {
        availability: newStatus,
      }); // Update in database
      Swal.fire("Updated!", `Coupon is now ${newStatus}.`, "success");
      fetchCoupons(); // Refresh list
    } catch (error) {
      Swal.fire("Error!", "Failed to update availability.", "error");
      console.error("Error updating coupon:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-3xl font-bold  text-blue-400 flex items-center justify-center gap-4 mb-4">
        <p>Manage Coupons </p>
        <img
          className="w-12"
          src="https://cdn-icons-png.freepik.com/256/1235/1235577.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
          alt="Coupons"
        />
      </div>

      {/* Add Coupon Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 shadow-md transition"
      >

        <div className="flex items-center gap-3">
           <img className="w-7" src="https://cdn-icons-png.freepik.com/256/2406/2406057.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" alt="" />
         <p className="font-semibold">Add Coupon</p>
        </div>
       
      </button>

      {/* Coupons Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300 text-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-3 text-sm">Coupon Code</th>
              <th className="border p-3 text-sm">Discount</th>
              <th className="border p-3 text-sm">Description</th>
              <th className="border p-3 text-sm">Availability</th>
              <th className="border p-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr
                key={coupon._id}
                className="text-center odd:bg-gray-100 even:bg-gray-50"
              >
                <td className="border p-3">{coupon.couponCode}</td>
                <td className="border p-3">{coupon.discountPercentage}%</td>
                <td className="border p-3">{coupon.description}</td>
                <td className="border p-3">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-md ${
                      coupon.availability === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {coupon.availability}
                  </span>
                </td>
                <td className="border p-3">
                  <button
                    onClick={() =>
                      handleAvailabilityChange(coupon._id, coupon.availability)
                    }
                    className={`px-4 py-2 rounded-lg text-white font-medium transition shadow-md text-sm ${
                      coupon.availability === "available"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {coupon.availability === "available"
                      ? "Make Unavailable"
                      : "Make Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Add New Coupon
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Coupon Code:
                </label>
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Discount Percentage:
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200"
                ></textarea>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
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
