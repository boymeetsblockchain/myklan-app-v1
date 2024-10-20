import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from "../../types/profile";
const BASE_URL = "https://api.myklan.africa/public/api";

const getToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return token;
};


const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get<Profile>('profile');
    return response.data
   
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
