import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from "../../types/profile";
const BASE_URL = "https://api.myklan.africa/public/api";

// Function to get the token from AsyncStorage
const getToken = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return token;
};

// Create axios instance
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

// Example function to get user
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get<Profile>('profile');
    return response.data
   
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
