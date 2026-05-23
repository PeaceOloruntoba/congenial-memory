import type React from "react";

export const Dropdown: React.FC<
  React.PropsWithChildren<{ label?: string; className?: string }>
> = ({ label, className = "", children }) => (
  <div className={`relative inline-block text-left w-full ${className}`}>
    {label && (
      <label className="text-xs font-bold text-[#0B2253] uppercase tracking-wide block mb-1">
        {label}
      </label>
    )}
    <div className="relative w-full">{children}</div>
  </div>
);
