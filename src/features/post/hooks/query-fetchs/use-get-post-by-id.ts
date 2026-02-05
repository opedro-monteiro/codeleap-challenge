import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/query-keys";
import { getPostById } from "../../api/post.api";

interface UseGetPostByIdOptions {
  enabled?: boolean;
}

export function useGetPostById(
  id: string | number | null,
  options?: UseGetPostByIdOptions,
) {
  return useQuery({
    queryKey: QUERY_KEYS.POST.GET_BY_ID(id ?? ""),
    queryFn: () => getPostById(id!),
    enabled: !!id && (options?.enabled ?? true),
  });
}
