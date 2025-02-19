import axios, { InternalAxiosRequestConfig } from "axios";;
import { RootState, store } from "../store/store"; 

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state: RootState = store.getState(); 
    console.log(state)
    const token = state.auth.token; 
    console.log("Токен: ", token);

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);
