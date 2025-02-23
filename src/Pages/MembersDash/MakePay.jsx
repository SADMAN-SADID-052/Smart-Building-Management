import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakePayment = () => {
    const [agreements, setAgreements] = useState([]);
    const { user } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return; // Prevent fetching if the user is not logged in

        axiosSecure.get("/acceptedAgreements")
            .then((response) => {
                const userAgreements = response.data.filter(agreement => agreement.userEmail === user.email);
                setAgreements(userAgreements);
            })
            .catch((error) => {
                console.error("Error fetching agreements:", error);
            });
    }, [user?.email, axiosSecure]);

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/shiny-indian-rupee-digital-currency-background-with-circuit-lines_1017-41186.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')`
            }}
        >
            {/* Overlay for better readability */}
            <div className=""></div>

            <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">PAYMENTS</h2>

                {agreements.length === 0 ? (
                    <p className="text-center text-gray-500">No accepted agreements found.</p>
                ) : (
                    <form className="space-y-4">
                        {agreements.map((agreement) => (
                            <div key={agreement._id} className="p-4 rounded-lg shadow-md bg-gray-50">
                                {/* Email */}
                                <div>
                                    <label className="block text-gray-600">Email</label>
                                    <input type="text" value={agreement.userEmail} readOnly className="w-full border p-3 rounded-lg bg-gray-200" />
                                </div>

                                {/* Floor */}
                                <div>
                                    <label className="block text-gray-600">Floor</label>
                                    <input type="text" value={agreement.floor} readOnly className="w-full border p-3 rounded-lg bg-gray-200" />
                                </div>

                                {/* Block */}
                                <div>
                                    <label className="block text-gray-600">Block</label>
                                    <input type="text" value={agreement.block} readOnly className="w-full border p-3 rounded-lg bg-gray-200" />
                                </div>

                                {/* Apartment No */}
                                <div>
                                    <label className="block text-gray-600">Apartment No</label>
                                    <input type="text" value={agreement.apartmentNo} readOnly className="w-full border p-3 rounded-lg bg-gray-200" />
                                </div>

                                {/* Rent Amount */}
                                <div>
                                    <label className="block text-gray-600">Rent</label>
                                    <input type="text" value={agreement.rent} readOnly className="w-full border p-3 rounded-lg bg-gray-200" />
                                </div>

                                {/* Month Selection */}
                                <div>
                                    <label className="block text-gray-600">Month</label>
                                    <select className="w-full border p-3 rounded-lg bg-white">
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                </div>

                                {/* Pay Button */}
                                <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-lg mt-4 hover:bg-red-600 transition duration-200">
                                    Pay Rent
                                </button>
                            </div>
                        ))}
                    </form>
                )}
            </div>
        </div>
    );
};

export default MakePayment;
