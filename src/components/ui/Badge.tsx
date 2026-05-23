import type React from "react";

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "success" | "warn";
}> = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-50 text-emerald-600 font-bold",
    warn: "bg-amber-50 text-amber-600 font-bold",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] px-2.5 py-1 rounded-full font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
