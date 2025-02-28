import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    // Create new user

    const createUser = (email,password) =>{

        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // User login

    const userLogin = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }

    // logOut user
   
    const logOut = () =>{

        setLoading(true);
        return signOut(auth)
        .then(() => {

            setUser(null);
            Swal.fire({
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                icon: "success",
                timer: 2000,
              
            });

        })

        .catch((error) => {
            toast.error("Logout Failed!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error("Logout Error:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }


    const updateUserProfile = (name, photo) =>{

       return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })

          
    }

    const userInfo = {

        user,
        setUser,
        loading,
        createUser,
        userLogin,
        logOut,
        updateUserProfile
    }

    // observer

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>{
            unsubscribe();
        }
    },[])

    return(
     
        <AuthContext.Provider value={userInfo}>

            {children}

        </AuthContext.Provider>


    );
};

export default AuthProvider;