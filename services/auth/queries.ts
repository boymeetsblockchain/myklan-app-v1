import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, Register } from "../../types/auth";
import { router } from "expo-router";

export function useRegister() {
  return useMutation({
    mutationFn: (data: Register) => registerUser(data),
    onMutate: () => {
      console.log("Registration started...");
    },

    onError: (error: any) => {
      if (error?.message) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error("Unknown error occurred during registration.");
      }
    },

    onSuccess: (data) => {
      if (data.success) {
        console.log(`Success: ${data.success}`);
      } else {
        console.error(`Failed: ${data.success}`);
      }
    },
  });
}



export function useLogin(){
 return useMutation({
  mutationFn: (data:Login) => loginUser(data),
  onMutate:()=>{
    console.log("Logining ......")
  },
  onError: (error: any) => {
    if (error?.message) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred during registration.");
    }
  },

  onSuccess: async (data) => {
    if(data.token){
      const token = data.token
  await AsyncStorage.setItem("authToken", token);
    }
    if (data.success== true) {
      console.log(`Success: ${data.success}`);
      router.push('/home')
    } else {
      console.error(`Failed: ${data.success}`);
    }
  
  },
 })
}