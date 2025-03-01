import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const MakePayment = () => {
  const [agreements, setAgreements] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalRent, setFinalRent] = useState(0);
  const [paidAgreements, setPaidAgreements] = useState([]);

  // Fetch user-specific agreements
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/acceptedAgreements")
      .then((response) => {
        const userAgreements = response.data.filter(
          (agreement) => agreement.userEmail === user.email
        );
        setAgreements(userAgreements);
      })
      .catch((error) => console.error("Error fetching agreements:", error));
  }, [user?.email, axiosSecure]);

  // Open modal & set default values
  const openModal = (agreement) => {
    setSelectedAgreement(agreement);
    setFinalRent(agreement.rent);
    setDiscount(0);
    setCouponCode("");
    setIsModalOpen(true);
  };

  // Apply coupon & calculate discount
  const applyCoupon = async (e) => {
    e.preventDefault(); // Prevents form submission refresh

    try {
      const response = await axiosSecure.get("/coupons");
      const allCoupons = response.data;

      // Find matching coupon
      const coupon = allCoupons.find((c) => c.couponCode === couponCode);

      if (!coupon || coupon.availability === "Unavailable") {
        Swal.fire(
          "Invalid Coupon",
          "This coupon is not valid or has expired.",
          "error"
        );
        return;
      }

      // Calculate discount
      const discountAmount =
        (selectedAgreement.rent * (coupon.discountPercentage || 0)) / 100;
      const newRent = selectedAgreement.rent - discountAmount;

      setDiscount(discountAmount);
      setFinalRent(newRent);

      Swal.fire(
        "Success!",
        `Coupon Applied! ${coupon.discountPercentage}% discount given.`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error!", "Failed to apply coupon. Try again.", "error");
    }
  };

  // Handle payment submission

  const handlePayment = async () => {
    const paymentData = {
      userEmail: selectedAgreement.userEmail,
      apartmentNo: selectedAgreement.apartmentNo,
      floor: selectedAgreement.floor,
      block: selectedAgreement.block,
      originalRent: selectedAgreement.rent,
      discountApplied: discount > 0 ? discount : "Not Applied",
      finalRentPaid: finalRent,
      paymentDate: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.post("/payments", paymentData);

      if (response.status === 200) {
        Swal.fire(
          "Payment Successful!",
          "Your rent has been paid successfully.",
          "success"
        );

        // Close modal after success
        setIsModalOpen(false);

        // Add this agreement to the paid list
        setPaidAgreements([...paidAgreements, selectedAgreement._id]);
      }
    } catch (error) {
      Swal.fire("Error!", "Payment failed. Please try again.", "error");
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/shiny-indian-rupee-digital-currency-background-with-circuit-lines_1017-41186.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')`,
      }}
    >
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          PAYMENTS
        </h2>

        {agreements.length === 0 ? (
          <p className="text-center text-gray-500">
            No accepted agreements found.
          </p>
        ) : (
          <form className="space-y-4">
            {agreements.map((agreement) => (
              <div
                key={agreement._id}
                className="p-4 rounded-lg shadow-md bg-gray-50"
              >
                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="text"
                    value={agreement.userEmail}
                    readOnly
                    className="w-full border p-3 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Floor</label>
                  <input
                    type="text"
                    value={agreement.floor}
                    readOnly
                    className="w-full border p-3 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Block</label>
                  <input
                    type="text"
                    value={agreement.block}
                    readOnly
                    className="w-full border p-3 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Apartment No</label>
                  <input
                    type="text"
                    value={agreement.apartmentNo}
                    readOnly
                    className="w-full border p-3 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Rent</label>
                  <input
                    type="text"
                    value={agreement.rent}
                    readOnly
                    className="w-full border p-3 rounded-lg bg-gray-200"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(agreement);
                  }}
                  disabled={paidAgreements.includes(agreement._id)}
                  className={`w-full text-white p-3 rounded-lg mt-4 transition duration-200 ${
                    paidAgreements.includes(agreement._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {paidAgreements.includes(agreement._id) ? "Paid" : "Pay Rent"}
                </button>
              </div>
            ))}
          </form>
        )}
      </div>

      {/* Payment Modal */}
      {isModalOpen && selectedAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
              Confirm Payment
            </h2>
            <p className="text-lg">
              <strong>Apartment No:</strong> {selectedAgreement.apartmentNo}
            </p>
            <p className="text-lg">
              <strong>Member Email:</strong> {selectedAgreement.userEmail}
            </p>
            <p className="text-lg">
              <strong>Original Rent:</strong> $
              {selectedAgreement.rent.toLocaleString()}
            </p>
            <p className="text-lg">
              <strong>Discount:</strong> ${discount.toFixed(2)}
            </p>
            <p className="text-xl font-bold text-green-600">
              <strong>Final Rent:</strong> ${finalRent.toLocaleString()}
            </p>

            <div className="mt-4">
              <label className="block text-gray-600">Apply Coupon:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="border p-2 rounded-lg flex-1"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Helmet>
        <title>Make Payment | SmartHaven</title>
      
      </Helmet>
    </div>
  );
};

export default MakePayment;
