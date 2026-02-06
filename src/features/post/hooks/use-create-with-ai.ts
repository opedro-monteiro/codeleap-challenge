import { useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";

interface UseCreateWithAIProps<
  T extends FieldValues & { title: string; content: string },
> {
  setValue: UseFormSetValue<T>;
}

export function useCreateWithAI<
  T extends FieldValues & { title: string; content: string },
>({ setValue }: UseCreateWithAIProps<T>) {
  const [loading, setLoading] = useState(false);

  async function generatePost(prompt: string) {
    if (!prompt.trim()) return false;

    setLoading(true);

    try {
      const res = await fetch("/api/create-post-with-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate post");
      }

      const data: { title: string; content: string } = await res.json();

      setValue("title" as Path<T>, data.title as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
      setValue("content" as Path<T>, data.content as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });

      toast.success("Post generated successfully!");
      return true;
    } catch {
      toast.error("Failed to generate post. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, generatePost };
}
