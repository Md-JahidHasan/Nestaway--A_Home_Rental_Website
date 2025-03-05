import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";



export const axiosSecure2 = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})



const useAxiosSecure2 = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure2.interceptors.response.use(
            res => {
                return res;
            },
            async error => {
                console.log("Error tracked by interceptores", error.response);
                if (error.res.status === 401 || error.res.status === 403) {
                    await logOut();
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )    
    }, [logOut, navigate])
    return axiosSecure2;
};

export default useAxiosSecure2;