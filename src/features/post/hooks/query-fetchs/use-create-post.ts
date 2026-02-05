import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/src/constants/query-keys";
import { createPost, type PostsResponse } from "../../api/post.api";
import type {
  createPostFormData,
  getPostFormData,
} from "../../types/post.schema";

interface UseCreatePostOptions {
  onSuccess?: (data: getPostFormData) => void;
  onError?: (error: Error) => void;
}

export function useCreatePost(options?: UseCreatePostOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: createPostFormData) => createPost(data),
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.POST.GET() });

      const previousPosts = queryClient.getQueryData<PostsResponse>(
        QUERY_KEYS.POST.GET(),
      );

      queryClient.setQueryData<PostsResponse>(QUERY_KEYS.POST.GET(), (old) => {
        if (!old) return old;

        const optimisticPost: getPostFormData = {
          id: String(Date.now()),
          username: newPost.username,
          title: newPost.title,
          content: newPost.content,
          created_datetime: new Date().toISOString(),
        };

        return {
          ...old,
          count: old.count + 1,
          results: [optimisticPost, ...old.results],
        };
      });

      return { previousPosts };
    },
    onError: (error, _newPost, context) => {
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
