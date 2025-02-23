import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useRole();
  const [totalApartments, setTotalApartments] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalMembers, setTotalMembers] = useState(null);
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    const fetchTotalApartments = async () => {
      try {
        const response = await axiosSecure("/total-apartments");
        setTotalApartments(response.data.totalApartments);
      } catch (error) {
        console.error("Failed to fetch the total number of apartments:", error);
      }
    };

    fetchTotalApartments();
  }, []);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axiosSecure("/total-users");
        setTotalUsers(response.data.totalUsers);
        // setTotalMembers(response.data.totalMembers); // Fetch members from here too
      } catch (error) {
        console.error("Failed to fetch the total number of users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalMembers = async () => {
      try {
        const response = await axiosSecure("/total-member");
      
        setTotalMembers(response.data.totalMembers); // Fetch members from here too
      } catch (error) {
        console.error("Failed to fetch the total number of users:", error);
      }
    };

    fetchTotalMembers();
  }, []);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        // const response = await axiosSecure("/available-room");
      
        setAvailable(response.data.available);
      } catch (error) {
        console.error("Failed to fetch the total number of users:", error);
      }
    };

    fetchAvailableRooms();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6">
      <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">Admin Panel</h2>
      <div className="flex justify-center items-center w-full mt-10">
        <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="relative">
              <img
                alt="profile"
                src={user.photoURL}
                className="object-cover rounded-full h-32 w-32 border-4 border-white shadow-lg transform hover:scale-105 transition duration-300"
              />
            </div>

            <p className="mt-4 px-6 py-2 text-sm text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full uppercase font-bold shadow-lg">
              {role}
            </p>

            <div className="w-full mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Name</p>
                  <span className="text-2xl font-bold text-white">{user.displayName}</span>
                </div>
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Email</p>
                  <span className="text-lg font-semibold text-white">{user.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Total Rooms</p>
                  <span className="text-3xl font-bold text-white">{totalApartments ?? "..."}</span>
                </div>
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Total Users</p>
                  <span className="text-3xl font-bold text-white">{totalUsers ?? "..."}</span>
                </div>
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Total Members</p>
                  <span className="text-3xl font-bold text-white">{totalMembers ?? "..."}</span>
                </div>
                <div className="bg-white/30 p-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <p className="text-lg font-semibold text-gray-100">Available Rooms</p>
                  <span className="text-3xl font-bold text-white">{available ?? "..."}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
