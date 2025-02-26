import axios from "axios";

export const axiosSecure  = axios.create({

    baseURL:'https://building-management-server-nu.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;