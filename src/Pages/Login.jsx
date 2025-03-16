import { Link, useLocation, useNavigate } from "react-router";
import "../Styles/Style.css";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../Firebase/firebase.login";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { userLogin, setUser } = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();

  // Google login
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          role: "user",
        };

        axiosPublic.post("/users", userInfo).then((res) => {});

        navigate(location?.state ? location.state : "/");

        Swal.fire({
          icon: "success",
          title: "LogIn Successful!",
          text: "Successfully LoggedIn",
          confirmButtonColor: "#3085d6",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })

      .catch((error) => {});
  };

  // login User
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          icon: "success",
          title: "LogIn Successful!",
          text: "Successfully LoggedIn",
          confirmButtonColor: "#3085d6",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
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
      });
  };

  return (
    <div>
      <div>
        <section className="bg-gray-800  pt-[10%] relative flex items-center justify-center  p-2">
          {/* Login Container */}
          <div className="w-[500px] sm:w-[500px] bg-gray-900 bg-opacity-60 backdrop-blur-xl text-center p-8 text-white z-10 rounded-xl shadow-lg">
            <img
              id="passport"
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"
              alt="User Avatar"
              className=""
            />
            <p className="text-xl sm:text-2xl font-semibold">LOGIN HERE</p>

            <hr className="my-4 border-gray-600" />

            <div className="text-center mt-6">
                <button onClick={handleGoogleLogin} className="bg-white p-2 text-black shadow-2xl rounded-md cursor-pointer">

                  <div className="flex items-center gap-3">
                    <img className="w-7" src="https://cdn-icons-png.freepik.com/256/2504/2504914.png?ga=GA1.1.687432857.1714536364&semt=ais_hybrid" alt="" />
                    <p className="text-xl font-semibold">Login with Google</p>
                  </div>
                
                </button>
              </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                id="username"
                name="email"
                placeholder="Enter Your Email"
                required
                className="w-full px-4 py-2 rounded-lg text-black text-base sm:text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                required
                className="w-full pl-3  text-base sm:text-lg focus:outline-none border-1"
              />

              <button type="submit" className="btn btn-error lg:w-[393px] mt-3">
                <span className="p-4 text-white font-bold text-xl">LOGIN</span>
              </button>
        

              <p className="mt-4 text-gray-300">
                If you're new here, click to{" "}
                <Link
                  to="/auth/signup"
                  className="underline hover:text-pink-300 text-purple-400"
                >
                  SIGNUP
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>

      <Helmet>
        <title>LogIn | Building Management</title>
      </Helmet>
    </div>
  );
};

export default Login;
