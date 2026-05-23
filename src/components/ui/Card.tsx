import React from "react";

export const Card: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-3xl p-5 shadow-orbit-card border border-gray-100/50 ${className}`}
  >
    {children}
  </div>
);
