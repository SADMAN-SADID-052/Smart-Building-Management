

import '../Styles/Style.css'

import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  
  const navigate = useNavigate()
  const { createUser, setUser,updateUserProfile } = useContext(AuthContext)
  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // console.log(name, email, password, photo);


    // Password length validation
    if (password.length < 6) {
      toast.error('Password Should be 6 Characters or longer', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error('Password must be one uppercase letter, one lowercase letter, one number, and one special character!!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    // Firebase Authentication
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name,photo)
        .then(() => {
          //  create user entry in the database
           
           const userInfo = { 

            name: name,
            email: email,
            photo:photo,
            role : 'user',
           }
           axiosPublic.post('/users',userInfo)
           .then(res => {


            if(res.insertedId)
            {
              
              console.log('user added to the database')
              setUser(user);

              toast.success('Registration Successful!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              });
      
              e.target.reset(); 
              navigate('/');
              
            }
           })
          console.log('user Profile info updated')
        })
      
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
    return (
        <div>

        <div>

         
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
     
    />
    <p className="text-xl sm:text-2xl font-semibold mt-3">SIGNUP Here</p>
    
    <hr className="my-4 border-gray-600" />
    
    <form
    
    onSubmit={handleSignUp}
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
        // id="username"
        name="email" 
        placeholder="Enter Your Email" 
        required
        className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        type="text" 
        // id="username"
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
 
    <p className="mt-4 text-gray-300">Already have an Account, click to <Link to="/auth/login" className="underline text-pink-300">LogIn</Link></p>
             
    </form>

  </div>
</section>
        

        </div>

       


    </div>
    );
};

export default SignUp;