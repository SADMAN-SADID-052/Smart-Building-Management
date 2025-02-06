
import { Link } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import '../Styles/Style.css'
import Navbar from '../Components/Navbar';

const Login = () => {
    return (
        <div>

            <div className='max-w-6xl mx-auto'>

                <header>
                    <Navbar></Navbar>
                </header>

            <section className="bg-gray-800  pt-[10%] relative flex items-center justify-center">
      {/* Decorative Circles */}
      <div className="top-blue w-[250px] h-[250px] bg-blue-400 rounded-full absolute top-[10%] left-[50%]"></div>
      <div className="bottom-pink w-[280px] h-[280px] bg-pink-400 rounded-full absolute top-[50%] left-[12%] lg:left-[30%]"></div>
      <div className="top-orange w-[300px] h-[300px] bg-orange-400 rounded-full absolute top-[5%] left-[5%] md:left-[23%] lg:left-[30%]"></div>
      
      {/* Login Container */}
      <div className="w-[350px] sm:w-[350px] bg-gray-900 bg-opacity-60 backdrop-blur-xl text-center p-8 text-white z-10 rounded-xl shadow-lg">
        <img 
          id="passport" 
          src="https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png" 
          alt="User Avatar" 
          className=""
        />
        <p className="text-xl sm:text-2xl font-semibold">Login Here</p>
        
        <hr className="my-4 border-gray-600" />
        
        <form className="space-y-4">
          <input 
            type="text" 
            id="username" 
            placeholder="Username" 
            className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            id="password" 
            placeholder="Password" 
            className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
                 
        </form>
        <Link className='btn btn-error'><span className='p-4 text-white font-bold text-xl'>LogIn</span></Link>    
        <Link
        className="flex gap-3 items-center justify-center p-3 bg-white text-gray-800 shadow-lg rounded-full hover:shadow-2xl hover:bg-gray-50 transition duration-300 ease-in-out mt-4"
      >
        <FcGoogle size={24} />
        <span className="font-medium text-lg">Log in with Google</span>
      </Link>
        
        <p className="mt-4 text-gray-300">If you're new here, click to <a href="#" className="underline hover:text-pink-300">Sign Up</a></p>
      </div>
    </section>
            

            </div>


        </div>
    );
};

export default Login;