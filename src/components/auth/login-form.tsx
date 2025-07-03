"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Lock, LogIn, User, UserPlus, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
  onClose?: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/",
    });
    if (res?.ok) {
      router.push("/");
    } else {
      alert("Đăng nhập thất bại!");
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="relative w-full max-w-xs bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-6">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Đóng"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            placeholder="Username"
            icon={<User className="w-4 h-4" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            icon={<Lock className="w-4 h-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full flex items-center gap-2 justify-center"
          >
            <LogIn className="w-4 h-4" />
            Đăng nhập
          </Button>
        </form>
        <div className="flex flex-col gap-2 w-full">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            className="w-full flex items-center gap-2 justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <g>
                <path
                  fill="#4285F4"
                  d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.184-1.36 3.473-5.273 3.473-3.176 0-5.76-2.633-5.76-5.883s2.584-5.883 5.76-5.883c1.807 0 3.02.77 3.715 1.432l2.543-2.471C17.02 3.68 15.07 2.75 12.625 2.75 7.74 2.75 3.75 6.74 3.75 11.625s3.99 8.875 8.875 8.875c5.09 0 8.465-3.57 8.465-8.59 0-.577-.062-1.02-.13-1.462z"
                />
                <path
                  fill="#34A853"
                  d="M12.625 21.5c2.45 0 4.5-.81 6-2.21l-2.857-2.34c-.81.54-1.85.86-3.143.86-2.42 0-4.47-1.63-5.2-3.82H3.75v2.4C5.25 19.19 8.625 21.5 12.625 21.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M7.425 13.99c-.18-.54-.28-1.12-.28-1.74s.1-1.2.28-1.74v-2.4H3.75A8.75 8.75 0 0 0 3 11.625c0 1.44.34 2.8.75 4.01l3.675-2.645z"
                />
                <path
                  fill="#EA4335"
                  d="M21.805 10.023h-9.18v3.955h5.273c-.227 1.184-1.36 3.473-5.273 3.473-3.176 0-5.76-2.633-5.76-5.883s2.584-5.883 5.76-5.883c1.807 0 3.02.77 3.715 1.432l2.543-2.471C17.02 3.68 15.07 2.75 12.625 2.75 7.74 2.75 3.75 6.74 3.75 11.625s3.99 8.875 8.875 8.875c5.09 0 8.465-3.57 8.465-8.59 0-.577-.062-1.02-.13-1.462z"
                />
              </g>
            </svg>
            Đăng nhập với Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin("facebook")}
            className="w-full flex items-center gap-2 justify-center"
          >
            <Facebook className="w-4 h-4 text-[#1877f3]" />
            Đăng nhập với Facebook
          </Button>
        </div>
        <div className="w-full text-center">
          <span>Bạn chưa có tài khoản? </span>
          <Button
            variant="outline"
            type="button"
            className="inline-flex items-center gap-1"
            onClick={() => router.push("/register")}
          >
            <UserPlus className="w-4 h-4" />
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
}
