import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { postFormSchema, type PostFormData } from "../types/post.schema";
import { useCreatePost } from "./query-fetchs/use-create-post";

export function usePostForm() {
  const [username] = useLocalStorage<string>("username", "");

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutate, isPending } = useCreatePost({
    onSuccess: () => {
      toast.success("Post created successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });

  const isSubmitDisabled = !form.formState.isValid || isPending;

  function onSubmit(data: PostFormData) {
    if (!username) {
      toast.error("Username not found. Please sign in again.");
      return;
    }

    mutate({
      username,
      title: data.title,
      content: data.content,
    });
  }

  return {
    form,
    onSubmit,
    isSubmitDisabled,
    isPending,
  };
}
