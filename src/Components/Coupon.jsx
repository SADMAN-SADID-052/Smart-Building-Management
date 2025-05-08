import { useEffect, useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Fade, Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

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
    <div
      id="coupon"
    
    >
      <div className="text-center p-4 font-semibold text-2xl ">
        <div className="max-w-5xl mx-auto text-center mb-7">
          <Fade duration={1000}>
            <h2 className="text-4xl font-bold text-[#4DB2F6] ">
              Coupons
            </h2>
          </Fade>

          <Fade duration={1000}>
            <p className="text-gray-300 mt-10 text-sm">
              SmartHaven is an advanced Building Management System (BMS)
              designed to <br />
              streamline apartment rental, tenant management, and administrative
              operations.
            </p>
          </Fade>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 min-h-screen max-w-6xl mx-auto">
        {coupons.map((coupon) => (
          <Zoom>
            <div
              key={coupon.id}
              className={`relative text-white p-6 shadow-2xl max-w-sm mx-auto text-center rounded-md ${
                coupon.availability === "available"
                  ? "border-white"
                  : "border-gray-300 opacity-70 bg-gray-400"
              }`}
              style={{
                backgroundColor:
                  coupon.availability === "available"
                    ? "white"
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 80,
              }}
            >
              <div className="flex justify-center">
                <img
                  className="w-20 "
                  src="https://cdn-icons-png.freepik.com/256/2854/2854186.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                  alt=""
                />
              </div>
              <div className="text-2xl font-extrabold mb-2 text-[#2C3930] uppercase">
                {coupon.availability}
              </div>
              <p className="text-lg mb-4 text-[#780C28] font-semibold bg-amber-600">
                {coupon.description} <br />
                <span className="text-[#FF9D23] font-bold text-3xl animate-pulse">
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
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default Coupon;
