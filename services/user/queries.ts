import { useQuery } from "@tanstack/react-query";
import { getUser, getUserByUsername } from "./api";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnMount: "always",   
    refetchOnWindowFocus: true,  
  });
}
export function useGetUserByUsername(username:string) {
  return useQuery({
    queryKey: ["userprofile"],
    queryFn: ()=>getUserByUsername(username),
    refetchOnMount: "always",   
    refetchOnWindowFocus: true,  
  });
}



