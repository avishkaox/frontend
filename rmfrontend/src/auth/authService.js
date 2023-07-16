import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../config";



// Get Login Status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${API}/api/users/loggedin`);
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};


// Get User Profile
export const getUser = async () => {
    try {
        const response = await axios.get(`${API}/api/users/getuser`);
        console.log(response.data);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw error; // Rethrow the error to handle it in the component
    }
};