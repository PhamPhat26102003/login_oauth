import { cn } from "@/lib/utils";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      className={cn(
        "px-4 py-2 rounded font-medium transition",
        variant === "outline"
          ? "border border-gray-300 bg-white hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";
