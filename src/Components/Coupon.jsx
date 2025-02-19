import { useEffect, useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Coupon = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState(null);

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

  const handleCopyClick = (couponCode) => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopiedCoupon(couponCode);
      setTimeout(() => setCopiedCoupon(null), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 p-5 min-h-screen bg-gray-100">
      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className="relative bg-gradient-to-r from-green-600 to-blue-500 text-white p-6 rounded-3xl shadow-2xl max-w-sm mx-auto text-center border-4 border-white"
        >
          <div className="text-2xl font-extrabold mb-2 ">🏡 {coupon.title}</div>
          <p className="text-lg mb-4 ">
            {coupon.description} <br />
            <span className="text-yellow-400 font-bold text-3xl animate-pulse">
              {coupon.discountPercentage}% OFF
            </span>
          </p>
          <div className="bg-white text-gray-900 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg border border-gray-300">
            <span className="text-xl font-semibold tracking-widest">{coupon.couponCode}</span>
            <button
              onClick={() => handleCopyClick(coupon.couponCode)}
              className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {copiedCoupon === coupon.couponCode ? (
                <CheckCircle className="w-5 h-5 text-green-300" />
              ) : (
                <ClipboardCopy className="w-5 h-5" />
              )}
              {copiedCoupon === coupon.couponCode ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coupon;
