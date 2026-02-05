import { Header } from "@/src/features/shared/header";
import Providers from "@/src/features/shared/providers/query-client-provider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
}
