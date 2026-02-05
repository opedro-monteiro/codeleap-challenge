import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/query-keys";
import { deletePost, type PostsResponse } from "../../api/post.api";

interface UseDeletePostOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useDeletePost(options?: UseDeletePostOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deletePost(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.POST.GET() });

      const previousPosts = queryClient.getQueryData<PostsResponse>(
        QUERY_KEYS.POST.GET(),
      );

      queryClient.setQueryData<PostsResponse>(QUERY_KEYS.POST.GET(), (old) => {
        if (!old) return old;

        return {
          ...old,
          count: old.count - 1,
          results: old.results.filter((post) => post.id !== String(deletedId)),
        };
      });

      return { previousPosts };
    },
    onError: (error, _deletedId, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(QUERY_KEYS.POST.GET(), context.previousPosts);

      options?.onError?.(error);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST.GET() });
    },
  });
}
