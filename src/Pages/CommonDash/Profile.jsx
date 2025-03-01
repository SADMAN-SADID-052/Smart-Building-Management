import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, setLoading] = useRole();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-400 to-blue-500 p-6">
      {/* React Helmet for SEO */}
      <Helmet>
        <title>User Profile | SmartHaven</title>
        <meta name="description" content="View and update your profile details in the Apartment Management System." />
      </Helmet>

      <div className="bg-white shadow-2xl rounded-2xl md:w-4/5 lg:w-3/5 overflow-hidden transform transition duration-500 hover:scale-105">
        {/* Cover Image */}
        <div className="relative w-full h-40 bg-gradient-to-r from-green-500 to-lime-400 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold shadow-lg">Welcome, {user?.displayName || "User"}!</h2>
        </div>

        <div className="flex flex-col items-center -mt-12">
          <a href="#" className="relative block">
            <img
              alt="Profile"
              src={user?.photoURL || "/default-avatar.png"}
              className="mx-auto object-cover rounded-full h-24 w-24 border-4 border-white shadow-md transition-transform transform hover:scale-110"
            />
          </a>

          <p className="mt-3 px-4 text-sm font-semibold  bg-lime-600 rounded-full py-1 shadow-lg uppercase">
            {role || "User"}
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-800">{user?.displayName || "Anonymous"}</h2>
          <p className="text-sm text-gray-600">{user?.email || "Not Available"}</p>

          {/* User Info Section */}
          <div className="mt-5 w-full px-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-2">
              <div className="flex justify-between text-sm text-gray-600 p-2">
                <p className="flex flex-col">
                  <span className="text-gray-500">User Name</span>
                  <span className="font-semibold text-black">{user?.displayName || "N/A"}</span>
                </p>
                <p className="flex flex-col">
                  <span className="text-gray-500">Email</span>
                  <span className="font-semibold text-black">{user?.email}</span>
                </p>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default Profile;
