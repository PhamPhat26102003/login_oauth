"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <div className="flex flex-col items-center gap-2">
          <div>Xin chào, {session.user?.name}!</div>
          <Button variant="outline" onClick={() => signOut()}>
            Đăng xuất
          </Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Đăng nhập</Button>
      )}
    </div>
  );
}
