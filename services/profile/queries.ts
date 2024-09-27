import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "./api";

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    refetchOnMount: "always",   
    refetchOnWindowFocus: true,  
  });
}
