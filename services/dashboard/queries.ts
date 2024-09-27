import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./api";


export function useGetDashboardData(){
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboardData,
        refetchOnMount: "always",   
        refetchOnWindowFocus: true,  
    })
}