import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark } from "../../types/bookmark";

const BASE_URL = "https://api.myklan.africa/public/api/my";

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

// Function to get bookmarks
export const getBookmarks = async (): Promise<Bookmark> => {
  try {
    const response = await axiosInstance.get<Bookmark>('bookmarks');
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};
