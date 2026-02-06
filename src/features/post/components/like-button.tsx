"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { Love } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function LikeButton(props: React.ComponentProps<typeof Button>) {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      variant="ghost"
      aria-label={liked ? "Unlike" : "Like"}
      aria-pressed={liked}
      {...props}
      onClick={() => setLiked((prev) => !prev)}
      asChild
    >
      <motion.button whileTap={{ scale: 0.85 }}>
        <motion.span
          key={String(liked)}
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="flex items-center justify-center"
        >
          <HugeiconsIcon
            icon={Love}
            color={liked ? "#ef4444" : "currentColor"}
            fill={liked ? "#ef4444" : "none"}
            strokeWidth={2}
          />
        </motion.span>
      </motion.button>
    </Button>
  );
}

export { LikeButton };
