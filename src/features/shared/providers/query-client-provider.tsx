"use client";
import { queryClient } from "@/src/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthGuardProvider } from "./auth-guard-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthGuardProvider>
  );
}
