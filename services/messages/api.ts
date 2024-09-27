import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { MessagesInboxResponse } from "../../types/message";

const BASE_URL = "https://api.myklan.africa/public/api";


// Function to get the token from AsyncStorage
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

 export const getUserMessages = async()=>{
    try {
        const response = await axiosInstance.get<MessagesInboxResponse>("messages")
        return response.data.messagesInbox.data
    } catch (error) {
        console.log("error fetching messages", error)
        throw error
    }
 }