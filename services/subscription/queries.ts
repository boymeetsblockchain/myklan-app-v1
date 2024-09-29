import { useQuery } from "@tanstack/react-query";
import { getMySubscription } from "./api";


export function useGetMySubscription (){
   return   useQuery({
    queryKey:["mysubscription"],
    queryFn: getMySubscription,
    refetchOnMount: "always",   
refetchOnWindowFocus: true,  
})
}