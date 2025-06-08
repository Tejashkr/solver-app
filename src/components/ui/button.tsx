import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          // Variants
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
          variant === "secondary" && "bg-gray-800 text-white hover:bg-gray-700 shadow-lg shadow-gray-800/10",
          variant === "outline" && "border border-gray-700 bg-transparent hover:bg-gray-800/10 text-gray-700 dark:text-gray-200",
          variant === "ghost" && "bg-transparent hover:bg-gray-800/10 text-gray-700 dark:text-gray-200",
          // Sizes
          size === "xs" && "px-2 py-1 text-xs",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          // Disabled
          (disabled || isLoading) && "opacity-70 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button"; 