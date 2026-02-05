import * as React from "react";

import { cn } from "@/src/lib/utils";

function PostCard({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "bg-card text-card-foreground overflow-hidden rounded-2xl border border-border text-sm group/card flex flex-col",
        className,
      )}
      {...props}
    />
  );
}

function PostCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "bg-primary text-primary-foreground flex items-center justify-between px-6 py-4 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:py-3",
        className,
      )}
      {...props}
    />
  );
}

function PostCardHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header-actions"
      className={cn("flex items-center gap-2 order-1", className)}
      {...props}
    />
  );
}

function PostCardHeaderActionButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="card-header-action-button"
      className={cn(
        "text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

function PostCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-bold flex-1", className)}
      {...props}
    />
  );
}

function PostCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function PostCardSubContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "group-data-[size=sm]/card:px-4 flex justify-between items-center pt-4",
        className,
      )}
      {...props}
    />
  );
}

function PostCardSubContentItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <span
      data-slot="card-content"
      className={cn(
        "px-6 group-data-[size=sm]/card:px-4 text-gray-500",
        className,
      )}
      {...props}
    />
  );
}

function PostCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 py-4 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:py-3 text-lg",
        className,
      )}
      {...props}
    />
  );
}

function PostCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "px-6 pb-4 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-3 flex items-center text-muted-foreground text-sm",
        className,
      )}
      {...props}
    />
  );
}

export {
  PostCard,
  PostCardHeader,
  PostCardHeaderActions,
  PostCardHeaderActionButton,
  PostCardTitle,
  PostCardDescription,
  PostCardSubContent,
  PostCardSubContentItem,
  PostCardContent,
  PostCardFooter,
};
