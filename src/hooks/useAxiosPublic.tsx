import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://green-wild-server.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;