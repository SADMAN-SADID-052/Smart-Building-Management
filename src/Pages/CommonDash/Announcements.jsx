import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axiosSecure.get("/announcements");
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load announcements!",
        background: "#1e293b",
        color: "#f8fafc",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center my-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        📢 Latest Announcements
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-400">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No announcements available.</p>
      ) : (
        <div className="grid ">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white/20 backdrop-blur-lg shadow-xl p-6 rounded-tl-3xl rounded-br-3xl border border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-400">{announcement.title}</h3>
              <p className="text-gray-300 mt-3">{announcement.description}</p>
              <p className="text-sm text-gray-500 mt-4">📅 {new Date(announcement.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
