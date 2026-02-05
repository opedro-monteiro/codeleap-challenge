import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpFormSchema, type SignUpFormData } from "../types/sign-up.schema";

export function useSignUp() {
  const router = useRouter();
  const [username, setUsername] = useLocalStorage<string>("username", "");

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

  return {
    form,
    onSubmit,
  };
}
