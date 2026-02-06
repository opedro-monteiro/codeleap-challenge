"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { EmptyError } from "@/src/components/empty-error";
import {
  PostCard,
  PostCardContent,
  PostCardFooter,
  PostCardHeader,
  PostCardHeaderActionButton,
  PostCardHeaderActions,
  PostCardSubContent,
  PostCardSubContentItem,
  PostCardTitle,
} from "@/src/features/post/components/post-card";
import { EditIcon, Share, Trash } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePostContainer } from "../hooks/use-post-container";
import { getRelativeTime } from "../utils/get-relative-time";
import { EditPostDialog } from "./edit-post-dialog";
import { LikeButton } from "./like-button";
import { PostCardSkeleton } from "./post-card-skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

export function PostsContainer() {
  const {
    posts,
    isLoading,
    error,
    username,
    refetch,
    handleDelete,
    handleEdit,
    editingPost,
    isEditDialogOpen,
    handleEditDialogChange,
  } = usePostContainer();

  if (isLoading) return <PostCardSkeleton />;

  if (error)
    return (
      <EmptyError
        title="Something went wrong"
        description="Failed to load posts. Please try again."
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );

  return (
    <div className="w-full space-y-5">
      {posts.map((post) => (
        <PostCard key={post.id}>
          <PostCardHeader>
            {username === post.username && (
              <PostCardHeaderActions>
                <PostCardHeaderActionButton onClick={() => handleEdit(post)}>
                  <HugeiconsIcon
                    icon={EditIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </PostCardHeaderActionButton>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <PostCardHeaderActionButton>
                      <HugeiconsIcon
                        icon={Trash}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                    </PostCardHeaderActionButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this item?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PostCardHeaderActions>
            )}

            <PostCardTitle>{post.title}</PostCardTitle>
          </PostCardHeader>

          <PostCardSubContent>
            <PostCardSubContentItem className="font-semibold">
              @{post.username}
            </PostCardSubContentItem>
            <PostCardSubContentItem>
              {getRelativeTime(post.created_datetime)}
            </PostCardSubContentItem>
          </PostCardSubContent>

          <PostCardContent>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </PostCardContent>

          <PostCardFooter className="flex justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <LikeButton />
              </TooltipTrigger>
              <TooltipContent>
                <p>Like</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"}>
                  <HugeiconsIcon
                    icon={Share}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </PostCardFooter>
        </PostCard>
      ))}

      <EditPostDialog
        post={editingPost}
        open={isEditDialogOpen}
        onOpenChange={handleEditDialogChange}
      />
    </div>
  );
}
