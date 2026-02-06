"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { Controller } from "react-hook-form";
import { usePostForm } from "../hooks/use-post-form";
import { useImproveText } from "../hooks/use-improve-text";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarsIcon } from "@hugeicons/core-free-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

export default function PostForm() {
  const { form, onSubmit, isSubmitDisabled, isPending } = usePostForm();

  const { loading, improveText } = useImproveText({
    watch: form.watch,
    setValue: form.setValue,
  });

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full h-fit"
    >
      <Card className="w-full h-fit">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <CardHeader>
            <CardTitle>What&apos;s on your mind?</CardTitle>
          </CardHeader>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <CardContent>
            <form id="form-post" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <Input
                        {...field}
                        id="title"
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
                      <FieldLabel htmlFor="content">Content</FieldLabel>
                      <div className="relative">
                        <Textarea
                          {...field}
                          id="content"
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
          </CardContent>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <CardFooter className="flex justify-end">
            <Button type="submit" form="form-post" disabled={isSubmitDisabled}>
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}
