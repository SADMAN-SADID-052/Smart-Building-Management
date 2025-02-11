import { useState } from "react";
import { ClipboardCopy, CheckCircle } from "lucide-react";
// import Lottie from "lottie-react";
// import discountAnimation from "./discount.json"; // Import your Lottie JSON animation

const Coupon = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText("RENTFLAT25").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative bg-gradient-to-r from-green-600 to-blue-500 text-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto text-center border-4 border-white">
        
        {/* Top Cutout */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-full"></div>

        {/* Animated Discount Icon
        <div className="flex justify-center mb-4">
          <Lottie animationData={discountAnimation} className="w-24 h-24" />
        </div> */}

        <div className="text-4xl font-extrabold mb-2 animate-pulse">
          🏡 Exclusive Rental Discount!
        </div>
        <p className="text-lg mb-6">
          Rent an apartment and get{" "}
          <span className="text-yellow-400 font-bold text-3xl">25% OFF</span> your first month's rent!
        </p>

        {/* Coupon Code Section */}
        <div className="bg-white text-gray-900 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg border border-gray-300">
          <span className="text-2xl font-semibold tracking-widest">RENTFLAT25</span>
          <button
            onClick={handleCopyClick}
            className="bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-green-300" /> : <ClipboardCopy className="w-5 h-5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Expiry Date & Terms */}
        <div className="text-sm mt-6 bg-white/20 p-4 rounded-lg">
          <p className="font-semibold">
            📅 Valid Until: <span className="underline">March 31, 2025</span>
          </p>
          <p className="opacity-80">🚀 Available for new tenants only. Terms & conditions apply.</p>
        </div>

        {/* Bottom Cutout */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  );
};

export default Coupon;
