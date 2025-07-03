"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, LogIn, Mail, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterFormProps {
  onClose?: () => void;
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lưu user vào localStorage (chỉ demo, không bảo mật)
    localStorage.setItem(
      "demo-user",
      JSON.stringify({ username, email, password })
    );
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    // Chuyển hướng sang trang đăng nhập
    router.push("/login");
  };

  const handleLoginClick = () => {
    router.push("/login");
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
            type="email"
            placeholder="Email"
            icon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Đăng ký
          </Button>
        </form>
        <div className="w-full text-center">
          <span>Đã có tài khoản? </span>
          <Button
            variant="outline"
            type="button"
            className="inline-flex items-center gap-1"
            onClick={handleLoginClick}
          >
            <LogIn className="w-4 h-4" />
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}
