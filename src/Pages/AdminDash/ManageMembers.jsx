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
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load members!",
        background: "#1e293b",
        color: "#f8fafc",
      });
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
          setMembers(members.filter((member) => member._id !== id));
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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center my-6 text-blue-400">
        Manage Members 🏢
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-400">Loading members...</p>
      ) : members.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3 text-left">User Name</th>
                <th className="px-4 py-3 text-left">User Email</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-t border-gray-700">
                  <td className="px-4 py-3">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Remove ❌
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
