import "../Styles/Style.css";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password length validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password!",
        text: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password!",
        text: "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    // Firebase Authentication
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You are being redirected to the homepage.",
          confirmButtonColor: "#3085d6",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        e.target.reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
        updateUserProfile(name, photo).then(() => {
          //  create user entry in the database

          const userInfo = {
            name: name,
            email: email,
            photo: photo,
            role: "user",
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.insertedId) {
              setUser(user);

             
            }
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <div>
        <section className="bg-gray-800  pt-[10%] relative flex items-center justify-center ">
          {/* Decorative Circles */}


          {/* Login Container */}
          <div className="w-[500px] sm:w-[500px] bg-gray-900 bg-opacity-60 backdrop-blur-xl text-center p-8 text-white z-10 rounded-xl shadow-lg">
            <img
              id="passport"
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"
              alt="User Avatar"
            />
            <p className="text-xl sm:text-2xl font-semibold mt-3">
              SIGNUP HERE
            </p>

            <hr className="my-4 border-gray-600" />

            <form onSubmit={handleSignUp} className="space-y-4">
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
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button type="submit" className="btn btn-error lg:w-[393px] mt-3">
                <span className="p-4 text-white font-bold text-xl">
                  SIGNUP
                </span>
              </button>

              <p className="mt-4 text-gray-300">
                Already have an Account, click to{" "}
                <Link to="/auth/login" className="underline text-pink-300 text-purple-400">
                  LogIn
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>

      <Helmet>
        <title>SignUp | Building Management</title>
        
      </Helmet>
    </div>
  );
};

export default SignUp;
