import { useQuery } from "@tanstack/react-query";
import { getExplorePost } from "./api";

export function useGetExplorePosts() {
  return useQuery({
    queryKey: ['explore'],
    queryFn: getExplorePost,
  });
}
