
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: role, setLoading} = useQuery({

        queryKey:['role',user?.email],
        queryFn: async () => {

            const {data} = await axiosSecure(`/users/role/${user.email}`)
            return data.role
        }
    })
    console.log(role)
    return [role, setLoading]
};

export default useRole;