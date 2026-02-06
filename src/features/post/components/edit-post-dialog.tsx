"use client";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { useEditPostForm } from "../hooks/use-edit-post-form";
import { useImproveText } from "../hooks/use-improve-text";
import type { getPostFormData } from "../types/post.schema";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarsIcon } from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

interface EditPostDialogProps {
  post: getPostFormData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPostDialog({
  post,
  open,
  onOpenChange,
}: EditPostDialogProps) {
  const { form, onSubmit, isSubmitDisabled, isPending } = useEditPostForm({
    postId: post?.id ?? null,
    defaultValues: post
      ? { title: post.title, content: post.content }
      : undefined,
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const { loading, improveText } = useImproveText({
    watch: form.watch,
    setValue: form.setValue,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
        </DialogHeader>

        <form id="form-edit-post" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="edit-title"
                    placeholder="Hello world"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-content">Content</FieldLabel>
                  <div className="relative">
                    <Textarea
                      {...field}
                      id="edit-content"
                      placeholder="Content here"
                      disabled={isPending}
                      rows={10}
                      maxLength={1000}
                      className="resize-none"
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {loading && "improving..."}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={improveText}
                            disabled={loading || isSubmitDisabled}
                            className="cursor-pointer"
                          >
                            <HugeiconsIcon
                              icon={StarsIcon}
                              size={24}
                              color="currentColor"
                              strokeWidth={1.5}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Improve text with AI</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="form-edit-post"
            disabled={isSubmitDisabled}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
