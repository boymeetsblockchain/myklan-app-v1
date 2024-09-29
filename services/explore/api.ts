import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostResponse } from "../../types/post"; // Ensure PostResponse is correctly typed

const BASE_URL = "https://api.myklan.africa/public/api";

// Get the token from AsyncStorage
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

export const getExplorePost = async () => {
  try {
    const response = await axiosInstance.get<PostResponse>('explore?sort=free');
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
