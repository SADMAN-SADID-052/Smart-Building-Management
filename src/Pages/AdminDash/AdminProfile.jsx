import { useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import Loading from '../Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AdminProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useRole();
  const [totalApartments, setTotalApartments] = useState(null);

  useEffect(() => {
    // Fetch the total number of apartments when the component mounts
    const fetchTotalApartments = async () => {
      try {
        const response = await axiosSecure('/total-apartments');
        const data = response.data; // Corrected to access the response data
        setTotalApartments(data.totalApartments);
      } catch (error) {
        console.error('Failed to fetch the total number of apartments:', error);
      }
    };

    fetchTotalApartments();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className='text-4xl text-center font-bold'>Admin Panel</h2>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
          <div className='flex flex-col items-center justify-center p-4 -mt-16'>
            <a href='#' className='relative block'>
              <img
                alt='profile'
                src={user.photoURL}
                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
              />
            </a>

            <p className='p-2 px-4 text-xs text-black bg-lime-500 rounded-full uppercase font-bold'>
              {role}
            </p>

            <div className='w-full p-2 mt-4 rounded-lg'>
              <div className='flex flex-wrap items-center justify-between text-sm text-gray-600'>
                <p className='flex flex-col'>
                  Name
                  <span className='font-bold text-black'>{user.displayName}</span>
                </p>
                <p className='flex flex-col'>
                  Email
                  <span className='font-bold text-black'>{user.email}</span>
                </p>
                <div>
                  {/* Display the total number of apartments */}
                  <p className='mt-4'>
                    <strong>Total Rooms:</strong> {totalApartments ?? 'Loading...'}
                  </p>
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
