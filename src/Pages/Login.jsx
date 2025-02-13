
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import '../Styles/Style.css'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebase.login';
import { toast } from 'react-toastify';

const Login = () => {


  const {userLogin,setUser} = useContext(AuthContext)
  const location = useLocation();

  const navigate = useNavigate();

  // Google login
const provider = new GoogleAuthProvider();
const handleGoogleLogin = () =>{

  signInWithPopup(auth,provider)
  .then((result) => {
    navigate(location?.state  ? location.state : "/");
    console.log(result)

    toast.success("Login Successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });


  })

  .catch(error =>{

    console.log('error',error)
  })

}


  // login User
  const handleLogin = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password)
    
    userLogin(email,password)
    .then(result =>{

      const user = result.user;
      setUser(user);
      navigate(location?.state  ? location.state : "/");
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      
    })
    .catch((error)=>{

      toast.error("Email or Password does not match!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      
    })}

    return (
        <div>

            <div>

              

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
        
        <form
        
        onSubmit={handleLogin}
        className="space-y-4">
          <input 
            type="email" 
            id="username"
            name='email' 
            placeholder="Enter Your Email" 
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
       className='btn btn-error'><span className='p-4 text-white font-bold text-xl'>LogIn</span></button>    
      <div className='text-center mt-6'>
        <button 
        onClick={handleGoogleLogin}
        className='btn btn-outline'>Log In With Google</button>
        </div>
        
        <p className="mt-4 text-gray-300">If you're new here, click to <Link to="/auth/signup" className="underline hover:text-pink-300">Sign Up</Link></p>
                 
        </form>
    
      </div>
    </section>
            

            </div>


        </div>
    );
};

export default Login;