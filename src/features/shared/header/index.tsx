"use client";

import { Button } from "@/src/components/ui/button";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [username, setUsername] = useLocalStorage<string>("username", "");
  const [userPhoto, setUserPhoto] = useLocalStorage<string>("userPhoto", "");

  function handleLogout() {
    setUsername("");
    setUserPhoto("");
    router.replace("/");
  }

  return (
    <header className="w-full bg-primary py-6 px-10 flex justify-between items-center shadow">
      <h1 className="text-3xl font-bold text-primary-foreground tracking-wide">
        Codeleap Network
      </h1>

      {username && (
        <div className="flex items-center gap-3">
          {userPhoto && (
            <img
              src={userPhoto}
              alt={username}
              referrerPolicy="no-referrer"
              className="size-9 rounded-full border-2 border-primary-foreground"
            />
          )}
          <span className="text-sm font-medium text-primary-foreground">
            {username}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      )}
    </header>
  );
}
