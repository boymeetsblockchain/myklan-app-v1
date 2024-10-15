import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "../../types/user";
import { PaginatedResponse, Subscription } from "../../types/subscription";

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
export const getMySubscription = async () => {
  try {
    const response = await axiosInstance.get('mysubscriptions');
    return response.data
  } catch (error) {
    console.error("Error fetching my subscription:", error);
    throw error;
  }
};
