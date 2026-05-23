import React from 'react';

export const Dropdown: React.FC<React.PropsWithChildren<{ label?: string }>> = ({ label, children }) => {
  return (
    <div className="relative inline-block text-left">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="mt-1 bg-white border rounded-md shadow-sm p-2">{children}</div>
    </div>
  );
};

export default Dropdown;
