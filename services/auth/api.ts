import axios from 'axios';
import { Login, Register } from '../../types/auth';

const BASE_URL = "https://api.myklan.africa/public/api";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const registerUser = async (data: Register) => {
  try {
    const response = await axiosInstance.post('register', data);

    return {
      success: response.data.success,
      message: response.data.check_account
    };
    
  } catch (error: any) {
    let errorMessage = 'An error occurred';

    if (error.response) {
     
      errorMessage = error.response.data.message || error.response.data.error || 'Something went wrong!';
    } else if (error.request) {
    
      errorMessage = 'No response from server. Please try again later.';
    } else {
    
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error.response?.data || null,  
    };
  }
};


export const loginUser = async(data:Login)=>{
try {
   const response = await axiosInstance.post('login',data)
   return {
     success:response.data.success,
     message:response.data.message,
     token:response.data.token
   }
} catch (error:any) {
  let errorMessage = 'An error occurred';

  if (error.response) {
   
    errorMessage = error.response.data.message || error.response.data.error || 'Something went wrong!';
  } else if (error.request) {
  
    errorMessage = 'No response from server. Please try again later.';
  } else {
  
    errorMessage = error.message;
  }

  return {
    success: false,
    message: errorMessage,
    error: error.response?.data || null,  
  };
}
}

