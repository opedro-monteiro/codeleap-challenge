import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { postFormSchema, type PostFormData } from "../types/post.schema";
import { useUpdatePost } from "./query-fetchs/use-update-post";

interface UseEditPostFormOptions {
  postId: string | number | null;
  defaultValues?: PostFormData;
  onSuccess?: () => void;
}

export function useEditPostForm({
  postId,
  defaultValues,
  onSuccess,
}: UseEditPostFormOptions) {
  const previousPostId = useRef<string | number | null>(null);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (postId && postId !== previousPostId.current && defaultValues) {
      reset(defaultValues);
      previousPostId.current = postId;
    }

    if (!postId) {
      previousPostId.current = null;
    }
  }, [postId, defaultValues, reset]);

  const { mutate, isPending } = useUpdatePost({
    onSuccess: () => {
      toast.success("Post updated successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });

  const isSubmitDisabled = !form.formState.isValid || isPending;

  function onSubmit(data: PostFormData) {
    if (!postId) {
      toast.error("Post ID not found.");
      return;
    }

    mutate({
      id: postId,
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  return {
    form,
    onSubmit,
    isSubmitDisabled,
    isPending,
  };
}
