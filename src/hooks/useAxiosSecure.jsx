// axios intance with interceptors for secure requests
// see blog post for more details
// https://blog.logrocket.com/how-to-set-up-axios-interceptors-in-react-apps/
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
