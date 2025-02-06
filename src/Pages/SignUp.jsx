
import Navbar from '../Components/Navbar';
import { FcGoogle } from "react-icons/fc";
import '../Styles/Style.css'
import Footer from '../Components/Footer';

const SignUp = () => {
    return (
        <div>

        <div className='max-w-6xl mx-auto  mb-4'>

            <header>
                <Navbar></Navbar>
            </header>

<section className="bg-gray-800  pt-[10%] relative flex items-center justify-center rounded-b-4xl">
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
    <p className="text-xl sm:text-2xl font-semibold mt-3">SIGNUP Here</p>
    
    <hr className="my-4 border-gray-600" />
    
    <form
    
    // onSubmit={}
    className="space-y-4">
      <input 
        type="text" 
        id="username"
        name="name" 
        placeholder="Enter Your Name" 
        required
        className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="email" 
        id="username"
        name="email" 
        placeholder="Enter Your Email" 
        required
        className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="text" 
        id="username"
        name="photo" 
        placeholder="Enter Your Photo URL" 
        required
        className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="password" 
        id="password" 
        placeholder="Password" 
        name='password'
        required
        className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

   <button
   type='submit'
   className='btn btn-error'><span className='p-4 text-white font-bold text-xl'>Sign Up</span></button>    
 
    <p className="mt-4 text-gray-300">Already have an Account, click to <a href="#" className="underline text-pink-300">LogIn</a></p>
             
    </form>

  </div>
</section>
        

        </div>

        <Footer></Footer>


    </div>
    );
};

export default SignUp;