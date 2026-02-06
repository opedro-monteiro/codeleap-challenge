"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarsIcon } from "@hugeicons/core-free-icons";
import { Loader2 } from "lucide-react";

interface CreateWithAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => Promise<boolean>;
  loading: boolean;
}

export function CreateWithAIDialog({
  open,
  onOpenChange,
  onGenerate,
  loading,
}: CreateWithAIDialogProps) {
  const [prompt, setPrompt] = useState("");

  async function handleGenerate() {
    const success = await onGenerate(prompt);
    if (success) {
      setPrompt("");
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden border-transparent sm:max-w-lg shadow-[0_0_15px_rgba(99,102,241,0.4),0_0_30px_rgba(99,102,241,0.2),0_0_60px_rgba(168,85,247,0.15)]"
        showCloseButton
      >
        {/* Aurora borealis background layer */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-4xl">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #10b981, #6366f1)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated neon border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-4xl"
          animate={{
            boxShadow: [
              "inset 0 0 1px 1px rgba(99,102,241,0.3), 0 0 15px rgba(99,102,241,0.3)",
              "inset 0 0 1px 1px rgba(168,85,247,0.4), 0 0 20px rgba(168,85,247,0.3)",
              "inset 0 0 1px 1px rgba(6,182,212,0.3), 0 0 15px rgba(6,182,212,0.3)",
              "inset 0 0 1px 1px rgba(99,102,241,0.3), 0 0 15px rgba(99,102,241,0.3)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HugeiconsIcon icon={StarsIcon} strokeWidth={2} />
            Create With AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Describe what you want to write about and AI will generate a post
            for you.
          </p>
          <Input
            placeholder="e.g., Write a post about neuroscience..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && prompt.trim()) {
                handleGenerate();
              }
            }}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <HugeiconsIcon icon={StarsIcon} strokeWidth={2} />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
