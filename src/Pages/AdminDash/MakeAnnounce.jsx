import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MakeAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const announcementData = { title, description };

        try {
            const response = await axios.post("https://building-management-server-nu.vercel.app/announcements", announcementData);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "🎉 Announcement Added!",
                    text: "Your announcement has been successfully posted.",
                    confirmButtonColor: "#3085d6",
                });
                setTitle("");
                setDescription("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "⚠️ Failed to Add Announcement",
                    text: "Something went wrong. Please try again.",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (error) {
            console.error("Error adding announcement:", error);
            Swal.fire({
                icon: "error",
                title: "❌ Error!",
                text: "An error occurred. Please check your internet connection and try again.",
                confirmButtonColor: "#d33",
            });
        }

        setLoading(false);
    };

    return (
        <motion.div 
            className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg border border-gray-200 my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
                📢 Make Announcement
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-semibold text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        placeholder="Enter announcement title..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                        placeholder="Enter announcement details..."
                        required
                    />
                </div>

                <motion.button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="4"></circle>
                            </svg>
                            Adding...
                        </span>
                    ) : (
                        "📢 Make Announcement"
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default MakeAnnouncement;
