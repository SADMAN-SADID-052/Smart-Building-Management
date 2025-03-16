import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axiosSecure.get("/users?role=member");
      setMembers(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load members!",
        background: "#1e293b",
        color: "#f8fafc",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This member will be demoted to a user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      background: "#1e293b",
      color: "#f8fafc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/${id}`, { role: "user" });
          setMembers((prevMembers) =>
            prevMembers.filter((member) => member._id !== id)
          );
          Swal.fire({
            icon: "success",
            title: "Member Removed",
            text: "The user now has regular access.",
            background: "#1e293b",
            color: "#f8fafc",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update user role.",
            background: "#1e293b",
            color: "#f8fafc",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-3xl font-bold  text-blue-400 flex items-center justify-center gap-4">
        <p>Manage Members </p>
        <img
          className="w-12"
          src="https://cdn-icons-png.freepik.com/256/5677/5677570.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
          alt=""
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center mt-6 space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full max-w-2xl h-12 bg-gray-700 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : members.length === 0 ? (
        <p className="text-center text-lg text-gray-400 mt-6">
          No members found.
        </p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white text-left">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member._id}
                  className="border-t border-gray-700 text-black"
                >
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="group cursor-pointer text-white px-4 py-2 rounded transition duration-300 relative"
                    >
                      <img
                        className="w-10"
                        src="https://cdn-icons-png.freepik.com/256/12318/12318474.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                        alt="Remove"
                      />

                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2  hidden group-hover:flex items-center text-xs text-white bg-gray-900 px-2 py-1 rounded-lg shadow-lg">
                        Remove Member
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
