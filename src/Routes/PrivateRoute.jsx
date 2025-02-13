import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading';
// import { use } from 'react';

const PrivateRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading)
    {
        return <Loading></Loading>
    }

    if(user && user?.email)
    {
        return children;
    }
    return (
        <Navigate state={location.pathname} to={"/auth/login"}>

          
            
        </Navigate>
    );
};

export default PrivateRoute;