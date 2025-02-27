import axios from "axios";
import { axiosInstance } from "./axiosInstance";

export const loginUser = async (formData: { email: string, password: string }) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', formData)

    return response.data;
}

export const getProfile = async () => {
    const response = await axiosInstance.get('user/profile')

    return response.data;
}

export const register = async (formData: { firstName: string, lastName: string,
     gender: string, email: string, password: string }) => {
        const response = await axios.post('http://localhost:3000/api/user', formData)

        return response.data
}