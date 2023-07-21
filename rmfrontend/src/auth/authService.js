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

// Get All Users

export const getAllUser = async () => {
    try {
        const response = await axios.get(`${API}/api/users/getallUser`);
        const allUsers = response.data.map((user, index) => ({
            id: index + 1, // Assign a unique id to each user object
            ...user, // Spread the user object properties
        }));
        return allUsers;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw error;
    }
};

// Product section 


// Get All Products 

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API}/api/products`);
        const allProducts = response.data.map((product, index) => ({
            id: index + 1, // Assign a unique id to each product object
            ...product, // Spread the user product properties
        }));
        return allProducts;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw error;
    }
};


// Item section 

// Get All Items

export const getAllItems = async () => {
    try {
        const response = await axios.get(`${API}/api/items`);
        const allItems = response.data.map((item, index) => ({
            id: index + 1, // Assign a unique id to each Item object
            ...item, // Spread the user Item properties
        }));
        return allItems;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw error;
    }
};


// Category

// Get All Categories

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API}/api/categories`);
        const allCategories = response.data.map((category, index) => ({
            id: index + 1, // Assign a unique id to each category object
            ...category, // Spread the user category properties
        }));
        return allCategories;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw error;
    }
};