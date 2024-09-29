import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "./api";

export function useGetBookmarks() {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: getBookmarks,
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    retry: 2, // Retry fetching the data up to 2 times in case of error
  });
}
