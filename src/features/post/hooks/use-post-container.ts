import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { useState } from "react";
import { toast } from "sonner";
import type { getPostFormData } from "../types/post.schema";
import { useDeletePost } from "./query-fetchs/use-delete-post";
import { useGetPosts } from "./query-fetchs/use-get-post";

export function usePostContainer() {
  const [username] = useLocalStorage<string>("username", "");
  const [editingPost, setEditingPost] = useState<getPostFormData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useGetPosts();

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost({
    onSuccess: () => {
      toast.success("Post deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: string | number) => {
    deletePost(id);
  };

  const handleEdit = (post: getPostFormData) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setEditingPost(null);
    }
  };

  return {
    posts: data?.results ?? [],
    isLoading,
    isDeleting,
    error,
    username,
    refetch,
    handleDelete,
    handleEdit,
    editingPost,
    isEditDialogOpen,
    handleEditDialogChange,
  };
}
