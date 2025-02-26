import axios from "axios";

const axiosPublic = axios.create({

    baseURL : 'https://building-management-server-nu.vercel.app'


})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;