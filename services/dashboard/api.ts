import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EarningsStats } from "../../types/dashboard";

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
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get<EarningsStats>('dashboard');
    return response.data
   
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    throw error;
  }
};

