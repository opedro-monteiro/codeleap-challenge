import { Skeleton } from "@/src/components/ui/skeleton";
import {
  PostCard,
  PostCardContent,
  PostCardFooter,
  PostCardHeader,
} from "./post-card";

export function PostCardSkeleton() {
  return (
    <PostCard className="w-full">
      <PostCardHeader>
        <Skeleton className="h-5 w-48 bg-primary-foreground/20" />
      </PostCardHeader>
      <PostCardContent className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </PostCardContent>
      <PostCardFooter>
        <Skeleton className="h-4 w-24" />
      </PostCardFooter>
    </PostCard>
  );
}
