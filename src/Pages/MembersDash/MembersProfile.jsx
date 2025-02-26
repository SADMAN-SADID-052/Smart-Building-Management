import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../Loading";
import { useState, useEffect, useContext } from "react";

const MembersProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, roleLoading] = useRole();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        if (user?.email) {
          const response = await axiosSecure.get(`/payments/${user.email}`);
          setPaymentHistory(response.data);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [user?.email, axiosSecure]);

  if (loading || roleLoading || historyLoading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-4/5 lg:w-3/5">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white text-center">
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 border-4 border-white shadow-lg"
          />
          <h2 className="mt-3 text-lg font-semibold">{user?.displayName}</h2>
          <p className="text-sm">{user?.email}</p>
          <span className="mt-2 inline-block px-4 py-1 text-xs font-semibold bg-white text-blue-600 rounded-full shadow uppercase">
            {role}
          </span>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Rented Information</h3>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border p-3">Apartment No</th>
                    <th className="border p-3">Floor</th>
                    <th className="border p-3">Block</th>
                    <th className="border p-3">Discount</th>
                    <th className="border p-3">Final Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border text-center even:bg-gray-100 hover:bg-gray-200">
                      <td className="p-3">{payment.apartmentNo}</td>
                      <td className="p-3">{payment.floor}</td>
                      <td className="p-3">{payment.block}</td>
                      <td className="p-3 text-red-500">${payment.discountApplied}</td>
                      <td className="p-3 text-blue-600 font-bold">${payment.finalRentPaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No payment history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersProfile;
