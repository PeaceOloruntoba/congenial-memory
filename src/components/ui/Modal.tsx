import type React from "react";

export const Modal: React.FC<
  React.PropsWithChildren<{ open: boolean; onClose: () => void }>
> = ({ open, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#0B2253]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 z-50 fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};
