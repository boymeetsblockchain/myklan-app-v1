import { useQuery } from "@tanstack/react-query";
import { getUserMessages } from "./api";



export function useGetUserMesaage(){
  return useQuery({
    queryKey:["messages"],
    queryFn: getUserMessages,
    refetchOnMount: "always",   
    refetchOnWindowFocus: true,  
  })   
}