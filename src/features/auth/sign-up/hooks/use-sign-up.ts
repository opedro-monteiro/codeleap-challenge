import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { auth, googleProvider } from "@/src/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpFormSchema, type SignUpFormData } from "../types/sign-up.schema";

export function useSignUp() {
  const router = useRouter();
  const [username, setUsername] = useLocalStorage<string>("username", "");
  const [, setUserPhoto] = useLocalStorage<string>("userPhoto", "");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (username) router.replace("/home");
  }, [username, router]);

  function onSubmit(data: SignUpFormData) {
    setUsername(data.username);
    toast.success("Account created with success, Welcome to CodeLeap ");
    router.push("/home");
  }

  async function onGoogleSignIn() {
    try {
      setIsGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUsername(user.displayName ?? "Google User");
      setUserPhoto(user.photoURL ?? "");

      toast.success(`Welcome, ${user.displayName}!`);
      router.push("/home");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("popup-closed-by-user")
      ) {
        return;
      }
      toast.error("Failed to sign in with Google. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return {
    form,
    onSubmit,
    onGoogleSignIn,
    isGoogleLoading,
  };
}
