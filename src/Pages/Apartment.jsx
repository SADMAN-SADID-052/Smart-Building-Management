import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

const Apartment = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');

    useEffect(() => {
        fetchApartments();
    }, [page, minRent, maxRent]);

    const fetchApartments = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/apartment?page=${page}&minRent=${minRent}&maxRent=${maxRent}`
            );
            setApartments(response.data.apartments);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching apartments:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <div className='max-w-6xl mx-auto'>
                <header>
                    <Navbar />
                </header>
                
                <main className="p-4">
                    <h2 className="text-3xl font-bold text-center my-6">Available Apartments</h2>
                    
                    {/* Rent Search Filters */}
                    <div className="flex justify-center gap-4 mb-6">
                        <input
                            type="number"
                            placeholder="Min Rent"
                            className="border p-2 rounded"
                            value={minRent}
                            onChange={(e) => setMinRent(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Max Rent"
                            className="border p-2 rounded"
                            value={maxRent}
                            onChange={(e) => setMaxRent(e.target.value)}
                        />
                        <button 
                            onClick={fetchApartments} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && <p className="text-center">Loading apartments...</p>}

                    {/* Apartment List */}
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {apartments.map((apt) => (
                            <div key={apt._id} className="border p-4 rounded shadow">
                                <img src={apt.image} alt="Apartment" className="w-full h-40 object-cover rounded mb-4" />
                                <h3 className="text-xl font-semibold">Floor: {apt.floor}, Block: {apt.block}</h3>
                                <p>Apartment No: {apt.apartment_no}</p>
                                <p>Rent: ${apt.rent}</p>
                                <p className="font-bold text-green-600">{apt.status}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6 gap-4">
                        <button 
                            disabled={page === 1} 
                            onClick={() => setPage(page - 1)} 
                            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span> Page {page} of {totalPages} </span>
                        <button 
                            disabled={page === totalPages} 
                            onClick={() => setPage(page + 1)} 
                            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Apartment;
