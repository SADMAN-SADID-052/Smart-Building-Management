import { useEffect, useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Slide } from "react-awesome-reveal";

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

  const handleCopyClick = (coupon) => {
    if (coupon.availability === "Unavailable") {
      Swal.fire({
        title: "Coupon Unavailable",
        text: "This coupon is currently unavailable. Please try another one.",
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      return;
    }

    navigator.clipboard.writeText(coupon.couponCode).then(() => {
      setCopiedCoupon(coupon.couponCode);
      setTimeout(() => setCopiedCoupon(null), 2000);
    });
  };

  return (
 <div className="">

     <div className="text-center  bg-blue-300 rounded-2xl p-2 w-1/2 mx-auto mt-4 mb-4">
      <p className="text-2xl font-bold ">Coupons</p>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 min-h-screen  bg-gray-100">
      
     <Slide>

     {coupons.map((coupon) => (
        
        <div
          key={coupon.id}
          className={`relative text-white p-6 rounded-3xl shadow-2xl max-w-sm mx-auto text-center border-4 ${
            coupon.availability === "available"
              ? "bg-gradient-to-r from-green-600 to-blue-500 border-white"
              : "bg-gray-400 border-gray-300 opacity-70"
          }`}
        >
          <div className="text-2xl font-extrabold mb-2">🏡 {coupon.title}</div>
          <div className="text-2xl font-extrabold mb-2">
            ## {coupon.availability}
          </div>
          <p className="text-lg mb-4">
            {coupon.description} <br />
            <span className="text-yellow-400 font-bold text-3xl animate-pulse">
              {coupon.discountPercentage}% OFF
            </span>
          </p>
          <div className="bg-white text-gray-900 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg border border-gray-300">
            <span className="text-xl font-semibold tracking-widest">
              {coupon.couponCode}
            </span>
            <button
              onClick={() => handleCopyClick(coupon)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all focus:outline-none focus:ring-4 ${
                coupon.availability === "available"
                  ? "bg-blue-800 text-white hover:bg-blue-600 focus:ring-blue-300"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={coupon.availability === "unavailable"}
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
     </Slide>
     
    </div>
 </div>
  );
};

export default Coupon;
