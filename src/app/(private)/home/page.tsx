import { PostsContainer } from "@/src/features/post/components/post-container";
import PostForm from "@/src/features/post/components/post-form";

export default function Page() {
  return (
    <div className="flex flex-col w-full justify-center items-start p-6 space-y-5">
      <PostForm />
      <PostsContainer />
    </div>
  );
}
