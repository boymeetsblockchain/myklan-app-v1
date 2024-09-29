import { useQuery } from "@tanstack/react-query";
import { getMySubscribers } from "./api";


export function useGetMySubscribers (){
   return   useQuery({
    queryKey:["mysubscription"],
    queryFn: getMySubscribers,
    refetchOnMount: "always",   
refetchOnWindowFocus: true,  
})
}