import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { toast } from "react-toastify";

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
            toast.success("Logout Successful!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
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


    const userInfo = {

        user,
        setUser,
        loading,
        createUser,
        userLogin,
        logOut,
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