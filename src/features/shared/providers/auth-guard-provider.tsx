"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username || username.trim() === "") router.replace("/");
  }, [router]);

  return <>{children}</>;
}
