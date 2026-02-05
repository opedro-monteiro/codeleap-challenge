import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/query-keys";
import { getPosts } from "../../api/post.api";

export function useGetPosts() {
  return useQuery({
    queryKey: QUERY_KEYS.POST.GET(),
    queryFn: getPosts,
  });
}
