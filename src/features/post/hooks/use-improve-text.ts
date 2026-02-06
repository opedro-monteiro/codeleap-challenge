import { useState } from "react";
import type { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface UseImproveTextProps<T extends FieldValues & { content: string }> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

export function useImproveText<T extends FieldValues & { content: string }>({ watch, setValue }: UseImproveTextProps<T>) {
  const [loading, setLoading] = useState(false);
  const content = watch("content" as Path<T>);

  async function improveText() {
    if (!content) return;

    setLoading(true);

    const res = await fetch("/api/improve-text", {
      method: "POST",
      body: JSON.stringify({ text: content }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let improvedText = "";

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      improvedText += decoder.decode(value);
      setValue("content" as Path<T>, improvedText as PathValue<T, Path<T>>);
    }

    setLoading(false);
  }

  return { loading, improveText };
}
