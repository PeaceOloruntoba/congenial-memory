import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  fullWidth?: boolean;
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold text-sm rounded-2xl transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer py-3.5 px-5";

  const variants = {
    primary:
      "bg-[#1A6CFA] text-white hover:bg-[#1255DB] shadow-md shadow-[#1A6CFA]/10",
    secondary:
      "bg-white text-[#0B2253] border border-gray-200 hover:bg-gray-50 shadow-sm",
    ghost: "bg-transparent text-[#1A6CFA] hover:bg-[#1A6CFA]/5 shadow-none",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
