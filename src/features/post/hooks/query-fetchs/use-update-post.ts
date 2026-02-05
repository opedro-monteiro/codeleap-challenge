import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/query-keys";
import { updatePost, type PostsResponse } from "../../api/post.api";
import type { editPostFormData, getPostFormData } from "../../types/post.schema";

interface UpdatePostVariables {
  id: string | number;
  data: editPostFormData;
}

interface UseUpdatePostOptions {
  onSuccess?: (data: getPostFormData) => void;
  onError?: (error: Error) => void;
}

export function useUpdatePost(options?: UseUpdatePostOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePostVariables) => updatePost(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.POST.GET() });

      const previousPosts = queryClient.getQueryData<PostsResponse>(
        QUERY_KEYS.POST.GET(),
      );

      queryClient.setQueryData<PostsResponse>(QUERY_KEYS.POST.GET(), (old) => {
        if (!old) return old;

        return {
          ...old,
          results: old.results.map((post) =>
            post.id === String(id)
              ? { ...post, title: data.title, content: data.content }
              : post,
          ),
        };
      });

      return { previousPosts };
    },
    onError: (error, _variables, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(QUERY_KEYS.POST.GET(), context.previousPosts);

      options?.onError?.(error);
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST.GET() });
    },
  });
}
