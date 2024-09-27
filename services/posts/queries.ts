import { useQuery } from "@tanstack/react-query";
import { getMyPosts } from "./api";


export function useGetMyPosts (){
    return useQuery({
        queryKey: ["myposts"],
        queryFn: getMyPosts,
        refetchOnMount: "always",   
        refetchOnWindowFocus: true,  
      });
}