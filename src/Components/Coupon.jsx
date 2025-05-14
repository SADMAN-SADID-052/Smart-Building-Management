import { useEffect, useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Fade, Zoom } from "react-awesome-reveal";

const Coupon = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axiosSecure.get("/coupons");
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
    <div id="coupon">
      <div className="text-center p-4 ">
        <div className="max-w-5xl mx-auto mb-7">
          <Fade duration={1000}>
            <h2 className="text-4xl font-bold text-[#4DB2F6]">Coupons</h2>
          </Fade>

          <Fade duration={1000}>
            <p className="text-sm md:text-base lg:text-lg lg:text-gray-700 mt-10">
              SmartHaven is an advanced Building Management System (BMS)
              designed to <br />
              streamline apartment rental, tenant management, and administrative
              operations.
            </p>
          </Fade>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 p-5 min-h-screen max-w-6xl mx-auto">
        {coupons.map((coupon) => (
          <Zoom key={coupon.id}>
            <div
              className={`group relative overflow-hidden text-white p-6 shadow-md max-w-sm mx-auto text-center rounded-md transition-all duration-300 hover:border-4 hover:border-[#4db2f69a] ${
                coupon.availability === "available"
                  ? "border-white bg-white"
                  : "border-gray-300 opacity-70 bg-[#43c3ff52]"
              }`}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex justify-center">
                <img
                  className="w-20"
                  src="https://cdn-icons-png.freepik.com/256/11652/11652451.png"
                  alt="coupon logo"
                />
              </div>

              <div className="text-2xl font-extrabold mb-2 text-[#2C3930] uppercase">
                {coupon.availability}
              </div>

              <p className="text-lg mb-4 text-[#374151] font-semibold bg-amber-600">
                {coupon.description} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4BD988] to-[#5DAAEE] font-bold text-3xl animate-pulse">
                  {coupon.discountPercentage}% OFF
                </span>
              </p>

              {/* Slide-up Coupon Code*/}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                <div className="transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out pointer-events-auto w-full px-6 mb-6 ">
                  <div className="bg-white text-gray-900 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg border border-gray-300">
                    <span className="text-xl font-semibold tracking-widest">
                      {coupon.couponCode}
                    </span>
                    <button
                      onClick={() => handleCopyClick(coupon)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all focus:outline-none focus:ring-4 ${
                        coupon.availability === "available"
                          ? "bg-blue-400 text-white hover:bg-blue-600 focus:ring-blue-300"
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
              </div>
            </div>
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default Coupon;
